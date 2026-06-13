# Arsyen — Design & Knowledge Hub (`arsyen-design`)

> **This repo is the single source of truth for the whole Arsyen ecosystem:** the
> design language, the cross-repo architecture, the master task plan, and a
> per-service context + task backlog for every code repo. The four code repos hold
> **code only** — their `CLAUDE.md` points back here. Written 2026-06-14 when the
> scattered per-repo docs were consolidated into one hub.

## What Arsyen is
A **Creative Operating System** for artists, filmmakers, designers, writers, and
musicians — it should feel like Figma / Notion / Framer / Arc / Apple storytelling,
**not** Asana / Monday / Trello. Invite-only, members-first, cinematic restraint.
The current built app is a **~4/10 baseline to EVOLVE, not redesign** (founder,
`JuneUpdate` vision → `platform/context/VISION_JUNE_2026.md`).

## The ecosystem — four planes + this hub
All repos live under `~/Developer/codebase/arsyen/` (each its own git + GitHub remote `github.com:exbiex/*`):

| Plane | Repo | Stack | Role | State |
|---|---|---|---|---|
| **Platform** | `arsyen-platform` | Flutter + Go | Identity, **Work**, Assets, the liquid-glass shell | POC live, evolving |
| **Canvas** | `arsyen-canvas-engine` | TS monorepo | Universal narrative/experience engine + publishing (a platform primitive) | docs only, **0 code** |
| **Research** | `arsyen-research-platform` | TS (pnpm/turbo, NestJS) | Knowledge production | **built through Phase 5** |
| **Generative** | `arsyen-generative-engine` | TS (planned) | AI execution: agents, reasoning, model gateway, **Intent-Patch** | bootstrapping (LICENSE only) |
| **Hub** | **`arsyen-design`** | docs | **This repo** — design + architecture + all context + all tasks | the SoT |

**The unifying contract is the [Canvas Schema](./ECOSYSTEM.md)** (source of truth):
Assets are *referenced* in it, Research is *adapted* into it, Generative *patches* it,
Publishing *renders* it.

## How to use this repo

**Read in this order:**
1. **[`README.md`](./README.md)** — this file (the map).
2. **[`ECOSYSTEM.md`](./ECOSYSTEM.md)** — the cross-repo architecture, the Canvas-Schema
   contract, and the seams between planes. Read before building anything that crosses a repo.
3. **[`DESIGN_LANGUAGE.md`](./DESIGN_LANGUAGE.md)** — the one canonical design law
   (the machine-readable kit is **[`design-system/`](./design-system/)**).
4. **[`ROADMAP.md`](./ROADMAP.md)** — the unified phasing across all four planes + the
   gating decisions to resolve early.
5. **[`TASK.md`](./TASK.md)** — the **master, prioritized, cross-repo task plan.** It tells
   you the *next thing to build in each repo, phase by phase*, and links to the detailed
   per-service backlogs.

**Then go to the service you're working on:**

| Service | Context (the "why" + specs) | Backlog (the "what next") |
|---|---|---|
| Platform | [`platform/context/`](./platform/context/) | [`platform/TASKS.md`](./platform/TASKS.md) |
| Canvas | [`canvas/context/`](./canvas/context/) | [`canvas/TASKS.md`](./canvas/TASKS.md) |
| Research | [`research/context/`](./research/context/) | [`research/TASKS.md`](./research/TASKS.md) |
| Generative | [`generative/context/`](./generative/context/) | [`generative/TASKS.md`](./generative/TASKS.md) |

Shared: **[`INFRA_PORTS.md`](./INFRA_PORTS.md)** (the per-repo port lanes so the dev stacks
coexist) · **[`_archive/`](./_archive/)** (superseded material kept for history).

## How the code repos find this
Each code repo has a root `CLAUDE.md` that is a **thin pointer**: it carries only that
repo's run/build quickstart + critical gotchas, and directs Claude to read its context and
tasks from here. The relative path from any code repo is `../arsyen-design/`. Concretely:
`arsyen-platform/CLAUDE.md` → `../arsyen-design/platform/`, and so on.

## Editing discipline
- **Edit here, not in the code repos.** This is the canonical home; the code repos do not
  duplicate it.
- **The most recent context + design win.** When something here disagrees with old prose,
  the newer doc and the `design-system/` tokens are authoritative — update the older doc.
- **Per-service `context/` is preserved verbatim** from each repo's old docs (no knowledge
  dropped). The top-level five docs are the *unified* synthesis layer on top of it.
- Keep `ECOSYSTEM.md`, `DESIGN_LANGUAGE.md`, and the relevant `TASKS.md` current whenever a
  decision, schema, API, module, or component changes.
