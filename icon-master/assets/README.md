# Assets

Arsyen ships very little raster — the brand leans on **type, the system icon set, and the
gradient-mesh motif**, all of which are code, not files.

## Logo / wordmark
The **arsyen** wordmark is *type-set*, not an image: lowercase, `var(--font-display)`
(SF Pro Display), weight 700, `letter-spacing: -0.04em`. White on dark; over the Living
backdrop add `text-shadow: 0 8px 60px rgba(0,0,0,.35)`. See `guidelines/cards/brand-wordmark.html`.

## Icons
The canonical icon component lives at **`ui_kits/mac/icons.jsx`** (`window.AIcon`) — a
hand-matched **Lucide**-style line set (1.5–1.6px stroke, rounded, monochrome). For production,
prefer Lucide from CDN (see `readme.md ▸ ICONOGRAPHY`). No emoji; a few Unicode glyphs
(`· — × ← ⌘ ↑`) act as typographic icons only.

> **Flagged:** the original Arsyen icon SVGs were not provided (screenshots only); `icons.jsx`
> is a faithful stand-in. Drop the real assets into `assets/icons/` to replace it.

## Imagery
The **gradient-mesh** aurora blobs are pure CSS — `.ars-mesh--{coral|ember|violet|azure|verdant}`
and `.ars-backdrop-living` in `tokens/base.css`. Use them for project covers, portfolio works,
artist-card backdrops and avatar fallbacks. Real film stills / uploaded photography were not
provided; swap them in wherever a mesh is used as a placeholder.
