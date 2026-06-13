# CLAUDE.md — Arsyen Research

**Operating manual for Claude Code. Read this first, every session, before touching code.**

---

## 1. What this is

Arsyen Research is a **standalone research + knowledge-production platform**. It is the *producer*; consumers (arsyen.blog, Feed, Newsletter, IG/X generators) depend on it. It is **not** part of Arsyen and **not** an AI blog generator: AI assists with discovery/research/extraction/drafting, **humans approve, and nothing auto-publishes.**

The whole point of this file + `docs/ROADMAP.md` + `docs/TASKS.md` is that you can be told "work on the next task" and know exactly what to do without re-deriving context.

**First time on this repo?** Do `docs/SETUP.md` (session zero — accounts, env, bootstrap) before `T-001`.

---

## 2. How to work the backlog — THE PROTOCOL

When asked to **"work on the next task"** (or a specific task ID):

1. Open `docs/TASKS.md`. Select the **lowest-ID task with `Status: TODO` whose every `Depends on` task is `DONE`** — unless a specific task is named.
2. Read that task's **References** (linked sections in the decision docs). Do **not** start before reading them.
3. Implement **strictly within `Scope`**. Honor `Out of scope` — do not expand the task.
4. Satisfy **every** item in `Acceptance criteria`. Write the required tests and make them pass.
5. Set the task to `Status: DONE` and append one line: `✓ <date> — <what was done> — <any deviation>`.
6. If anything is ambiguous, or completing the task would require **deviating from a decision doc or breaking an Invariant (§3): STOP and surface it.** Never silently change an architecture invariant. Propose the change; let the human decide.

One task ≈ one focused session. Do not batch unrelated tasks. Do not skip ahead past blocked dependencies.

Two cross-cutting rules bind every task: it is not `DONE` until it meets the **global Definition of Done** in `docs/ENGINEERING_GUIDE.md §10` (on top of its own acceptance), and for any canonical list — statuses, block/entity types, the state-transition table, `taskClass` values — **read `docs/DOMAIN_MODEL.md`** rather than re-deriving it.

---

## 3. Invariants — NEVER violate these

1. **Producer owns meaning; consumer owns presentation.** The platform never emits HTML, CSS, class names, or layout. Blocks and assets are semantic only.
2. **The content contract is versioned and backward-compatible.** Additive change → minor/patch; breaking change → major. Migrate-on-read. **Never rewrite published history.**
3. **Published documents are self-contained** (embedded reference/asset snapshots) **and** carry canonical IDs for optional deep-linking.
4. **Nothing publishes itself.** `approved → published` is **human-only, enforced in code**. No agent may ever reach `published`.
5. **No business logic names a model.** Always `Agent → Model Gateway → Provider adapter`. Model choice is config (`model-policy.json`), never a hardcoded reference.
6. **Extraction proposes; humans confirm** before the knowledge graph is mutated. Every entity fact has provenance.
7. **Module dependency rule:** Content and Knowledge-Graph depend on nothing; everything may depend on Content; Publishing depends on Content + KG + Assets; **nothing depends on Publishing**. Cross-module access is via a module's public service — never another module's repository or tables.
8. **One source of truth for contracts:** define in **Zod**, derive TS types (`z.infer`) and JSON Schema. Never hand-write a type Zod can infer.
9. **Treat all model output as untrusted:** validate against schema, never `eval`, never let it reach `published` without the human gate.
10. **`ai_calls` logs every model call** (cache hits included). Cost is the silent killer.
11. **Migrations are additive → backfill → cleanup**, never destructive-in-one-step; never hand-edit an applied migration.

---

## 4. Stack

| Layer | Choice |
|---|---|
| Runtime / language | Node 22 LTS · TypeScript `strict` · ESM |
| Package mgr / monorepo | pnpm workspace · Turborepo |
| Lint/format | Biome |
| Core platform | NestJS |
| **ORM** | **Drizzle + `postgres-js`** — *ASSUMED FORK. If overridden to Prisma, re-spec Phase 2 data tasks (T-031, T-033) and §2 of IMPLEMENTATION_DECISIONS.* |
| DB | PostgreSQL + `pgvector` |
| Queue | BullMQ + Redis |
| Object storage | Cloudflare R2 (`@aws-sdk/client-s3`) |
| Validation/contracts | Zod → `zod-to-json-schema` · `nestjs-zod` for DTOs |
| AI provider SDKs | official TS SDKs behind adapters (Gemini first) |
| Image | sharp + blurhash |
| Auth | session (Redis) + argon2id, editors only |
| Tests | Vitest + Testcontainers |
| Logging/errors | pino + Sentry; Bull Board for queues |
| **Hosting** | **Managed container host + managed PG/Redis + R2** — *ASSUMED FORK. If overridden to self-run VPS+Compose, change Phase 8 deploy tasks (T-104) only.* |

---

## 5. Repo layout

```
arsyen-research/
├── CLAUDE.md                  ← this file (auto-read by Claude Code)
├── docs/
│   ├── ROADMAP.md             ← phases + goals + exit criteria
│   ├── TASKS.md               ← the backlog (work from here)
│   ├── ARCHITECTURE.md        ← full reasoning
│   ├── DECISIONS_CONTEXT.md   ← locked architecture decisions
│   ├── IMPLEMENTATION_DECISIONS.md ← library/pattern picks
│   ├── SETUP.md               ← session-zero: accounts, env, bootstrap
│   ├── ENGINEERING_GUIDE.md   ← coding conventions + global Definition of Done
│   └── DOMAIN_MODEL.md        ← glossary, enumerations, state-transition table
├── apps/
│   ├── platform/              ← NestJS monolith (API + workers)
│   │   └── src/modules/{editorial,content,knowledge-graph,
│   │                      ai-orchestration,model-gateway,assets,
│   │                      publishing,identity}
│   └── studio/                ← Next.js internal editorial UI
├── packages/
│   ├── content-schema/        ← ★ THE CONTRACT ★ (build first)
│   ├── agent-contracts/       ← normalized + per-agent Zod schemas
│   └── shared-config/         ← tsconfig + biome base
└── infra/migrations/          ← drizzle-kit migrations
```

---

## 6. How to run (fill in as Phase 0 lands)

```
pnpm install
pnpm dev            # platform + studio
pnpm test           # Vitest (Testcontainers spins real PG)
pnpm lint           # Biome
pnpm db:generate    # drizzle-kit migration from schema
pnpm db:migrate     # apply migrations
docker compose up   # local Postgres+pgvector + Redis
```

Env is validated by Zod at boot — the app refuses to start with a missing/invalid var. See `.env.example`.

---

## 7. Deep reference

`docs/ARCHITECTURE.md` is the *why*; `docs/DECISIONS_CONTEXT.md` is *what's true now* (the source of truth — if it conflicts with ARCHITECTURE, DECISIONS_CONTEXT wins); `docs/IMPLEMENTATION_DECISIONS.md` is *with which library/pattern*. Each task in `TASKS.md` cites the exact sections you need — read those, not the whole doc, per task.

The operational layer: `docs/SETUP.md` is *session zero* (do once, before T-001); `docs/ENGINEERING_GUIDE.md` is *how to write the code consistently* + the global Definition of Done (binds every task); `docs/DOMAIN_MODEL.md` is *the canonical vocabulary, enumerations, and state-transition table* (the authoritative source for any valid-value list).

The full set, by role: **CLAUDE.md** (this — start here) → **SETUP.md** (bootstrap) → **ROADMAP.md** (goals) → **TASKS.md** (do the work) → **DOMAIN_MODEL.md** + **ENGINEERING_GUIDE.md** (consult per task) → **ARCHITECTURE / DECISIONS_CONTEXT / IMPLEMENTATION_DECISIONS** (deep reference, cited per task).
