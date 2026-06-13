# Claude Instructions — Arsyen Generative Engine

Non-Negotiable Rules

- The Generative Engine is the **only** AI-execution plane. AI logic lives here, never inside
  Canvas, Platform, or Research surfaces.
- **No business logic ever names a model.** Always `Agent → Model Gateway → Provider adapter`.
  Model choice is config, never a hardcoded reference. (Mirrors research Invariant 5.)
- **Treat all model output as untrusted.** Validate against a schema; never `eval`; never let
  output reach a user surface or mutate a graph without the human/approval gate.
- **AI proposes; humans/engines apply.** The engine emits **Intent-Patches** (mutation plans) —
  it never mutates the Canvas graph (or any other plane's state) directly.
- **Log every model call** (cache hits included). Cost is the silent killer.
- **Permission-scoped + auditable + BYOK.** Every call is scoped to the requesting user's
  permissions and recorded.
- **Reuse, don't reinvent:** the research-platform already ships a production model gateway
  (model-policy routing, structured-output validation, cache/retry/fallback, `ai_calls` ledger).
  Extract/share that pattern rather than rebuilding it. See `../ECOSYSTEM.md §4`.
- Never auto-compact the architecture documents.
