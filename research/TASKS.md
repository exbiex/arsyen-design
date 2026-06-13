# TASKS — Arsyen Research

The backlog. Work from here using **the protocol in `CLAUDE.md §2`**. Tasks are ordered; pick the lowest-ID `TODO` whose dependencies are all `DONE`.

**Task template** — every task has:
- **Status** · TODO / IN_PROGRESS / DONE / BLOCKED
- **Depends on** · task IDs that must be DONE first
- **References** · the exact decision-doc sections to read (read these, not the whole doc)
- **Goal** · one sentence — why this exists
- **Scope** · what to build (files, types, functions)
- **Out of scope** · what NOT to do here (prevents overreach)
- **Acceptance** · the definition of done (a checklist)

> Decision docs referenced: **AR** = ARCHITECTURE.md · **DC** = DECISIONS_CONTEXT.md · **ID** = IMPLEMENTATION_DECISIONS.md.

---

## PHASE 0 — Foundation

### T-001 · Initialize monorepo skeleton
- **Status:** DONE
- **Depends on:** —
- **References:** ID §1, ID §4, DC §11
- **Goal:** a pnpm + Turborepo monorepo with the locked folder structure and TS/ESM baseline.
- **Scope:** root `package.json` (pnpm workspaces), `pnpm-workspace.yaml`, `turbo.json`; create empty `apps/platform`, `apps/studio`, `packages/content-schema`, `packages/agent-contracts`, `packages/shared-config`, `infra/migrations`; root `tsconfig.base.json` (`strict: true`, ESM, Node 22 target); `.gitignore`, `.nvmrc` (22), `README.md` stub linking to `CLAUDE.md`.
- **Out of scope:** any business logic, any dependency beyond tooling.
- **Acceptance:** `pnpm install` succeeds; `turbo run build` resolves the (empty) graph; folder layout matches `CLAUDE.md §5`.
- ✓ 2026-06-10 — Monorepo skeleton scaffolded (pnpm workspaces + Turborepo, strict NodeNext-ESM `tsconfig.base.json`, 5 workspace packages, `infra/migrations`); `pnpm install` + `turbo run build` green (5/5). Deviations: pinned pnpm@11.5.2 / turbo@2.9.17 / typescript@6.0.3; Biome + per-package tsconfigs deferred to T-002, so `lint`/`typecheck` are currently no-ops; `README` links to `context/CLAUDE.md` (docs live in `context/`, not `docs/`).

### T-002 · Shared config package
- **Status:** DONE
- **Depends on:** T-001
- **References:** ID §1
- **Goal:** one source of lint/format/tsconfig so every package is consistent.
- **Scope:** `packages/shared-config` exporting a base `tsconfig.json` and a `biome.json`; wire other packages to extend them.
- **Out of scope:** eslint/prettier (Biome is the pick).
- **Acceptance:** `pnpm lint` (Biome) runs repo-wide; every package's tsconfig extends the base.
- ✓ 2026-06-11 — `shared-config` exports `tsconfig.base.json` + `biome.json` (Biome 2.4.6 pinned; v2 monorepo pattern: shared `root:false`, root `biome.json` extends it); all 4 other packages extend `@arsyen-research/shared-config/tsconfig.base.json` via `workspace:*` devDep; `pnpm lint` = root-level `biome check .` (per-package turbo lint deferred to T-003 if needed). Verified on host: `pnpm lint` zero warnings, `pnpm build` 5/5 green. Deviations: root `tsconfig.base.json` kept as thin alias of the shared one (CLAUDE.md §5 layout); lint runs root-level rather than as a per-package turbo task.

### T-003 · CI pipeline skeleton
- **Status:** DONE
- **Depends on:** T-002
- **References:** ID §14
- **Goal:** green CI on every push: install → lint → typecheck → test → build.
- **Scope:** GitHub Actions workflow running those steps via Turborepo with caching; a placeholder step for "publish content-schema on version bump" (no-op until T-021).
- **Out of scope:** deploy steps (Phase 8).
- **Acceptance:** CI passes on the skeleton; failing lint/typecheck fails the build.
- ✓ 2026-06-11 — `.github/workflows/ci.yml`: every-push trigger, corepack-pinned pnpm, Node from `.nvmrc`, pnpm-store + `.turbo` caches, ordered steps install→lint→typecheck→test→build (each step failing fails the run), `main`-gated no-op publish placeholder for T-021; `turbo.json` build task got `outputs: ["dist/**"]` for cache correctness. All five steps verified green locally (verify-phase0.sh). Hosted run confirmed green 2026-06-11 after lockfile fix (`2028ebf`) — frozen-lockfile install caught the uncommitted zod entry, which is the gate working as intended.

### T-004 · Local dev infrastructure
- **Status:** DONE
- **Depends on:** T-001
- **References:** DC §2, ID §2, ID §9
- **Goal:** reproducible local Postgres+pgvector and Redis, plus env scaffolding.
- **Scope:** `docker-compose.yml` with a `pgvector`-enabled Postgres image and Redis; `.env.example`; a Zod env-schema module stub in `packages/shared-config` (validated at boot later).
- **Out of scope:** managed-hosting provisioning (Phase 8).
- **Acceptance:** `docker compose up` exposes Postgres (with `CREATE EXTENSION vector` working) and Redis; `.env.example` documents every required var.
- ✓ 2026-06-11 — `docker-compose.yml` (project `arsyen-research`; containers `arsyen-research-postgres` [pgvector/pgvector:pg17, init script creates `vector` extension] + `arsyen-research-redis` [redis:7.4-alpine, AOF + `noeviction` for BullMQ]; volumes `arsyen-research-pgdata`/`-redisdata`; healthchecks); `.env.example` mirrors SETUP.md §4 (all rows); Zod env stub `packages/shared-config/src/env.ts` (`EnvSchema`/`parseEnv`, later-phase vars optional until their tasks) — shared-config now builds (`tsc`, `./env` export, zod 4.4.3 pinned; justification: zod is the locked validation library, ID §3/§9). Verified on host via `scripts/verify-phase0.sh`: compose healthy, `vector 0.8.2` extension live, redis `PONG`, lint/typecheck/test/build all green. Deviations: host ports default to **5433/6380** (sibling `arsyen` repo's dev stack owns 5432/6379), overridable via `PG_HOST_PORT`/`REDIS_HOST_PORT`.

---

## PHASE 1 — Content contract (`packages/content-schema`) ★

### T-010 · Schema package scaffold + version
- **Status:** DONE
- **Depends on:** T-002
- **References:** ID §3, ID §4, DC §4
- **Goal:** the package skeleton and the version constant.
- **Scope:** `packages/content-schema` with Zod + `zod-to-json-schema` deps; `src/version.ts` → `export const SCHEMA_VERSION = "1.0.0"`; `src/index.ts` export surface stub; build config emitting ESM + types.
- **Out of scope:** any block definitions yet.
- **Acceptance:** package builds; `SCHEMA_VERSION` importable; `pnpm test` runs (even with zero tests).
- ✓ 2026-06-11 — scaffold + SCHEMA_VERSION "1.0.0"; ESM+types build (tsc), vitest wired (--passWithNoTests). Deviation: zod-to-json-schema dep dropped — deprecated, zod-v3-only; zod 4.4.3 native z.toJSONSchema used instead (same ID §3 principle). **Verified 2026-06-11 (host, covers T-010…T-021):** `pnpm install --frozen-lockfile` + forced uncached `turbo run lint typecheck test build` all green (8/8 tasks; content-schema 31/31 tests across 6 suites). Hosted CI not directly checkable from this host (no `gh`/token) — the CI run triggered by this closure push covers the identical tree; if that run is red, reopen.

### T-011 · Inline rich-text model (spans, marks, refs)
- **Status:** DONE
- **Depends on:** T-010
- **References:** DC §4 (rich text), AR §5.4
- **Goal:** the span/mark/annotation primitives that all rich-text blocks reuse.
- **Scope:** `src/inline.ts` — Zod schemas: `Span { text, marks?: Mark[], refs?: Ref[] }`; `Mark` = closed enum `strong|em|code|strike|underline`; `Ref` = discriminated union `{type:"link", href}` | `{type:"reference", referenceId}`.
- **Out of scope:** open-ended marks; any block that uses spans (next tasks).
- **Acceptance:** schemas validate well-formed spans and reject unknown marks; types exported via `z.infer`.
- ✓ 2026-06-11 — src/inline.ts — Span/Mark(closed enum)/Ref(link|reference discriminated union); strict objects; types via z.infer. **Verified 2026-06-11:** host pipeline green (see T-010 note).

### T-012 · Block envelope + discriminated-union scaffold
- **Status:** DONE
- **Depends on:** T-010
- **References:** DC §4 (blocks), AR §5.4
- **Goal:** the shared block envelope and the mechanism to compose typed blocks.
- **Scope:** `src/blocks/envelope.ts` — base `{ id, type, version, data, meta? }`; a registry pattern + `BlockSchema` discriminated union that later block tasks extend; an `UnknownBlock` pass-through schema for forward-compat (Invariant 2).
- **Out of scope:** specific block `data` shapes (T-013…T-015).
- **Acceptance:** envelope validates; an unrecognized `type` validates as `UnknownBlock` rather than failing.
- ✓ 2026-06-11 — src/blocks/envelope.ts — defineBlock composer { id(blk TypeID), type, version, data, meta? } + loose UnknownBlockSchema pass-through; union assembled in blocks/index.ts (refine guards known-type-bad-data from degrading). **Verified 2026-06-11:** host pipeline green (see T-010 note).

### T-013 · Text blocks (paragraph, heading, quote)
- **Status:** DONE
- **Depends on:** T-011, T-012
- **References:** DC §4, AR §5.4
- **Goal:** the prose blocks.
- **Scope:** `paragraph { spans }`, `heading { level:1-4, spans }`, `quote { spans, attribution?, sourceRefId? }` Zod schemas, registered in the union.
- **Out of scope:** image/reference/structural blocks.
- **Acceptance:** each round-trips; heading rejects level 0/5; registered in `BlockSchema`.
- ✓ 2026-06-11 — paragraph/heading(level 1-4)/quote(+attribution?, sourceRefId?) in src/blocks/text.ts; registered. **Verified 2026-06-11:** host pipeline green (see T-010 note).

### T-014 · Image + entity-reference blocks
- **Status:** DONE
- **Depends on:** T-012
- **References:** DC §4, DC §5, AR §5.4, AR §5.5
- **Goal:** blocks that point (by ID) into `assets[]`/`references[]`.
- **Scope:** `image { assetId, role }`; `filmReference|artistReference|bookReference|albumReference { referenceId, note? }`. These carry **no** asset/entity data inline — only IDs.
- **Out of scope:** the asset/reference object schemas themselves (T-016).
- **Acceptance:** blocks validate with ID references; no embedded asset/entity payloads permitted.
- ✓ 2026-06-11 — image{assetId,role} + film/artist/book/album reference blocks (referenceId+note? only — strict objects forbid embedded payloads); enums centralized in src/enums.ts from DOMAIN_MODEL §3. **Verified 2026-06-11:** host pipeline green (see T-010 note).

### T-015 · Structural blocks (gallery, comparison, timeline, list, divider, callout, embed)
- **Status:** DONE
- **Depends on:** T-011, T-012, T-014
- **References:** DC §4, AR §5.4
- **Goal:** the remaining v1 block catalog.
- **Scope:** `gallery {items:[{assetId,caption?}]}`, `comparison {items:[{assetId,caption?}]}`, `timeline {events:[{date,label,refId?}]}`, `list {ordered:bool, items:[spans]}`, `divider {}`, `callout {variant, spans}`, `embed {provider, externalId, title?}`.
- **Out of scope:** new block types beyond the v1 catalog.
- **Acceptance:** all validate and are registered; the v1 catalog is now complete.
- ✓ 2026-06-11 — gallery(min1)/comparison(min2)/timeline(free-form dates)/list(span-run items)/divider/callout(open variant string)/embed in src/blocks/structural.ts; v1 catalog complete (15 types). Note: blocks grouped into 4 files (text/media/entity-references/structural) rather than 15 single-schema files. **Verified 2026-06-11:** host pipeline green (see T-010 note).

### T-016 · References, assets, metadata, and the document envelope
- **Status:** DONE
- **Depends on:** T-013, T-014, T-015
- **References:** DC §4, DC §5, AR §5.2, AR §5.3, AR §5.5, AR §6
- **Goal:** the top-level document contract.
- **Scope:** `src/references.ts` (`Reference { id, entityType, entityId, label, snapshot, source }`); `src/assets.ts` (`Asset { id, kind, role, alt, caption?, attribution, focalPoint, aspectRatio, blurhash, dominantColor, variants[] }`); `src/metadata.ts`; `src/envelope.ts` composing `{ schemaVersion, documentId, documentType, status, metadata, blocks[], references[], assets[] }`.
- **Out of scope:** persistence, API.
- **Acceptance:** a full example document validates; `documentVersion` (in metadata) and `schemaVersion` (root) are distinct fields.
- ✓ 2026-06-11 — references.ts (snapshot + optional entityId + loose provenance source), assets.ts (semantic descriptor incl. attribution/license, focalPoint, blurhash, variants min1), metadata.ts (documentVersion human counter), envelope.ts (full document + duplicate-id dedupe guards). documentVersion ≠ schemaVersion enforced by structure + tests. **Verified 2026-06-11:** host pipeline green (see T-010 note).

### T-017 · Document validator with graceful degradation
- **Status:** DONE
- **Depends on:** T-016
- **References:** DC §4, Invariant 2
- **Goal:** the public `validateDocument()` with structured errors.
- **Scope:** `src/validate.ts` → `validateDocument(doc): { ok, errors? }`; unknown block types pass (forward-compat); referential checks (every `referenceId`/`assetId` used by a block exists in `references`/`assets`).
- **Out of scope:** migration.
- **Acceptance:** valid docs pass; dangling reference/asset IDs fail with a clear error; unknown block types do not fail.
- ✓ 2026-06-11 — validate.ts — validateDocument(): zod issues mapped to {path,message,code}; referential integrity over every ID-bearing site (span refs, sourceRefId, image/gallery/comparison assetIds, timeline refIds, entity-ref blocks); unknown block types pass and are skipped. **Verified 2026-06-11:** host pipeline green (see T-010 note).

### T-018 · Migration registry + chain runner
- **Status:** DONE
- **Depends on:** T-017
- **References:** DC §4 (versioning), ID §4, AR §5.6
- **Goal:** the machinery to migrate documents across schema versions on read.
- **Scope:** `src/migrations/` — a `Map<fromVersion, (doc)=>doc>` registry, a `migrate(doc, target)` that chains pure functions, and an identity entry for 1.0.0. All pure, no I/O.
- **Out of scope:** any actual breaking migration (none exist yet).
- **Acceptance:** `migrate(doc, "1.0.0")` is identity; the chain runner is unit-tested and ready for future `1.0→1.1` entries.
- ✓ 2026-06-11 — migrations/ — registry Map<from,step> + pure chain runner with cycle cap, MigrationError, isolated-registry support for tests; identity at 1.0.0 (zero steps). **Verified 2026-06-11:** host pipeline green (see T-010 note).

### T-019 · JSON Schema build step
- **Status:** DONE
- **Depends on:** T-016
- **References:** ID §3, AR §5
- **Goal:** derive the language-agnostic contract artifact.
- **Scope:** `src/jsonschema.ts` build → `dist/schema.json` via `zod-to-json-schema`; add `pnpm schema:build` script.
- **Out of scope:** publishing.
- **Acceptance:** `dist/schema.json` is emitted and is a structurally valid JSON Schema describing the envelope.
- ✓ 2026-06-11 — jsonschema.ts (native z.toJSONSchema, draft 2020-12, x-schemaVersion) + scripts/emit-schema.mjs; pnpm schema:build added and chained into build → dist/schema.json. Verified emitted in sandbox (full envelope required-list). **Verified 2026-06-11:** host pipeline green (see T-010 note).

### T-020 · Contract test suite
- **Status:** DONE
- **Depends on:** T-017, T-018, T-019
- **References:** ID §12 (contract tests)
- **Goal:** the highest-value tests in the system — protect the spine.
- **Scope:** Vitest: every block type round-trips; a canonical full document validates; malformed envelopes are rejected; a snapshot test of the generated `dist/schema.json`; the migration identity case.
- **Out of scope:** integration/DB tests.
- **Acceptance:** all pass; the JSON Schema snapshot guards against accidental contract drift.
- ✓ 2026-06-11 — 6 colocated suites: inline, blocks (every type round-trips off the canonical fixture, level 0/5 rejected, no degrade-on-known-type, payload-embedding rejected), envelope (canonical doc, version-field distinctness, dedupe), validate (dangling IDs w/ precise paths, unknown-block tolerance), migrate (identity/chain/no-path/registration guards), jsonschema (+snapshot). **Verified 2026-06-11:** host pipeline green (see T-010 note).

### T-021 · Publish `content-schema@1.0.0`
- **Status:** DONE
- **Depends on:** T-020
- **References:** ID §4, DC §11
- **Goal:** make the contract a versioned, consumable artifact.
- **Scope:** package `publishConfig` for the private registry; `CHANGELOG.md`; wire the CI version-bump publish step (from T-003); publish (or `pnpm link` locally if the registry isn't set up yet).
- **Out of scope:** consumer integration guide (Phase 8).
- **Acceptance:** `@arsyen-research/content-schema@1.0.0` is installable by `apps/platform` and external repos.
- ✓ 2026-06-11 — version 1.0.0 + CHANGELOG.md; publishConfig(access restricted); CI publish step wired (version-bump detection on main; inert until NPM_TOKEN secret set and private:true removed — registry choice pending, surfaced to owner). Workspace consumers can already depend via workspace:*. **Owner decision 2026-06-11: registry deferred to Phase 8** — CI publish stays inert (skips cleanly); task satisfies the "registry isn't set up yet" path in Scope; revisit when the first external consumer integrates (add NPM_TOKEN/registry URL, drop `private: true`). **Verified 2026-06-11:** host pipeline green (see T-010 note).

---

## PHASE 2 — Skeleton monolith + manual happy path (NO AI)

### T-029 · Redis + BullMQ base + Bull Board
- **Status:** DONE
- **Depends on:** T-004
- **References:** DC §2, ID §6, ID §13
- **Goal:** queue infrastructure available to the platform.
- **Scope:** BullMQ connection module; a `health` queue to prove wiring; Bull Board mounted on an internal-only route.
- **Out of scope:** pipeline queues (Phase 5).
- **Acceptance:** a test job runs end-to-end; Bull Board shows it.
- ✓ 2026-06-11 — `apps/platform/src/infra/queue/`: connection.ts (Redis factory, `maxRetriesPerRequest: null`, one client per component, creator closes), health.queue.ts (queue + thin worker per EG §8, bounded removeOnComplete/Fail), board.ts (`createBoardApp()` → express app, Bull Board at `/internal/queues`), board.dev.ts (127.0.0.1-bound dev server, `queues:board` script) + Testcontainers integration test (real Redis 7.4-alpine: health job end-to-end, board API + UI show it); platform gained real tsc build/typecheck/vitest. Verified: full forced pipeline 10/10 green; live smoke vs compose Redis (UI 200, `completed: 1`). Decisions: the Nest app doesn't exist until T-030, so "internal-only route" = localhost-only standalone dev entry for now — T-030 mounts `createBoardApp()` in-app, T-103 adds auth; express 5 pinned (@bull-board v7 requires express ^5, matches Nest 11 default); ioredis pinned 5.10.1 = bullmq's exact pin (single instance, type-identical); pnpm `allowBuilds: false` for 4 optional native builds (msgpackr-extract, ssh2, cpu-features, protobufjs — pure-JS fallbacks suffice); `BULL_BOARD_PORT` (default 3001) is a dev-only knob local to board.dev.ts, deliberately kept out of the canonical env table.

### T-030 · NestJS app + Zod-validated config
- **Status:** DONE
- **Depends on:** T-001, T-004
- **References:** DC §11, ID §5, ID §9
- **Goal:** the monolith skeleton with module folders and fail-fast config.
- **Scope:** `apps/platform` NestJS app; the eight module folders from `CLAUDE.md §5` (empty modules ok); a Config module that validates env via Zod at boot and refuses to start on failure.
- **Out of scope:** any domain logic.
- **Acceptance:** app boots only with valid env; an empty health endpoint responds.
- ✓ 2026-06-11 — Nest 11.1.26 (express 5, matches T-029 pin), plain tsc build (no nest-cli): `bootstrap.ts` `createApp(source)` parses env via shared-config `parseEnv` BEFORE NestFactory (a Nest app can't exist with bad env); `main.ts` refuses to start with readable per-var errors + exit 1; `config/config.module.ts` global `ENV` token carries the validated Env (the T-032+ injection seam); `health/` GET /health → `{status:"ok"}`; all 8 domain module placeholders under `src/modules/` (each cites its arrival task + invariant). Tests: boots+serves /health (in-process, ephemeral port), invalid env rejects (ZodError), real `dist/main.js` spawn exits 1 listing DATABASE_URL/REDIS_URL — hence turbo `test` now `dependsOn: ["build", "^build"]`. Verified: live boot smoke (11 modules init, /health 200), forced pipeline 10/10 green, lint zero warnings. Decisions: Bull Board NOT mounted in-app yet (T-029 note's expectation amended — boot must stay connection-free until queues join the app, T-071/T-103); decorators (`experimentalDecorators`+`emitDecoratorMetadata`) enabled platform-tsconfig-only; `@nestjs/testing` deliberately omitted until first used; known seam: vitest/esbuild doesn't emit decorator metadata — irrelevant while tests avoid constructor DI, add the swc plugin when that changes (T-032+); 2 explicit biome-ignores for `noStaticOnlyClass` on the Nest `forRoot()` idiom.

### T-031 · Drizzle wiring + editorial tables migration
- **Status:** DONE
- **Depends on:** T-030
- **References:** DC §2, ID §2, AR §7.2
- **Goal:** the DB layer and the first migration (editorial domain).
- **Scope:** Drizzle + `postgres-js` setup; `drizzle-kit` config; migration for `topics`, `documents`, `document_versions` (immutable, stores `content jsonb` + `schema_version`), `editorial_events`. *(If ORM fork = Prisma, re-spec here.)*
- **Out of scope:** publishing/asset/AI/KG tables (later phases).
- **Acceptance:** `pnpm db:migrate` creates the tables; a repository can insert/select a document.
- ✓ 2026-06-11 — drizzle-orm 0.45.2 + postgres-js 3.4.9 + drizzle-kit 0.31.10: `src/db/schema/editorial.ts` (topics, documents [status default `drafting`, unconstrained `current_version_id` pointer — doc↔version FK cycle avoided, service maintains it transactionally in T-033], document_versions [immutable: unique (document_id, version_no), no updated_at], editorial_events [actor strings, from/to status, (document_id, created_at) index]); global `DatabaseModule` (lazy postgres-js client — boot stays config-only — + drizzle DATABASE token + shutdown close, `main.ts` now enables shutdown hooks); minimal module-private `EditorialRepository` (insert/find document); migration `infra/migrations/0000_striped_quasar.sql` generated, applied to compose PG via `pnpm db:migrate` (root script added) — 4 tables verified; Testcontainers PG (pgvector:pg17) test: migration creates tables + repository round-trip with `typeid-js` IDs. Deviations: AR §7.2 absent from context/ — DDL derived from DOMAIN_MODEL §1–§5 + DC §8; statuses are text (not pg enums — T-034 state machine is the enforcement point, additive changes stay DDL-free); shared biome.json gained `unsafeParameterDecoratorsEnabled` (Nest constructor `@Inject` is the locked DI pattern, EG §3); drizzle.config.ts falls back to the compose DATABASE_URL for dev.

### T-032 · Content module (validate-on-write)
- **Status:** DONE
- **Depends on:** T-021, T-031
- **References:** DC §4, ID §3, Invariant 8
- **Goal:** the platform's single gateway to the content contract.
- **Scope:** Content module wrapping `@arsyen-research/content-schema`; a `validateOnWrite(doc)` service used by Editorial; expose `migrate()`/`SCHEMA_VERSION`.
- **Out of scope:** editing endpoints.
- **Acceptance:** invalid documents are rejected before persistence; no other module imports `content-schema` directly.
- ✓ 2026-06-11 — `modules/content/`: ContentService (`validateOnWrite(unknown) → Document` throwing typed `ContentValidationFailed` with structured issues [EG §6]; `migrate(stored, target=SCHEMA_VERSION)` chains content-schema migrate + re-validates; `schemaVersion` exposed); `content.types.ts` re-exports envelope types so other modules never touch the package; **boundary enforced by test** `content.boundary.test.ts` (scans src/ — only `modules/content/` may import `@arsyen-research/content-schema`); platform test fixtures (`src/testing/documents.ts`) deliberately import-free. 6 unit tests: valid passes, dangling assetId → structured failure, unknown block tolerated (Invariant 2), migrate identity, version exposure. Platform consumes content-schema via `workspace:*` (registry deferred per T-021).

### T-033 · Editorial module (documents + immutable versions)
- **Status:** DONE
- **Depends on:** T-031, T-032
- **References:** AR §7.2, DC §4
- **Goal:** create documents and append immutable versions.
- **Scope:** Editorial repo + service: create document; save a new `document_version` (validated via Content); `current_version_id` pointer; versions never mutated.
- **Out of scope:** state transitions (T-034), publishing (T-036).
- **Acceptance:** saving a version increments `version_no`; prior versions are unchanged.
- ✓ 2026-06-11 — EditorialService (module's only export): `createDocument` (typeid `doc_`), `saveVersion` = ContentService.validateOnWrite THEN repository `appendVersion` (one tx: doc row `FOR UPDATE` → next version_no → insert immutable `dv_` row → move `current_version_id` + updated_at; unique index backstops races), `getDocument`/`getVersion`/`listVersions`; typed errors DocumentNotFound/DocumentVersionNotFound. Integration tests (shared `testing/pg.ts` harness): version_no 1→2 with pointer moves, v1 content byte-identical after v2 save, invalid content persists NOTHING, missing doc throws. Boot smoke proves Nest DI constructs the chain. Decision: biome `useImportType` OFF for `apps/platform/**` (shared-config override) — the rule converts DI constructor params to type-only imports, silently erasing Nest's runtime metadata; value imports are load-bearing in the app.

### T-034 · Editorial state machine + audit
- **Status:** DONE
- **Depends on:** T-033
- **References:** DC §8, AR §9, Invariant 4
- **Goal:** enforce the workflow as a state machine with an audit trail.
- **Scope:** transition service for `discovered→…→approved→published→archived` (+`rejected`); every transition writes `editorial_events`; a guard so **only a human actor** may perform `approved→published`.
- **Out of scope:** the publish side-effects (T-036).
- **Acceptance:** illegal transitions are rejected; agent actors are blocked from `published`; every transition is audited.
- ✓ 2026-06-11 — `workflow.ts`: DOMAIN_MODEL §4 transcribed as a pure rule table (+ kill-switch expansion over the six non-terminal states); `actorKind()` parses/validates actor strings (typed InvalidActor); `assertTransition()` throws typed IllegalTransition/ActorNotPermitted, with the Invariant 4 publish guard stated INDEPENDENTLY of the table so future table edits can't weaken it. Trigger semantics: human edges need `human:usr_…`; system edges accept ONLY `system` — agents never transition (orchestration transitions as system, T-071). `EditorialService.transition()` → repository `updateStatusWithEvent` (one tx: status FOR UPDATE → guard runs INSIDE tx → update → `editorial_events` row `status.transitioned` with from/to/actor/payload). 14 tests: full §4 matrix incl. kill switch + terminal-ish unkillable, agents/system blocked from published with status+audit untouched, manual happy path drafting→in_review→approved→published with 3 audited events.

### T-035 · Publishing tables migration
- **Status:** DONE
- **Depends on:** T-031
- **References:** AR §7.4, DC §9
- **Goal:** the read-side and delivery tables.
- **Scope:** migration for `published_documents` (immutable, `content jsonb`, `content_hash`), `publish_outbox`, `consumers`.
- **Out of scope:** dispatcher logic (T-039).
- **Acceptance:** tables created with the indexes in AR §7.4.
- ✓ 2026-06-11 — `src/db/schema/publishing.ts` + migration `0001_yielding_snowbird.sql`: `published_documents` (ONE ROW PER PUBLISH — history never rewritten; denormalized `slug`, self-contained `content` jsonb, `content_hash` for ETag, `published_by`, indexes (slug, published_at)/(published_at)/(document_id)); `publish_outbox` (event_type per DOMAIN_MODEL §3, frozen `payload`, status pending→delivered|dead + attempts/last_error, (status, created_at) sweep index); `consumers` (`cns_…`, webhook_url, HMAC `secret`, active, unique name). Verified: Testcontainers test asserts tables + key indexes; applied to compose PG via `pnpm db:migrate`. Deviations: AR §7.4 absent — indexes derived from T-037/T-039 access patterns; new ID prefixes `pub_`/`obx_` extend DOMAIN_MODEL §2 (it defines none for these tables) — flagged for the owner to bless into the doc.

### T-036 · Publishing module (resolve + transactional outbox)
- **Status:** DONE
- **Depends on:** T-034, T-035
- **References:** DC §9, AR §10, Invariants 3 & 4
- **Goal:** turn an approved version into a self-contained published document and atomically enqueue the publish event.
- **Scope:** publish service: resolve the version into a self-contained envelope (**asset/reference snapshot resolution stubbed** — pass through what's in the doc until Phases 3/7), compute `content_hash`, write `published_documents` + a `publish_outbox` row **in one transaction**.
- **Out of scope:** webhook delivery (T-039); real snapshot resolution (T-054/T-093).
- **Acceptance:** publishing writes both rows atomically; a rollback test proves atomicity.
- ✓ 2026-06-11 — PublishingService.publish(input{documentId, versionId, content}, actor): human-only guard (typed PublishForbidden — one of three independent Invariant 4 layers), re-validates via ContentService, `resolveSnapshots()` STUB seam (pass-through; T-054 assets / T-093 references), `contentHash` = sha256 over canonical (recursively key-sorted) JSON in `common/canonical-json.ts` (jsonb reorders keys — hash must be content-addressed), one-tx write of published row + outbox row with frozen webhook payload; first publish → `document.published`, re-publish → `document.updated`. Rollback test proves atomicity (forced outbox PK violation rolls back the published row). Design decisions: Publishing NEVER reads Editorial (Invariant 7) — the /admin controller passes the version in (T-038 orchestrates); `actorKind`/InvalidActor lifted to `src/common/actor.ts` (platform-wide vocabulary, also used by Editorial); `document.unpublished` emission deferred until an unpublish flow exists (enum + outbox ready).

### T-037 · Public Content API (read, versioned, cached)
- **Status:** DONE
- **Depends on:** T-036
- **References:** DC §10, ID §10, AR §11
- **Goal:** the read surface consumers depend on.
- **Scope:** `GET /v1/documents/:slug?schemaVersion=` (migrate-on-read via Content) with `ETag` from `content_hash` + `If-None-Match`→304; `GET /v1/documents` list with cursor pagination. Read-only.
- **Out of scope:** the internal admin API (T-038); entity endpoints (T-093).
- **Acceptance:** fetching a published doc returns a self-contained envelope; an unsupported `schemaVersion` is handled; ETag/304 works.
- ✓ 2026-06-11 — `publishing.controller.ts` (read-only, in the Publishing module which owns the published tables): `GET /v1/documents/:slug` serves the stored envelope (validated at publish — no per-read revalidation), ETag `"<content_hash>"` + RFC-9110 If-None-Match (weak/list/`*`) → 304, `Cache-Control: public, max-age=60, swr=300`, `X-Schema-Version`; `?schemaVersion=` → ContentService.migrate (identity at 1.0.0; unknown target → typed `UnsupportedSchemaVersion` → 400 — MigrationError wrapped inside Content so the boundary holds); `GET /v1/documents` = latest-per-slug catalogue (`SELECT DISTINCT ON`, jsonb title/summary projection), cursor = last slug (stable under inserts, EG §9), limit clamp 1–100 default 20. Global `DomainExceptionFilter` (EG §6): coded domain errors → `{error:{code,message,details?}}` with status map. e2e (real app over HTTP vs Testcontainers PG): envelope+headers, 304/stale-ETag, version negotiation, 404 envelope, two-page pagination stable under re-publish. Decision: constructor DI now uses explicit `@Inject(Token)` everywhere — vitest/esbuild emits no design:paramtypes, so implicit class-token DI breaks in-process e2e; explicit tokens are toolchain-proof (alternative — swc plugin — noted in T-030 ✓ superseded).

### T-038 · Internal Editorial API (`/admin`)
- **Status:** DONE
- **Depends on:** T-033, T-034, T-036
- **References:** DC §10, ID §5, ID §10
- **Goal:** the editor-facing write surface.
- **Scope:** `/admin` endpoints — create topic; create/update document (DTOs via `nestjs-zod`); transition; **publish (human-guarded)**. Auth may be a simple stub here (real auth in T-100).
- **Out of scope:** real auth; AI triggers.
- **Acceptance:** an editor can drive a document from creation to published via these endpoints; the publish guard rejects non-human callers.
- ✓ 2026-06-12 — `src/api/admin/` (API COMPOSITION layer, not a domain module — the only place Editorial and Publishing meet, preserving Invariant 7): POST topics / documents / documents/:id/versions ("update" = append immutable version) / documents/:id/transition / documents/:id/publish + GET documents/:id. DTOs via nestjs-zod 5.4.0 (zod-4-native), pipes attached per-@Body with the explicit DTO (esbuild metatype gap). Actor = `x-arsyen-actor` header validated by `actorKind` via `@Actor()` decorator — the documented AUTH STUB (T-100 replaces with sessions; downstream guards unchanged). Publish sequence: `assertCanTransition` pre-flight (new Editorial service method, no write) → `NoVersionToPublish` (409) check → atomic publish (T-036) → authoritative audited transition (re-guarded in-tx); post-publish transition failure = concurrent mutation only, surfaces as that error (single-seat Phase 2; revisit if multi-editor). 5 e2e suites over real HTTP: full journey to /v1-live with matching ETag + latest-version content, agent/system publish → 403 with state+/v1 untouched, missing actor → 400, Zod body → 400 envelope with issues, illegal transition + no-version publish → 409. Also: `infra/migrations` excluded from Biome (drizzle-generated artifacts); filter normalizes ALL HttpExceptions into the `{error:{code,message,details}}` envelope.

### T-039 · Outbox dispatcher worker
- **Status:** DONE
- **Depends on:** T-029, T-036
- **References:** DC §9, AR §10, ID §6
- **Goal:** reliable delivery of publish events to consumers.
- **Scope:** a BullMQ worker that reads pending `publish_outbox` rows and POSTs **HMAC-signed** webhooks to registered `consumers`, with retry/backoff and a dead-letter status.
- **Out of scope:** consumer onboarding UI/guide (T-102).
- **Acceptance:** a registered test consumer receives a signed event; failures retry then dead-letter; signature verifies.
- ✓ 2026-06-12 — queue `publish-outbox` (jobId = outbox row id → idempotent re-enqueues/sweeps); `enqueuePendingOutbox()` sweep (covers the commit-vs-enqueue crash window); `OutboxDispatchService.deliver()` (thin EG §8 unit: pending-only [idempotent], canonical-JSON body, headers `x-arsyen-signature: sha256=<hmac>` / `x-arsyen-event` / `x-arsyen-delivery`, 10s timeout, all-active-consumers fan-out — retry re-POSTs all, consumers dedupe by delivery id [T-102 guide]; zero registered consumers → vacuous delivered, backfill is T-102); BullMQ retries exponential+jitter (attempts 5 / 5s default), attempts+last_error recorded per failure, exhausted → worker failed-handler dead-letters the row; `webhook-signature.ts` = the consumer verification reference (timing-safe). Worker runs as its own same-deployable entry `worker:outbox` (app boot stays connection-free until T-071). 3 integration tests (PG + Redis containers + scripted HTTP consumer): signature verifies (+wrong-secret rejected) with exactly-one delivery from a double enqueue; 2×500→200 retries to delivered (attempts=2); always-500 with attempts=2 → status dead, HTTP 500 in last_error.

### T-040 · Minimal consumer demo (proves the boundary)
- **Status:** DONE
- **Depends on:** T-037
- **References:** AR §10, Invariants 1 & 2
- **Goal:** prove producer→consumer end-to-end and graceful degradation.
- **Scope:** a tiny consumer (small Next.js page or a script) that fetches `/v1/documents/:slug`, renders each block type, and **renders a safe fallback for an unknown block type**. Lives in its own folder, depends only on `content-schema` types.
- **Out of scope:** production styling; this is a proof, not the real blog.
- **Acceptance:** the hand-authored document renders; injecting an unknown block type degrades gracefully. **Phase 2 exit criterion met.**
- ✓ 2026-06-12 — `apps/consumer-demo` (own workspace package, depends ONLY on `@arsyen-research/content-schema`): pure `renderDocument()` — every v1 block type → consumer-owned semantic HTML (Invariant 1: producer shipped zero presentation; refs/assets resolve from the SELF-CONTAINED envelope, Invariant 3; srcset from variant descriptors; HTML-escaped text), unknown block type → quiet placeholder, page intact (Invariant 2); CLI `demo <slug>` fetches /v1 → validates via `validateDocument` → writes out/<slug>.html. 4 tests: fixture contract-valid, all-types render, XSS escaping, unknown-block degradation with surroundings intact. **Phase 2 exit criterion exercised LIVE against the dev stack:** /admin create → version (16 blocks incl. injected `holographic-scene`) → in_review(system) → approved(human) → agent publish blocked `ACTOR_NOT_PERMITTED` → HUMAN publish → `GET /v1/documents/phase2-exit` self-contained with matching ETag → consumer rendered all 15 known types + degraded on the unknown one. Note: consumer-demo tsconfig sets explicit `types: ["node"]` (tsc's automatic @types discovery was unreliable under the pnpm isolated layout).

---

## PHASE 3 — Assets pipeline

### T-050 · Assets tables migration
- **Status:** DONE · **Depends on:** T-031 · **References:** AR §7.3, DC §5
- **Goal:** persistence for assets + variants.
- **Scope:** migration for `assets`, `asset_variants`.
- **Acceptance:** tables created per AR §7.3.
- ✓ 2026-06-12 — `src/db/schema/assets.ts` + migration `0002_familiar_cannonball.sql`: `assets` (editing-side row behind the DC §5 descriptor — kind/role as text [T-031 precedent]; original's unique `storage_key` [stable-key scheme, ID §8] + `content_type` + bigint `bytes`; progressively-filled columns NULLABLE: T-052 fills width/height/aspect_ratio/blurhash/dominant_color, editors fill alt/caption/attribution_*/focal_point_* — completeness enforced at descriptor emission (T-053), not DDL; attribution flattened to columns so the mandatory-at-review check (DC §12) is queryable; `created_by` actor provenance; created_at index); `asset_variants` (surrogate `av_` TypeID PK per EG §1 + UNIQUE natural key (asset_id, width, format) — the T-052 re-run idempotency backstop, doubling as the per-asset lookup index; FK ON DELETE CASCADE — variants are derived artifacts; rows store R2 `storage_key`s, NEVER absolute URLs — composed from env config at descriptor emission). Applied to compose PG; database.test.ts extended (tables + indexes, natural-key rejection asserted on DrizzleQueryError `cause.constraint_name`, cascade round-trip). Deviations: AR §7.3 absent from context/ — DDL derived from DOMAIN_MODEL §1–§3/§5 + DC §5 + ID §8 + the T-051…T-054 scopes; new ID prefix `av_` extends DOMAIN_MODEL §2 (flagged for owner blessing alongside `pub_`/`obx_`); no asset `status` column — readiness is derivable (variants + blurhash present) and the queue owns job failures; T-052 may add one additively if needed.

### T-051 · R2 client + original upload
- **Status:** DONE · **Depends on:** T-050 · **References:** DC §2, ID §8
- **Goal:** store originals in R2 under stable keys.
- **Scope:** `@aws-sdk/client-s3` wired to R2; upload service; key scheme.
- **Out of scope:** variant generation (T-052).
- **Acceptance:** an uploaded file lands in R2 and an `assets` row is created.
- ✓ 2026-06-12 — **Owner decision: R2 credentials deferred → S3-compatible MinIO stand-in** (T-021-style "not set up yet" path; CI could never hit live R2 anyway, EG §10/§11). `modules/assets/`: `internal/object-storage.ts` (ObjectStorage port + S3ObjectStorage on @aws-sdk/client-s3 3.1062.0 pinned [ID §8 — 3.1067.0 was younger than the pnpm release-age cooldown; pinned the newest version that clears it instead of excluding]; region "auto" + forcePathStyle work on both R2 and MinIO; endpoint = `R2_ENDPOINT` ?? derived `https://<R2_ACCOUNT_ID>.r2.cloudflarestorage.com`; sockets released on shutdown), private AssetsRepository, AssetsService.uploadOriginal (actor validated via common `actorKind` before side effects; stable key `originals/<asset_id>` — extensionless, MIME lives in the row + object metadata; put-then-insert with best-effort delete on insert failure so no orphan squats on a stable key); module exports ONLY the service (EG §3); AssetKind/AssetRole types re-exported through content.types.ts (boundary intact). Env: the five R2_* vars now REQUIRED (SETUP §4 "required from T-051") + new dev-only `R2_ENDPOINT` kept out of SETUP §4's canonical table per the T-029 BULL_BOARD_PORT precedent, with superRefine requiring ACCOUNT_ID or ENDPOINT; boot/e2e fixtures extended; the dist-spawn refusal test additionally asserts R2_ACCESS_KEY_ID is listed. Compose: `arsyen-research-minio` (9000/9001, port-overridable) + one-shot `minio-init` bucket bootstrap — image tag identical to the test suite's; verified live (healthy, bucket created). 3 integration tests (Testcontainers MinIO + PG): byte-identical round-trip under the stable key + row with empty descriptor columns; invalid actor → zero side effects; insert-failure cleanup leaves no orphan. **REVISIT when R2 creds exist:** fill `.env` (unset R2_ENDPOINT), run the SETUP §5 R2 check (put + signed get + public URL serves). → **CLOSED 2026-06-12, creds landed**: SETUP §5 R2 check ran LIVE through the platform's storage port — put + byte-identical get on bucket `arsyen-research-assets` (default jurisdiction; Object-R&W-scoped token, auth verified) and the r2.dev public URL served the object with a matching body. Owner choice: local dev STAYS on the MinIO stand-in (offline, free); the verified R2 values sit as a ready-to-flip block in `.env` for production (Phase 8) — flipping is comment-toggling plus removing R2_ENDPOINT (default jurisdiction = derived endpoint works as coded). Gotcha recorded: EU-jurisdiction buckets would need an explicit `.eu.` R2_ENDPOINT — the derivation is jurisdiction-blind.

### T-052 · Variant + placeholder generation job
- **Status:** DONE · **Depends on:** T-029, T-051 · **References:** ID §8, DC §5
- **Goal:** derive responsive variants and placeholders.
- **Scope:** BullMQ job: sharp → fixed width set in webp/avif; blurhash; dominant color; write `asset_variants` + descriptor metadata.
- **Acceptance:** uploading produces the variant set + blurhash + dominant color.
- ✓ 2026-06-12 — queue `asset-variants` (jobId = asset id → idempotent sweeps/re-enqueues; exponential+jitter retries ×3; a failed id pins until removeOnFail prunes, then the sweep naturally retries) + `enqueueUnprocessedAssets()` sweep (kind=image AND blurhash IS NULL) + thin EG §8 worker delegating to `AssetsService.processAsset()`: original read back via the storage port; `internal/variants.ts` (sharp 0.34.5 + blurhash 2.0.5 pinned — 0.35.x was younger than the pnpm release-age window; sharp `allowBuilds: false`, prebuilds arrive via `@img/*` optionalDependencies like esbuild) renders the fixed set [320/640/1280/1920]×[webp/avif], never upscaling (widths ≤ original, else the original width alone), EXIF orientation honored in BOTH dims and renditions; blurhash off a 32px raw thumbnail; dominant color via sharp stats → hex. Variants stored `variants/<assetId>/<width>.<format>`, then ONE TX (EG §4): descriptor metadata (width/height/aspect_ratio/blurhash/dominant_color) onto the asset row + variant upserts on the natural key — re-runs refresh in place, row ids stable. Worker entry `worker:assets` mirrors T-039 (boot sweep, SIGINT/SIGTERM); live-smoked against compose PG+Redis+MinIO. 5 integration tests (3 containers): acceptance sweep→job→6 variants (decoded widths verified, byte-exact bucket objects, red-dominant hex, aspect); re-run keeps ids; tiny original → own width only; non-image no-op; unknown id → AssetNotFound. **Also repaired a T-051 regression the suites couldn't see: zod 4 `.pick()` throws on refined schemas, so the T-051 env superRefine had broken `EnvSchema.pick` at the outbox worker entry's import. EnvSchema is now a plain pickable object; the account-id-or-endpoint cross-check moved into parseEnv's private refined wrapper; either-or boot test added; both worker entries live-boot verified.** Deviation: variant widths/encoder quality are code constants — ID §9 lists them as per-env config tunables, but the config-file mechanism first lands with model-policy (T-064); lift them there.

### T-053 · Assets module + upload endpoint
- **Status:** DONE · **Depends on:** T-052 · **References:** DC §5, ID §10
- **Goal:** the editor-facing asset surface emitting the semantic descriptor.
- **Scope:** Assets service + `POST /admin/assets` → enqueues the pipeline → returns the descriptor (semantic `role`, no layout).
- **Acceptance:** the returned descriptor matches the `content-schema` Asset shape (Invariant 1).
- ✓ 2026-06-12 — `POST /admin/assets` (api/admin/admin-assets.controller.ts; multipart via Nest FileInterceptor — multer ships inside @nestjs/platform-express, default in-memory storage, 32MB ceiling; @types/multer required an explicit tsconfig `types` list — the consumer-demo/T-040 pnpm-layout fix applied to platform). DTO mandates attribution at upload (DC §5/§12), focal point defaults to center, and v1 accepts kind=image only — the variant pipeline is sharp-based (deviation noted: video/audio descriptors arrive with their pipelines). Guards: file part required, image/* MIME. Flow = store original → enqueue `asset-variants` (the queue STAYS in the path, ID §8) → await worker completion → emit descriptor. The app side enqueues through a module-private LAZY AssetPipeline (clients built on first upload; lazyConnect ioredis — boot stays connection-free per T-030, so the editorial e2e suites booting against a dead Redis URL are unaffected); worker timeout → 409 ASSET_NOT_READY. `AssetsService.getDescriptor()` composes variant URLs from R2_PUBLIC_BASE_URL (rows keep keys only) and **validates through AssetSchema before anything leaves the module** — the acceptance enforced in code (Invariant 1); incomplete pipeline output/editorial fields → ASSET_NOT_READY carrying zod issues. compose minio-init now also sets anonymous download (public-read parity with R2's public base). Acceptance e2e (response === AssetSchema.parse, live public variant URL fetch, 400-guard matrix) lives in admin-assets.controller.test.ts — lands with T-054, one suite drives the whole journey.

### T-054 · Resolve asset snapshots into published envelopes
- **Status:** DONE · **Depends on:** T-036, T-053 · **References:** DC §9, Invariant 3
- **Goal:** replace the T-036 asset stub with real resolution.
- **Scope:** at publish, resolve `image`/`gallery`/`comparison` `assetId`s into full descriptors (with variant URLs) embedded in the published envelope.
- **Acceptance:** a published doc with an image renders without any second API call. **Phase 3 exit met.**
- ✓ 2026-06-12 — resolve.ts seam made real on the asset side: assetIds collected structurally from image/gallery/comparison blocks (structural walk on purpose — the doc was validated immediately before, and unknown block types stay untouched per Invariant 2) → `AssetsService.getDescriptor` per id → **platform truth replaces whatever descriptor copy the draft carried**; inline copies survive only for ids the platform never stored (Phase 2 hand-authored docs — the publishing/outbox suites prove pass-through unchanged via a no-stored-assets stub); an unprocessed asset (ASSET_NOT_READY) blocks the publish — 409, nothing published, proven. PublishingService now depends on Content + Assets (the Invariant 7 dependency exactly as specced; PublishingModule imports AssetsModule) and **re-validates the resolved envelope before hashing/writing** — an emission bug cannot publish. e2e journey (real app + the worker:assets worker + PG/Redis/MinIO containers): upload → draft embeds a STALE descriptor copy → human publish → `GET /v1` serves the envelope with the CURRENT canonical descriptor embedded (stale alt replaced), contract-valid as served, variant URL live from the public bucket — a published doc with an image renders with **no second API call. Phase 3 exit met.** Reference side stays authoring-time pass-through until T-093.

---

## PHASE 4 — Model Gateway (in-process)

### T-060 · `ai_calls` table migration
- **Status:** DONE · **Depends on:** T-031 · **References:** AR §7.3, DC §13, Invariant 10
- **Goal:** the cost/observability ledger.
- **Scope:** migration for `ai_calls`.
- **Acceptance:** table created per AR §7.3.
- ✓ 2026-06-12 — `src/db/schema/ai.ts` + migration `0003_hot_banshee.sql`: `ai_calls` append-only ledger (no updated_at — a ledger is never edited; ONE ROW PER PROVIDER ATTEMPT — retries/fallbacks each spend money). Columns derived from DC §7/§13 + ID §7 + the T-065/T-066 consumers (AR §7.3 absent from context/): caller `agent` NOT NULL (unattributed spend is the DC §13 failure mode), task_class/operation/provider/model (post-routing truth), cache_hit + cache_key (the ID §7 sha256 key), `fallback` flag, status ok|error + error text, token counts, `cost_usd numeric(12,8)` (fractional-cent safe; drizzle mode "number" round-trips 0.000012 exactly — null = not computed, 0 = free), latency_ms NOT NULL, correlation_id (threaded from T-071/T-103). Indexes are the DC §13 dashboard dimensions verbatim: (created_at), (agent, created_at), (provider, created_at). Applied to compose PG; database.test.ts extended (table + indexes + fractional-cost round-trip). Deviations: prompt/response columns deliberately ABSENT until the DC §12 redaction policy exists (additive migration then, Invariant 11); new ID prefix `aic_` extends DOMAIN_MODEL §2 (flagged for owner blessing alongside `pub_`/`obx_`/`av_`).

### T-061 · agent-contracts package
- **Status:** DONE · **Depends on:** T-002 · **References:** DC §7, ID §3, ID §7
- **Goal:** the normalized gateway request/response + per-agent I/O schemas, in Zod.
- **Scope:** `packages/agent-contracts` — Zod for `CompletionRequest`/`CompletionResponse`/`EmbeddingRequest/Response`, `taskClass` enum, and stubs for each agent's I/O; derive JSON Schema.
- **Acceptance:** package builds; importable by the gateway.
- ✓ 2026-06-12 — package real at 0.1.0 (private, workspace-consumed; CHANGELOG started — pre-1.0 until the first agent ships, T-072): `task-class.ts` (DOMAIN_MODEL §3 enum), `gateway.ts` (Message/GenerationParams/Usage/FinishReason + the four normalized shapes; **strict objects make a model-naming request a VALIDATION ERROR — Invariant 5 encoded in the contract itself**, tested; `agent` attribution required, feeding ai_calls.agent NOT NULL [T-060]; responses carry post-routing provider/model truth + `cached`), `agents.ts` (five DC §7 agent I/O STUBS, each tagged with its finalizing task T-080/T-081/T-072/T-082/T-083; document payloads deliberately `z.unknown()` — Content stays the single contract gateway [Invariant 8], so agent-contracts depends on zod alone), `jsonschema.ts` + emit script → `dist/schema.json` (zod 4 native, draft 2020-12, x-contractVersion — the DC §3 gateway-extraction artifact; exported as `./schema.json` like content-schema). 6 tests incl. the Invariant-5 rejection, embedding single/batch union, and a schema.json snapshot guarding drift (T-020 precedent). Importability proven against built dist (21 exports); turbo's agent-contracts no-outputs warning gone. Mirrors content-schema build patterns exactly (tsc + tsconfig.build, exports map, emit-schema.mjs).

### T-062 · Gateway core (interface + DI)
- **Status:** DONE · **Depends on:** T-030, T-061 · **References:** DC §7, ID §5, ID §7, Invariant 5
- **Goal:** the model-agnostic facade all agents call.
- **Scope:** `ModelGateway` interface + injection token; in-process implementation skeleton; provider-adapter interface `Provider { complete, embed, stream }`.
- **Out of scope:** a concrete provider (T-063); cross-cutting concerns (T-065).
- **Acceptance:** the gateway is injectable; nothing outside adapters imports a provider SDK.
- ✓ 2026-06-12 — `modules/model-gateway/`: `MODEL_GATEWAY` token + `ModelGateway { complete, embed }` interface (ID §5 interface-token DI — callers never see the implementation; facade surface is complete+embed, no agent streams in v1); `Provider { complete, embed, stream }` port over the agent-contracts shapes with the ROUTED model passed in (requests can't name one — strict contract), `PROVIDER_REGISTRY` (name → adapter, empty until T-063); `InProcessModelGateway` validates the request at the facade (untrusted in), routes taskClass → `GATEWAY_ROUTES` (empty seam until model-policy, T-064 — typed `TaskClassNotRouted`/`ProviderNotRegistered`), delegates, and requires the adapter's response to BE the normalized contract (parsed out). Platform now consumes `@arsyen-research/agent-contracts` (workspace:*) — T-061's "importable by the gateway" acceptance closed. Module exports ONLY the token; construction value-only (boot stays connection-free). 8 tests: fake-adapter routing/delegation for complete+embed, both typed routing errors, model-naming request → ZodError (Invariant 5 at the facade), non-contract adapter response → ZodError, and injectability through the REAL app (`app.get(MODEL_GATEWAY)` wired, failing typed-not-wrong). `model-gateway.boundary.test.ts` (T-032 pattern) enforces the acceptance: only `modules/model-gateway/adapters/` may import a provider SDK (Gemini/Anthropic/OpenAI/Mistral/Cohere/ollama specifiers). T-065 wraps this core with cache/retries/fallback/ai_calls; T-901 swaps the in-process impl behind the same token.

### T-063 · Gemini adapter + structured output
- **Status:** DONE · **Depends on:** T-062 · **References:** DC §7, ID §7, Invariant 9
- **Goal:** the first live provider.
- **Scope:** `GeminiAdapter` (complete + embed) via the official Google TS SDK; map `outputSchema` (JSON Schema from agent-contracts) to Gemini structured output; validate responses against the Zod schema before returning.
- **Acceptance:** a `complete()` with an output schema returns schema-valid JSON; `embed()` returns vectors.
- ✓ 2026-06-12 — **Owner decision: live API key deferred ("add the APIs later")** — GEMINI_API_KEY stays `.optional()` in the env schema (deviating from SETUP §4's "required from T-063" until a key exists) and the module's PROVIDER_REGISTRY factory registers the adapter only when the key is present (only that factory reads it, DC §12); recorded-fixture tests cover everything (no live calls in CI was always the rule, ID §12). **REVISIT when the key lands: run the SETUP §5 gateway check, consider re-tightening the env row.** → **CLOSED 2026-06-12, key landed**: SETUP §5 gateway check ran LIVE through the committed policy — plain complete (exact text back, gemini-2.5-flash-lite, 10/5 tokens, $0.000003), structured complete (contract-valid `{title, year, director}` via responseJsonSchema + ajv, gemini-2.5-flash, $0.000071), embed (3072 dims, gemini-embedding-001) — all three ledgered in `ai_calls` with real tokens/latency/cost. GEMINI_API_KEY re-tightened to boot-required (SETUP §4 restored); registry registration now unconditional; test fixtures carry a never-called dummy key; the injectability probe became the zero-network contract rejection (model-naming → ZodError). Embed rows record 0 input tokens (Gemini embed responses carry no usage — noted for T-065-style estimation later). `adapters/gemini.adapter.ts` (@google/genai 2.8.0 pinned — official unified SDK; `createGeminiAdapter(apiKey)` factory keeps the SDK import inside adapters/, boundary test stays green): system messages → `systemInstruction` (joined), assistant → "model" role, params → config, `outputSchema` rides RAW JSON Schema on `responseJsonSchema` + `responseMimeType: application/json` (no schema-dialect conversion), finish reasons mapped (STOP/MAX_TOKENS/SAFETY/else), text extracted from candidate parts (no SDK sugar getters — fixtures stay plain objects), unparseable JSON → typed retriable `StructuredOutputInvalid`; `embed()` → one vector per input, order preserved (Gemini embed carries no token usage — 0 until T-065 estimates); `stream()` yields candidate-part deltas. Gateway-side enforcement (ID §7 "the gateway validates before returning", Invariant 9): in-process core now validates `structured` against the request's outputSchema via ajv 8.20.0 draft-2020-12 — the schema was derived FROM the agent's Zod schema (ID §3) and the check survives the gateway's service extraction; violations/missing payloads throw retriable `StructuredOutputInvalid` (T-065's retry layer treats the code accordingly). 7 fixture tests (acceptance proven by parsing the adapter's structured output with the SOURCE Zod schema; full request-mapping capture; finish-reason matrix; embed order; stream) + 1 gateway-enforcement test (valid passes / wrong shape rejected / missing payload rejected).

### T-064 · Model policy routing
- **Status:** DONE · **Depends on:** T-062 · **References:** DC §7 (CONFIG), ID §7, Invariant 5
- **Goal:** select models by config, not code.
- **Scope:** `model-policy.json` (Zod-validated, env-overridable) mapping `taskClass → {provider, model, fallback}`; gateway routes by `taskClass`.
- **Acceptance:** changing a model is a config edit with no code change; an unknown `taskClass` fails fast.
- ✓ 2026-06-12 — `apps/platform/config/model-policy.json` (gemini defaults per taskClass + fallbacks; the ONLY place a model is named) + `model-gateway/model-policy.ts`: strict Zod schema with ALL FOUR taskClasses REQUIRED and unknown keys rejected — a partial/extra/malformed/missing policy throws typed `ModelPolicyInvalid` at LOAD; loaded AT BOOT by the GATEWAY_ROUTES factory (broken policy = refused start, ID §9 fail-fast; `MODEL_POLICY_PATH` is the per-environment override, already in the canonical env table). `GatewayRoute` gained the optional `fallback {provider, model}` the T-065 resilience layer consumes (primary routing unchanged). 5 loader tests: the committed default routes every class; two policy files → two routings with zero code (the acceptance, literally); missing class / unknown class / malformed JSON / missing file all fail fast typed. Injectability e2e updated: with real routes and a keyless registry the gateway now fails `ProviderNotRegistered` — still typed, still not wired-wrong.

### T-065 · Gateway cross-cutting (cache, retries, fallback, cost)
- **Status:** DONE · **Depends on:** T-060, T-063, T-064 · **References:** DC §7, ID §7, Invariant 10
- **Goal:** the resilience and accounting layer.
- **Scope:** Redis response cache keyed by `sha256(taskClass+model+params+messages)`; retries with jittered backoff; circuit breaker + policy fallback; write **every** call (incl. cache hits) to `ai_calls`; per-provider rate limiting.
- **Acceptance:** a repeated identical call hits cache; a forced provider failure falls back; `ai_calls` reflects every call.
- ✓ 2026-06-12 — the in-process gateway now runs the full DC §7 pipeline: validate → route → **config-errors-beat-cache** adapter check → Redis cache (`internal/cache.ts`, lazy fail-fast client — deliberately NOT the BullMQ factory whose `maxRetriesPerRequest: null` queues forever; cache failures log + degrade to misses; key = `contentHash` over taskClass+model+params+messages **+ outputSchema** — deliberate ID §7 addition, same messages/different schema ≠ same response; per-class TTL constants) → primary leg (per-provider `KeyedSemaphore` cap [the launch-scale rate limit] → adapter → response-contract parse → structured enforcement), retried with jittered exponential backoff per `classifyProviderError` (EG §6: StructuredOutputInvalid retriable but never trips the breaker; 429/5xx/transport retriable+breaker; other 4xx terminal — our fault, retrying spends money) → consecutive-failure `CircuitBreaker` (threshold/cooldown, half-open probe; falsy-zero clock bug caught by test) → policy fallback leg on exhaustion/open circuit → cache write. **Invariant 10 by construction: `ledger` is a REQUIRED constructor dep** — every provider attempt and every cache hit becomes an ai_calls row (cache hits cost 0; attempts priced via the policy's new `pricing` map [USD/1M tokens, unknown model → null cost — visible, not wrong]; ledger write failure logs loudly, never fails the call). Policy schema gained optional `pricing`; module wires MODEL_POLICY (loaded once) + GATEWAY_CACHE (lazy, shutdown-closed) + AiCallsRepository. clock/sleep/random injectable. Tests: 8 pure resilience units (classifier matrix, backoff, breaker walk incl. half-open re-open, semaphore peak) + 7 integration (real Redis + real PG ai_calls): the three acceptance criteria VERBATIM (cache hit with both rows ledgered + priced; 503 → 3 retries → fallback with 4 truthful rows; every call counted) + terminal-no-retry + retry-to-success + structured-invalid-retry + circuit-skips-primary-until-cooldown + embeddings through the same path.

### T-066 · Cost dashboard + alert
- **Status:** DONE · **Depends on:** T-065 · **References:** DC §13
- **Goal:** make spend visible (the silent killer).
- **Scope:** an internal route summarizing `ai_calls` (spend/day, cache-hit rate, latency/provider); a simple threshold alert hook.
- **Acceptance:** the dashboard reflects real calls; the alert fires past a configured daily threshold.
- ✓ 2026-06-12 — `GET /internal/ai-costs?days=` (model-gateway module owns its ledger's read side; internal surface unauthenticated until T-103 secures internal routes — same plan as Bull Board): AiCostsService.summary = dailySpend (UTC day buckets) + spendByAgent + cacheHits{hits,total,rate} + latencyByProvider{avg,max,calls} + the alert state, window clamped 1–90 (default 7); aggregations are raw SQL inside AiCallsRepository (EG §4), `::float8`-cast so numerics arrive as numbers, null costs coalesce to 0 in sums. Alert hook: `alerts.dailySpendUsd` added to model-policy.json (config like the rest; committed default $25/day) — `checkDailySpendAlert()` compares UTC-today spend, returns typed `SpendAlert {configured, thresholdUsd?, todaySpendUsd, breached}` and console.warns loudly on breach (T-103 routes this into Sentry). 3 tests (real PG, seeded rows across days incl. error-null-cost and a cache hit): summary matches the seeded ledger exactly (acceptance), tight threshold breaches / roomy doesn't / unconfigured stays silent (acceptance), and the HTTP route serves the summary through the real app.

### T-067 · Gateway test suite (recorded fixtures)
- **Status:** DONE · **Depends on:** T-065 · **References:** ID §12
- **Goal:** test the gateway without live model calls.
- **Scope:** Vitest with recorded provider fixtures: structured-output validation, fallback path, cache behavior, cost logging.
- **Acceptance:** suite passes in CI with no network. **Phase 4 exit met.**
- ✓ 2026-06-12 — coverage audit against the ID §12 checklist found all four areas already exercised across the T-063/T-065/T-066 suites; the missing piece was the FULL CHAIN under one roof, so `gateway.fixtures.test.ts` adds it: the COMMITTED model-policy.json routes the REAL GeminiAdapter (recorded client, behavior keyed by the routed model) through the REAL resilient pipeline with in-memory cache + ledger — zero containers, zero network, 267ms. 4 tests: structured completion routed by the file with end-to-end Invariant-9 validation against the source Zod schema AND the ledger row priced from the committed pricing map; cache behavior (second identical call never reaches the provider, hit ledgered at cost 0); the policy's fallback model serving after the primary's 3 exhausted-and-ledgered 503 attempts; embedding routed + ledgered. Bonus: the T-062 boundary fitness test caught this very suite importing the SDK type outside adapters/ — fixed by deriving the client type from the adapter's constructor (`ConstructorParameters`), proving the fitness test bites. Gateway test census: 6 suites, 39 tests, no live model calls anywhere (live-key checks deferred with the key, T-063 note). **Phase 4 exit met.**

---

## PHASE 5 — First agent: Writing (+ pipeline machinery)

### T-070 · Research tables migration (`research_runs`, `sources`)
- **Status:** DONE · **Depends on:** T-031 · **References:** AR §7.3, DC §2
- **Goal:** persistence for research material with embeddings.
- **Scope:** migration for `research_runs` and `sources` (incl. `embedding vector` + HNSW index).
- **Acceptance:** tables + HNSW index created; a vector insert/query works.
- ✓ 2026-06-12 — `src/db/schema/research.ts` + migration `0004_warm_lady_vermin.sql`: `research_runs` (run_ TypeID; FK → topics; status text running→succeeded|failed [T-031 precedent, T-080 enforces]; error; `triggered_by` actor string; started/finished_at; (topic_id, started_at) index) and `sources` (src_; FK → research_runs; url nullable for hand-pasted material [T-073], title+summary NOT NULL matching the agent-contracts stub, content nullable, `embedding vector(3072)` nullable until the embed pass; run-id index). **Embedding decision:** 3072 dims = gemini-embedding-001's live output, which EXCEEDS plain-vector HNSW's 2000-dim cap → the HNSW index is an EXPRESSION index over `embedding::halfvec(3072)` with `halfvec_cosine_ops` (pgvector ≥0.7; compose runs 0.8.2); queries must repeat the cast to hit it (documented in the schema header + migration comment); dimensionality changes are the T-906 versioned-column move. Migration was hand-edited BEFORE first apply (allowed — Invariant 11 covers applied migrations): prepended `CREATE EXTENSION IF NOT EXISTS vector` (Testcontainers DBs lack the compose init script) and appended the expression index (drizzle-kit cannot model expression indexes). Applied to compose PG; Testcontainers replays the whole chain from scratch. Acceptance test: tables + all three indexes exist, and a 3072-dim insert + halfvec-cast cosine nearest-neighbor query returns the expected source first. Sources deliberately carry NO denormalized topic_id — DOMAIN_MODEL §5's ER is topics→runs→sources; T-072 joins through runs.

### T-071 · AI orchestration module + pipeline queues
- **Status:** DONE · **Depends on:** T-029, T-034 · **References:** DC §8, ID §6, Invariant 4
- **Scope:** AI-orchestration module; one BullMQ queue per stage (`research`, `extraction`, `drafting`, `verification`, `atomization`); Flow scaffolding; idempotent job IDs `(documentId, stage, inputHash)`; **stage jobs never auto-advance past a human gate.**
- **Out of scope:** the agents themselves except Writing (T-072).
- **Acceptance:** a no-op drafting job runs via a Flow; re-enqueue is idempotent; gates are respected.
- ✓ 2026-06-12 — `infra/queue/pipeline.queues.ts`: the five stage queues named exactly as the stages (EG §2), `pipelineJobId(stage, documentId, inputHash)` (EG §8 identity), shared retry opts (×3 exponential+jitter), `createPipelineFlow` (FlowProducer — T-085 grows the tree; T-073 ships single-node drafting flows), thin `createPipelineWorker`. `AiOrchestrationService.enqueueDrafting` (module's only export): inputHash = contentHash(topic+sources), LAZY FlowProducer (AssetPipeline pattern — boot connection-free); correlationId defaults to the job id (threads into ai_calls from T-072). 3 acceptance tests (Redis + PG containers): no-op drafting job completes via a Flow; identical re-enqueue dedupes on the id while changed input runs (hash moved); and the gate walk — a completed stage job leaves status untouched, system takes the legal drafting→in_review edge, then `approved` as system is thrown out by the T-034 machine (ActorNotPermitted) with status intact — orchestration CANNOT advance past a human gate.

### T-072 · Writing agent
- **Status:** DONE · **Depends on:** T-062, T-071, T-016 · **References:** DC §7 (Writing), Invariants 5 & 9, ID §3
- **Goal:** the highest-leverage agent — emit a valid draft *in the content schema*.
- **Scope:** Writing agent with I/O contract (input: topic + sources + entities; output: a `content-schema` document); uses the gateway with `taskClass: reasoning` and the envelope JSON Schema as `outputSchema`; **validates output against `content-schema`** before persisting as a draft version.
- **Out of scope:** Markdown/prose output to be parsed (forbidden); auto-publishing.
- **Acceptance:** given a topic + pasted sources, the agent produces a document that passes `validateDocument()`.
- ✓ 2026-06-12 — `ai-orchestration/writing.agent.ts`: agent-contracts WritingInput in, content-schema Document out; MODEL_GATEWAY with taskClass `reasoning`, agent `"writing"` (→ ai_calls attribution), correlationId threaded; system prompt mandates envelope-only JSON, the six prose/structural block types, span-runs (never HTML/markdown in text), empty references/assets, source-grounded claims. **Deviation (deliberate, recorded): `outputSchema` = the ID-RELAXED envelope derivation** — `ContentService.draftJsonSchema()` clones the T-019 artifact and drops TypeID `pattern`s (any non-empty string), because ids are PLATFORM-assigned (EG §1: generate at creation — the agent is the creator, not the model; constrained decoding can't be trusted with 26-char Crockford regexes). `claimDraft()` then claims platform-owned fields — fresh `blk_` TypeIDs, the REAL documentId, documentVersion, schemaVersion, status — and `validateOnWrite` holds the output against the FULL contract before anything persists, so Invariant 9 is enforced twice (gateway ajv on the relaxed schema + full contract at the agent). ContentService gained `documentJsonSchema()`/`draftJsonSchema()` (memoized; the boundary stays intact — agents never touch the package). 3 fixture tests: acceptance (topic + pasted sources → validateDocument-passing draft with claimed ids), the DC §7 request shape (reasoning/writing/relaxed-schema-by-identity, brief carries topic + every source), and a contract-violating draft (dangling assetId) → typed ContentValidationFailed.

### T-073 · Wire Writing into the state machine
- **Status:** DONE · **Depends on:** T-072, T-038 · **References:** DC §8, AR §9
- **Goal:** the drafting step in the live workflow.
- **Scope:** a `/admin` trigger that enqueues a drafting job (sources hand-pasted for now) → on success saves the draft version and transitions `drafting → in_review`.
- **Acceptance:** triggering produces a draft in `in_review`. **Phase 5 exit met.**
- ✓ 2026-06-13 — `POST /admin/documents/:id/draft` (202 + idempotent jobId) → DraftingHandler in the pipeline worker (`worker:pipeline`, all five stage workers; non-drafting stages fail loudly with their arrival tasks): gate PRE-FLIGHT via assertCanTransition (a stale job — doc past drafting — dies as BullMQ `UnrecoverableError`, zero writes, no money), WritingAgent.draft, immutable version saved as `agent:writing`, then the system-legal drafting→in_review edge. Terminal failures audit `drafting.failed` via new `EditorialService.recordEvent` (EG §8 — observed working live before the fixes below). e2e (real app + REAL gateway over a recorded provider — gateway stubs would have hidden the ajv bug): journey to in_review with contract-valid agent version + audit trail; identical re-trigger dedupes (one version); stale job → unrecoverable + `drafting.failed` event, document untouched. **Phase 5 exit exercised LIVE (real Gemini): trigger → in_review in 20s; 8-block contract-valid article ("Goblin's Suspiria Score: A Narrative Engine of Horror"), $0.0044/draft, whole debug saga $0.012 — every attempt/cache-hit/fallback visible in ai_calls.** Three real bugs the live runs caught (each now regression-tested): (1) strict-mode ajv rejects the contract's `x-schemaVersion` annotation at compile → gateway ajv is now non-strict and compile failures throw typed TERMINAL `InvalidOutputSchema` (the old path misclassified them as provider failures, tripping the breaker and burning retries); (2) the envelope's UnknownBlock pass-through arm let constrained decoding emit sloppy known blocks ajv accepted and zod refused → `draftJsonSchema` drops it; (3) the model emitted entity references/sourceRefId despite instructions, dangling at referential validation → the draft schema is now PROSE-ONLY (six block arms, reference span-arm and sourceRefId removed, references/assets forced maxItems 0) with a scrub-belt in claimDraft for non-constrained providers. Plus a live POLICY fact: gemini-2.5-pro 429s on the free-tier key — `reasoning` now routes to gemini-2.5-flash by CONFIG EDIT ONLY (the T-064 acceptance earning its keep on day one; flip back when the tier upgrades; `_comment` field added to the policy schema). Also fixed: AiOrchestrationService now closes its lazy Flow clients on shutdown; `.env` gotcha — an EMPTY `R2_ACCOUNT_ID=` line fails min(1), the line must be absent. **Phase 5 exit met — fixture-form in CI, live-form on record.**

---

## PHASE 6 — Full editorial pipeline

### T-080 · Research agent
- **Status:** DONE · **Depends on:** T-070, T-071 · **References:** DC §7 (Research)
- **Goal:** gather + summarize sources with embeddings.
- **Scope:** Research agent using web-search tooling; persist `sources` with summaries + embeddings (embeddings via gateway `embed`).
- **Acceptance:** running research on a topic populates `sources` with embeddings.
- ✓ 2026-06-13 — agent-contracts **0.2.0** (additive; CHANGELOG + snapshot): `CompletionRequest.tools` (normalized names, `web_search` first — DC §7's "allowed tools" lands in the contract), `CompletionResponse.citations` `{url, title?}`, Research I/O FINALIZED (output sources gain optional `content`). Gemini adapter maps `web_search` → `googleSearch` and normalizes groundingChunks → citations (deduped by url); completion cache key now hashes `tools` (a grounded call must never collide with its ungrounded twin; pre-existing redis cache entries orphaned — cache-only, harmless). `research.agent.ts` (`agent: "research"`, no model named anywhere): three-call shape — grounded gather (taskClass `reasoning` + web_search; Gemini 2.5 rejects tools+outputSchema in ONE call, and the split keeps each leg separately cacheable/ledgered) → structuring (`fast_summarize` per DOMAIN_MODEL §3 "source summaries", gateway-ajv-enforced schema derived from the contract Zod — its only `format: uri` keyword is ignored-not-fatal under non-strict ajv, logged to stderr) → one ordered `embed` batch (`title\n\nsummary` convention, fixed for future query embeddings). Output claimed (Invariant 9, T-072 precedent): a url survives only verbatim-in-citations; entries collapse on url-or-normalized-title. `research.repository.ts` (module-private): run lifecycle running→succeeded|failed enforced; sources + succeeded mark in ONE tx — a failed run never leaves partial sources; a BullMQ retry is a fresh run row. `research.handler.ts`: `run()` direct entry + `handle()` queue body (validate → one call, `system` actor, correlationId threaded); pipeline worker's research stage live (its `STAGE_ARRIVES: T-080` placeholder retired); NO document transitions — researching→extracting wiring is T-085. Tests: contract round-trips + tool-name rejection, adapter grounding mapping, agent ×4 (call shapes, dedupe, typed `ResearchNotesEmpty`/`EmbeddingCountMismatch`), integration ×4 on real PG + the REAL gateway over a recorded provider (acceptance: run populates `sources` with 3072-dim embeddings; failed gather → failed run + recorded error + zero sources; queue-body delegation; malformed actor rejected before any write). **Live-form on record (real Gemini + compose): 20.7s, $0.0026 — grounded vertexaisearch redirect urls persisted with 3072-dim embeddings, after the FIRST live run caught two issues fixtures cannot: googleSearch is model-DISCRETIONARY (it answered from memory → zero citations; the gather prompt now demands searching) and flash-lite split one source into 8 url-less paraphrases (claim now dedupes; regression-tested).** Known v1 limits, deliberate: an ungrounded run degrades to url-less sources (lenient — runs are inspectable, url stays optional); grounding redirect urls expire ~30d (resolving canonical urls needs fetch tooling — a later task); source titles can echo the topic instead of the publication name.

### T-081 · Entity Extraction agent (propose-only)
- **Status:** TODO · **Depends on:** T-080 · **References:** DC §6, DC §7 (Extraction), Invariant 6
- **Goal:** propose entities/relationships from research — never auto-merge.
- **Scope:** Extraction agent emitting candidate entities + relationships to a staging area for human confirmation.
- **Out of scope:** writing to the knowledge graph (Phase 7 / human-confirm).
- **Acceptance:** proposals are produced and staged; nothing touches `entities` automatically.

### T-082 · Verification agent (advisory)
- **Status:** TODO · **Depends on:** T-072 · **References:** DC §7 (Verification), Invariant 4
- **Goal:** flag unsupported claims/citation/structure issues — never gate.
- **Scope:** Verification agent annotating a draft with flags surfaced in review.
- **Out of scope:** auto-resolving or blocking publish.
- **Acceptance:** flags appear for the reviewer; the agent cannot change document status.

### T-083 · Atomization agent (post-publish)
- **Status:** TODO · **Depends on:** T-036 · **References:** DC §7 (Atomization)
- **Goal:** derive social variants from a published doc.
- **Scope:** Atomization agent (X thread, IG caption, newsletter blurb) consuming the self-contained published document, triggered after publish.
- **Acceptance:** publishing triggers atomization; variants are produced from the published envelope only.

### T-084 · Topic discovery (repeatable job)
- **Status:** TODO · **Depends on:** T-071 · **References:** DC §8, ID §6
- **Goal:** seed the pipeline.
- **Scope:** a BullMQ repeatable job that proposes topics into `topics` (status `discovered`).
- **Acceptance:** topics appear on schedule for human accept/reject.

### T-085 · Wire the full Flow
- **Status:** TODO · **Depends on:** T-080, T-081, T-082, T-083, T-084 · **References:** DC §8, AR §9 & §12, Invariant 4
- **Goal:** one traceable pipeline with all gates intact.
- **Scope:** topic→research→extraction(human-confirm)→drafting→verification→`in_review`→(human)approve→(human)publish→atomization, as a BullMQ Flow with a correlation ID threaded throughout.
- **Acceptance:** a topic flows automatically to `in_review`, stops for human review/approval, and triggers atomization on human publish. No gate bypassed. **Phase 6 exit met.**

---

## PHASE 7 — Knowledge graph

### T-090 · Graph tables + indexes
- **Status:** TODO · **Depends on:** T-031 · **References:** AR §7.1, DC §6
- **Scope:** migration for `entities` (incl. `embedding vector`), `entity_aliases`, `entity_relationships`, `entity_sources`; GIN on `data`, HNSW on `embedding`, relationship indexes.
- **Acceptance:** tables + indexes per AR §7.1.

### T-091 · Knowledge-graph module
- **Status:** TODO · **Depends on:** T-090 · **References:** DC §6, AR §7.1, Invariant 7
- **Scope:** entity CRUD, alias resolution, relationship edges; depends on nothing (Invariant 7).
- **Acceptance:** entities/relationships can be created and queried; module has no inbound domain dependencies.

### T-092 · Extraction → KG reconciliation (human-confirm)
- **Status:** TODO · **Depends on:** T-081, T-091 · **References:** DC §6, Invariant 6
- **Scope:** a human-confirm flow that merges staged proposals into the graph; dedupe/merge behind `canonical_entity_id` redirects; attach provenance.
- **Acceptance:** confirming a proposal creates/merges entities with provenance; redirects keep old references valid.

### T-093 · Reference snapshot resolution + entity API
- **Status:** TODO · **Depends on:** T-036, T-091 · **References:** DC §9, Invariant 3, AR §11
- **Scope:** replace the T-036 reference stub: resolve `references[].snapshot` from the graph at publish; add `GET /v1/entities/:slug` (optional deep-link target).
- **Acceptance:** published reference cards render from embedded snapshots; the entity endpoint serves canonical data.

### T-094 · Graph traversal queries
- **Status:** TODO · **Depends on:** T-091 · **References:** AR §7.1, DC §6
- **Scope:** recursive-CTE traversal ("related entities within N hops"); a "related articles/entities" query usable by consumers.
- **Acceptance:** traversal returns correct multi-hop results. **Phase 7 exit met.**

---

## PHASE 8 — Hardening & consumer onboarding

### T-100 · Real auth
- **Status:** TODO · **Depends on:** T-038 · **References:** DC §12, ID §11, Invariant 4
- **Scope:** session auth (Redis) + argon2id; `editor`/`admin` roles as guards; harden the publish human-guard.
- **Acceptance:** auth enforced on `/admin`; publish remains human-only under the hardened guard.

### T-101 · OpenAPI from Zod DTOs
- **Status:** TODO · **Depends on:** T-037, T-038 · **References:** ID §10, DC §10
- **Scope:** generate the OpenAPI spec from the Zod DTOs (`nestjs-zod` + Swagger); publish it.
- **Acceptance:** the spec matches the live `/v1` surface.

### T-102 · Consumer onboarding + integration guide
- **Status:** TODO · **Depends on:** T-039, T-101 · **References:** DC §9, Invariants 1 & 2
- **Scope:** consumer registration; webhook secret management + signature verification docs; an integration guide that **mandates graceful degradation on unknown block types** and pinning a `schemaVersion`.
- **Acceptance:** a new consumer can register, verify webhooks, and integrate from the guide alone.

### T-103 · Observability hardening
- **Status:** TODO · **Depends on:** T-085 · **References:** DC §13, ID §13
- **Scope:** pino correlation IDs threaded topic→jobs→publish; Sentry across platform + workers; secure Bull Board behind auth.
- **Acceptance:** a single trace ID follows a topic through to publish; errors reach Sentry.

### T-104 · Deploy
- **Status:** TODO · **Depends on:** T-003, T-100 · **References:** ID §14, DC §2
- **Scope:** Docker images (platform + studio); provision managed Postgres+pgvector / Redis / R2; CI publishes `content-schema` on version bump and deploys. *(If hosting fork = VPS+Compose, swap the provisioning here only.)*
- **Acceptance:** the platform deploys to the chosen host; a published doc is reachable via `/v1` in the deployed environment. **Phase 8 exit met.**

---

## PHASE 9+ — Scale & optimize (TRIGGER-BASED)

Not scheduled. Each is created as a task **only when its trigger fires** (see `DECISIONS_CONTEXT §14` / `ROADMAP Phase 9+`). Stubs:

- **T-900** Postgres read replica (trigger: read pressure)
- **T-901** Extract Model Gateway → Python+FastAPI service behind the same contract (trigger: local models / heavy RAG)
- **T-902** Split BullMQ workers per queue (trigger: job volume)
- **T-903** Meilisearch/Typesense (trigger: FTS relevance pain)
- **T-904** Apache AGE → later Neo4j/Memgraph (trigger: deep-graph pain)
- **T-905** Outbox → NATS / Redis Streams (trigger: webhook fan-out pain)
- **T-906** Versioned `embedding_v2` + backfill (trigger: embedding-model change)

**Do not implement a Phase 9 task without its trigger.**
