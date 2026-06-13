# Arsyen — Master Build Plan (`task.md`)

> The single sequenced plan for the **entire product**, each feature built to its
> full spec. Advance by typing **next** (or run a routine). Authoritative specs
> live in `flows/*`, architecture in `SUPERARCHITECTURE.md`, decisions in
> `DECISIONS.md`, look in `DESIGN_SYSTEM.md`, data in `DOMAIN_MODEL.md`.

## How to use
- Work top-to-bottom. Each **task** (e.g. `T1.3`) is a self-contained "next" unit:
  it lists Backend / Frontend / Tests / Acceptance and the flow-doc reference.
- Status legend: `[ ]` todo · `[~] in progress` · `[x] done`. Update as you go.
- Definition of done (every task): code + tests green in CI, migrations up/down
  clean, acceptance criteria met, `SUPERARCHITECTURE.md` updated if schema/APIs/
  modules changed.
- Quality bar (always): security (authz + validation + audit), observability,
  permission-aware reads, soft-delete where user data, brand-accurate UI (golden
  tests), no scattered plan checks (use entitlements).

Primary build/test target: **macOS desktop + Flutter web** (mobile/iPad adaptive).

---

## Milestone 0 — Foundation  (build the lean correct core)

- [x] **T0.1 Monorepo skeleton.** `app/` `web/` `server/` `deploy/` `docs/`;
  root README, `.gitignore`, per-app READMEs. ✓ (branch `foundation`)
- [x] **T0.2 Local stack (Docker Compose).** Postgres, Redis, MinIO (+bucket init),
  Mailpit, Meilisearch; `.env.example`; ✓ all healthy.
- [x] **T0.3 Go server boot.** chi router; platform pkgs config/db(pgxpool)/redis/
  logger(slog)/httpx(middleware, **error envelope**, pagination); `/healthz`
  `/readyz` `/metrics` `/openapi.yaml`; graceful shutdown; `/v1`. ✓ verified live.
- [x] **T0.4 Migrations + sqlc.** goose (`server/migrations`, embedded) + `cmd/
  migrate`; sqlc.yaml; baseline (extensions, app_settings, audit_log); up/down ✓.
- [x] **T0.5 Observability.** Prometheus metrics + middleware; structured slog
  request logging; request-id. (OTel exporter wired later — API hook in place.)
- [x] **T0.6 Job queue + worker.** asynq client + worker (`--worker`) + noop task; ✓
  worker connects to Redis.
- [x] **T0.7 OpenAPI contract.** OpenAPI 3.1 shell (error/pagination schemas),
  embedded + served at `/openapi.yaml`.
- [x] **T0.8 Entitlements service (skeleton).** plan caps/limits (`Can`/`Limit`),
  default Free; tested. Ref: `flows/billing.md`.
- [x] **T0.9 Flutter scaffold.** layered structure (`app/ theme/ widgets/ features/
  core/`); go_router + auth-guard stub; dio client + interceptors (auth/refresh/
  error→typed `ApiException`); riverpod; flutter_secure_storage; env. ✓ analyze clean.
- [x] **T0.10 Design system in Flutter.** `AColors/ASpace/ARadii/AMotion` + `AType`
  (Space Grotesk/Hanken/Space Mono via google_fonts) + emboss engine (raised/lift
  drop-shadows + inner-shadow painter for inset); widgets ASurface/AButton/
  AIconButton/AInput/AChip/ArtSeat; showcase at `/`; widget tests pass. (Goldens +
  bundled fonts to follow.) Ref: `DESIGN_SYSTEM.md`.
- [x] **T0.11 Next.js scaffold (public web).** App Router skeleton; design CSS
  tokens + brand fonts; `/[username]` route (ISR, fetches public profile, SEO
  metadata, graceful fallback); `/api/revalidate` on-publish webhook. ✓ builds.
- [x] **T0.12 CI/CD.** GitHub Actions (`.github/workflows/ci.yml`): server job
  (build/vet/golangci-lint/migrate up·down·up/test with PG+Redis services), app job
  (flutter analyze/test), web job (npm ci/build). ✓ valid.

**Milestone 0 COMPLETE** ✓ — verified live: compose stack healthy; API probes
(`/healthz`,`/readyz`,`/metrics`,`/openapi.yaml`,`/v1/ping`,404 envelope) green;
worker connects; migrations up/down; Flutter analyze+tests; Next.js build.
Committed on branch `foundation` (commit `53b9624`). Not yet pushed/PR'd.

## Milestone 1 — Identity & Onboarding (+ Admin, SES)  — `flows/identity.md`, `flows/admin.md`

- [x] **T1.1 Schema.** `00002_identity.sql`: users, profiles, professions,
  availability, links, invite_codes, invite_requests, admins (+ app_settings/
  audit_log from M0). Refresh tokens live in Redis.
- [x] **T1.2 Auth core.** argon2id; JWT access (15m) + rotating refresh (~7d) with
  **reuse-detection + family revocation** (Redis); rate limiting; no enumeration. ✓
- [x] **T1.3 Signup (invite) + activation.** `POST /v1/auth/signup`; atomic code
  consumption (FOR UPDATE); hybrid activation; SES/Mailpit status email. ✓
- [x] **T1.4 Request invite.** `POST /v1/invite-requests`; admin approve → emails code. ✓
- [x] **T1.5 Login/refresh/logout** (identifier = username|email). ✓
- [x] **T1.6 Onboarding API.** username-available + set (rules + 6-mo), profile
  PATCH (bio/city/country/availability/links), **avatar upload to MinIO**,
  `onboarding/complete` (requires username + photo). ✓
- [x] **T1.7 Admin surface.** server-rendered (Basic auth): dashboard (manual-review
  toggle, code generate/list), pending signups (approve/reject), invite requests
  (approve→email code/reject); `cmd/adminctl` seeds admins. ✓
- [x] **T1.8 Flutter — auth screens.** Landing, login, signup (validation +
  professions chips + DOB picker), request-invite, pending. ✓
- [x] **T1.9 Flutter — onboarding stepper.** username→availability→photo→bio→
  optional location/links→app. ✓
- [x] **T1.10 App shell.** Top bar (wordmark, search, bell, avatar) + floating pill
  tab bar (Projects·Discover·Feed·Tools·Settings) + splash + auth-guard router. ✓
- [x] Tests: Go unit (password/validate) + **integration** (signup→login→refresh→
  reuse→dup) against PG+Redis; Flutter analyze + widget tests. ✓
- [x] Acceptance verified live via curl (all `flows/identity.md §6` + `admin.md §4`).

**Milestone 1 COMPLETE** ✓ — backend verified end-to-end (curl + integration
tests); Flutter analyzes clean + tests pass. On branch `identity` (uncommitted).

## Milestone 2 — Media / Assets  — `flows/assets.md`

- [x] **T2.1 Schema.** `00003_assets.sql`: assets, asset_versions,
  asset_derivatives, asset_references, asset_access_events (+daily), storage_usage. ✓
- [x] **T2.2 Upload pipeline.** `assets/initiate` (quota via entitlements) →
  pre-signed PUT → `/complete` (stat + bump usage) → asynq process. ✓ (ClamAV scan
  is a documented hook.)
- [x] **T2.3 Processing.** **images → derivatives (thumb/sm/md) + blurhash + dims
  (real, pure Go)**. video/audio/document/file → ffmpeg-gated, degrade gracefully
  (store original, mark ready) — HLS/waveform/pdf-preview pending ffmpeg in env. ✓
- [x] **T2.4 Serving.** signed GET URLs (30m original / 24h derivatives),
  owner-permission-aware; CloudFront-ready. (Per-viewer watermark = ffmpeg hook.) ✓
- [x] **T2.5 Versioning + references + access log.** version rows + restore;
  reference index + **delete guard**; append-only access events + **scheduled
  hourly aggregation** (asynq scheduler) → daily rollups + owner summary. ✓
- [x] **T2.6 Library + picker (Flutter).** Media library (upload/grid/states),
  reusable `showAssetPicker`, blurhash-ready tiles; reached from the shell avatar
  (moves into Profile in M3). ✓
- [x] Tests + Acceptance: Go integration (initiate/quota/reference-guard/forbidden/
  access-aggregation) + live curl (initiate→PUT→complete→worker→ready 800×600 +
  derivatives + blurhash→list→delete); Flutter analyze + tests. ✓

**Milestone 2 COMPLETE** ✓ — pipeline verified end-to-end (API + worker + MinIO).
On branch `media` (uncommitted). Note: full video/audio HLS transcoding needs
ffmpeg provisioned (architecture + handlers in place).

## Milestone 3 — Profile (+ public web)  — `flows/profile.md`

- [x] **T3.1 Schema.** `00004_profile.sql`: profiles + cover_asset_id/about/
  visibility/rate_band; skills, portfolio_pieces, follows. ✓
- [x] **T3.2 Profile API.** `GET /profiles/{username}` (perm-aware) + `GET
  /public/profiles/{username}` (public/unlisted only); extended `PATCH /me/profile`
  (about/skills/visibility/cover/professions); portfolio add/reorder/delete
  (image+video, asset-owned + referenced); follow/unfollow. Cross-module asset
  access via `MediaResolver` (assets svc). Stats: works=public portfolio (projects
  in M5). Followers/following counts hidden. ✓
- [x] **T3.3 Flutter — profile.** ProfileScreen (own+visitor): cover/avatar/
  identity/bio/skills/stats/Create-vs-Follow; tabs Portfolio·Works·Posts·About;
  EditProfileScreen (name/bio/about/professions/skills/availability/city/country/
  visibility/cover); upload-work via M2 picker; shell avatar → profile. ✓
- [x] **T3.4 Next.js — public profile.** `/[username]` renders cover/avatar/
  identity/bio/skills/portfolio + SEO meta + OG image + schema.org Person JSON-LD;
  ISR revalidate-on-publish. ✓ (verified live: Next dev SSR → Go public API.)
- [x] Tests + Acceptance: Go integration (skills/portfolio/visibility-gate/follow/
  self-follow) + live curl (patch→upload→portfolio→cover→self/public views→private
  404→follow); Flutter analyze + tests; web build. ✓

**Milestone 3 COMPLETE** ✓ — full chain verified (app + public web). On branch
`profile` (stacked on media). `next start` prod-serve is a Next 16 Turbopack quirk
(build passes; dev SSR verified) — deploy follow-up.

## Milestone 4 — Creative Works + Credits  — `flows/works.md`
- [ ] T4.1 Schema (creative_works+versions, work_assets, work_credits, work_saves).
- [ ] T4.2 Works API (draft→publish, assets, visibility, save, post-to-feed stub).
- [ ] T4.3 Credits + verification (member accept/reject → verified; external).
- [ ] T4.4 Flutter Works tab + work editor + credit flow; verified credit on
  credited profile. T4.5 Next.js public work page (schema.org CreativeWork).
- [ ] Tests + Acceptance per `flows/works.md §7`.

## Milestone 5 — Projects  — `flows/projects.md`  *(slice 1 shipped; T5.3–T5.8 PAUSED — building Canvas (M6) first per founder 2026-06-07; return for board/tasks, crew, files)*
- [~] T5.1 Schema — **slice 1 done:** projects + project_statuses + project_members
  (role+grants). Remaining: action_plans, board_columns, tasks, assignees, subtasks,
  labels, attachments, comments, files, templates.
- [~] T5.2 Project CRUD + visibility — **done** (blank create seeds statuses + owner
  member; CRUD + visibility + service-layer authz + integration tests; Flutter
  navigator/detail/create/edit/delete/status-change wired to live API). Templates pending.
- [ ] T5.3 Roles & configurable permission grants (authz enforcement + audit).
- [ ] T5.4 Action Plans (tasks + target date + page) ; T5.5 Board (custom columns,
  task move, filters assignee+plan, task panel, subtasks/comments/attachments).
- [ ] T5.6 Files tab; T5.7 Flutter Projects navigator + detail + board + plans +
  files; T5.8 Next.js public project page (internals excluded).
- [ ] Tests + Acceptance per `flows/projects.md §10`.

## Milestone 6 — Canvas (free-form moodboard surface)  — `flows/canvas.md`

> ⚠️ **REMOVED 2026-06-12 (founder decision): the entire Canvas implementation
> was deleted — Go module, Flutter editor, and tables (`00013_drop_canvas.sql`).
> It will be redone from scratch; everything below is historical record only.**

> **Canvas V2 — rebuilt 2026-06-08 (founder pivot).** The Canvas is no longer a
> linear Notion doc; it's a **fixed-width, endless, free-drag moodboard** (also the
> future blog engine). Shipped this pass: **(1)** save fix — kept-alive
> `CanvasController` (edits survive tab-switch/reload; server always persisted);
> **(2)** app-wide **full-page focus** — `FullscreenHost` + morphing scroll-to-top/exit
> FAB on every tab (removed the old flicker + Exit-focus chip); **(3)** free-form surface
> — absolute x/y/w/h, drag/resize/snap, responsive **reflow** on phones, legacy
> migration, optional groups (data+reflow; creation UI deferred = **Phase 3b**);
> **(4)** contextual **text toolbar** above the caret (marks + font/size/color/shadow +
> **animations** typewriter/fade/billboard); **(5)** **media** — re-crop via shared
> `showImageEditor`→new asset, title/link/border panel, image **carousels**. Flutter
> analyze + canvas tests green. **Deferred:** Phase 3b groups UI, T6.5 realtime/CRDT,
> T6.6 side-effects, Next.js reflow-mirroring renderer.
> The T6.1–T6.4 bullets below are the original single-user-linear slices (historical).
> **Decisions (2026-06-07):** (1) **single-user first** — realtime/CRDT is a later
> sub-slice; (2) **comprehensive block set**; (3) **one default canvas per project**
> (multi-canvas later); (4) multiplayer engine target = **Yjs-compatible CRDT via Yrs**
> (Rust: FFI native + WASM web), **server stays CRDT-agnostic** (opaque update log +
> snapshots) — confirm web toolchain with a spike at T6.5; Dart-native CRDT is the
> fallback. Model the doc **CRDT-ready now**: stable block ids + fractional-index
> ordering + per-block rich text (maps to Y.Text later). **Desktop-first** authoring
> (mobile after). **Deferred until deps exist:** to-do→Board task sync (to-dos are
> plain checkboxes for now) and task/action-plan/work @mentions (people @mentions work now).

- [x] T6.1 Canvas schema + API (single-user): `canvases` (one per project; document
  JSON with stable block ids + order keys) + `canvas_snapshots` (versions);
  `GET/PATCH /v1/projects/{id}/canvas`, debounced autosave, version snapshot + restore;
  project-membership authz. (No WS yet.) ✓ — `00007_canvas.sql` (up/down clean);
  `internal/canvas` (store/service/handlers/module); opaque jsonb doc + valid-JSON
  + 2 MiB guards; membership gate via `projects.MemberRole` (`SetProjects`,
  non-member→404, fail-closed); integration-tested (get-or-create idempotent,
  autosave, snapshot→mutate→restore, version 404, non-member 404 on every op);
  full server suite green. Wired in `cmd/api/main.go`. SUPERARCHITECTURE updated.
- [x] T6.2 Editor shell + text-family blocks: text, H1–H3, bulleted + numbered lists,
  to-do (checkbox), quote, callout, divider. Slash menu + hover +/drag-handle gutter +
  drag-to-reorder; max-width embossed doc; **scroll-driven full-page focus mode**
  (DesignLanguage §8): scrolling any project tab collapses global chrome (top bar +
  navigator + bottom bar) + on Canvas the project hero (true full-bleed,
  Show-project-header chip; Board/others keep the hero pinned + Exit-focus chip);
  the **segmented tab strip stays pinned** so Board/others stay reachable full-screen;
  tab-switch preserves focus level; scroll-to-top / Exit chip / Esc restores chrome.
  ✓ — `features/canvas/` (models/repository/`canvasProvider` + `CanvasEditor`):
  all 9 block types, slash on `/`, gutter +/drag reorder, Enter/Backspace block
  splitting+merging+list break-out, to-do toggle, debounced autosave (800 ms) to the
  T6.1 API + save badge. Focus mode = `focusModeProvider` (Notifier) driven by the
  editor scroll; chrome/nav/hero collapse wired in `home_shell` + `projects_view`.
  Flutter analyze clean; widget tests (empty-seed never-blank, multi-block order,
  divider) + suite green. **Pending:** media blocks (T6.3), version-history UI.
- [x] T6.3 Media blocks: image, image gallery, video, audio, file/document,
  link/embed with preview — via the Asset Picker. ✓ — block model extended
  (asset_id/asset_ids/url, round-tripped); slash + gutter insert open the M2
  `showAssetPicker` (kind-filtered) / a URL dialog; images+galleries render real
  signed images (asset id → fresh URL via `assetByIdProvider`, graceful on deleted),
  video/audio/file as embossed media cards, link/embed as a link card; per-block
  caption; delete affordance in the gutter. (No new deps: video/audio playback +
  link unfurl are follow-ups — players are ffmpeg-gated in M2.)
- [x] T6.4 Inline rich-text marks + **@mentions of people** (`canvas_mentions`). ✓ —
  `RichTextController` renders `**bold**`/`*italic*`/`~~strike~~`/`` `code` ``/`[label](url)`
  + `@Name` inline (caret-safe: span text == source); floating format bar (B/I/S/code/
  link/@) on the active block; typing `@` or the bar opens the project-member picker,
  inserts `@Name` + records a mention. Backend `00008_canvas_mentions.sql` + `POST/GET
  /v1/projects/{id}/canvas/mentions` (membership-gated; target must be a project
  member; idempotent); integration-tested. (Two-way "mentioned in" links = T6.6.)
- [ ] T6.5 (later) Realtime: WS gateway (auth on connect), Redis pub/sub fan-out, CRDT
  relay+persist (opaque update log → snapshots), Flutter CRDT (**Yrs spike**),
  presence/multi-cursor. (Foundation reused by Chat/Notifs.) **Deferred by the
  2026-06-07 single-user-first decision.**
- [ ] T6.6 (later, when deps exist) Side-effects: to-do→Board task sync;
  task/action-plan/work @mention two-way links. **Blocked: Board tasks (M5 T5.4/T5.5
  paused) + action-plans/works (M4) don't exist yet.**
- [x] Tests + Acceptance per `flows/canvas.md §7` (single-user subset). ✓ Go canvas
  integration (canvas CRUD + snapshots/restore + mentions, all membership-gated) +
  Flutter widget tests (seed/never-blank, block order, divider, embed card, rich-text
  caret invariant); Flutter analyze + full suite green. Live-edit/offline = T6.5.

## Milestone 7 — Feed  — `flows/feed.md`
- [ ] T7.1 Schema (posts, media, tags, votes, saves, comments, comment_votes).
- [ ] T7.2 Post create (media-required, caption≤500w, tags, NSFW, work ref).
- [ ] T7.3 Ranking: Following (chrono), Trending (decayed velocity), For-you
  (transparent affinity; banned signals excluded).
- [ ] T7.4 Post detail: votes (counts hidden), comments+1-level replies (counts
  shown), save/share. T7.5 Flutter masonry + detail overlay; T7.6 Next.js public
  post page. Tests + Acceptance per `flows/feed.md §8`.

## Milestone 8 — Discover + Crew  — `flows/discover.md`
- [ ] T8.1 Meilisearch profile index (perm-aware, reindex job).
- [ ] T8.2 Discover API (Free=connected-only; Pro/Studio=full + % match).
- [ ] T8.3 Follow→connection (paid); invite-to-project connection.
- [ ] T8.4 Flutter Discover (filters, artist cards, match, actions); rate band
  field (confirm). Tests + Acceptance per `flows/discover.md §7`.

## Milestone 9 — Communities  — `flows/communities.md`
- [ ] T9.1 Schema (communities, members, posts+media/votes/comments, events+rsvps).
- [ ] T9.2 Create (Pro/Studio), join (public/private-approval/hidden), roles/admin
  rules. T9.3 Posts/requests/crew-leads + reactions; repost-from-feed.
- [ ] T9.4 Promotion-to-feed (threshold + auto/approval, community account).
- [ ] T9.5 Events + RSVP; group chat channel (uses M6/M10). T9.6 Flutter community
  page + browse. Tests + Acceptance per `flows/communities.md §7`.

## Milestone 10 — Chat (E2E + realtime)  — `flows/chat.md`
- [ ] T10.1 E2E crypto: device keys, X3DH, Double Ratchet, prekey server,
  passphrase-encrypted backup (server stores only ciphertext).
- [ ] T10.2 Schema (conversations, members, messages, attachments, reactions,
  receipts, key material). T10.3 Conversation types (DM e2e / project / community);
  connection-gated DM.
- [ ] T10.4 Realtime delivery (M6 foundation) + features (media, entity attachments,
  reactions, reply, typing, voice notes, opt-in receipts, search).
- [ ] T10.5 Flutter chat list + threads + composer; entity cards. Tests (E2E
  correctness, device restore, connection gating) + Acceptance per `flows/chat.md §6`.

## Milestone 11 — Tools  — `flows/tools.md`
- [ ] T11.1 Framework: tools grid, full-screen workspace shell, artefacts
  (+versions), export, project-link (Resources). T11.2 Generic per-category editor.
- [ ] T11.3 Catalogue scaffolding (9 tools); each tool's deep build = its own later
  sub-task. Tests + Acceptance per `flows/tools.md §5`.

## Milestone 12 — Website / Portfolio / Résumé builders  — `flows/builder.md`
- [ ] T12.1 Schema (pages+versions, sections, section_refs, resume_data, templates).
- [ ] T12.2 Three builders (Portfolio, Website multi-page, Résumé auto-populate +
  PDF). T12.3 Sections engine + templates. T12.4 Publish + visibility +
  revalidate. T12.5 Next.js render published pages (SEO). Tests + Acceptance per
  `flows/builder.md §7`.

## Milestone 13 — Search  — `flows/search.md`
- [ ] T13.1 Index core entities (artists/projects/communities/works), perm-aware.
- [ ] T13.2 ⌘K palette + Search surface; keyword (all) + semantic (paid, pgvector).
  Tests + Acceptance per `flows/search.md §5`.

## Milestone 14 — Notifications  — `flows/notifications.md`
- [ ] T14.1 Schema + categories + prefs. T14.2 Event emission across modules.
- [ ] T14.3 Realtime in-app delivery + bell + read/mark. Tests + Acceptance per
  `flows/notifications.md §6`. (Email/push later.)

## Milestone 15 — Settings  — `flows/settings.md`
- [ ] T15.1 All sections (account/profile/security-sessions/notifications/privacy-
  GDPR/AI-BYOK/blocked/delete). T15.2 Data export + deletion (30-day grace) + block.
  Tests + Acceptance per `flows/settings.md §4`.

## Milestone 16 — Billing  — `flows/billing.md`
- [ ] T16.1 Deepen entitlements enforcement across all modules. T16.2 Razorpay
  subscriptions (checkout/upgrade/downgrade/cancel, webhooks, GST invoices).
  Tests + Acceptance per `flows/billing.md §6`.

## Milestone 17 — AI  — `flows/ai.md`
- [ ] T17.1 Provider abstraction + BYOK (encrypted) + audit log + confirm-on-write
  + AI indicator. T17.2 Ambient assistant. T17.3 Wire hooks (brief builder, AI
  project creation, chat assist, search command layer). Tests + Acceptance per
  `flows/ai.md §5`.

---

## Future (out of current scope)
- **Marketplace** — selling files/works/services, payouts, revenue split,
  `arsyen.shop`. Spec when prioritized (`DECISIONS.md`).
- Mobile push + email notifications; 2FA; Stripe; OAuth (Google/Apple); US/EU
  expansion; OpenSearch; DRM; standalone canvases; custom board automation.

## Per-task expansion
When you reach a task, it can be expanded into its concrete steps on demand (the
flow doc holds the authoritative spec). Say **next** to start T0.1, or name a task
(e.g. "do T1.3") to jump.
