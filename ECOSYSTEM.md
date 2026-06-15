# Arsyen — Ecosystem Architecture (cross-repo SoT)

> How the four planes fit together, the **Canvas Schema** contract that binds them, and
> the seams across repos. This is the cross-repo layer; each plane's *internal* architecture
> lives in its own `*/context/` (platform `SUPERARCHITECTURE.md`, canvas `03_…`, research
> `DECISIONS_CONTEXT.md`). Read this before building anything that crosses a repo boundary.

---

## 1. The four planes

```
                         ┌───────────────────────────────────────────┐
                         │  arsyen-platform  (Flutter + Go)           │
                         │  Identity · Work · Assets · the OS shell   │
                         │  the surfaces the user actually touches    │
                         └───────────────┬───────────────────────────┘
                                         │ embeds / publishes / references
            ┌────────────────────────────┼────────────────────────────┐
            ▼                            ▼                             ▼
┌───────────────────────┐  ┌───────────────────────┐  ┌───────────────────────────┐
│ arsyen-canvas-engine  │  │ arsyen-research-      │  │ arsyen-generative-engine  │
│ (TS monorepo)         │  │ platform (TS/NestJS)  │  │ (TS, planned)             │
│ experience creation   │  │ knowledge production  │  │ AI execution:             │
│ + publishing.         │  │ research→draft→review │  │ agents · reasoning ·      │
│ THE Canvas Schema     │◄─┤ →approve→publish      │  │ model gateway ·           │
│ is owned here.        │  │ emits semantic docs   │  │ Intent-Patch producer     │
└──────────┬────────────┘  └───────────────────────┘  └────────────┬──────────────┘
           │  renders / is patched by                              │
           └───────────────────  Intent-Patch  ◄───────────────────┘
```

- **Platform** owns identity, the **Work** workflow, the global **Asset** library, and the
  liquid-glass OS shell. It is the only plane the end user directly operates. macOS-first.
- **Canvas** is a **platform primitive**, extracted to its own repo: the universal engine for
  portfolios, blogs, moodboards, decks, sites, project canvases, story worlds — any vertical
  narrative experience. It owns the **Canvas Schema**, the renderer, the editor, the
  template/motion/design-pack engines, publishing, ingestion (BYOD), and versioning.
- **Research** is a **standalone producer** of semantic, versioned, self-contained documents
  (it predates and is independent of the rest; "not part of Arsyen" in its own framing). Its
  output is *adapted* into Canvas experiences and feeds the future blog/feed/newsletter.
- **Generative** is the **AI execution plane**: agents, reasoning, a model-agnostic gateway,
  and the **Intent-Patch** producer. AI lives **outside** Canvas — it never mutates the graph
  directly; it proposes patches the Canvas Engine applies.

## 2. The unifying contract — the Canvas Schema

The **Canvas Schema** is the source of truth for any experience. Everything is built around it.

- **Architecture:** `Canvas → Sections → Components → Asset refs`, plus `Motion`,
  `Interactions`, `Behaviors`. (Platform `VISION_JUNE_2026.md` §Canvas; canvas `05_CANVAS_SCHEMA_MODEL.md`.)
- **Three layers stay independent — never merged:** **Content** (semantic data) ·
  **Structure** (sections/components graph) · **Presentation** (themes + design packs +
  motion profiles). This separation is a Canvas non-negotiable.
- **Interactions are a fourth independent concern** (declarative scroll/behavior, keyed by section —
  canvas `18`); **Collections** add semantic data-binding (one design drives N items — canvas `19`).
  Both stay separate from content/structure/presentation. `SCHEMA_VERSION` 1→2 introduces interactions.
- **Sections are semantic experience objects; Components are first-class objects** with a data
  contract, editing rules, and AI rules. Semantic identity (not styling) is what's stored.
- **Versioned + backward-compatible**, migrate-on-read; branching before large AI changes.
- **Assets are referenced, never embedded.** The schema carries asset *refs* (IDs); the bytes
  live in the platform's global asset store.

### The critical rule (BYOD)
Uploaded HTML/Figma/Stitch/screenshots are **import formats only**. The Canvas Schema is the
truth; **schema generates HTML, never the reverse.** This preserves editability, AI generation,
versioning, migration, and template evolution.

## 3. The seams (cross-repo contracts)

| Seam | Producer → Consumer | Contract | Status |
|---|---|---|---|
| **Assets** | Platform (Go/S3) → Canvas | signed-URL asset references; Canvas stores ref IDs, resolves to presigned URLs | ✅ **built** — reuses the platform `assets` module (`GET /v1/assets/{id}` presigned `url`); resolved over the embed bridge (E9) |
| **Research → Canvas** | Research → Canvas | semantic content (Research's versioned doc envelope) *adapted* into Canvas sections/components — **no presentation logic crosses** | designed (canvas `13`), to build (P4) |
| **Generative → Canvas** | Generative → Canvas | **Intent-Patch**: `User → Intent → Generative → patch → Canvas mutation plan → graph`. AI modes Edit / Improve / Reimagine / Generate; AI redesign auto-branches | designed (canvas `12`, generative context), to build (P3) |
| **Canvas → Platform** | Canvas → Platform | Canvas embedded as **Work ▸ Project ▸ Canvas**; **Profile/Portfolio is a published Canvas** | ✅ **built (E9)** — Flutter WKWebView host (`flutter_inappwebview`) + `@arsyen/canvas-bridge` protocol + `apps/embed`; route `/canvas`, entry in the Work view |
| **Publishing** | Canvas → web | render a Canvas at `/username`, `/username/me`, `/username/<slug>` | designed (canvas `14`), MVP `E4` |
| **Identity / SSO** | Platform → all | token/SSO sharing so Canvas/Research key off the platform user; publishing keys off `/username` | to build (platform `F2`) |
| **Collaboration** | Canvas ↔ Platform | CRDT presence/sync over the semantic graph; a platform WS sync server (auth off the platform user, rooms keyed by canvas id) | designed (canvas `20`), to build (E17) |
| **Ingestion adapters** | external tools → Canvas | Stitch / Claude Design / Figma / screenshot → DesignHints → design-pack classification → editable template; imported markup never stored as truth | designed (canvas `15`), v1 built; design-intent = E11-v2 |

### Where shared contracts live (open — gating decision)
`canvas-schema` and the Intent-Patch protocol are shared by ≥2 repos. Decide **npm package vs
git submodule** before Phase 2 cross-wiring (platform `F1`, ROADMAP gating §1). Recommendation:
publish `@arsyen/canvas-schema` from the canvas repo as a versioned package (mirrors how
research publishes `@arsyen-research/content-schema`).

## 4. Internal architecture per plane (pointers, not duplication)

- **Platform** — Go **modular monolith** (not microservices), Postgres + Redis + S3, Flutter
  client, AWS ap-south-1. ACID core, soft-delete + audit, universal versioning, permission-aware
  everywhere. Full detail: `platform/context/SUPERARCHITECTURE.md`. Quality bar:
  `platform/context/ENGINEERING.md`.
- **Canvas** — TS monorepo; packages `canvas-schema · canvas-renderer · canvas-editor ·
  motion-engine · template-engine · publishing-engine · ingestion-engine`. Non-negotiables:
  `canvas/context/CLAUDE.md`. Full detail: `canvas/context/03_CANVAS_SUPERARCHITECTURE.md`.
- **Research** — NestJS monolith (API + workers), Drizzle + Postgres/pgvector, BullMQ/Redis,
  R2; the spine is `@arsyen-research/content-schema`. Eleven invariants in
  `research/context/CLAUDE.md §3`; deep architecture in `research/context/DECISIONS_CONTEXT.md`.
- **Generative** — model-agnostic gateway (`Agent → Model Gateway → Provider adapter`, model
  choice is config) + Intent-Patch producer. **Note the overlap:** research already built a
  production model gateway (its `model-gateway` module, T-060…T-067). The Generative plane
  should **extract/share** that pattern, not reinvent it — see ROADMAP gating §2 and
  `generative/context/`.

## 5. The big open forks (resolve early — they reshape the plan)

1. ~~**How does Canvas render inside the Flutter app?**~~ **RESOLVED 2026-06-14 (E5): WebView-embed**
   of the TS renderer (`@arsyen/canvas-renderer`) in WKWebView — one renderer, pixel-identical web +
   app, motion driven imperatively for 60fps. Native renderer kept as a later escape hatch (schema
   is renderer-agnostic). Rationale + Phase-2 bridge implications: `canvas/context/06_CANVAS_RENDERING_MODEL.md`.
2. **Generative: stub or build, and is it shared with Research's gateway?** Recommend stubbing
   behind the Intent-Patch interface in P1–P2; build for real in P3, reusing Research's gateway.
3. ~~**Where do shared contracts live** (`canvas-schema`, Intent-Patch)?~~ **RESOLVED 2026-06-14:
   npm package.** `canvas-schema` is published as **`@arsyen/canvas-schema`** from the canvas repo
   (versioned, `dist/schema.json` JSON-Schema artifact for non-TS consumers); the Intent-Patch
   contract will follow the same pattern. Package built in E2; actual registry publish at P2 cross-wiring.
4. **Cross-repo identity & assets** — platform-owned (Go/S3); Canvas publishing keys off
   `/username`. Need token/SSO sharing + a signed-URL asset contract before P2.
5. **macOS distribution channel** — Mac App Store vs Developer-ID + notarization (direct).

## 6. Local infra
Each repo gets a distinct Compose project name + host-port lane so the dev stacks coexist —
see **[`INFRA_PORTS.md`](./INFRA_PORTS.md)**. Platform pg 5432 / redis 6379 / minio 9000-9001;
research pg 5433 / redis 6380 / minio 9002-9003; canvas + generative lanes reserved.
