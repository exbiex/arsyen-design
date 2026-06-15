# Schema Model

Canvas Graph Architecture

Canvas Root
- metadata
- publishing
- design pack
- section references

Sections
- semantic identity
- renderer
- motion profile
- component references

Components
- semantic identity
- data contract
- editing rules
- ai rules

## Top-level concerns (kept independent — never merged)
- content (semantic data + asset refs)
- structure (sections / components graph)
- presentation (theme + design pack + motion profiles)
- interactions (declarative behavior — the 4th concern; see 18_CANVAS_INTERACTION_MODEL.md)

Interactions
- keyed by section id (mirrors per-section presentation)
- declarative behaviors: scroll-progress / in-view / chapter-enter
- design-pack defaults + per-section overrides

Collections (data binding — see 19_CANVAS_DATA_BINDING.md)
- content layer: collection content (typed fields + items)
- structure layer: Section.binding (collectionRef + itemTemplate)

Versioning (a service over the graph, not part of the document — see 16_CANVAS_VERSIONING.md)
- Snapshot / Branch / Merge; meta gains optional branchRef / snapshotRef
- three-way merge is tractable because sections/components carry stable ids

## Schema versioning
- SCHEMA_VERSION 1 → 2 introduces the interactions concern (migrate-on-read adds empty interactions).
- Forward/backward compatible; migrate-on-read registry keyed by source version.
