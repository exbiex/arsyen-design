# Arsyen Canvas Engine — Task Backlog (`canvas/TASKS.md`)

> The build plan for the **Canvas** plane (TS monorepo). **Phase 1 (E1–E5) is built and green
> (2026-06-14)** — the schema-first read path is live. Per-service detail behind the master
> **[`../TASK.md`](../TASK.md)**; cross-repo phasing in `../ROADMAP.md`; the cross-repo contract
> in `../ECOSYSTEM.md`; design law in `../DESIGN_LANGUAGE.md`.
>
> **Non-negotiables (`context/CLAUDE.md`):** Content / Structure / Presentation stay separate;
> AI lives OUTSIDE the engine (Intent-Patches); assets are referenced, never stored; semantic
> sections + components; preserve branching/versioning; never auto-compact the architecture docs.

## How to use
- Work top-to-bottom within a phase; don't start a phase before the prior one's exit is met.
- Status: `[ ]` todo · `[~]` in progress · `[x]` done.
- **Definition of done:** code + tests green; `pnpm i && pnpm build && pnpm typecheck` pass;
  schema changes are versioned + migrate-on-read; the relevant `context/*` doc updated.

---

## ▶▶ CANVAS PRODUCTIZATION (V2) — active program (2026-06-14), supersedes E10+

> **Founder decisions (2026-06-14):** (1) **The Canvas surface has its own design language —
> Arsyen Azure `#2f6bf3` + Ink + Geist/Geist Mono/Newsreader** (from `raw_templates/Arsyen Canvas
> Main`). It is **scoped to the Canvas flow only** (the editor + published canvas, which open in a
> **separate window**). **The coral liquid-glass platform shell is UNCHANGED** — this is not an
> ecosystem-wide accent change. (2) Run as a **phased program**, started now, ahead of the rest of
> TASK.md. Branch: canvas `canvas-v2`. Reference design folder = high-fidelity but cosmetic.

Workstreams (sequential):
- **WS-A · Canvas design-system adoption** — `[~]` in progress. Port Azure/Ink/Geist tokens into the
  renderer (`tokens.ts`) + Minimal pack; map theme `pure-black → black`; vendor the Arsyen mark/icon.
  *Next within A:* re-skin the **editor chrome** (canvas-editor `styles.ts`, currently hardcoded coral)
  to Azure; port the published-canvas + editor kit visual language; update `canvas/context/07` +
  bring the Azure design-system into a tracked canvas location. **Platform shell is NOT touched.**
- **WS-B · Go canvas store (platform)** — `[x]` done (2026-06-14, platform `canvas-v2`). New `canvas`
  module: migration `00015` (canvases jsonb doc + visibility Public/Private/Project/Specify +
  draft/published; canvas_shares ACL table ready), owner-scoped CRUD + `POST /publish` + **My Canvas**
  list (`GET /v1/canvases`, `?project_id=` filters to a project). Integration test green. *(Specify
  read-enforcement still deferred — UI will show it; ACL is a follow-up.)*
- **WS-C · Renderer + editor rebuild** — `[x]` done (2026-06-15, canvas `canvas-v2`). The **Canvas Home homepage**
  rebuilt to the design kit (greeting + AI-intent composer, start-from chips, your-canvases library with
  search/tabs/grid-list, Arsyen bar); the **editor rebuilt to the `canvas-editor` kit verbatim** (design
  system reproduced — Ink/Azure/Geist; canvas-as-floating-page, contextual section tools, on-demand
  Sections/Inspector, editor Arsyen bar, design-pack/theme switch, inline contentEditable) + the
  **branding splash** (logo + Geist) on window open; **create opens the canvas window directly**; default
  template = the design-kit **Narrative Canvas** (+ curated category templates); **E11 ingestion**
  (`@arsyen/ingestion-engine`) turns the 17 raw `raw_templates` into **editable** canvases (deterministic
  HTML→Schema; images carried via `assetId` + painted in the editor; a "Preview" keeps the original HTML);
  and the **published reader** rebuilt to the `published-canvas` kit — `PublishedCanvas` + `reader-css`
  (DS tokens + the kit's `canvas.css`) + `reader-engine` (one rAF loop: progress, staggered reveals,
  parallax, pinned hero, auto-hiding reader bar), wired into the **embed** host.
- **WS-D · Create / publish flow (platform)** — `[x]` done (2026-06-14, platform `canvas-v2`).
  `CanvasRepository` + `myCanvasesProvider` on `/v1/canvases`; removed the E9 placeholder; **Profile
  'Create a canvas' → branding takeover → draft → title + visibility picker → publish**; **My Canvas**
  in the Arsyen bar (`/canvas/mine`); **Project ▸ Canvas** tab (listing + 'New canvas'); the **editor
  opens in its own native window** (`desktop_multi_window` → WebView → azure editor). analyze + macOS
  build/codesign green. *(Needs API restarted for routes. Editor-window **save-back** is now done: the
  editor posts edits → sub-window JS handler → `invokeMethod(0,…)` → main window's authed repo →
  `PATCH /v1/canvases/:id`; the **load** complement — reopening seeds the editor from the server doc — is
  the remaining piece.)* Detail below:
  Delete current canvas placeholders. **Profile
  overview → "Create a canvas"** → panels dissolve into the **animating Arsyen branding** → opens a
  **separate window** running the Canvas flow (the Azure design; the coral shell stays in the main
  window). Pre-publish visibility picker. On publish: appears under **Arsyen bar ▸ My Canvas** and in
  **Project ▸ <name> ▸ <Canvas title>**.
- **WS-E · Multi-tool entry** — `[x]` done (2026-06-14, both repos `canvas-v2`). Tools tiles
  (**Storyboard, Shot list, Moodboard, Portfolio**) open the canvas window seeded with the matching
  template via `/canvas/new?template=` → `openCanvasEditorWindow(template:)` → editor `?template=`
  (lands straight in that template's editor after the splash); non-canvas tools show a "coming soon"
  toast (no dead taps). Also fixed here: the **My Canvas glass crash** (`AppearanceScope` missing on the
  pushed route — wrapped like the image editor).
- **WS-F · Editing-feel + flow polish** — `[~]` in progress (2026-06-15, both repos `canvas-v2`).
  **Done:** create-a-canvas opens the window **directly** (removed the in-app create/publish page);
  Profile lists the creator's canvases with an **eye → view** in the same window; a **Tools "Arsyen
  Canvas" card**; **window chrome** fixed (slim title-bar strip → drag + traffic-light space); each
  design pack opens at its **own canvas width**; **Preview** renders the true post-publish reader;
  ingestion **section detection** splits at semantic boundaries; the **load complement** (reopen pulls
  the stored doc). **Remaining (each its own slice, several need new platform backend):** right-side
  **text + animation inspector**; **image upload + Global File Management**; the **publish destination
  chooser** (Profile Portfolio / Project / Moodboard / named draft); **live home-card thumbnails**.

**Resolved:** the Canvas flow opens in a **separate OS window** (not a takeover route), carrying the
Azure design. **Open decisions for WS-B/D (confirm before building):** Specify-sharing ACL scope;
canvas persistence shape (jsonb doc); macOS multi-window approach (Flutter `desktop_multi_window` vs a
second `flutter` engine/window).

## ▶▶ CANVAS V3 — BEAT FRAMER (system design) · active program (2026-06-16)

> **Founder decision (2026-06-16):** make the system design beat Framer on the axes its
> pixels-are-truth architecture structurally can't follow. Strategy = **moat-first depth** (stay
> narrative-first / opinionated — never a generic builder; non-goals in `context/01_CANVAS_VISION.md`).
> Commit to all four net-new primitives **as semantic primitives**: Interactions, Versioning,
> Collections, Collaboration. **Design-intent ingestion is a co-equal pillar.** This program is the
> detailed home of E13 / E11-v2 / E10 / E12 + the new E16 / E17, and re-sequences Phase 3 below by
> leverage × independence.

**Thesis:** *Framer is a design tool that outputs a website; Arsyen is a narrative engine where
meaning is the source of truth and design is a swappable, AI-directable, multi-surface interpretation.*

### Scorecard — the program's definition of done (each row is an epic's exit criterion)
| Axis | Framer | Canvas target | Epic |
|---|---|---|---|
| Instant re-skin | redesign each variant by hand | one tap re-choreographs every section | E13 |
| Scroll narrative / motion | per-element hand-wiring | declarative, pack-driven, reduced-motion, 60fps | E13 |
| AI editing | a layout you babysit | edits *meaning* via Intent-Patch; reimagine auto-branches | E10 |
| Multi-surface | exports a site | one renderer → web + in-app + Profile, pixel-identical | done (E5/E9) |
| Import / BYOD | pixel-trace, frozen | design-*intent* recovery → editable template | E11-v2 |
| Version control | linear history | semantic snapshot / branch / merge; branch-before-AI | E12 |
| Collections | CMS | semantic collections — one design drives N items | E16 |
| Collaboration | multiplayer | CRDT multiplayer on the semantic graph | E17 |
| Taste by default | blank canvas | controlled variation; every output on-brand | E13 |

### Order (leverage × independence)
**E13 → E11-v2 → E10 → E12 → E16 → E17.** E13 + E11-v2's deterministic core ship now (no external
dep) and carry both the re-skin demo and the import story. E10 + ingestion's AI refinement need
Generative **G1**. E17 needs a platform WS seam. E16–E17 span the Phase 3→4 boundary.

### E13 (elevated) · Design-Pack Depth + Scroll Narrative Engine + Interactions layer  ★ the headline
- **Status:** [~] (schema spine + Editorial pack done 2026-06-16; remaining: Cinematic / Apple-Narrative /
  Experimental packs + wiring the Interactions contract into the reader-engine) · **Depends on:** —
  (buildable now) · **Ref:** `context/18_CANVAS_INTERACTION_MODEL.md`,
  `11_CANVAS_MOTION_ENGINE.md`, `07_CANVAS_DESIGN_SYSTEM.md`, `../DESIGN_LANGUAGE.md §Canvas`
- **Goal:** make the moat *visible* — flip an experience's whole design language in one tap.
- **Scope:** (1) **Interactions concern** — new `canvas-schema/src/interactions.ts` (declarative
  Behavior union keyed by section), wire into `Canvas`, bump `SCHEMA_VERSION` 1→2 + migrate-on-read.
  (2) **Design Pack Engine** — `packages/design-packs`: real Editorial / Cinematic / Apple-Narrative /
  Experimental packs (token set + layout grammar + motion binding); Minimal already wired. (3) wire
  the four packs + the Interactions contract into the WS-C reader-engine (the rAF loop already runs
  the choreography — give it the schema to read).
- **Acceptance:** one-tap Minimal⇄Editorial⇄Cinematic re-skin re-choreographs every section;
  reduced-motion honored; unknown behavior degrades; round-trip + v1→v2 migrate tests green.

### E11-v2 · Design-intent ingestion (Stitch / Claude Design → Arsyen template)  ★ co-equal pillar
- **Status:** [ ] · **Depends on:** E13 (for correct re-render; deterministic core has no AI dep) ·
  **Ref:** `context/15_CANVAS_INGESTION_ENGINE.md`
- **Goal:** recover design DNA, not just text — mint an editable, restyleable Arsyen **template**.
- **Scope:** L0 source adapters → DesignHints (parse the Stitch/Claude `tailwind-config`); L1 extend
  `collect()` (grid→gallery/collection, hero detection); **L2 deterministic presentation classifier**
  DesignHints → {theme, designPack, motion}; L3 template synthesis (editable slots + assetId
  placeholders, `meta.templateRef`); L4 register assets + keep original HTML/screen.png as side-by-side
  Preview. Deltas vs v1: infer presentation (not passed in via `IngestOptions`); register assets (not
  `assetId: src`).
- **Acceptance:** all 17 `raw_templates/` ingest into the correct {theme, designPack} with editable
  slots; classifier output snapshot-tested; side-by-side fidelity ≥ threshold.

### E10 · Intent-Patch application (AI edits meaning)
- **Status:** [ ] · **Depends on:** Generative **G1** (stub the interface now) · **Ref:**
  `12_CANVAS_AI_INTEGRATION.md`, `generative/context/`
- **Scope/Acceptance:** apply a typed mutation plan via the **same invertible-command path** as human
  edits (E6); modes Edit / Improve / Reimagine / Generate; **Reimagine auto-branches** (hooks E12);
  AI never mutates directly. Patch applies, undo/redo works, reimagine creates a branch.

### E12 · Versioning — snapshot / branch / merge
- **Status:** [ ] · **Depends on:** — · **Ref:** `16_CANVAS_VERSIONING.md`
- **Scope:** `packages/versioning-engine` — Snapshot / Branch over the doc; three-way merge on the
  section graph (tractable via stable ids); `meta` gains `branchRef` / `snapshotRef`; branch-before-AI
  hook for E10.
- **Acceptance:** snapshot + branch + a clean three-way merge of divergent section edits.

### E16 (new) · Collections / data-binding (semantic CMS-lite)
- **Status:** [ ] · **Depends on:** E13 · **Ref:** `19_CANVAS_DATA_BINDING.md`
- **Scope:** `CollectionContent` kind (`content.ts`) + `Section.binding` (`structure.ts`); renderer
  expands the item template per record; sources include ingestion (card-grid→collection) + Research.
- **Acceptance:** a work-index / blog-index renders N items from one bound design; pack-swap restyles all.

### E17 (new) · Real-time collaboration (CRDT)
- **Status:** [ ] · **Depends on:** platform WS sync seam · **Ref:** `20_CANVAS_COLLABORATION.md`
- **Scope:** `packages/collaboration-engine` — CRDT over content store + structure graph; editor
  commands → ops; presence at section/component granularity. Heaviest; sequenced last.
- **Acceptance:** two clients edit different nodes → converge; same-field edits resolve without loss.

## Stack (target, mirror research-platform's toolchain)
Node 22 · TS strict · ESM · pnpm workspace + Turborepo · Biome · Zod for the schema contract.
Packages (`context/17_CANVAS_SETUP.md`): `canvas-schema · canvas-renderer · canvas-editor ·
motion-engine · template-engine · publishing-engine · ingestion-engine`.

---

## PHASE 1 — Schema-first bootstrap (the read path)  ★  ✅ COMPLETE (2026-06-14)

> Decisions locked: renderer stack **React + CSS tokens**; in-app render **WebView-embed** (E5);
> contract home **npm `@arsyen/canvas-schema`**. Packages built: `canvas-schema`, `canvas-renderer`,
> `motion-engine`, `publishing-engine` (+ `apps/playground`); `canvas-editor`/`template-engine`/
> `ingestion-engine` scaffolded as stubs. `pnpm build · typecheck · lint · test` all green (22 tests).

### E1 · Monorepo scaffold
- **Status:** [x]  (done 2026-06-14) · **Depends on:** — · **Ref:** `context/17_CANVAS_SETUP.md`, `../INFRA_PORTS.md`
- **Goal:** a working monorepo skeleton matching the research-platform toolchain.
- **Scope:** root `package.json` (pnpm workspaces) + `pnpm-workspace.yaml` + `turbo.json`;
  `tsconfig.base.json` (strict, ESM, Node 22); Biome; empty `packages/{canvas-schema,
  canvas-renderer,canvas-editor,motion-engine,template-engine,publishing-engine,ingestion-engine}`
  + `apps/*`; `.nvmrc`; CI skeleton; compose on the **canvas port lane** (pg 5434 / redis 6381 /
  minio 9004-9005, dev servers 3200-3299).
- **Acceptance:** `pnpm i && pnpm build && pnpm typecheck && pnpm lint` green on the empty graph.

### E2 · `canvas-schema` — the universal contract  ★
- **Status:** [x]  (done 2026-06-14) · **Depends on:** E1 · **Ref:** `context/05_CANVAS_SCHEMA_MODEL.md`,
  `04_CANVAS_DOMAIN_MODEL.md`, `02_CANVAS_PRINCIPLES.md`
- **Goal:** the versioned graph everything depends on — Zod-defined, deriving TS types + JSON Schema.
- **Scope:** `Canvas → Sections → Components → Asset refs`; **Content / Structure / Presentation
  separated**; section semantic identity + renderer ref + motion-profile ref; component semantic
  identity + data contract + editing rules + AI rules; design-pack ref; metadata + publishing block;
  `SCHEMA_VERSION` + a migrate-on-read registry (identity entry). Validate a hand-authored sample;
  round-trip JSON; emit `dist/schema.json`.
- **Acceptance:** the sample canvas validates and round-trips; `dist/schema.json` is valid JSON Schema.
- **Note:** contract home **DECIDED** — published as the npm package **`@arsyen/canvas-schema`**
  (versioned; emits `dist/schema.json` for non-TS consumers). Registry publish happens at P2 cross-wiring.

### E3 · `canvas-renderer` (web runtime)
- **Status:** [x]  (done 2026-06-14 — React renderer + `motion-engine` Minimal pack) · **Depends on:** E2 · **Ref:** `context/06_CANVAS_RENDERING_MODEL.md`,
  `07_CANVAS_DESIGN_SYSTEM.md`, `11_CANVAS_MOTION_ENGINE.md`
- **Goal:** render a schema to a vertical-scroll experience.
- **Scope:** render a sample schema with **one design pack** (Minimal) + the **Minimal motion
  pack**; renderer owns layout/interactions/accessibility/responsive/performance; honor
  reduced-motion. Uses the `../DESIGN_LANGUAGE.md` tokens.
- **Acceptance:** the sample renders; reduced-motion respected; unknown component degrades gracefully.

### E4 · `publishing-engine` (MVP)
- **Status:** [x]  (done 2026-06-14 — Hono SSR) · **Depends on:** E3 · **Ref:** `context/14_CANVAS_PUBLISHING_MODEL.md`
- **Goal:** serve a rendered canvas on the open web.
- **Scope:** serve a static published canvas at `/username/<slug>` (+ `/username`, `/username/me`);
  visibility Private / Restricted / Public. No editor/AI yet.
- **Acceptance:** a static published canvas loads end-to-end for an anon viewer.

### E5 · Rendering decision (gating)
- **Status:** [x]  (done 2026-06-14 — **WebView-embed**) · **Depends on:** E3 · **Ref:** `../ECOSYSTEM.md §5.1`
- **Goal:** decide **WebView-embed vs native renderer** for the Flutter app; document it.
- **Acceptance:** decision recorded in `context/06_CANVAS_RENDERING_MODEL.md` + `../ECOSYSTEM.md`.
  **Blocks** Canvas-in-Work (Phase 2).

---

## PHASE 2 — Authoring & templates  ✅ COMPLETE (2026-06-14)

> Decisions: editor data = localStorage + JSON import/export; templates = all 5 domains; E9 = full
> cross-repo. New packages `component-system` + `canvas-bridge`; new apps `editor` + `embed`.
> Canvas repo `build · typecheck · lint · test` green; platform macOS app **builds + codesigns** with
> the WebView host; `go build` clean.

- **E6 · `canvas-editor`** — [x] done. Canvas-first editing through **typed, invertible commands
  (undo/redo)** — the same apply path AI Intent-Patches will use (E10). Layers + palette + inspector
  + live click-to-select preview; localStorage autosave + JSON import/export; `apps/editor`. AI + BYOD
  modes stubbed (Phase 3). Ref `context/08_CANVAS_EDITOR_MODEL.md`.
- **E7 · `template-engine` + Experience Templates** — [x] done. Template = Creator Domain + Content
  Model + Structure + Presentation + Motion; lifecycle Template → Canvas Instance → Detached
  (`meta.templateRef`). Ships **all 5 domains** (Filmmaker / Designer / Writer / Musician / Studio).
  Ref `09_CANVAS_TEMPLATE_SYSTEM.md`.
- **E8 · `component-system`** — [x] done. Atomic + composite (preset-section) components; user
  components (save / reuse / version) with id re-mapping. Ref `10_CANVAS_COMPONENT_SYSTEM.md`.
- **E9 · Platform embed** — [x] done (**full cross-repo**). `@arsyen/canvas-bridge` (host↔canvas
  protocol) + `apps/embed` (WebView bundle, asset-resolver seam) on the canvas side; on the platform
  side a Flutter **WKWebView host** (`flutter_inappwebview`) wired into **Work ▸ Project ▸ Canvas**
  (route `/canvas`, entry in the Work view) that resolves asset refs via the existing **Go signed-URL
  asset API (F2, reused)**. Profile-as-published-Canvas reuses the same surface. Ref `06` + `../ECOSYSTEM.md §3/§5`.

## PHASE 3 — Intelligence & ingestion
> **Re-sequenced by the V3 "Beat Framer" program above** (E13 → E11-v2 → E10 → E12 → E16 → E17) —
> full detail there; summary here.
- **E13 · Design-Pack Depth + Scroll Narrative Engine + Interactions** — *now the lead epic;* the
  one-tap re-skin demo. No external dep. Ref `18_CANVAS_INTERACTION_MODEL.md`, `11_CANVAS_MOTION_ENGINE.md`.
- **E11-v2 · Design-intent ingestion** — Claude Design / Stitch / Figma / screenshots → DesignHints →
  design-pack classification → editable **template**; **never store imported markup as runtime truth.**
  Ref `15_CANVAS_INGESTION_ENGINE.md`.
- **E10 · Intent-Patch application** — AI edits *meaning*; **redesigns auto-branch**; AI never mutates
  directly; needs Generative **G1**. Ref `12_CANVAS_AI_INTEGRATION.md`, `generative/context/`.
- **E12 · Versioning** — snapshot / branch / merge. Ref `16_CANVAS_VERSIONING.md`.
- **E16 · Collections / data-binding** (Ref `19`) · **E17 · Real-time collaboration** (Ref `20`;
  Phase 3→4 boundary, needs a platform WS seam).

## PHASE 4 — Knowledge & community
- **E14 · Research → Canvas adapter** — semantic content → experiences; no presentation logic
  crosses. Ref `13_CANVAS_RESEARCH_INTEGRATION.md`.
- **E15 · Community / marketplace components.**

---

## Immediate next
Phases 1 + 2 (E1–E9) and the V2 productization program are **complete**. The **V3 "Beat Framer"
program** (above) re-sequences Phase 3: **E13** (design-pack depth + Scroll Narrative Engine +
Interactions — the one-tap re-skin demo; the lead epic; no external dep) → **E11-v2** (design-intent
ingestion; deterministic core has no AI dep) → **E10** Intent-Patch (needs Generative **G1**) → **E12**
versioning → **E16** collections → **E17** collaboration. **First build slice:** the E13 schema spine —
`canvas-schema/src/interactions.ts` + `Canvas` wiring + `SCHEMA_VERSION` 1→2 migrate, plus
`packages/design-packs` with **Editorial** as the first non-Minimal proof (Minimal⇄Editorial re-skin).

Run locally (canvas repo): `pnpm playground` (renderer, :3200) · `pnpm --filter @arsyen/editor-app dev`
(editor, :3201) · `pnpm --filter @arsyen/embed-app dev` (embed, :3202) · `pnpm publish:dev`
(publishing, :3210). In-app Canvas: run the embed dev server, then the macOS app (Work ▸ Project ▸ the
Canvas chip → `/canvas`).
