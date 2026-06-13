# Flow — Search

> Module 13. Universal search (⌘K quick search + Search surface). Source:
> DECISIONS.md (Meilisearch; semantic for paid) + Search Q1. Depends on: the
> entities it indexes; job queue (indexing).

## 1. Scope (v1 core entities)

Searches **Artists/profiles · Projects (visible to you) · Communities (not
Hidden) · Creative Works**. (Assets, feed posts, pages, artefacts indexed later.)
All results are **permission-aware** — private/unauthorized never appear.

## 2. Experience

- **⌘K quick search** (top bar) — instant, grouped results by type; keyboard nav;
  open on select.
- **Search surface** — full results with per-type filters (reuses Discover filters
  for artists).
- **AI command layer** — future (later).

## 3. Engine & tiers

- **Keyword:** Meilisearch for all core types. Indexed via the **job queue** on
  entity create/update/visibility-change; index docs carry visibility + owner
  attributes for permission filtering at query time.
- **Semantic:** pgvector embeddings **blended** with keyword for **paid tiers**
  (Pro/Studio) on works + profiles. Free = keyword only.

## 4. Data & API

- Meilisearch indexes: `profiles`, `projects`, `communities`, `works` (each with
  permission attributes). pgvector columns for semantic on works/profiles.
- `GET /v1/search?q=&types=artists,projects,communities,works&...` →
  grouped, permission-aware results (paid → semantic blend).
- `GET /v1/search/suggest?q=` — ⌘K instant suggestions.

## 5. Acceptance criteria

- ⌘K returns grouped, permission-aware results fast; selecting navigates correctly.
- Private/Hidden/unauthorized content never appears for unauthorized viewers.
- Paid tiers get semantic-blended results; free gets keyword.
- Index updates within seconds of an entity change (via job queue).

## 6. Design notes

⌘K is an embossed command palette (inset field, grouped raised result rows, coral
on the active row); calm, fast; "No results for …" in brand voice.
