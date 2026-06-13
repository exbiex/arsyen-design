# Flow — Tools

> Module 11. A framework of full-screen creative/production/business tools that
> produce saveable, exportable **artefacts**, optionally attached to a project.
> Source: DECISIONS.md + Tools Q1 + the kit (`WebTools.jsx`). Depends on:
> Media/Assets, Projects (Resources). **Per-tool deep specs are built later.**

## 1. Framework (built in this module)

- **Tools grid** — embossed square tiles (icon, name, sub, category) →
  open a **full-screen tool workspace**.
- **Tool workspace shell** — header (back, tool icon+name, **Save**, **Export**) +
  tool-specific body; consistent across tools.
- **Artefact** — what a tool produces: titled, versioned, exportable, owner-owned,
  optionally **linked to a project** (appears in the project **Resources** tab,
  grouped by tool, with "New in <tool>").
- **Export** per tool (PDF for docs/business; image/board for visual; etc.).
- Tools can be **independent** or **project-linked**.

## 2. v1 catalogue (frameworked now; each detailed later)

| Tool | Category | Notes |
|---|---|---|
| Moodboard | Visual | reference board (drag images in) |
| Color grade | Visual | extract/build LUT-style palettes |
| Storyboard | Production | frame a sequence |
| Call sheet | Production | schedule a shoot with crew |
| Brief builder | Docs | turn notes/chat into a brief — **AI-assisted (AI module later)**; manual now |
| Script | Docs | screenplay/script editor |
| Budget | Business | project budgeting |
| Invoice | Business | bill a commission (Razorpay link later) |
| Contract | Business | scope, terms, signatures |

> Portfolio & Résumé are **not** here — they live in the page-builder module (12).
> Each tool above gets its own detailed flow + build as a later sub-task; this
> module ships the framework + the grid + a working artefact lifecycle (a generic
> editor per category to start).

## 3. Data model (owned by `tools`)

- `artefacts`: id (uuidv7), owner_id, tool (enum), title, data (jsonb — per-tool
  schema), project_id (nullable), created_at, updated_at, deleted_at (+ version
  rows for universal versioning).
- `artefact_assets`: artefact_id, asset_id (media referenced by the artefact).
- Resources view = artefacts where project_id = the project.

## 4. API (REST `/v1`)

- `GET /v1/tools` — catalogue.
- `POST /v1/artefacts` (create from a tool) · `GET/PATCH/DELETE /v1/artefacts/{id}`.
- `POST /v1/artefacts/{id}:export` (format per tool).
- `GET /v1/me/artefacts` · `GET /v1/projects/{id}/resources`.
- Versions: `GET …/versions`, `:restore`.

## 5. Acceptance criteria

- Tools grid opens each tool's workspace; Save persists an artefact; Export
  produces the right format.
- Artefact can be linked to a project and appears in Resources, grouped by tool.
- Artefacts are versioned (restore works) and can reference assets.
- AI-assisted tools degrade gracefully to manual until the AI module lands.

## 6. Design notes

Embossed tool tiles (inset icon seat); full-screen workspace is an embossed shell;
coral only on the primary action; documents render on an inset "paper" surface;
brand-voice empty states. Each tool's detailed UI defined in its own later doc.
