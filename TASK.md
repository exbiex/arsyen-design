# Arsyen — Master Task Plan (all repos, by priority)

> **The one cross-repo plan.** It says what to build next in each plane, phase by phase, in
> priority order, and links to the detailed per-service backlogs. Phasing rationale is in
> [`ROADMAP.md`](./ROADMAP.md); the cross-repo contracts in [`ECOSYSTEM.md`](./ECOSYSTEM.md);
> design law in [`DESIGN_LANGUAGE.md`](./DESIGN_LANGUAGE.md). Updated 2026-06-14.

## Priority order (when in doubt, build in this order)
1. **Platform — macOS** (the only client; the user-facing Creative-OS). **Web is dropped (2026-06-14)** —
   no web client app; "start the app" = macOS only. iOS later (keep code iOS-ready).
2. **Canvas — schema-first read path** (the contract every other plane depends on).
3. **Research — finish the editorial pipeline** (it's the furthest along; keep its momentum).
4. **Generative — contract + stub only** (real AI is Phase 3; don't pull it forward).

## Cross-repo quality bar (every task, every repo)
Code + tests green in CI · migrations up/down clean · authz + validation + audit on mutations ·
permission-aware reads · observability · **UI never blanks** (loading/empty/error/just-deleted) ·
brand-accurate per `DESIGN_LANGUAGE.md` · reuse shared primitives (re-rolling them is a reject) ·
no N+1 · update the relevant `context/*` doc in the same change.

---

## ▶ The next task in each repo (start here)

| Repo | Next task | What it is | Backlog |
|---|---|---|---|
| **Platform** | **Breadth — port Discover / Tools / Studio / Profile** onto the B-series kit | The remaining views still run on old styling/sample data; bring them onto the shared primitives. *(Done since: B2/B3 parity, C4/C5 detail rail, **A4/A5** native chrome + identity, **C3** Settings + live Activity, **C6** the `work` module — Notes/Ideas/References CRUD. A6 distribution blocked on a paid Apple Dev account.)* | [`platform/TASKS.md`](./platform/TASKS.md) |
| **Canvas** | **E10 — Intent-Patch application** (needs Generative G1) | **Phases 1 + 2 (E1–E9) ✅ complete (2026-06-14).** P1 read path + P2 authoring/embed: `canvas-editor` (typed invertible commands + undo/redo), `template-engine` (5 domains), `component-system`, `@arsyen/canvas-bridge` + `apps/embed`, and the Flutter **WKWebView host** (Work ▸ Project ▸ Canvas) resolving assets via the reused Go signed-URL API. Next: P3 → **E10** apply Generative Intent-Patches (auto-branch). | [`canvas/TASKS.md`](./canvas/TASKS.md) |
| **Research** | **— none scheduled (Phases 0–8 ✅ COMPLETE, T-001…T-104)** | The editorial producer is **feature-complete**: content contract, AI pipeline, knowledge graph, real auth, OpenAPI spec, observability hardening, consumer onboarding, and **deploy** (one platform image + prod migrator + GHCR CI; managed + self-host paths; a published doc verified reachable via `/v1` from the built image). Phase 9+ (T-900…T-906) is **trigger-based only**. | [`research/TASKS.md`](./research/TASKS.md) |
| **Generative** | **G1 — Intent-Patch contract** (Canvas E2 ✅ shipped — `@arsyen/canvas-schema`) | Define the versioned Intent-Patch Zod contract, then **G2** stub the producer so Canvas can wire the seam with no AI. | [`generative/TASKS.md`](./generative/TASKS.md) |

---

## Phase-by-phase (cross-repo)

### Phase 0 — Contracts & toolchain  *(mostly done)*
- ✅ Platform: macOS toolchain, native chrome + identity (A4/A5), token port (B1), primitive parity (B2/B3), fonts (B4), theme layer (B5), glass (B6), Work view (C1–C6: Settings + live Activity + the `work` module — Notes/Ideas/References CRUD).
- ✅ Research: Phases 0–5 complete (T-001…T-080).
- ✅ **Docs consolidated into this hub.**
- ✅ Canvas **E1–E5** complete (scaffold + `canvas-schema` + renderer + publishing + render decision).
  Resolved `ECOSYSTEM.md §5` forks #1 (render = WebView-embed) and #3 (contract = npm `@arsyen/canvas-schema`).

### Phase 1 — macOS complete · Work · Canvas read-path · Web (limited)
**Platform** (`platform/TASKS.md`): **B2** primitive parity · **B3** specimen route · **C4**
inline task detail + cross-view focus · **C3** leftovers (Settings tab, live Overview/Activity) ·
**C6** backend deltas for new Work categories (Notes/Ideas/References) · **A4/A5** native chrome +
icon · **A6** distribution (needs paid Apple Dev). *(WS-D web — dropped.)*
**Canvas** (`canvas/TASKS.md`): **E1** scaffold · **E2** `canvas-schema` · **E3** renderer ·
**E4** publishing MVP · **E5** render decision (gating).
**Generative** (`generative/TASKS.md`): **G1** Intent-Patch contract · **G2** stub producer.
**Research** (`research/TASKS.md`): **T-081…T-085** finish the editorial pipeline (Phase 6).
**Cross-repo** (`platform/TASKS.md` WS-F): **F1** contract home · **F2** identity/asset bridge ·
**F3** generative boundary stub.

### Phase 2 — Authoring & embedding  ✅ COMPLETE (Canvas, 2026-06-14)
**Canvas:** ✅ **E6** editor · ✅ **E7** template-engine (5 domains) · ✅ **E8** component system ·
✅ **E9** platform embed (Flutter WKWebView host: Work ▸ Project ▸ Canvas; Profile = published Canvas;
asset refs resolve via the reused Go signed-URL API / F2).
**Platform:** ✅ asset refs wired to Canvas via the WebView bridge. ▶ macOS Developer-ID signing +
notarization (A6, needs paid Apple Dev) remains.
**Gating:** ✅ resolved **§5.1** = WebView-embed (E5).

### Phase 3 — Intelligence & ingestion
**Generative:** **G3** scaffold · **G4** model gateway (reuse research) · **G5** real agents → Intent-Patches.
**Canvas:** **E10** Intent-Patch application (auto-branch) · **E11** ingestion (BYOD) · **E12** versioning.
**Research:** Phase 7 knowledge graph (T-090…T-094).

### Phase 4 — Knowledge & scale
**Canvas:** **E13** full motion/design packs · **E14** Research→Canvas adapter · **E15** community components.
**Platform:** iOS to feature-completeness; category graduation (Work → Library / Growth).
**Research:** Phase 8 hardening + consumer onboarding + deploy (T-100…T-104).

---

## How "next task" is decided in each plane
- **Platform / Canvas / Generative:** top-to-bottom within the current workstream/phase in their
  `TASKS.md`; the table above names the current head.
- **Research:** follow its own protocol — `research/context/CLAUDE.md §2`: the lowest-ID `TODO`
  whose dependencies are all `DONE`. **Phases 0–8 (T-001…T-104) are all DONE — no open TODO.**
  Phase 9+ (T-900…T-906) is trigger-based; create one only when its trigger fires.
