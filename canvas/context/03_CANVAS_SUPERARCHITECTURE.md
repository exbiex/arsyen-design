# Superarchitecture

Canvas Engine
- Canvas Schema
- Editor
- Renderer
- Publishing Engine
- Template Engine
- Motion Engine
- Theme Engine
- Design Pack Engine
- Versioning Engine
- Collaboration Engine
- Design Ingestion Engine
- Content Adapters

External Integrations:
- Arsyen Platform
- Arsyen Research Platform
- Arsyen Generative Engine

## Build status (engine → epic / package)
Built: Canvas Schema · Editor · Renderer · Publishing Engine · Template Engine · Motion Engine
(Minimal wired) · Design Ingestion Engine (semantic-only).

To build — the beat-Framer pillars:
- Theme Engine + Design Pack Engine → E13 (`packages/design-packs`; the 4 non-Minimal packs + the
  Interactions concern in `canvas-schema/interactions.ts`).
- Versioning Engine → E12 (`packages/versioning-engine`; Snapshot / Branch / Merge).
- Collaboration Engine → E17 (`packages/collaboration-engine`; CRDT + presence).
- Content Adapters → E11-v2 (`ingestion-engine` adapters: Stitch / Claude Design / Figma / screenshot).
