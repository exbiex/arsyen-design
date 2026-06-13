# Arsyen Generative Engine — Model Gateway & Agents

> **This already exists, in production, in the research-platform.** The Generative plane should
> **reuse/extract** it, not rebuild. This doc captures the pattern + the Generative-specific
> agents. Reference implementation: `research/context/` + research tasks T-060…T-067, T-072, T-080.

## Model Gateway (the reusable pattern)
- **Facade:** `complete()` · `embed()` · `stream()`. Callers request a **`taskClass`**, never a model.
- **Routing:** `model-policy.json` maps `taskClass → {provider, model, fallback}` (Zod-validated,
  env-overridable). Changing a model is a config edit — **no code change**.
- **Providers:** one adapter per SDK (Gemini live in research; add Anthropic/OpenAI as needed).
  Provider SDK imports are confined to `adapters/` (boundary-tested).
- **Structured output:** agent output schemas (Zod → JSON Schema) are passed as `outputSchema`;
  the gateway validates the response before returning (Invariant: untrusted output).
- **Cross-cutting:** Redis response cache (keyed by `sha256(taskClass+model+params+messages+schema)`),
  jittered retries, circuit-breaker, policy fallback, per-provider rate limit.
- **Cost ledger:** **every** call (cache hits included) writes an `ai_calls` row (agent, taskClass,
  provider, model, tokens, cost, latency, cache_hit, correlationId). Cost dashboard + daily alert.

`taskClass` examples (extend per agent): `reasoning` · `fast_summarize` · `embedding` · plus
Generative-specific classes for patch generation.

## Agents (Generative-specific)
Each agent has a typed I/O contract (Zod) and uses the gateway. The Canvas-facing set maps to the
AI modes in `03_INTENT_PATCH_CONTRACT.md`:

- **Generate agent** — brief → new sections/components (or a whole canvas) → Intent-Patch
  (`generate` mode).
- **Edit agent** — targeted instruction + current graph slice → Intent-Patch (`edit`).
- **Improve agent** — graph slice → refined content/structure/presentation → Intent-Patch (`improve`).
- **Reimagine agent** — canvas + direction → restructuring plan → Intent-Patch (`reimagine`,
  auto-branches).

(Research's own agents — Writing / Research / Extraction / Verification / Atomization — stay in the
research plane; they are the *blueprint* for how agents are built, not duplicated here.)

## Output discipline
- Agents emit **structured Intent-Patches**, never prose or raw HTML to be parsed.
- IDs and platform-owned fields are assigned by the engine, not the model (research T-072 lesson:
  relax ID patterns in the model's output schema, then claim/validate against the full contract).
- Validate twice: gateway-side against the output schema, and engine-side against the target's
  full contract before the patch is allowed to apply.
