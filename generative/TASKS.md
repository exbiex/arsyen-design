# Arsyen Generative Engine — Task Backlog (`generative/TASKS.md`)

> The build plan for the **Generative** plane (TS, planned). Currently **LICENSE only.**
> Per-service detail behind the master **[`../TASK.md`](../TASK.md)**; cross-repo phasing in
> `../ROADMAP.md`; the AI seam in `../ECOSYSTEM.md §3`. Context: `context/01…04` + `context/CLAUDE.md`.
>
> **Phasing rule (`../ROADMAP.md` gating §2):** in P1–P2 this plane is mostly a **contract + stub**;
> the real model-backed build lands in **P3**, reusing the research-platform's proven gateway.

## How to use
- Status: `[ ]` todo · `[~]` in progress · `[x]` done. Work top-to-bottom within a phase.
- **Definition of done:** code + tests green; `pnpm i && pnpm build && pnpm typecheck && pnpm lint`
  pass; model output validated against schema; every model call ledgered; context docs updated.

---

## PHASE 1 — Contract & stub  (do alongside Canvas E2/E10 + platform F3)

### G1 · Define the Intent-Patch contract
- **Status:** [ ]  · **Depends on:** Canvas `E2` (canvas-schema) · **Ref:** `context/03_INTENT_PATCH_CONTRACT.md`
- **Goal:** the versioned Zod contract for Intent-Patches (the producer↔Canvas seam).
- **Scope:** `IntentPatch` schema (target + intent/mode + semantic operations + provenance),
  `patchVersion` + migrate-on-read, derive TS types + JSON Schema. Decide the contract home
  (npm vs submodule — `../ECOSYSTEM.md §3`).
- **Acceptance:** a hand-authored patch validates and round-trips; Canvas can import the contract.

### G2 · Stub the producer behind the interface
- **Status:** [ ]  · **Depends on:** G1 · **Ref:** `../ROADMAP.md` gating §2, platform `F3`, canvas `E10`
- **Goal:** let Canvas integrate the seam with **no real AI**.
- **Scope:** a `GenerativeClient` interface + a stub that returns a deterministic mock Intent-Patch
  for each AI mode (edit/improve/reimagine/generate). No provider calls.
- **Acceptance:** Canvas applies a mock patch end-to-end (the platform `F3` acceptance).

---

## PHASE 3 — Real engine

### G3 · Monorepo scaffold
- **Status:** [ ]  · **Ref:** `context/02_GENERATIVE_ARCHITECTURE.md`, `../INFRA_PORTS.md`
- **Scope:** pnpm + Turborepo + Biome + TS strict ESM; `packages/*` + `apps/*`; compose on the
  generative port lane (pg 5435 / redis 6382 / minio 9006-9007). CI skeleton.
- **Acceptance:** `pnpm i && pnpm build && pnpm typecheck && pnpm lint` green on the empty graph.

### G4 · Model Gateway (reuse research's pattern)
- **Status:** [ ]  · **Depends on:** G3 · **Ref:** `context/04_MODEL_GATEWAY_AND_AGENTS.md`, research T-060…T-067
- **Goal:** a model-agnostic gateway shared with / extracted from research.
- **Scope:** facade (`complete/embed/stream`) + provider adapters (boundary-confined) +
  `model-policy.json` routing + cache/retries/circuit-breaker/fallback + `ai_calls` cost ledger +
  per-provider rate limit. **Decide:** shared npm package vs extracted service.
- **Acceptance:** a `complete()` routes by `taskClass` via config; structured output validates;
  every call (incl. cache hits) is ledgered; a forced failure falls back. No live calls in CI (fixtures).

### G5 · Agents → real Intent-Patches
- **Status:** [ ]  · **Depends on:** G2, G4 · **Ref:** `context/04_…`, `03_INTENT_PATCH_CONTRACT.md`
- **Goal:** replace the G2 stub with model-backed agents.
- **Scope:** Generate / Edit / Improve / Reimagine agents (typed I/O), each emitting a validated
  Intent-Patch via the gateway; IDs/platform fields claimed by the engine, not the model; validate
  twice (gateway + target contract). Reimagine auto-branches in Canvas.
- **Acceptance:** each AI mode produces a contract-valid Intent-Patch that Canvas applies; reimagine
  creates a branch; cost ledgered; permission-scoped + auditable.

### G6 · Platform AI features (later)
- **Status:** [ ]  · **Depends on:** G4 · BYOK key store + permission scoping for the platform's
  confirmation-based AI surfaces. Ref platform `DECISIONS.md` (AI = BYOK, permission-scoped, auditable).

---

## Immediate next
**G1 — define the Intent-Patch contract** (needs Canvas `E2`), then **G2 — stub the producer** so
Canvas can wire the seam with no AI. Real model work (G3–G5) is **Phase 3** — don't pull it forward.
