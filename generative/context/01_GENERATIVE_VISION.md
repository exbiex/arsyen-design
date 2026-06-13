# Arsyen Generative Engine — Vision

## Mission
The Generative Engine is the **AI execution plane** for the whole Arsyen ecosystem: agents,
reasoning, and a model-agnostic gateway. It turns user intent into **Intent-Patches** that other
planes (Canvas first) apply, and it backs the platform's confirmation-based AI features.

## Not an autonomous content machine
AI **assists; the user approves.** The engine never auto-publishes, never mutates a graph
directly, and never dominates the experience. It proposes; humans and engines dispose.

## Philosophy
- Intent-based: `User → Intent → Generative → Intent-Patch → target engine`.
- Model-agnostic: providers are swappable behind a gateway; model choice is config.
- Untrusted-by-default output: validated against schemas before it touches anything.
- Permission-scoped, auditable, BYOK (bring-your-own-key) friendly.
- Cost-aware from day 0: every call is metered.

## Ecosystem position (`../ECOSYSTEM.md`)
Platform = workflows and identity · Research = knowledge production · Canvas = experience
creation/publishing · **Generative = AI execution.** First consumer: **Canvas** (Intent-Patches
for the AI modes Edit / Improve / Reimagine / Generate). Later: platform-wide AI features.

## Relationship to Research's gateway
Research already built a battle-tested model gateway (model-policy routing, structured-output
validation, Redis cache, retries, circuit-breaker + policy fallback, and an `ai_calls` cost
ledger — its tasks T-060…T-067). The Generative plane **shares/extracts that**, rather than
rebuilding it. Decision pending: shared package vs extracted service (`../ROADMAP.md` gating §2).
