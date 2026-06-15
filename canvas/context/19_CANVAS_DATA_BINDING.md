# Data Binding & Collections

Semantic collections: **one design drives N items**. The narrative-first answer to Framer's CMS —
not a generic database builder. A section is bound to a dataset; the renderer expands an item
template per record. Design is authored once; data scales independently.

## Layer placement (three-layer separation preserved)
- **Data lives in the Content layer** — a new `collection` content kind.
- **The item template lives in the Structure layer** — `Section.binding`.
- **Presentation is unchanged** — the bound section is styled by the active design-pack like any
  other. Swapping the pack restyles every expanded item for free.

## Shape
```
// content layer — a typed dataset
CollectionContent = {
  kind: "collection",
  fields: { id: string, kind: "text" | "richtext" | "media" | "link" | "date" }[],
  items: Record<fieldId, value>[],
}

// structure layer — a section bound to a collection + an item template
Section.binding? = {
  collectionRef: contentId,          // → the CollectionContent
  itemTemplate: ComponentNode[],     // component fields reference dataset fields
}
```

## Renderer
For a bound section the renderer expands `itemTemplate` once per item, resolving each component's
field reference against the row. Asset fields resolve through the normal asset-ref path (IDs only).

## Use cases (narrative, not generic)
Work-index, blog/article index, shot list, moodboard grid, release list, credits. Each is a
semantic collection of creator work — never an arbitrary table.

## Sources
A collection can be authored by hand, produced by **ingestion** (a repeated card-grid → a
collection), or adapted from **Research** (semantic content → collection items; no presentation
crosses the seam).

## Non-negotiables
- Data ↔ template separation mirrors content ↔ structure — never merged.
- Assets in items are referenced, never stored.
- AI edits collections only via Intent-Patch.
