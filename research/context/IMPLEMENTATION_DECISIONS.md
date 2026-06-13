# Arsyen Research — IMPLEMENTATION_DECISIONS

> Companion to `DECISIONS_CONTEXT.md` (architecture) — this layer picks the concrete
> libraries, patterns, and conventions. Status: **[LOCKED]** · **[FORK]** my pick + the alternative · **[CONFIG]** runtime-tunable.
> Rule of thumb: the architecture decided *what*; this decides *with which*. Nothing here changes a §-level architecture decision.

---

## 1. Runtime & tooling baseline [LOCKED]

| | Choice | Why |
|---|---|---|
| Runtime | Node 22 LTS | Stable, native `fetch`, good perf; not Bun/Deno (ecosystem maturity for a long-lived platform) |
| Language | TypeScript, `strict: true` | Non-negotiable for a contract-driven system |
| Package manager | pnpm (workspace) | Already decided; fast, strict, monorepo-native |
| Monorepo runner | Turborepo | Cached task graph across `apps/*` and `packages/*` |
| Lint/format | **Biome** | One fast tool replacing eslint+prettier; less config to maintain solo. *(eslint+prettier is the safe fallback if a needed plugin is missing.)* |
| Module style | ESM throughout | — |

---

## 2. Data layer [FORK → Drizzle]

**Pick: Drizzle ORM** (with `postgres-js` driver).

- **Why Drizzle over Prisma here:** this platform is Postgres-power-user territory — `pgvector` similarity search, recursive CTEs for graph traversal, `jsonb` content, FTS. Drizzle is SQL-first: it has native first-class `pgvector` support (the `vector` column type, `cosineDistance`/`l2Distance`/`innerProduct` operators, HNSW index declarations), and when you need a recursive CTE or a raw `jsonb` query you drop to `sql\`\`` without leaving the type system. No hidden query engine, no separate binary, thin runtime — good for a solo founder who needs to *see* the SQL.
- **The Prisma tradeoff (the fork):** Prisma has the nicer migration DX and a gentler learning curve, but its `pgvector` and raw-SQL/CTE story has historically meant escaping the ORM for exactly the queries this platform leans on hardest. If you strongly prefer Prisma's ergonomics and don't mind raw queries for vectors/graph, it's defensible — say so and I'll re-spec. My recommendation stands on the vector + graph + jsonb workload.
- **Rejected:** TypeORM (decorator-heavy, weaker types), raw `pg` only (loses type safety on a large schema).
- **Migrations:** `drizzle-kit` generate + migrate, checked into `infra/migrations/`. Additive-then-backfill-then-cleanup; never hand-edit applied migrations.
- **Driver:** `postgres-js` (not `node-postgres`) — faster, better TS, plays well with Drizzle and pgvector.

---

## 3. Schema & validation strategy — one source of truth [LOCKED]

The most important implementation decision after the ORM:

- **Zod is the single definition of every contract.** The content schema, agent input/output schemas, API DTOs, and env config are all Zod schemas.
- From each Zod schema, derive the rest:
  - **TS types** via `z.infer` (no hand-written interfaces to drift).
  - **JSON Schema** via `zod-to-json-schema` (language-agnostic validation + the published contract artifact + structured-output schemas for the Model Gateway).
  - **Runtime validators** are the Zod schemas themselves.
- **Why:** the content contract lives in three worlds — TypeScript (producer + TS consumers), JSON Schema (other-language consumers, OpenAPI, model structured output), and runtime validation. Define it once, generate the rest, and they cannot diverge.
- DB-layer note: content/references/assets are stored as `jsonb`, **not** mapped to ORM tables — the content schema is a *document* contract, validated by Zod on write, not a relational shape. (Drizzle models the editorial/graph/publishing tables; the document envelope is jsonb inside `document_versions.content`.)

---

## 4. `packages/content-schema` internals [LOCKED]

```
content-schema/
├── src/
│   ├── blocks/            # one Zod schema per block type (paragraph, heading, image, ...)
│   ├── envelope.ts        # document envelope Zod schema (composes blocks/refs/assets)
│   ├── references.ts      # reference + snapshot Zod schemas
│   ├── assets.ts          # asset descriptor Zod schema
│   ├── version.ts         # SCHEMA_VERSION constant (semver)
│   ├── migrations/        # migrate_1_0_to_1_1(doc) pure fns + registry + chain runner
│   ├── validate.ts        # validateDocument(doc) -> Result; throws structured errors
│   ├── jsonschema.ts      # build step: Zod -> JSON Schema -> /dist/schema.json
│   └── index.ts           # exports types (z.infer), validators, migrate(), SCHEMA_VERSION
├── CHANGELOG.md           # the contract's public history
└── package.json           # published to a private registry, semver-versioned
```

- **Migration registry:** `Map<fromVersion, (doc) => doc>`; `migrate(doc, target)` chains `1.0→1.1→1.2`. Pure, unit-tested, no I/O.
- **Block-version discipline:** unknown block types validate as a generic `{ type, data }` pass-through so old archives never fail validation against a newer schema (mirrors the consumer graceful-degradation rule).
- This package is built and published **before** anything depends on it (build-order stage 1).

---

## 5. NestJS conventions [LOCKED]

- One Nest **module per domain module** from `DECISIONS_CONTEXT §11`; each exposes a thin service interface and hides its repository.
- **DI for swappability:** the `ModelGateway` is injected via an interface token; provider adapters (`GeminiAdapter`, `AnthropicAdapter`, …) are registered as providers and selected by the model-policy. This is the in-code expression of "no business logic names a model" and the future-extraction seam.
- Repositories wrap Drizzle; no controller or agent touches Drizzle directly.
- Cross-module calls go through injected services, never repositories — enforces the dependency rule in review.
- DTO validation at the boundary via `nestjs-zod` (uses the same Zod schemas as everything else).

---

## 6. Queue / BullMQ patterns [LOCKED]

- **One queue per pipeline stage:** `research`, `extraction`, `drafting`, `verification`, `atomization`. Lets you tune concurrency/rate per stage and scale workers independently later (the deferred "split workers" move).
- **Pipeline orchestration via BullMQ Flows** (parent/child jobs) so a topic's run is one traceable tree, with the **human gates** between stages enforced by the editorial state machine — a stage job only enqueues the next stage's *readiness*, never auto-advances past a gate.
- **Idempotency:** job IDs derived from `(documentId, stage, versionInputHash)` so retries/duplicates don't double-spend on models.
- **Topic discovery** runs as a BullMQ repeatable (cron-like) job.
- **Bull Board** mounted on an internal-only route for live queue visibility.
- Workers run in the same deployable at launch; designed to split into a separate worker process when stage 6+ load demands.

---

## 7. Model Gateway implementation [LOCKED]

- **Adapter interface** `Provider { complete, embed, stream }` taking/returning the normalized request/response from `DECISIONS_CONTEXT §7`.
- **Provider SDKs:** each provider's official TypeScript SDK behind its adapter (Google/Gemini, Anthropic, OpenAI), plus an OpenRouter adapter (OpenAI-compatible) and a Local adapter stub. Adapters are the *only* code importing a provider SDK.
- **Structured output = the JSON Schema generated in §3.** Each adapter maps `outputSchema` to that provider's native structured-output/tool mode; the gateway validates the response against the Zod schema before returning. A validation failure is a retriable error.
- **Caching:** Redis, keyed by `sha256(taskClass + model + params + messages)`. TTL per task class. Cuts cost on re-runs of research/extraction.
- **Cost accounting:** every call (cache hits included) writes an `ai_calls` row — the operational smoke detector.
- **Resilience:** retries with jittered backoff; circuit breaker per provider; fallback model from policy on open circuit.
- **[CONFIG]** `model-policy.json` (env-overridable) maps `taskClass → {provider, model, fallback}`; changing a model is a config edit, never a deploy.

---

## 8. Asset pipeline [LOCKED]

| | Choice | Why |
|---|---|---|
| R2 client | `@aws-sdk/client-s3` (v3) | R2 is S3-compatible; standard, well-supported |
| Image processing | **sharp** | Generate responsive variants (webp/avif, widths), extract dimensions |
| Placeholder | `blurhash` | Compute on ingest, store in descriptor |
| Dominant color | sharp stats | Store hex in descriptor |
| Variant strategy | Pre-generate a fixed width/format set on upload | Predictable, CDN-cacheable; on-the-fly transforms deferred |

Pipeline runs as a job: upload original → derive variants → compute blurhash/color → emit descriptor → store. Originals and variants both in R2 under stable keys.

---

## 9. Config & secrets [LOCKED]

- **Env validated by Zod at boot** — the app refuses to start with a missing/malformed var (fail fast, not at first use).
- Provider API keys + DB/Redis creds via env / secrets manager; **never** in `model-policy.json` or the repo. Only the gateway reads provider keys.
- Per-environment config files for non-secret tunables (model policy, queue concurrency, variant widths).

---

## 10. API layer [LOCKED]

- **REST + JSON**, two surfaces (public `/v1`, internal `/admin`) per `DECISIONS_CONTEXT §10`.
- **OpenAPI** generated from the Zod DTOs (`nestjs-zod` + Swagger) — the public spec is a derived artifact, consistent with the schema package.
- **Content negotiation:** `?schemaVersion=` (and/or `Accept`) handled by a publishing interceptor that runs `migrate()` to the requested version on read.
- **Caching:** `published_documents.content_hash` → `ETag`; `If-None-Match` → `304`. CDN-frontable.
- Cursor-based pagination on list/feed endpoints (stable under inserts).

---

## 11. Auth implementation [LOCKED]

- Editors/admins only at launch; **session-based** (httpOnly cookie + server-side session in Redis) — simpler and safer than JWT for a small internal user set.
- Passwords hashed with **argon2id**.
- Role check (`editor` / `admin`) as a Nest guard; the **publish endpoint additionally rejects any non-human actor**, enforcing "no agent can publish" in code.
- OAuth deferred (mirrors main Arsyen Phase 2).

---

## 12. Testing [LOCKED]

| Layer | Tool | Focus |
|---|---|---|
| Unit | **Vitest** | Migration fns, validators, model-policy routing, state-machine transitions |
| Integration | Vitest + **Testcontainers** (real Postgres+pgvector) | Repositories, CTE traversals, vector queries — against a real DB, not mocks |
| Contract | snapshot tests on `content-schema` | A doc valid at v1.0 still validates/migrates at v1.1; published envelope shape is stable |
| Gateway | adapter tests with recorded provider fixtures | Structured-output validation, fallback, cache behavior — no live model calls in CI |

The contract tests on the schema package are the highest-value tests in the system — they protect the spine.

---

## 13. Observability implementation [LOCKED]

- **pino** structured logging with a per-request/per-pipeline correlation ID threaded from topic → jobs → publish.
- **`ai_calls`** queried via a simple internal dashboard (spend/day, cache-hit rate, latency/provider) + a cost alert.
- **Sentry** across platform + workers for errors.
- **Bull Board** for queue health.
- **OpenTelemetry deferred** until log-eyeballing breaks down (the architecture's trigger-based rule).

---

## 14. CI/CD & hosting [FORK → single container host]

- **CI:** GitHub Actions — lint (Biome), typecheck, Vitest (+Testcontainers), build, publish `content-schema` on version bump.
- **Packaging:** one Docker image for the platform (API + workers at launch), one for the Next.js studio.
- **Hosting pick:** a **single managed container host** (Railway / Render / Fly.io) + **managed Postgres with `pgvector`** (Neon/Supabase/managed PG) + managed Redis (Upstash) + R2.
  - *Why:* a solo founder should not run Postgres HA or Kubernetes at 1k users. Managed everything, vertical scale first.
  - *The fork:* a single VPS with Docker Compose is cheaper and fine if you're comfortable operating Postgres/Redis yourself; managed is the lower-ops default I'd recommend.
- Read replica / worker split / broker all deferred to their triggers in `DECISIONS_CONTEXT §14`.

---

## 15. First code to write (bridge to building) [LOCKED]

Per build-order stage 1, the **only** thing to build first is `packages/content-schema`:

1. `version.ts` → `SCHEMA_VERSION = "1.0.0"`.
2. Zod schemas for the v1 block catalog + envelope + references + assets.
3. `z.infer` type exports + `zod-to-json-schema` build → `dist/schema.json`.
4. `validateDocument()` + an empty `migrations/` registry with the chain runner.
5. Contract snapshot tests (Vitest).
6. Publish `@arsyen-research/content-schema@1.0.0` to the private registry.

Everything downstream (the monolith, the studio, every consumer) imports this. It is written, tested, and published before a single Nest module exists.

---

### Open forks awaiting your call
1. **ORM** — Drizzle (my pick, on the vector+graph+jsonb workload) vs Prisma (nicer DX). 
2. **Hosting** — managed services (my pick, low-ops) vs single VPS + Docker Compose (cheaper, more ops).

Everything else above I'd treat as locked unless you push back.
