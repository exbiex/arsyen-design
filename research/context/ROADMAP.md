# ROADMAP — Arsyen Research

The build arc, phase by phase. Each phase has a **goal**, an **exit criterion** (how you know it's done), and maps to a block of tasks in `TASKS.md`. Phases are sequential; do not start a phase before the previous one's exit criterion is met. Far-future phases are intentionally lighter — they get elaborated in `TASKS.md` as they approach.

> North-star goal: a system where a topic flows through research → extraction → drafting → human review → approval → publish, emitting **self-contained, versioned, semantic documents** that any consumer can render, with every AI step behind a model-agnostic gateway and a human gate before anything goes live.

---

## Phase 0 — Foundation (repo & tooling)
**Goal:** a working monorepo skeleton with CI, local infra, and shared config.
**Tasks:** T-001 … T-004.
**Exit criterion:** `pnpm install && pnpm lint && pnpm test && pnpm build` pass on an empty skeleton; `docker compose up` brings up Postgres+pgvector and Redis locally; CI is green.

## Phase 1 — The content contract (`packages/content-schema`) ★
**Goal:** the versioned document schema — the spine — defined in Zod, deriving types + JSON Schema, with validation, a migration registry, and contract tests. **This is the highest-stakes phase; everything depends on it.**
**Tasks:** T-010 … T-021.
**Exit criterion:** every v1 block type round-trips through validation; `dist/schema.json` is a valid JSON Schema; the migration chain runner works (identity case); contract tests pass; `@arsyen-research/content-schema@1.0.0` is published (or locally linked).

## Phase 2 — Skeleton monolith + manual happy path (NO AI)
**Goal:** prove the contract and the producer→consumer boundary end-to-end with zero AI. Hand-author a document, publish it, fetch it self-contained, render it in a consumer.
**Tasks:** T-029 … T-040.
**Exit criterion:** via the admin API, create a document → transition to `approved` → **human** publishes → `GET /v1/documents/:slug` returns a self-contained envelope with correct `ETag` → a minimal consumer renders the blocks and **degrades gracefully on an unknown block type**.

## Phase 3 — Assets pipeline
**Goal:** real images flow through the semantic asset contract — upload → variants → descriptor — and resolve into published envelopes.
**Tasks:** T-050 … T-054.
**Exit criterion:** upload an image → variants (webp/avif, multiple widths) + blurhash + dominant color generated in R2 → an `image` block in a published doc resolves to a full asset descriptor with variant URLs.

## Phase 4 — Model Gateway (in-process)
**Goal:** a model-agnostic gateway: agents request a `taskClass`, config routes to a provider, with structured-output validation, caching, fallback, and cost logging. One provider (Gemini) live.
**Tasks:** T-060 … T-067.
**Exit criterion:** a trivial `complete()` and `embed()` call succeed through the gateway via the Gemini adapter; the model is selected by `model-policy.json` (changing it requires no code change); every call lands in `ai_calls`; cache hits are logged; gateway tests pass against recorded fixtures.

## Phase 5 — First agent: Writing (+ pipeline machinery)
**Goal:** the highest-leverage agent. Given a topic + pasted sources + entities, emit a **valid content-schema draft**, wired into the editorial state machine via BullMQ.
**Tasks:** T-070 … T-073.
**Exit criterion:** trigger the Writing agent with a topic + hand-pasted sources → it produces a document that **validates against `content-schema`** and lands in `in_review`. No prose-parsing — the agent emits the schema directly.

## Phase 6 — Full editorial pipeline
**Goal:** the remaining agents (Research, Entity Extraction, Verification, Atomization) and topic discovery, wired into one traceable Flow with the human gates intact.
**Tasks:** T-080 … T-085.
**Exit criterion:** a topic flows automatically through research → extraction (proposals only) → drafting → verification annotations → `in_review`, stops for human review/approval, and on human publish triggers atomization. No gate is bypassed.

## Phase 7 — Knowledge graph
**Goal:** the accumulating relational graph (entities, relationships, provenance), populated from human-confirmed extractions, resolving reference snapshots and powering deep-links + traversal.
**Tasks:** T-090 … T-094.
**Exit criterion:** confirmed extractions create/merge entities (with provenance and canonical-ID redirects); published reference snapshots resolve from the graph; `GET /v1/entities/:slug` works; a "related within N hops" recursive-CTE query returns results.

## Phase 8 — Hardening & consumer onboarding
**Goal:** production-readiness — real auth, generated OpenAPI, signed-webhook consumer onboarding + integration guide, observability, and deploy.
**Tasks:** T-100 … T-104.
**Exit criterion:** session auth + roles live with the publish human-guard hardened; OpenAPI spec generated from Zod DTOs; a registered consumer receives a verified signed webhook and can integrate from the published guide; correlation IDs + Sentry + secured Bull Board in place; CI builds images and publishes `content-schema` on version bump; the platform deploys to the chosen host.

## Phase 9+ — Scale & optimize (TRIGGER-BASED, not scheduled)
**Goal:** none of this is built ahead of an observed need. Each item is a migration that attaches to a seam already cut. See `DECISIONS_CONTEXT.md §14` for the full table.
Triggers → moves: read pressure → Postgres read replica; AI is the bottleneck (local models / heavy RAG) → extract the gateway to a Python+FastAPI service behind the same contract; job volume → split BullMQ workers per queue; FTS pain → Meilisearch/Typesense; deep-graph pain → Apache AGE → later Neo4j/Memgraph; webhook fan-out pain → NATS / Redis Streams; embedding-model change → versioned `embedding_v2` + backfill.
**Do not pull any Phase 9 item forward without its trigger firing.**
