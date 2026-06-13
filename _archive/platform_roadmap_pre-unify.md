# Arsyen — Production Roadmap

> **Status (2026-06-13):** everything built so far was a **proof of concept**. This
> is the start of the **production strategy**. Direction set by `VISION_JUNE_2026.md`
> (Arsyen = a *Creative Operating System*). Detailed, sequenced execution lives in
> `task.md`; design law in `DESIGN_LANGUAGE.md`; architecture in `SUPERARCHITECTURE.md`.

---

## 1. Platform strategy & phasing

| Surface | Phase 1 scope | Why |
|---|---|---|
| **macOS app** | **COMPLETE feature set — build this FIRST** | The primary creation environment; the Creative-OS experience is desktop-native. |
| **Web app** | **Limited features** | Public reach, sharing, published Canvas/portfolios, light Work access. Built from the React design-system kit. |
| **iOS app** | **Later** | Companion/consumption first; full creation later. Architected for now, implemented after macOS ships. |

**Rule:** macOS is the lead target. Web is the trimmed companion. iOS is deferred but
must not be designed out — keep the Flutter codebase iOS-ready (no Mac-only assumptions
that can't be adapted).

## 2. The four planes (multi-repo ecosystem)

| Plane | Repo | Stack | Role | State |
|---|---|---|---|---|
| **Platform** | `arsyen-platform` | Flutter + Go | Identity, **Work**, Assets, the shell | POC live, evolving |
| **Canvas** | `arsyen-canvas-engine` | TS monorepo | Experience creation + publishing (a platform primitive) | Docs only, 0 code |
| **Research** | `arsyen-research-platform` | TS (pnpm/turbo) | Knowledge production | Built |
| **Generative** | `arsyen-generative-engine` | TBD | AI execution: agents, reasoning, model gateway | Repo created 2026-06-13, bootstrapping |

The unifying contract is the **Canvas Schema** (source of truth). Every seam is built
around it: Assets *referenced* in, Research *adapted* in, Generative *patches* it,
Publishing *renders* it.

## 3. POC → Production: what changes

The POC proved the vertical slices (identity, assets, profile, projects, the liquid-glass
shell — see `task_poc.md`). Production means raising the bar on:
- **Coherent IA** — Projects becomes **Work** (a container; object-selector + persistent
  workspace; in-context, synchronized views; fullscreen as state, not route).
- **Native quality** — macOS-first: real SF type, native window chrome, performance,
  packaging, signing, notarization, auto-update.
- **The design system as law** — `design-system/` tokens/components drive both Web (React)
  and Flutter (Mac/iOS); `DESIGN_LANGUAGE.md` is the written contract.
- **Canvas as a real engine** — extracted to its own repo, schema-first.
- **Operational readiness** — observability, error budgets, migrations discipline,
  entitlements/permissions, distribution pipelines.

## 4. Phased plan

### Phase 0 — Contracts & toolchain *(in progress)*
- macOS toolchain ✅ (Xcode 26.5, CocoaPods 1.16.2) — first `flutter build macos` validating.
- Design-system **token port to Flutter** ✅ (pure-black base, SF type, coral `#ff555d`).
- Single source-of-truth consolidation ✅ (`docs/`).
- **Canvas:** scaffold the TS monorepo (pnpm/turbo/biome, matching research-platform) and
  define **`canvas-schema`** — the contract everything else depends on.
- **Decide the gating questions** in §5 before they block later phases.

### Phase 1 — macOS (complete) + Web (limited) + Work
Two platform tracks in parallel, plus the Canvas read-path:
- **macOS app:** finish the native shell (window chrome, entitlements incl. network client,
  packaging), complete-feature parity with the design-system Mac UI kit.
- **Work workflow:** Projects→Work — object-selector left panel, persistent workspace,
  Overview/Board/Action Plans/Files/Activity/Settings as views of one object, synchronized
  task selection across views, fullscreen as a workspace state.
- **Web app (limited):** ship the React design-system kit as the public/companion surface
  (auth, profile/portfolio view, published Canvas, light Work read).
- **Canvas read-path:** `canvas-renderer` renders a hand-authored schema into a
  vertical-scroll experience; `publishing-engine` serves `/username/<slug>`.

### Phase 2 — Authoring & embedding
- **Canvas:** `canvas-editor` (canvas-first, contextual tools, fullscreen focus),
  `template-engine` + first Experience Templates (Filmmaker/Designer portfolio).
- **Platform × Canvas:** embed Canvas as **Work ▸ Project ▸ Canvas** and make
  **Profile/Portfolio a published Canvas**; wire asset references to the Go/S3 asset store.
- **macOS distribution:** Developer ID signing + notarization; auto-update channel.

### Phase 3 — Intelligence & ingestion
- **Generative Engine:** stand up (model gateway + agents); implement the **Intent-Patch**
  flow (User→Intent→Generative→patch→Canvas mutation); AI modes Edit/Improve/Reimagine/
  Generate; auto-branch on AI redesign.
- **Canvas:** `ingestion-engine` (BYOD: HTML/Figma/screenshots/Claude-Design/Stitch →
  Canvas Schema; never store imported HTML as runtime truth); versioning/branching/merge.

### Phase 4 — Knowledge & scale
- **Research × Canvas** adapter (semantic content → experiences).
- More design/motion packs; community/marketplace components.
- **iOS app** to feature-completeness.
- Category graduation (Work → Library / Growth) once Work is mature.

## 5. Gating decisions (resolve early — they reshape the plan)
1. **How does Canvas render inside the Flutter app?** WebView embed of the TS renderer, or a
   parallel native renderer? (Rendering doc names both Web + Native runtimes.) Biggest fork.
2. **Generative Engine: stub or build, and shared with research's AI?** Recommend stubbing
   behind the intent-patch interface in P1–2; build for real in P3.
3. **Where do shared contracts live** (`canvas-schema`, intent-patch)? npm package vs submodule.
4. **Cross-repo identity & assets** — platform-owned (Go/S3); Canvas publishing keys off
   `/username`. Need token/SSO sharing + a signed-URL asset contract before P2.
5. **macOS distribution channel** — Mac App Store vs Developer-ID + notarization (direct).
   Determines entitlements, sandboxing, and enrollment timing.

## 6. Definition of "production-ready" (per surface)
Code + tests green in CI; migrations up/down clean; authz + validation + audit on every
mutation; permission-aware reads; observability (metrics/logs/traces); the UI never blanks
(loading/empty/error/just-deleted states); brand-accurate against `DESIGN_LANGUAGE.md`;
and for macOS: signed, notarized, auto-updating, sandbox entitlements correct.
