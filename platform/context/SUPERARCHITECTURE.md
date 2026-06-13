# Arsyen — SUPERARCHITECTURE

> Single source of truth for system architecture. Updated whenever schema, APIs,
> modules, or structure change. Established 2026-06-06 (post-reset rebuild).

Arsyen is a **creative operating system for artists** — a system that holds
artists' irreplaceable work and workflows and must run reliably for many
concurrent users. The architecture below is the production target from day 0.
Product scope: `docs/USER_FLOWS.md` + `docs/ARSYEN_USER_FLOWS_PRODUCTION.md`.
Visual reference (to re-implement in Flutter, not port): `docs/Design/`.

---

## 0. Non-negotiable principles

1. **Durability & integrity first.** User work is irreplaceable. ACID core,
   transactional writes, soft-delete + audit trail, backups + point-in-time
   recovery. No destructive operations without recovery path.
2. **Modular monolith, not microservices.** One Go binary, internally split into
   modules with clean boundaries. Scale horizontally with N stateless instances.
   Extract a service only when a proven seam demands it. (Microservice sprawl was
   the over-engineering that caused the last reset — do not reintroduce it.)
3. **Define the whole architecture; build the lean correct core; add subsystems
   when a vertical slice reaches them.** Every subsystem has a designated home
   here so nothing is ever bolted on, but we do not build unused infra upfront.
4. **Security, observability, and tests are foundations, not afterthoughts.**
5. **One contract.** A shared OpenAPI spec drives the Flutter client; frontend and
   backend never drift.

---

## 1. Topology

Monorepo:

```
arsyen/
  app/         Flutter app (iOS / Android / desktop / logged-in web app)
  web/         Next.js public SEO surface (published pages at arsyen.com)
  server/      Go API — modular monolith
  deploy/      docker-compose (local), Dockerfiles, IaC, .env.example
  docs/     design reference + product flows + this doc
```

**Three surfaces, one API.** The Go API is the single backend for all of them.

- **Frontend (the app):** Flutter (lean — no "Element" abstraction). The product
  itself — Work Layer + logged-in Public Layer — on iOS/Android/desktop and as a
  logged-in web app (e.g. `app.arsyen.com`). See §8.
- **Public web surface:** **Next.js (React, SSR/ISR)** — see §8b. Renders
  **published** public/unlisted profiles, portfolio websites, and creative works
  for anyone (no login), SEO-indexable, at `arsyen.com/...`. Read-only,
  permission-aware, CDN-cached, revalidated on Publish.
- **Backend:** Go modular monolith. See §2.
- **Datastores:** PostgreSQL (source of truth), Redis (sessions, cache, pub/sub,
  job queue), S3-compatible object storage (MinIO local / S3 prod).
- **Admin:** server-rendered pages from the Go backend (see §4).

---

## 2. Backend — Go modular monolith

### Layering (per module)
```
transport (HTTP handlers, DTOs, validation)
  → service (business logic, transactions, authz)
    → repository (SQL, owns its tables)
      → database (Postgres)
```
Rules: handlers never touch SQL; modules never read another module's tables —
they call the other module's service. Cross-module calls are in-process Go
interfaces today, which keeps a clean seam if a module is ever extracted.

**Query discipline (2026-06-12 tech-debt pass, enforced):**
- **No N+1s.** Anything list-shaped resolves its media in ONE batch via the
  assets service's `URLsFor(ids) → (mains, thumbs)` (2 queries total; primitive
  maps so consumers don't import assets types). Per-row `URLs()` calls are a bug.
- **Batch multi-row writes** with `unnest($n::type[])` (assignees, labels,
  skills, links, professions, reorders) — never per-row loops.
- **Multi-step creates are one transaction** (e.g. task + assignees + labels in
  `CreateTask`; project + statuses + columns + plan + owner in `Create`).
- Request decoding is `httpx.Decode` (strict, unknown fields rejected) — one
  definition, not one per module.

### Module map (`server/internal/<module>`)
> **Status:** M1 implemented `auth` + `users` + `profiles` together as one
> cohesive **`identity`** module (1:1 user/profile, tightly coupled in onboarding)
> + an `admin` module (server-rendered). New platform packages added: `password`
> (argon2id), `token` (JWT), `refresh` (Redis rotation+reuse), `authz`, `mailer`
> (SMTP/Mailpit→SES), `storage` (MinIO/S3).
- `auth`/`users`/`profiles` → implemented as **`identity`**: signup/login,
  argon2id, JWT + refresh rotation, invite codes/requests, onboarding, account +
  profile (name, professions, availability, bio, photo, links). **(M3 added:**
  cover/about/visibility/rate, skills, portfolio pieces (referencing assets via a
  `MediaResolver`), follow graph, perm-aware `/profiles/{username}` +
  `/public/profiles/{username}` for the Next.js web.**)**
- `assets` — global asset library; references; versioning. **(M2 implemented:**
  pre-signed upload, image derivatives + blurhash, signed serving, versions,
  reference guard, per-viewer access log + scheduled rollup, quota via
  entitlements; video/audio/pdf processing ffmpeg-gated.**)**
- `projects` — projects, action plans, board (columns), tasks (tickets), files, resources.
  **(Slice 1 implemented:** `projects` + `project_statuses` + `project_members`
  (role+grants jsonb); blank-project create seeds 4 statuses + owner membership;
  `POST/GET/PATCH/DELETE /v1/projects[/{id}]` with service-layer membership/role
  authz (non-member → 404, non-owner edit → 403, owner-only delete), soft-delete,
  cursor-list envelope; integration-tested. Type is an **enum** (53 values in
  `types.go`, `GET /v1/project-types`, server-validated). **Cover images** wired
  through the assets module (`SetMedia` resolver): create/update accept
  `cover_asset_id` (ownership + image-kind checked, reference recorded), and
  list/detail return a presigned `cover_url`.
  **(Work-Layer built to `flows/projects.md` — 2026-06-11. A first pass wrongly
  modelled "milestones" + tasks-on-`project_statuses`; rebuilt to spec. Migrations
  `00009_board` + `00010_task_details` were rewritten (dev DB reset).)**
  - **Board columns are their own table** `board_columns` (id, project_id, name,
    position, `is_done`) — seeded **To do · In progress · Review · Done** on create.
    **Distinct from the project status pill** (`project_statuses`, the hero). CRUD +
    reorder: `GET /v1/projects/{id}/board?assignee=&action_plan=`, `POST …/columns`,
    `PATCH/DELETE …/columns/{columnId}`, `POST …/columns/reorder`. A board needs ≥1
    column; delete moves its tasks to the first remaining one.
  - **Action Plans** `action_plans` (title, **description**, target_date, position) —
    the spec rename of "milestones": a phase that **holds tasks**. **(Revised
    2026-06-12:** nothing is seeded — **plans are mandatory per ticket** and the
    first one is named by the user in the task form (`action_plan_title` on task
    create makes the plan inline). `GET/POST /v1/projects/{id}/action-plans`,
    `PATCH/DELETE …/{planId}`; each DTO rolls up its tasks (`task_count/done_count/
    progress`). Delete reassigns its tickets to the first remaining plan; the
    last plan can't be deleted while it still holds tickets.**)**
  - **Tasks are tickets** `tasks` (action_plan_id, **column_id**, per-project
    **ticket_no**, title, description, **priority** none|low|medium|high|urgent,
    due_date, position) + `task_assignees` (multi), `subtasks`, `task_labels`,
    `task_attachments` (asset ref via `MediaResolver`), `task_comments` (one-level
    `parent_id`). `POST /v1/projects/{id}/tasks` (full payload; **requires
    `action_plan_id` OR `action_plan_title`** — the latter creates the plan, only
    after the rest of the payload validates), `GET …/{taskId}` (full ticket),
    `PATCH …/{taskId}`, `DELETE …/{taskId}`, `POST …/{taskId}/move` (column),
    `PUT …/assignees`, `…/subtasks`, `…/labels/{label}`, `…/attachments`,
    `…/comments`. **Project progress** = tasks in an `is_done` column ÷ total.
  - **Files** `project_files` (`asset_id` opaque; name, kind, size_bytes). `GET/POST
    /v1/projects/{id}/files`, `DELETE …/{fileId}`; attach gated by `MediaResolver.
    OwnsAsset`, list resolves presigned `url`/`thumb_url`.
  - All member-gated (non-member → 404); integration-tested
    (`board_integration_test.go`, `files_integration_test.go`) + wire-smoked incl.
    the real MinIO upload. Flutter `features/projects/`: `board_models`,
    `task_models`, `action_plan_models`, `project_file_models`; `BoardController`
    (filter + columns + move), `TaskController.family<(projectId,taskId)>` (ticket +
    all sub-resources, cross-invalidates board/progress/plans), `ActionPlansController`,
    `FilesController`. Liquid views split into `projects_view` (single-scroll detail —
    **hero scrolls up** — + list + Files), `board_view` (board_columns + rich cards +
    drag + filter bar + column mgmt), `ticket_view` (`CreateTaskForm` full create with
    the **mandatory plan picker + inline new-plan name** + `TicketDetail` with
    description/priority/assignees/labels/subtasks/attachments/comments),
    `action_plans_view` (**plan cards holding task sub-cards + per-card quick
    create, grouped client-side from the live board provider**), `projects_shared`.
    **Ticket presentation (founder 2026-06-12):** create-form + ticket detail open
    **inline below the board in fullscreen**; outside fullscreen they float via
    `showGlassWorkPanel` over the gently dimmed shell. Dialogs re-provide
    `AppearanceScope` (they mount above it).
  **Pending:** templates, members/ACL API, crew avatar URLs, canvas↔board sync,
  Resources tab (needs Tools).**)** *(Infra: MinIO uses a named volume — host
  bind-mounts deadlock on macOS Docker virtiofs, breaking uploads.)*
- `canvas` — **to be REBUILT from scratch.** The first implementation (Canvas V2
  free-form moodboard: opaque jsonb block-doc, snapshots, mentions, Flutter
  editor) was **removed entirely on 2026-06-12 by founder decision** — the Go
  module, the Flutter `features/canvas/`, and the tables
  (`00013_drop_canvas.sql` drops `canvases`/`canvas_snapshots`/`canvas_mentions`).
  Projects detail tabs are **Board · Action Plans · Files** until the redo lands.
  Product spec stays in `flows/canvas.md`; the old implementation lives in git
  history (pre-`00013`).
- `works` — creative works + credits + credit verification.
- `feed` — discover / following / trending; ranking signals (no public counts).
- `discover` — search artists/projects/communities; crew formation.
- `communities` — public/private/hidden; posts, discussions.
- `chat` — conversations, project/community chat (E2E for 1:1 — see §4).
- `notifications` — categories, delivery.
- `tools` — moodboards, scripts, resumes, portfolios, budgets, invoices.
- `media` — upload, signed URLs, transcoding orchestration (see §5).
- `realtime` — WebSocket hub, presence (see §6).
- `search` — indexing + query (see §7).
- `billing` — plans, payments (Razorpay launch) — later phase.

### Platform packages (`server/internal/platform`)
config, db (pgxpool), redis, logger (slog), httpx (router, middleware, error
envelope, pagination), authz, jobs (queue), telemetry (metrics/tracing),
validation, ids (UUIDv7).

### Stack
- HTTP: stdlib `net/http` + `chi` router (lean, idiomatic, fast).
- DB driver: `pgx` v5 + `pgxpool`. Migrations: `goose` (forward-only, versioned).
- No heavy ORM — typed queries via `sqlc` (compile-time-checked SQL).
- Config: env-based, 12-factor, validated at boot.

---

## 3. Data architecture (PostgreSQL)

- **Keys:** UUIDv7 (time-ordered, non-enumerable). `created_at`/`updated_at` on
  every table (UTC).
- **Soft deletes:** `deleted_at NULL` on user-owned data; hard-delete only via the
  GDPR erasure path (30-day window).
- **Audit trail:** append-only `audit_log` (actor, action, entity, before/after
  hash, ts) — required for the product's audit + version features.
- **Versioning:** assets, creative works, profile pages, canvases keep immutable
  version rows; "current" pointer + restore. Designed in from the schema.
- **Permissions/visibility:** central model — role (owner/manager/member/viewer)
  + visibility (private/shared/unlisted/public), enforced in service-layer authz,
  never ad hoc in handlers.
- **Migrations:** every schema change is a goose migration in
  `server/migrations`; reviewed; zero-downtime (expand/contract) discipline.
- **Integrity:** FKs, checks, unique constraints, NOT NULL by default. Multi-step
  writes run in a single transaction.
- **FK-support indexes:** every FK column that cascades, SET-NULLs, or is hit by
  reassignment UPDATEs carries a (full) index — partial indexes can't serve FK
  enforcement or writes that touch soft-deleted rows (`00012_perf_indexes.sql`:
  tasks.action_plan_id/column_id/created_by, task_comments.parent_id/author_id,
  task_attachments.added_by, project_files.added_by, canvases.created_by,
  invite_codes.used_by, projects.status_id, asset_access_events.created_at for
  the rollup window, asset_references (ref_type, ref_id) reverse lookups).
- **Pooling:** pgxpool in-app; pgbouncer in front at scale. Read replicas added
  when read load demands (logical replication).

---

## 4. Auth & security (foundation, day 0)

- Passwords: **argon2id**. Email + password at launch (OAuth phase 2).
- Tokens: short-lived **JWT access** (~15 min) + **rotating refresh** token stored
  in Redis with **reuse detection** (stolen-token invalidation of the family).
- Transport: HTTPS only; HSTS; secure cookie/secure-storage for refresh.
- Middleware: authn (verify access token) → authz (permission check) on every
  protected route. Rate limiting (Redis) per IP + per user. Request size limits.
- Idempotency keys on all unsafe mutations (`Idempotency-Key` header → Redis).
- Secrets: env / AWS Secrets Manager. **Never** in repo. `.env.example` only.
- Input validation at the transport boundary; output encoding; parametrized SQL
  (sqlc) — no string-built queries. OWASP Top 10 reviewed per slice.
- Chat E2E (1:1, Signal-style) is designed in from day 0 because it cannot be
  retrofitted; built when the chat slice lands.

---

## 5. Media subsystem (designed-in; built when media slice lands)

- Object storage abstraction (S3 API) — MinIO local, S3 prod.
- Upload via **pre-signed PUT**; client uploads directly to storage.
- Serving via **signed GET** URLs with expiry (HLS session 15m, thumbs 24h,
  downloads 30m).
- Video: async transcode to HLS ladder (480/720/1080; 4K Studio) via the job
  queue; original always preserved. Images: derivative sizes on upload.
- CDN: CloudFront in front of storage. Per-viewer forensic watermarking at launch;
  DRM phase 2.

---

## 6. Realtime subsystem (designed-in; built when chat/canvas collab lands)

- WebSocket hub in the Go binary; **Redis pub/sub** fans messages across
  instances so any instance can serve any socket.
- Use cases: project/community chat, canvas presence + collaborative edits,
  live notifications.
- Auth on connect (access token); per-channel authz; backpressure + heartbeats.

---

## 7. Async jobs & search

- **Jobs:** Redis-backed queue (`asynq`) for email, transcoding, notifications,
  search indexing, cleanup. At-least-once + idempotent handlers. A `worker`
  process runs alongside the API (same binary, `--worker` mode, or separate
  deployment).
- **Search:** Meilisearch at launch (permission-aware indexing); pgvector for
  semantic search (Pro/Studio) blended with keyword. OpenSearch later phase.

---

## 8. Frontend — Flutter (clean layered)

```
presentation (screens, widgets)        ← stateless where possible
  → state (Riverpod providers/notifiers)
    → domain (immutable models, use-cases)
      → data (repositories → ApiClient)
```
- Routing: `go_router` with auth-guard redirect.
- HTTP: `dio` with interceptors (attach access token, auto-refresh on 401, retry,
  error mapping to typed failures).
- Models: `freezed` + `json_serializable`, generated from the OpenAPI contract.
- Tokens: `flutter_secure_storage` (Keychain / Keystore; web fallback).
- Design system is the **liquid-glass layer** (`features/liquid/` — locked
  2026-06-09, see `docs/new design/arsyen-flutter-brief.md`):
  `liquid_tokens.dart` (accents/radii/palettes) · `appearance.dart`
  (`AppearanceController`, **persisted via shared_preferences**) ·
  `wallpaper.dart` (persistent engine; 30fps paint cap; **pure-black default
  paints once and rests** — zero per-frame cost until Living/Embossed) ·
  `glass.dart` (GlassPanel/GlassChip/CoralButton[busy·expand·compact]/GlassWell,
  hover+press feedback built in — "no dead taps") · `controls.dart` (**the shared
  controls: Tappable, HoverBuilder, GhostButton, GlassSegmented, LoadingPanel,
  LabeledField, AssetTile, showGlassDialog/Menu, promptText, pickYmd + utils** —
  views must reuse these, never re-roll them). The legacy embossed kit
  (`theme/emboss.dart`, `widgets/`) survives ONLY for onboarding +
  edit-profile-era widgets (image editor, inputs) until their liquid conversion;
  the old shell/home/showcase/settings/profile screens were deleted (2026-06-12).
- Errors/offline: typed failures surfaced calmly (per design voice), optimistic
  updates only where safe.

### App structure
```
app/lib/
  main.dart
  app/            (router, app shell, bootstrap)
  theme/          (tokens, ThemeData, text styles)
  widgets/        (design-system components)
  features/<f>/   (presentation + state + domain + data per feature)
  core/           (api client, storage, errors, env)
```

---

## 8b. Public web surface — Next.js (day 0)

The open-web, SEO-indexable rendering of **published** content. Built from day 0
(the founder requires published pages live on the open web immediately).

- **Stack:** Next.js (App Router), SSR + ISR with **on-demand revalidation** — a
  page re-renders the instant a user hits Publish (Go emits a revalidate webhook).
- **Renders:** public/unlisted profiles (`arsyen.com/<username>` /
  `/profile/<username>`), portfolio websites/pages, creative works. SEO meta +
  OpenGraph + `schema.org` (Person, CreativeWork) + sitemaps.
- **Reads only** from the Go API's public, **permission-aware** read endpoints —
  **private content is never served**; no write paths here (writes happen in the
  app).
- **Honors "create once, reference everywhere":** pages render *references* to the
  same Works/assets, never copies.
- **Caching:** CloudFront in front; ISR + revalidate-on-publish; signed URLs for
  any media.
- **Design:** reuses the design-system CSS tokens (the `docs/Design` kit is
  already CSS) so the embossed look matches the app.
- **Boundary:** this surface does **not** reopen the Flutter-for-the-app decision;
  it is a separate read-mostly SEO layer, not the product UI.

## 9. Observability & ops (day 0)

- Structured logging (`slog`, request-scoped fields, no PII).
- Metrics (Prometheus) + tracing (OpenTelemetry).
- `/healthz` (liveness) + `/readyz` (deps ready).
- Consistent JSON **error envelope**: `{error:{code,message,details,request_id}}`.
- Cursor-based pagination; `/v1` URL versioning; OpenAPI served + checked in.
- Graceful shutdown; context propagation; timeouts on every external call.

---

## 10. Testing & CI/CD (gate, day 0)

- Backend: unit tests + integration tests against **real Postgres/Redis via
  testcontainers**. sqlc + migration up/down checked in CI.
- Frontend: unit + widget + **golden** tests (design system) + integration.
- CI (GitHub Actions): lint (golangci-lint, dart analyze) + tests + migration
  check on every PR. Nothing merges red.
- CD: containerized, 12-factor, zero-downtime deploys, automated DB migration step.

---

## 11. Infrastructure — AWS ap-south-1 (Mumbai), India-first

| Concern | Local dev (Docker Compose) | Production (AWS) |
|---|---|---|
| API (+ admin pages) | Go container | ECS/Fargate (or EKS), N stateless tasks behind ALB |
| Public web (Next.js) | `next dev` / node container | Container on ECS/Fargate (or Amplify) + CloudFront |
| Postgres | `postgres` container | RDS Postgres (Multi-AZ, PITR, read replicas) |
| Redis | `redis` container | ElastiCache Redis |
| Object storage | MinIO | S3 + CloudFront |
| Email | Mailpit (catcher) | AWS SES |
| Secrets | `.env` (gitignored) | AWS Secrets Manager / SSM |
| Search | Meilisearch container | Meilisearch on ECS (OpenSearch later) |

Data residency: India at launch (US phase 2, EU phase 3).

---

## 12. Build roadmap

**Phase 0 — Foundation (lean correct core):**
repo skeleton; Docker Compose (Postgres/Redis/MinIO); Go server boot (config, db
pool, redis, router, middleware stack, error envelope, health, logging, OpenAPI
shell); migration tooling; CI; Flutter scaffold + design-system theme/tokens +
core embossed widgets (golden-tested). No feature logic yet.

**Phase 1 — Identity slice (first vertical, full-stack):**
`users` + `profiles` schema; `auth` (signup/login/refresh, argon2id, JWT+refresh
rotation); `GET /me`, `PATCH /me/profile`; Flutter auth → onboarding (username,
roles, availability, photo, bio) → dashboard shell. Profile completion gate.

**Phase 2+ (each a full-stack vertical to the same bar):** Projects (+canvas →
board sync), Assets/media, Creative Works + credits, Feed/Discover + crew, Chat
(E2E + realtime), Communities, Tools, Search, Notifications, Billing.

Heavier subsystems (media transcoding, realtime, search) are built when their
slice arrives — always against the architecture above, never bolted on.
