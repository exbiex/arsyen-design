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
- **WS-B · Go canvas store (platform)** — `[ ]`. New `canvas` Go module: migrations (canvases +
  shares), create/save, **list-by-user (My Canvas)**, list-by-project, publish, **visibility
  Public / Private / Project-only / Specify** (Specify = per-person ACL). Tests. Endpoints under `/v1`.
- **WS-C · Renderer + editor rebuild** — `[ ]`. Rebuild the published renderer to the kit (rAF scroll
  engine: pinned hero, parallax, reveals) + the editor to the canvas-editor kit (contextual tools,
  on-demand Sections/Inspector, design-pack switch). **Editor canvas gallery** (cards of all available
  canvases, not just the template) — task §3.
- **WS-D · Create / publish flow (platform)** — `[ ]`. Delete current canvas placeholders. **Profile
  overview → "Create a canvas"** → panels dissolve into the **animating Arsyen branding** → opens a
  **separate window** running the Canvas flow (the Azure design; the coral shell stays in the main
  window). Pre-publish visibility picker. On publish: appears under **Arsyen bar ▸ My Canvas** and in
  **Project ▸ <name> ▸ <Canvas title>**.
- **WS-E · Multi-tool entry** — `[ ]`. The Canvas surface is invoked from **Storyboard, Shot List**,
  etc. (those tools stand up as entry points).

**Resolved:** the Canvas flow opens in a **separate OS window** (not a takeover route), carrying the
Azure design. **Open decisions for WS-B/D (confirm before building):** Specify-sharing ACL scope;
canvas persistence shape (jsonb doc); macOS multi-window approach (Flutter `desktop_multi_window` vs a
second `flutter` engine/window).

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
- **E10 · Intent-Patch application** — apply a mutation plan from the Generative plane to the
  graph; **AI redesigns auto-branch**; AI never mutates directly. Ref `12_CANVAS_AI_INTEGRATION.md`,
  `generative/context/`.
- **E11 · `ingestion-engine` (BYOD)** — Claude Design / Google Stitch / Figma / HTML / Framer /
  Webflow / screenshots → Canvas Schema; **never store imported HTML as runtime truth.**
  Ref `15_CANVAS_INGESTION_ENGINE.md`.
- **E12 · Versioning engine** — history / snapshots / branches / merge. Ref `16_CANVAS_VERSIONING.md`.
- **E13 · Full motion-engine + design-pack set** — Editorial / Cinematic / Apple-Narrative /
  Experimental packs; the full Scroll Narrative Engine. Ref `11_CANVAS_MOTION_ENGINE.md`,
  `../DESIGN_LANGUAGE.md §Canvas design`.

## PHASE 4 — Knowledge & community
- **E14 · Research → Canvas adapter** — semantic content → experiences; no presentation logic
  crosses. Ref `13_CANVAS_RESEARCH_INTEGRATION.md`.
- **E15 · Community / marketplace components.**

---

## Immediate next
Phases 1 + 2 (E1–E9) are **complete**. Next is **Phase 3 → E10 Intent-Patch application** (apply a
mutation plan from the Generative plane to the graph; AI redesigns auto-branch; AI never mutates
directly) — it needs Generative **G1** (the Intent-Patch contract). Then E11 ingestion (BYOD) · E12
versioning · E13 full motion/design packs.

Run locally (canvas repo): `pnpm playground` (renderer, :3200) · `pnpm --filter @arsyen/editor-app dev`
(editor, :3201) · `pnpm --filter @arsyen/embed-app dev` (embed, :3202) · `pnpm publish:dev`
(publishing, :3210). In-app Canvas: run the embed dev server, then the macOS app (Work ▸ Project ▸ the
Canvas chip → `/canvas`).
