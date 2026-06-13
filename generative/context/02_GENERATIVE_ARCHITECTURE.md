# Arsyen Generative Engine — Architecture

## Superarchitecture
```
Generative Engine
- Model Gateway          (model-agnostic facade: complete / embed / stream)
  - Provider adapters    (Gemini, Anthropic, OpenAI, … — the ONLY code that imports a model SDK)
  - Model policy         (taskClass → {provider, model, fallback}, config not code)
  - Cross-cutting        (cache · retries · circuit-breaker · fallback · cost ledger · rate limit)
- Agents                 (reasoning units with typed I/O contracts)
- Intent-Patch Producer  (turns agent output into a validated mutation plan)
- Audit / Cost ledger    (every call logged; permission-scoped)

External integrations:
- Arsyen Canvas Engine      (consumes Intent-Patches; applies mutation plans; auto-branches)
- Arsyen Platform           (identity/permissions; BYOK key store; AI features)
- Arsyen Research Platform   (shares the proven model-gateway pattern)
```

## The core flow
```
User → Intent → Generative Engine
     → (agent reasons via Model Gateway)
     → Intent-Patch (validated mutation plan)
     → target engine (Canvas) applies it
     → AI redesigns auto-branch (Canvas versioning)
```

## Stack (target)
Mirror the research-platform toolchain so the gateway can be shared: Node 22 · TS strict · ESM ·
pnpm + Turborepo · Biome · Zod contracts (derive types + JSON Schema) · provider SDKs behind
adapters · Postgres for the cost/audit ledger · Redis for the response cache. Generative port
lane: pg 5435 / redis 6382 / minio 9006-9007 / services 3300-3399 (`../INFRA_PORTS.md`).

## Boundaries
- The engine **never** imports another plane's tables/repos; it talks over contracts.
- The engine **never** mutates a target graph — it returns an Intent-Patch the target applies.
- Provider SDK imports are confined to `adapters/` (enforced by a boundary test, research T-062 pattern).
