# Ingestion Engine

Inputs:
- Claude Design
- Google Stitch
- Figma
- HTML
- Framer
- Webflow
- Screenshots

Everything converts into Canvas Schema.
Never store imported HTML as runtime truth.

---

## The insight (why this beats Framer's import)
Framer import is a **pixel-trace**: a frozen copy you can't edit in *meaning*. Stitch and Claude
Design emit **presentation-rich, semantically-shallow** HTML (Tailwind utility soup + a bespoke token
config + Google Fonts + a `screen.png` render). So conversion is a **classification + mapping**
problem, not a reproduction problem — we don't reproduce their CSS, we **recover their design DNA**
and pick the nearest Arsyen design-pack / theme / motion, then let our renderer re-interpret. The
result is an editable, restyleable, AI-improvable, versioned **template** — a living Arsyen object.

E11-v1 (`ingestion-engine/src/ingest.ts`) extracts semantic content correctly but discards all design
intent (everything lands flat Minimal). **E11-v2** adds the design-intent layers below.

## Pipeline (L0–L4)
- **L0 · Source adapters → normalized DOM + DesignHints.** Per source. Claude Design / Stitch: parse
  the `<script id="tailwind-config">` block to recover palette + font pairing directly. Emit
  `DesignHints = { palette, fontPairing, density, hasSerif, accentSaturation, darkness, imageDensity }`.
  Figma (REST) + screenshot (vision) are later adapters on the same seam — this realizes the
  **Content Adapters** named in 03.
- **L1 · Semantic extraction.** Extend the existing `collect()` DOM walk — drop chrome; add grid/card
  repetition → `gallery` / `work-index` (or a **collection**, see 19), hero detection, figure+caption.
- **L2 · Presentation inference (the crux).** Deterministic classifier `DesignHints → { theme,
  designPack, motionProfile }` with a confidence per axis (rules-first, no AI): background darkness →
  theme; serif display + generous leading → editorial; full-bleed heavy-contrast imagery → cinematic;
  centered + soft + whitespace → apple-narrative; high-saturation / asymmetric → experimental.
- **L3 · Template synthesis.** Wrap as a **Template** (not a one-off Canvas) via the E7 lifecycle:
  text → editable slots, images → `assetId` placeholders, set `meta.templateRef`.
- **L4 · Assets + fidelity guard.** Register external `src` in the platform asset store → swap to
  `assetId` (the E9 asset seam). Keep the original HTML + `screen.png` as a side-by-side **Preview
  reference** — the schema stays the only runtime truth.

## Optional AI refinement (stays outside the engine)
Later, the Generative plane scores `screen.png` against the 5 packs and returns an **Intent-Patch**
that *sets presentation* (never raw CSS). AI never mutates the graph directly.

## Two deltas vs E11-v1
1. Presentation is **inferred** (L2), not passed in via `IngestOptions`.
2. Assets are **registered**, not `assetId: src` (the URL-as-id shortcut at `ingest.ts:147`).

## Milestone / test corpus
The 17 `raw_templates/` (Blogs / Moodboards / Art Profiles / Storyboard / General) are the corpus.
Target: every template ingests into the **correct** design-pack/theme with editable slots; side-by-side
fidelity ≥ threshold.

## Non-negotiables
- Imported HTML/Figma/Stitch/screenshots are **import formats only** — schema generates HTML, never
  the reverse.
- Content / Structure / Presentation stay separate in the output.
- Assets referenced, never stored.
