# Collaboration

Real-time multiplayer editing **on the semantic graph** — the Collaboration Engine named in
`03_CANVAS_SUPERARCHITECTURE.md`. The schema's stable ids + addressable content store make it
CRDT-friendly: people edit *meaning*, and conflicts resolve at the node level, not the pixel level.

## Model
- A `collaboration-engine` package wraps the **content store** + **structure graph** in a CRDT
  (Yjs-style). The editor's invertible commands (E6) become CRDT operations.
- **Presence:** cursors, selection, and who-is-editing-what at section/component granularity.
- **Convergence:** concurrent edits to different nodes merge cleanly; concurrent edits to the same
  field resolve by the CRDT, never silently losing work.

## Boundaries
- Collaboration is a **service over the graph**, not a schema concern — the Canvas document shape is
  unchanged. It composes with versioning (a snapshot is a convergence checkpoint) and with
  Intent-Patch (an AI patch is one more operation in the shared log; reimagine still auto-branches).
- Presentation/Interactions edits collaborate the same way as content edits — all are graph ops.

## Cross-repo seam
Needs a **platform WebSocket sync server** (auth off the platform user; rooms keyed by canvas id).
New seam in `ECOSYSTEM.md §3` (Canvas ↔ Platform). Asset refs still resolve via the existing
signed-URL contract.

## Sequencing
Heaviest lift; sequenced **last** among the beat-Framer pillars (after re-skin depth, ingestion,
Intent-Patch, versioning). Table-stakes for a modern tool, but not the differentiator — the
differentiator is that collaboration here is over *semantics*, so merges are meaningful.

## Non-negotiables
- The CRDT wraps the graph; it does not merge the three layers or move AI inside the engine.
- Assets referenced, never stored.
