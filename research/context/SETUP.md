# SETUP — Arsyen Research (Session Zero)

Everything that must exist **before** Claude Code runs `T-001`. Do this once, in order. The goal: when you say "work on the next task," there is no missing account, key, or command.

> Assumed forks (from `CLAUDE.md §4`): **ORM = Drizzle**, **Hosting = managed services**. If you override either, the notes below flag what changes.

---

## 1. Prerequisites (local machine)

| Tool | Version | Install |
|---|---|---|
| Node | 22 LTS | `nvm install 22 && nvm use 22` (repo has `.nvmrc`) |
| pnpm | latest | `corepack enable && corepack prepare pnpm@latest --activate` |
| Docker | latest | for local Postgres+pgvector + Redis |
| Git | latest | — |

---

## 2. Accounts & external services

Create these and capture the credentials into `.env` (see §4). Free tiers comfortably cover the 1,000-user launch target; the only variable cost is AI calls (watch the cost dashboard, `T-066`).

| Service | What it's for | Needed by | Notes |
|---|---|---|---|
| **GitHub repo + Actions** | source + CI | T-003 | Private repo recommended |
| **Cloudflare R2** | asset storage (originals + variants) | T-051 (Phase 3) | Create a bucket + an S3-API token (access key + secret). Note the **public/CDN base URL** for variant links. |
| **Managed Postgres w/ `pgvector`** | the database | T-031 (Phase 2) | Neon or Supabase both ship `pgvector`. Verify the extension is available before committing. *(If self-hosting: ensure the `pgvector` extension is installed.)* |
| **Managed Redis** | queue + cache + sessions | T-029 (Phase 2) | Upstash works; local Redis is fine for dev. |
| **Google AI Studio (Gemini API key)** | first model provider | T-063 (Phase 4) | The gateway is provider-agnostic; this is just the first adapter. |
| **Package registry** | publish `@arsyen-research/content-schema` | T-021 (Phase 1) | **Start with workspace/`pnpm link` locally** (no account needed). Move to **GitHub Packages** (or private npm) only when an external consumer repo needs to install it. |
| **Sentry** | error tracking | T-103 (Phase 8) | Defer until Phase 8. |

**Registry recommendation:** don't set up a private registry on day one. The platform consumes `content-schema` via the pnpm workspace; `T-021` can publish-or-link locally. Stand up GitHub Packages at the moment the first *external* consumer (e.g. arsyen.blog in its own repo) needs the package.

---

## 3. Bootstrap sequence (after T-001 has scaffolded the repo)

```bash
git clone <repo> && cd arsyen-research
nvm use                      # Node 22 from .nvmrc
pnpm install
cp .env.example .env         # then fill in §4
docker compose up -d         # local Postgres+pgvector + Redis
pnpm db:migrate              # apply Drizzle migrations (once T-031 lands)
pnpm dev                     # platform + studio
```

Until `T-001` is done none of these scripts exist — that's expected. `T-001` creates the skeleton; `T-004` creates `docker-compose.yml` + `.env.example`; the `db:*` scripts arrive with `T-031`.

---

## 4. Environment variable reference

The app validates these with Zod **at boot and refuses to start if any required var is missing or malformed** (`T-030`). `.env.example` (created in `T-004`) must list every row below.

| Var | Purpose | Required from | Source |
|---|---|---|---|
| `NODE_ENV` | runtime mode | T-030 | `development` / `production` |
| `APP_PORT` | platform HTTP port | T-030 | e.g. `3000` |
| `APP_BASE_URL` | self URL (webhook origins, links) | T-030 | — |
| `LOG_LEVEL` | pino level | T-030 | `info` / `debug` |
| `DATABASE_URL` | Postgres (pgvector) connection | T-031 | managed PG dashboard |
| `REDIS_URL` | Redis connection | T-029 | managed Redis / local |
| `R2_ACCOUNT_ID` | Cloudflare account | T-051 | Cloudflare |
| `R2_ACCESS_KEY_ID` | R2 S3 key | T-051 | Cloudflare R2 token |
| `R2_SECRET_ACCESS_KEY` | R2 S3 secret | T-051 | Cloudflare R2 token |
| `R2_BUCKET` | asset bucket name | T-051 | Cloudflare |
| `R2_PUBLIC_BASE_URL` | CDN base for variant URLs | T-051 | Cloudflare |
| `GEMINI_API_KEY` | Gemini provider | T-063 | Google AI Studio |
| `MODEL_POLICY_PATH` | path to `model-policy.json` | T-064 | repo config file |
| `SESSION_SECRET` | session signing | T-100 | generated secret |
| `BULL_BOARD_USER` / `BULL_BOARD_PASS` | protect the queue dashboard | T-103 | chosen creds |
| `SENTRY_DSN` | error tracking | T-103 | Sentry |
| `GITHUB_TOKEN` / `NPM_TOKEN` | CI publish of content-schema | T-021 (when registry is live) | CI secret |

**Secrets discipline (Invariant-adjacent):** provider keys and connection strings live only in `.env` / the host's secret store — never in `model-policy.json`, never committed. Only the Model Gateway reads `GEMINI_API_KEY`.

---

## 5. Verification checklist (prove each piece works)

Run these after the relevant phase lands, before moving on:

- [ ] **Postgres + pgvector** — `CREATE EXTENSION IF NOT EXISTS vector;` succeeds; a `vector(3)` column accepts a value and an HNSW index builds.
- [ ] **Redis** — a BullMQ test job (`T-029`) runs and shows in Bull Board.
- [ ] **R2** — a put + signed get of a test object succeeds; the public URL serves it.
- [ ] **Boot config** — removing a required env var makes the app refuse to start with a clear error (`T-030`).
- [ ] **Gateway** — a trivial `complete()` via the Gemini adapter returns schema-valid JSON and writes an `ai_calls` row (`T-063`/`T-065`).
- [ ] **End-to-end (Phase 2 exit)** — hand-author → publish → `GET /v1/documents/:slug` self-contained → consumer renders + degrades on an unknown block.

---

## 6. Session-zero order of operations

1. Do §1 (local tools) and the **Phase-0/1 rows** of §2 (GitHub; registry can be local `pnpm link`).
2. Tell Claude Code: **"work on the next task"** → it picks `T-001` and scaffolds the repo.
3. Continue through Phase 0 → Phase 1. **Phase 1 needs no external accounts** — the content-schema package is pure TypeScript.
4. Before Phase 2, ensure managed **Postgres+pgvector** and **Redis** exist (or use the local `docker compose` ones for dev) and fill their `.env` rows.
5. Before Phase 3, set up **R2**. Before Phase 4, set up the **Gemini key**. Before Phase 8, set up **Sentry** and the **registry** (if going external).

You never need an account before the phase that uses it — §2's "Needed by" column is the just-in-time schedule.
