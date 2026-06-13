# Arsyen Generative Engine — Intent-Patch Contract

> The shared protocol between the Generative Engine (producer) and a target engine — **Canvas
> first** (consumer). This is the seam in `../ECOSYSTEM.md §3`. It is a versioned Zod contract;
> where it lives (npm package vs submodule) is gating decision §3.

## Concept
An **Intent-Patch** is a *validated mutation plan*, not a model dump. The user expresses an
**intent**; an agent reasons; the engine emits a patch describing **how the target graph should
change**; the target engine validates and **applies** it (and auto-branches on large changes).
The model never edits the graph; it proposes structured operations the engine can reason about,
diff, preview, undo, and version.

## AI modes (Canvas)
- **Edit** — targeted change to specific sections/components.
- **Improve** — refine existing content/structure/presentation in place.
- **Reimagine** — large restructuring → **auto-branch** (never overwrite published work).
- **Generate** — produce new sections/components/canvas from a brief.

## Shape (target — finalize in the build task)
```
IntentPatch {
  patchVersion        // contract version (backward-compatible, migrate-on-read)
  target              // { engine: "canvas", canvasId, baseVersion }   ← optimistic concurrency
  intent              // the normalized user intent + mode (edit|improve|reimagine|generate)
  operations[]        // ordered, semantic ops over the target graph:
                      //   addSection / removeSection / moveSection
                      //   addComponent / updateComponent / removeComponent
                      //   setMotionProfile / setDesignPack / setThemeRef
                      //   (operate on SEMANTIC identities + data contracts — never raw HTML/CSS)
  provenance          // agent, model (post-routing), correlationId, cost ref into the ledger
  confidence?         // optional, advisory only
}
```

## Invariants
1. **Producer proposes; consumer applies.** The patch is inert until the target engine validates
   and applies it. The engine may reject any operation that violates the target's schema.
2. **Semantic operations only.** Ops reference sections/components by semantic identity and carry
   data conforming to the target's component data contracts — **never** layout/HTML/CSS.
3. **Content / Structure / Presentation stay separable** in the ops (Canvas non-negotiable).
4. **Reimagine auto-branches** — destructive/large changes create a working branch, never mutate
   published state in place.
5. **Versioned + backward-compatible.** Additive change → minor; breaking → major; migrate-on-read.
6. **Every patch carries provenance** and a reference into the cost/audit ledger.

## Phasing
- **P1–P2:** define the contract and **stub** the producer (Canvas applies a mock patch — platform
  task `F3`, canvas task `E10`). No real model calls.
- **P3:** build the real producer (agents via the gateway emit patches).
