# ENGINEERING GUIDE — Arsyen Research

Conventions that aren't architecture *decisions* but must be applied **identically across every task**, so a codebase built over dozens of separate Claude Code sessions stays coherent. When a task's `Scope` is silent on a detail, this file is the default. The **Definition of Done (§10)** applies to *every* task on top of its own acceptance criteria.

---

## 1. IDs

- Every persisted entity uses a **prefixed, k-sortable ID** via `typeid-js` (TypeID = prefix + ULID). Generate at creation; never reuse.
- Prefixes (canonical — also in `DOMAIN_MODEL.md`): `doc_` document · `dv_` document_version · `blk_` block · `ref_` reference · `ent_` entity · `asset_` asset · `topic_` topic · `run_` research_run · `src_` source · `evt_` editorial_event · `cns_` consumer · `usr_` user.
- IDs are opaque to consumers. Slugs (human-readable) are separate and live in metadata.

## 2. Naming

- **Files:** kebab-case (`document.service.ts`, `model-gateway.module.ts`).
- **Types/classes/Zod schemas:** PascalCase (`DocumentVersion`, `BlockSchema`).
- **Functions/vars:** camelCase. **Constants:** UPPER_SNAKE (`SCHEMA_VERSION`).
- **DB tables:** snake_case plural (`document_versions`); **columns:** snake_case.
- **Queues:** the stage name (`research`, `drafting`). **Jobs:** `<stage>:<documentId>`.

## 3. Module internal layout (NestJS)

Each domain module from `CLAUDE.md §5` follows the same shape. **The service is the only public surface**; everything else is private to the module (Invariant 7).

```
modules/<domain>/
├── <domain>.module.ts        # wiring + exports (exports ONLY the service)
├── <domain>.service.ts       # public interface — what other modules call
├── <domain>.controller.ts    # HTTP (if any) — thin, delegates to service
├── <domain>.repository.ts    # Drizzle access — PRIVATE, never imported cross-module
├── dto/                       # request/response DTOs (Zod via nestjs-zod)
└── internal/                  # helpers, mappers — private
```

- Controllers do no business logic: validate DTO → call service → map result.
- Cross-module calls go service→service via DI. **Never import another module's repository or touch its tables.** Reaching across a module boundary is reviewed as a bug.

## 4. Database & Drizzle

- Schema files: `apps/platform/src/db/schema/<domain>.ts`, one per domain; barrel-exported.
- Migrations: `drizzle-kit generate` → review → commit to `infra/migrations/`. **Never hand-edit an applied migration.** Additive → backfill → cleanup, never destructive-in-one-step (Invariant 11).
- Raw SQL (`sql\`\``) for recursive CTEs / `pgvector` ops is fine — but **only inside repositories**, never in services/controllers.
- Multi-write operations run in a **transaction** (e.g. publish writes `published_documents` + `publish_outbox` atomically, `T-036`).
- The content envelope is stored as `jsonb` in `document_versions.content`; it is **not** mapped to relational columns (Invariant 8 — the contract is a document, validated by Zod).

## 5. Validation & contracts

- **Zod is the single definition**; derive types (`z.infer`) and JSON Schema. Never hand-write a type Zod can infer (Invariant 8).
- DTOs validate at the controller boundary via `nestjs-zod`, reusing the same schemas.
- The Model Gateway validates **all** model output against the agent's `outputSchema` before returning (Invariant 9). A schema-invalid response is a *retriable* error.

## 6. Errors

- Throw **typed domain errors** (e.g. `DocumentNotFound`, `IllegalTransition`, `ValidationFailed`), never bare strings.
- Map domain errors → HTTP status in a Nest exception filter; clients get a stable error envelope `{ error: { code, message, details? } }`.
- Provider/AI errors are classified **terminal vs retriable**; only retriable ones hit the gateway's retry/backoff (`T-065`).
- Validation errors carry structured `details` (which field, why).

## 7. Logging & observability

- **pino**, structured JSON. Every log line in a request/job carries the **`correlationId`** threaded from topic → jobs → publish (`T-103`).
- **Never log secrets**; never log full prompts/responses beyond the gateway's redaction policy (`DC §12`).
- Levels: `error` (needs attention), `warn` (recoverable/degraded), `info` (state changes, publishes, job lifecycle), `debug` (dev detail).
- Every model call → an `ai_calls` row, cache hits included (Invariant 10).

## 8. Jobs (BullMQ)

- Job handlers are **thin**: validate input → call a service → return. No business logic that could bypass a state-machine gate (Invariant 4).
- **Idempotent job IDs** `(documentId, stage, inputHash)` so retries/dupes don't double-spend on models (`T-071`).
- A stage job may enqueue the next stage's *readiness* but **must not auto-advance past a human gate**.
- Configure retries with jittered backoff; terminal failures leave the document in its prior state with a recorded `editorial_event` — never a half-published limbo.

## 9. API

- Two surfaces: **`/v1` public read-only** (consumer contract, versioned) and **`/admin` internal** (editors, free to change). A consumer path never reaches a write (Invariant — `DC §10`).
- Lists use **cursor pagination** (stable under inserts). Reads set **`ETag` from `content_hash`** and honor `If-None-Match` → `304`.
- Content negotiation via `?schemaVersion=` → migrate-on-read.
- The public OpenAPI spec is **generated** from the Zod DTOs (`T-101`), never hand-maintained.

## 10. Definition of Done (applies to EVERY task)

A task is `DONE` only when **all** of these hold — not just its own acceptance criteria:

1. ✅ Every item in the task's **Acceptance** met.
2. ✅ Tests written at the right layer (`§11`) and **passing**; no live network/model calls in CI.
3. ✅ `pnpm lint` (Biome) and `pnpm typecheck` **clean** — zero warnings.
4. ✅ **No Invariant violated** (`CLAUDE.md §3`). If the task seemed to require breaking one, you stopped and surfaced it instead.
5. ✅ No stray `TODO`/`FIXME`/commented-out code left behind; no dead exports.
6. ✅ If the **public contract changed** (content-schema, `/v1`, agent-contracts), the relevant `CHANGELOG.md` is bumped and the change is backward-compatible (or a major version + migration was added).
7. ✅ The task's **Status set to `DONE`** in `TASKS.md` with the note `✓ <date> — <what was done> — <any deviation>`.
8. ✅ Any decision made or ambiguity resolved during the task is recorded — in the task note if small, or surfaced for `DECISIONS_CONTEXT.md` if it's an architecture-level choice.

## 11. Testing

- **Vitest**, colocated `*.test.ts`. AAA (arrange/act/assert) structure.
- **Unit:** pure logic — migration fns, validators, state-machine transitions, policy routing, mappers. No I/O.
- **Integration:** repositories, recursive CTEs, vector queries — against **real Postgres+pgvector via Testcontainers**, not mocks.
- **Contract:** `content-schema` round-trips, version migration, generated-JSON-Schema snapshot (`T-020`) — the highest-value tests; protect the spine.
- **Gateway:** recorded provider fixtures (`T-067`) — structured-output validation, fallback, cache. **No live model calls in CI.**

## 12. Git & PRs

- One task per branch: `task/T-013-text-blocks`.
- **Conventional Commits + task ID:** `feat(content-schema): add text blocks [T-013]`, `fix(publishing): make outbox write transactional [T-036]`.
- One task per PR; the PR description restates the task's Acceptance as a checklist and links the task ID.
- A green CI (`§T-003`) is required to merge.

## 13. Dependencies

- Adding a dependency needs a one-line justification in the PR; prefer the standard library or an already-present package.
- **Pin versions** (no floating ranges in app code). The provider SDKs are imported **only** inside their gateway adapters (Invariant 5).
