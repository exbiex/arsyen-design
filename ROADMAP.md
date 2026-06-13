# Arsyen — Unified Roadmap (all four planes)

> The cross-repo phasing. Direction is set by `platform/context/VISION_JUNE_2026.md`
> (Arsyen = a *Creative Operating System*). Sequenced, actionable execution lives in
> **[`TASK.md`](./TASK.md)** (master) + each service's `TASKS.md`. Architecture in
> [`ECOSYSTEM.md`](./ECOSYSTEM.md); design law in [`DESIGN_LANGUAGE.md`](./DESIGN_LANGUAGE.md).
>
> **Everything built before 2026-06-13 was a proof of concept.** This is the production push.

---

## Platform strategy & phasing (surfaces) — **macOS only (decision 2026-06-14)**

| Surface | Scope | Why |
|---|---|---|
| **macOS app** | **THE client — complete feature set, build FIRST** | The primary creation environment; the Creative-OS experience is desktop-native. |
| **iOS app** | **Later** | Companion/consumption first, full creation later. **Code kept iOS-ready**; built only after macOS, when the founder green-lights it. |
| ~~**Web app**~~ | **DROPPED** | The web client/companion is no longer built. Public-web *publishing* of creative work (portfolios as published Canvas) is **deferred, not deleted** — revisit only if revived. |

**Rule:** macOS is the only active client target. iOS stays ready (don't design it out). **No web
client.** "Start the app" = the macOS app only.

## Plane states at a glance (2026-06-14)

- **Platform** — POC shipped (identity, assets, profile, projects, the liquid-glass shell);
  Work view, Light/Dark/Pure-Black theming, glass fidelity, macOS build/run/codesign all landed.
  Now: design-system fidelity → breadth → native chrome.
- **Canvas** — **0 code.** Rich context only. Next: scaffold the monorepo + lock `canvas-schema`.
- **Research** — **built through Phase 5** (T-001…T-080 DONE; the full content contract, manual
  publish path, assets pipeline, model gateway, Writing + Research agents). Next: finish the
  agent pipeline (Phase 6).
- **Generative** — repo bootstrapping (LICENSE only). Next: stub the Intent-Patch boundary;
  build for real in P3 (reusing Research's gateway pattern).

---

## The phases (cross-repo)

### Phase 0 — Contracts & toolchain  *(largely done)*
- ✅ macOS toolchain; design-system token port to Flutter; off-iCloud relocation; **docs
  consolidated into this `arsyen-design` hub**.
- ✅ Research Phases 0–5 (it ran ahead on its own self-contained track).
- ▶ **Canvas:** scaffold the TS monorepo and define **`canvas-schema`** — the contract
  everything depends on.
- ▶ **Resolve the gating decisions** in `ECOSYSTEM.md §5` before they block later phases.

### Phase 1 — macOS (complete) + Work + Canvas read-path
- **macOS app:** finish the native shell (window chrome, entitlements, packaging),
  complete-feature parity with the design-system Mac UI kit.
- **Work workflow:** Projects→Work — object-selector left panel, persistent workspace,
  Overview/Board/Action-Plans/Files/Activity/Settings as views of one object, synchronized task
  selection, fullscreen as a workspace state.
- ~~Web app (limited)~~ — **dropped (2026-06-14).**
- **Canvas read-path:** `canvas-renderer` renders a hand-authored schema to a vertical-scroll
  experience; `publishing-engine` serves `/username/<slug>` *(public publishing of output is
  **deferred** while web is paused; the engine is still built schema-first)*.
- **Generative:** define + stub the **Intent-Patch** interface (no real AI yet).
- **Research:** finish the editorial pipeline (Phase 6 — extraction, verification, atomization,
  topic discovery, full Flow).

### Phase 2 — Authoring & embedding
- **Canvas:** `canvas-editor` (canvas-first, contextual tools, fullscreen focus),
  `template-engine` + first Experience Templates (Filmmaker / Designer portfolio).
- **Platform × Canvas:** embed Canvas as **Work ▸ Project ▸ Canvas**; make **Profile/Portfolio
  a published Canvas**; wire asset references to the Go/S3 asset store.
- **macOS distribution:** Developer-ID signing + notarization; auto-update channel.
- **Resolve §5.1** (WebView vs native Canvas render) — this gates the embed.

### Phase 3 — Intelligence & ingestion
- **Generative:** stand up for real (model gateway + agents, reusing Research's gateway);
  implement the **Intent-Patch** flow (User→Intent→Generative→patch→Canvas mutation); AI modes
  Edit / Improve / Reimagine / Generate; auto-branch on AI redesign.
- **Canvas:** `ingestion-engine` (BYOD: HTML/Figma/screenshots/Claude-Design/Stitch → Canvas
  Schema; never store imported HTML as runtime truth); versioning / branching / merge.
- **Research:** Phase 7 knowledge graph.

### Phase 4 — Knowledge & scale
- **Research × Canvas** adapter (semantic content → experiences).
- More design/motion packs; community/marketplace components.
- **iOS app** to feature-completeness.
- Category graduation (Work → Library / Growth) once Work is mature.
- **Research:** Phase 8 hardening + consumer onboarding + deploy.

---

## Definition of "production-ready" (per surface)
Code + tests green in CI; migrations up/down clean; authz + validation + audit on every
mutation; permission-aware reads; observability (metrics/logs/traces); the UI never blanks
(loading/empty/error/just-deleted states); brand-accurate against `DESIGN_LANGUAGE.md`; and for
macOS: signed, notarized, auto-updating, sandbox entitlements correct.

> Research runs its **own** phase model + exit criteria internally (it was ahead and
> self-contained) — see `research/context/ROADMAP.md`. The phases above place its work in the
> ecosystem timeline; the canonical research sequencing is its own roadmap + `research/TASKS.md`.
