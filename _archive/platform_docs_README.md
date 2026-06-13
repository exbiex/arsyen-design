# Context — Single Source of Truth (Arsyen Platform)

This folder is the **one canonical home** for the Arsyen *platform* app's product,
architecture, flows, and design. Consolidated 2026-06-13 — scattered `JuneUpdate/`
and `new design/` folders were merged in; superseded material moved to `_archive/`.

> Multi-repo note: this is the SoT for the **platform** repo (`arsyen`, Flutter + Go).
> The **Canvas Engine** has its own authoritative context in the separate
> **`arsyen-canvas-engine`** repo (`context/` + `CLAUDE.md`) — do **not** duplicate
> it here. The **`arsyen-research-platform`** repo likewise owns its own context.

## What's current (read these)

| File / folder | What it is |
|---|---|
| **`VISION_JUNE_2026.md`** | **Latest direction (2026-06-13).** Projects→"Work" container, Canvas as a platform primitive (now its own repo), Creative-OS framing. Supersedes older product framing. |
| `PRODUCT.md` | Product definition / modules. |
| `DECISIONS.md` | Finalized product + platform decisions. |
| `DOMAIN_MODEL.md` | Entities and relationships. |
| `SUPERARCHITECTURE.md` | System architecture (keep updated after schema/API/module changes). |
| `ENGINEERING.md` | Engineering quality bar — read before building. |
| `USER_FLOWS.md`, `ARSYEN_USER_FLOWS_PRODUCTION.md` | User flows. |
| `flows/` | Per-feature flow specs. *(Note: `projects.md` → rename to `work.md` per VISION_JUNE.)* |
| **`roadmap.md`** | **Production roadmap** — POC→production, platform phasing (macOS-first), the 4-plane ecosystem, phases, gating decisions. |
| **`task.md`** | **Detailed production task plan** — Phase-1 workstreams (macOS, design port, Work, web, Canvas) with Backend/Frontend/Tests/Acceptance. |
| `task_poc.md` | The previous POC master build plan (M0–M17), preserved. |
| **`DESIGN_LANGUAGE.md`** | **Written design law** — tokens, type, layout, interaction rules, guardrails (companion to `design-system/`). |
| **`design-system/`** | **Latest design — THE design source of truth.** React/JSX + CSS-token kit (`tokens/`, `components/`, `ui_kits/{web,mac,iphone}/`, `guidelines/`). Doubles as the **Web app's actual code** and the **reference** the Flutter (Mac/iOS) app mirrors. Includes a `SKILL.md` (installable as a Claude design skill). |

## Latest design language (delta from the old built app)
- Base goes **pure black `#000000`**; darker black-dominant surface ramp.
- Accent stays **coral `#ff555d`** (the `#f95d57` in SKILL.md is an approximation).
- Type moves to the **Apple system stack** — SF Pro Display / SF Pro Text / SF Mono,
  plus **New York** serif for editorial/Canvas. (Old Grotesk/Hanken/Mono kept as
  alternate Appearance font choices.)
- These were ported into the Flutter app's `theme/tokens.dart` + `theme/app_theme.dart`
  on 2026-06-13.

## Division of labor (confirmed 2026-06-13)
- **`design-system/` (React/CSS)** = the **Web app** + the source-of-truth **reference**.
- **Flutter (`app/`)** = the **macOS (primary) and iOS** implementation, mirroring it.

## `_archive/`
Superseded, kept for history (safe to delete once you're confident):
- `old-liquid-design/` — the previous `new design/` (`Arsyen-LiquidGlass.zip`,
  `arsyen-flutter-brief.md`), replaced by `design-system/`.
