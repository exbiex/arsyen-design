# Interaction Model

Interactions are the **fourth independent concern** — behavior, kept separate from Content,
Structure and Presentation. Never merged with any of them.

Interactions are **declarative semantic behavior**, not an imperative per-element timeline (that is
how Framer works). The author declares *what a section does as the reader scrolls*; the renderer +
motion-engine decide *how*. This is what lets one design-pack swap re-choreograph an entire canvas.

## Where it lives
- New top-level optional concern on the Canvas: `interactions?` (alongside `content` / `structure`
  / `presentation`). Keyed by **section id**, mirroring `SectionPresentation`.
- Adding it bumps `SCHEMA_VERSION` 1 → 2 with a migrate-on-read entry (empty `interactions`).

## Shape
```
Behavior = discriminatedUnion("on", [
  { on: "scroll-progress", do: "parallax" | "pin" | "reveal" | "scale" | "fade",
    target?: componentId, range?: [number, number], intensity?: number },
  { on: "in-view",        do: "stagger-reveal", staggerMs?: number, threshold?: number },
  { on: "chapter-enter",  do: "transition", style?: string },
])

Interactions = { sections: Record<sectionId, { behaviors: Behavior[] }> }
```

## Defaults vs overrides (the key idea)
- **Motion-packs supply per-design-pack defaults** (Minimal barely-there → Cinematic expressive).
- **The Interactions layer holds per-section overrides only.**
- Swapping the design-pack re-derives behavior from the new pack's defaults; explicit overrides
  survive the swap. Content + Structure never change.

## Owns / honors
- Pinning, parallax, chapter transitions, scroll sequencing, staggered reveals.
- Reduced-motion: every behavior has a reduced-motion fallback; honored by the engine, not authored.
- Performance: behaviors run in the single rAF reader-loop (the WS-C reader-engine), driven
  imperatively (WAAPI) outside React's render loop — 60fps target.

## Runtime
The published reader-engine already executes this choreography (progress, staggered reveals,
parallax, pinned hero). The Interactions layer is its missing **contract**: today it runs hardcoded;
with this concern it reads behavior from the schema. AI sets interactions only via Intent-Patch.

## Non-negotiables
- Declarative + semantic — no raw CSS, no imperative timelines in the schema.
- Behavior is independent of style and content — never merged.
- Unknown `on`/`do` values degrade gracefully (renderer contract).
