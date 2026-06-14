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

## PHASE 2 — Authoring & templates
- **E6 · `canvas-editor`** — canvas-first editing; tools appear contextually; fullscreen focus;
  layers + inspector as on-demand surfaces; editing modes Template / Blank / AI / BYOD / Hybrid.
  Ref `context/08_CANVAS_EDITOR_MODEL.md`.
- **E7 · `template-engine` + first Experience Templates** — Template = Creator Domain + Content
  Model + Structure + Presentation + Motion; lifecycle Template → Canvas Instance → Detached
  Canvas; ship Filmmaker + Designer portfolio templates. Ref `09_CANVAS_TEMPLATE_SYSTEM.md`.
- **E8 · `component-system`** — atomic + composite components; user components (save / reuse /
  version). Ref `10_CANVAS_COMPONENT_SYSTEM.md`.
- **E9 · Platform embed** — Canvas as **Work ▸ Project ▸ Canvas**; **Profile/Portfolio = a
  published Canvas**; wire asset refs to the platform Go/S3 store (`../ECOSYSTEM.md §3 Assets`).

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
Phase 1 (E1–E5) is **complete**. Next is **Phase 2 → E6 `canvas-editor`** (canvas-first authoring,
mutating the graph through the same `@arsyen/canvas-schema` contract). E9 (platform embed) will build
the Flutter ↔ WebView bridge per the E5 decision. Run locally: `pnpm playground` (renderer) ·
`pnpm publish:dev` → http://localhost:3210/aurelia/aurelia-reel (publishing).
