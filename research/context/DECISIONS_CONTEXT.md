# Arsyen Research — DECISIONS_CONTEXT

> Master context file. Locked decisions + rationale. No narrative.
> Companion to `ARSYEN_RESEARCH_ARCHITECTURE.md` (full reasoning lives there).
> Status legend: **[LOCKED]** decided · **[DEFERRED]** decided to wait, with trigger · **[CONFIG]** runtime-configurable, not architectural

---

## 0. Identity

| | |
|---|---|
| Name | Arsyen Research |
| Relationship to Arsyen | **Fully separate platform** — own codebase, DB, schemas, deploy, release cycle |
| Role | **Producer** of structured knowledge. Consumers (arsyen.blog, Feed, Newsletter, IG/X generators) depend on it; it depends on no consumer |
| Not | An AI blog generator. It is a research + knowledge-production platform with mandatory human editorial approval |

---

## 1. Guiding principles [LOCKED]

- Producer owns meaning; consumer owns presentation. **Never emit HTML/CSS/layout.**
- Contracts are versioned published artifacts, not internal details.
- Published documents are **self-contained** (renderable with no second API call).
- **Nothing publishes itself** — `approved → published` is the only human-gated transition.
- Evolutionary architecture: build for 1k users with seams cut for later; defer everything speculative.
- Boring plumbing; care budget spent on the content contract and the AI gateway.

---

## 2. Tech stack [LOCKED]

| Layer | Choice | Rationale |
|---|---|---|
| Core platform | NestJS + TypeScript | Modular monolith; modules map to domain seams |
| AI agents + Model Gateway | TypeScript, **in-process** | Agents are orchestration, not ML — no separate Python service yet |
| Database | **PostgreSQL + `pgvector`** | One store: relational + jsonb + FTS + vectors + graph-via-CTE |
| Queue | **BullMQ + Redis** | Async pipeline, retries, rate limits; Redis also caches |
| Object storage | **Cloudflare R2** | Zero egress for image-heavy archive; S3-compatible |
| Search | Postgres FTS + `pgvector` | Keyword + semantic from day one |
| Internal editorial UI | Next.js | Part of Arsyen Research ("studio") |
| Consumer UIs | Next.js etc. | **Separate repos**, depend on content-schema package only |
| Repo | pnpm workspace + Turborepo monorepo | Content contract published as versioned package |
| Auth | Self-hosted, editors-only at launch | Mirror main Arsyen (email/password now, OAuth later) |
| DB migrations | One tool, versioned, additive-then-backfill-then-cleanup | Never hand-edit, never destructive-in-one-step |

---

## 3. Departures from original brief [LOCKED]

1. **TypeScript-only at launch** — no Python + FastAPI AI service yet (gateway built with a network-shaped contract so it can be extracted later).
2. **`pgvector` from day one** — platform is retrieval-centric; backfilling embeddings later is costly.
3. **No Neo4j, no message bus** — graph stays relational in Postgres; publishing uses outbox + webhooks + read API.

---

## 4. Content contract — the spine [LOCKED]

- Block-based document with inline rich text (Portable-Text/ProseMirror lineage).
- Envelope: `schemaVersion`, `documentId`, `documentType`, `status`, `metadata`, `blocks[]`, `references[]`, `assets[]`.
- Rich text = **spans + marks**, never HTML strings. `marks` = closed set (`strong|em|code|strike|underline`); `refs` = rich annotations (links, entity references).
- Blocks carry a **stable `id`**, a `type` discriminator, a per-type `version`, semantic `data`, and **optional non-binding `meta`** (rendering hints consumers may ignore — the layout pressure valve).
- v1 block catalog: `paragraph`, `heading`, `quote`, `image`, `filmReference`/`artistReference`/`bookReference`/`albumReference`, `gallery`, `comparison`, `timeline`, `list`, `divider`, `callout`, `embed`.
- **References and assets deduped at document level**, pointed to by ID from blocks.
- References carry a **denormalized `snapshot`** (self-contained render) **plus** canonical `entityId` (optional deep link into graph).
- **Versioning:** semver. Additive = minor/patch; breaking = major. Each stored doc records the `schemaVersion` it was written with. **Migrate-on-read** via a migration registry; consumers pin a version via content negotiation (`?schemaVersion=`).
- **Unknown block types must degrade gracefully** — mandated by the contract, stated in consumer integration guide. New blocks are always additive.
- `documentVersion` (human revision counter) is distinct from `schemaVersion` (the format) — never conflate.
- Writing agent **emits the content schema directly** (not Markdown to be parsed).

---

## 5. Asset schema [LOCKED]

- Semantic `role` (`hero|inline|gallery|comparison|thumbnail|poster`), **never layout**.
- Producer provides: role, `alt`, `caption`, `attribution`+`license`, `focalPoint`, `aspectRatio`, `blurhash`, `dominantColor`, responsive `variants[]` (width/format/url/bytes).
- Producer never provides: pixel render widths, alignment, columns, breakpoints.
- Attribution/license fields are **mandatory** in editorial review (film/art/music platform).
- Pipeline (upload → original in R2 → variants → blurhash/color → descriptor) is internal; only the descriptor crosses the boundary.

---

## 6. Knowledge graph [LOCKED + DEFERRED path]

- **[LOCKED]** Relational in Postgres: `entities` (with `embedding vector`), `entity_aliases`, `entity_relationships` (directed edges), `entity_sources` (provenance). Traversal via recursive CTEs.
- **[LOCKED]** Extraction agent **proposes**; humans confirm before merge. Graph is canonical and protected from hallucination. Every fact has provenance.
- **[DEFERRED]** Apache AGE (graph in Postgres) — trigger: multi-hop traversals slow.
- **[DEFERRED]** Neo4j/Memgraph mirror via outbox — trigger: serious graph scale only.
- Entity dedupe/merge behind a `canonical_entity_id` redirect so old references never break.

---

## 7. AI architecture [LOCKED]

- Chain (always): **Agent → Model Gateway → Provider Adapter → provider**. No business logic names a model.
- **Model Gateway** owns: routing, retries/backoff, fallback + circuit breaking, response caching (by `prompt_hash + model + params`), structured-output enforcement (validate vs `outputSchema`), cost/token accounting (`ai_calls` table), per-provider rate limiting, redaction policy. Only component that reads provider API keys.
- Agents specify a **`taskClass`** (`reasoning|fast_summarize|extraction|embedding`), not a model. **[CONFIG]** `model-policy.json` maps task class → provider/model/fallback; editable without code change.
- Provider adapters: Gemini, Anthropic (Claude), OpenAI, OpenRouter, Local. Adding a provider = one adapter.
- Agents are stateless, run as BullMQ jobs, each with input/output schema + system-prompt template + allowed tools + default task class.
- Agents: **Research** (sources + embeddings), **Entity Extraction** (proposes entities/relationships), **Writing** (emits draft in content schema), **Verification** (flags unsupported claims/citation issues — advisory, never gates), **Atomization** (social variants, post-publish).
- Treat all model output as untrusted: validate, never `eval`, never let output reach `published` without the human gate.

---

## 8. Editorial workflow [LOCKED]

- Finite state machine on `documents.status`; every transition writes an `editorial_events` audit row.
- States: `discovered → researching → extracting → drafting → in_review ⇄ (request changes) → approved → published → archived` (+ `rejected`).
- AI steps between states are queued jobs; failures leave the doc in its prior state with a recorded error — never half-published.
- **`approved → published` is human-only, enforced in code** (publish endpoint rejects agent callers). No agent can reach `published`.

---

## 9. Publishing [LOCKED]

- On publish: resolve version → **self-contained envelope** (snapshots + asset variants/URLs) → write `published_documents` (with `content_hash`) → write `publish_outbox` row **in same transaction** (transactional outbox).
- Dispatcher delivers outbox events to registered `consumers` via **HMAC-signed webhooks** (retries + dead-letter).
- Consumers integrate via: **pull** (`GET /v1/documents/{slug}?schemaVersion=`, ETag'd, CDN-friendly) + **push** (signed webhooks on publish/update/unpublish).
- **`published_documents` is split from `document_versions`** (read-optimized/immutable/denormalized vs write/normalized/mutable) — same DB at launch, separable later.
- **No message bus at launch.** Outbox is the seam to attach NATS/Redis Streams later if fan-out demands.

---

## 10. API surfaces [LOCKED]

- **Public Content API** (`/v1`, read-only, versioned, what consumers depend on): list/get documents, get versions, get entities (deep-link), feed. Content versioned independently via `schemaVersion` negotiation.
- **Internal Editorial API** (`/admin`, authenticated editors only, free to change): topics, document edit/transition/publish, asset upload, AI run inspection.
- Consumers **never** touch the editorial surface or internal tables. The published envelope JSON + `@arsyen-research/content-schema` package **is** the contract.

---

## 11. Repo structure [LOCKED]

```
arsyen-research/                 (pnpm + Turborepo monorepo)
├── apps/
│   ├── platform/                NestJS monolith
│   │   └── src/modules/         editorial · content · knowledge-graph ·
│   │                            ai-orchestration · model-gateway · assets ·
│   │                            publishing · identity
│   └── studio/                  Next.js internal editorial UI
├── packages/
│   ├── content-schema/          ★ THE CONTRACT: types + JSON Schema + validators
│   │                              + migrations/ + CHANGELOG.md  (published to registry)
│   ├── agent-contracts/         per-agent input/output schemas
│   └── shared-config/
└── infra/
```

- Module dependency rule: **Content depends on nothing; Knowledge Graph depends on nothing; everything may depend on Content; Publishing depends on Content+KG+Assets; nothing depends on Publishing.**
- Cross-module access via public service interfaces only — never reach into another module's tables.
- External consumers live in own repos, add `@arsyen-research/content-schema` as a dependency.
- Future Python AI service → `apps/ai-service/` behind the identical `agent-contracts` — callers unchanged.

---

## 12. Security [LOCKED]

- Two trust zones: authenticated editorial vs read-only public. No code path from public surface to a write.
- Provider keys in secrets manager/env, never in config or repo; only the gateway reads them.
- HMAC-sign all consumer webhooks (per-consumer secret).
- Asset attribution/licensing mandatory at review.
- Define redaction policy for `ai_calls` prompt logs.

---

## 13. Observability [LOCKED]

- **`ai_calls` is the most important operational table** — spend/agent/day, cache-hit rate, latency/provider; cost alerts (runaway-retry protection).
- Correlation/trace ID follows a topic from discovery → every agent job → publish.
- Bull Board for queue health; alert on stalled/failed jobs + backlog.
- Sentry across platform + workers. Add OpenTelemetry only when log-eyeballing breaks down.

---

## 14. Deferred decisions (trigger-based) [DEFERRED]

| Move | Trigger |
|---|---|
| Postgres read replica + serve published from replica | Read pressure / publish API latency |
| Extract Model Gateway → Python + FastAPI service | Local models / custom RAG / ML (not orchestration) is the bottleneck |
| Split BullMQ workers per queue, scale horizontally | Job volume saturates one worker |
| Meilisearch/Typesense (Postgres stays source of truth) | FTS relevance/typo-tolerance or vector latency complaints |
| Apache AGE → later Neo4j/Memgraph | Deep graph traversals slow |
| Outbox → NATS / Redis Streams broker | Webhook fan-out unreliable / many consumers |
| Versioned embedding column (`embedding_v2`) + backfill | Embedding model change |

All attach to seams already cut. None require a rewrite.

---

## 15. Build order [LOCKED]

1. **Contracts before code** — `packages/content-schema` v1.0.0 (types + JSON Schema + validators + migration registry skeleton).
2. Skeleton monolith — NestJS + Postgres/`pgvector` + Redis/BullMQ + R2; thin editorial/content/publishing modules.
3. **Manual happy path, no AI** — hand-create a doc → validates → publish → renders via `/v1/documents/{slug}` in one consumer. Proves the contract + producer/consumer boundary.
4. Assets pipeline — upload → variants → descriptor.
5. Model Gateway (in-process) — one provider (Gemini), task-class policy, `ai_calls` logging, caching.
6. Writing agent — topic + pasted sources → valid draft in content schema (highest leverage).
7. Rest of pipeline — Research → Extraction → Verification as BullMQ jobs behind the state machine, human gate at publish.
8. Knowledge graph from confirmed extractions.
9. Atomization + additional consumers.

> Stages 1–4 are the foundation. If nothing else ships this month, ship those.
