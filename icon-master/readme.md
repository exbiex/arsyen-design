# Arsyen — Design System

**Arsyen** is an invite-only creative-production platform for filmmakers, photographers,
composers and the small crews they build. It is **not a page-to-page web app — it behaves
like an operating system**: a pure-black canvas hosting floating *panels*, each panel a self-
contained view of work (projects, a kanban board, a ticket sheet, discover, chat, tools,
a profile/portfolio, settings). A bottom **dock** (folder · compass · grid · gear) plus a
wordmark, search, notifications and avatar form the persistent OS chrome.

The product ships on **three surfaces**, sharing one design language:

| Surface | Role | Notes |
|---|---|---|
| **Mac App** | Primary | The full OS-like desktop experience — panels, dock, multi-column board. |
| **iPhone App** | Complementary | The same language adapted to iOS — stacked panels, bottom tab bar, sheets. |
| **Web App** | Entry & public | Invite-gated auth (landing / login / request invite) and public portfolios. |

This system **revamps the *feel*** of the baseline product — sharper type hierarchy, a
disciplined token set, refined coral glow, the gradient-mesh imagery motif, the monospace
label system — while **keeping every existing element and screen**. Nothing was invented;
the structure mirrors the product as-built.

---

## Sources

- **Baseline screenshots** (the design treated as ground truth) live in `_ref/` —
  copied from the mounted folder `arsyen-screenshots/`:
  projects + board, discover, tools, settings/studio, profile/portfolio, ticket detail,
  create-project, and the three auth screens (landing, login, signup, request-invite).
- **Fonts**: the user supplied Apple's `NY` (New York), `SF-Compact`, `SF-Mono`, `SF-Pro`
  as `.dmg` installers in `uploads/`. See **VISUAL FOUNDATIONS ▸ Type** for how these map to
  tokens and why the system stack is used rather than bundled webfonts.
- No codebase or Figma file was provided; everything below is derived from the screenshots.

---

## CONTENT FUNDAMENTALS

How Arsyen writes.

- **Voice — calm, crew-room, lowercase-confident.** Short, declarative, a little cinematic.
  Never corporate, never hypey. Example profile bio: *"Night studies, slow work. Building
  small crews for short films and exhibitions. Commissions open."*
- **Second person, present tense.** The product addresses *you* and talks about *your* work:
  *"Tune your studio, the way you like it."* · *"Search your work"* · *"When someone wants to
  commission you."* First person is rare.
- **Title case for headings, sentence case for descriptions.**
  Headings: *New project*, *Welcome back*, *Brief builder*, *Call sheet*.
  Sub-copy: *"Name it, pick a type and who can see it, and set a cover."*
- **The monospace label voice — ALL CAPS, terse, system-like.** Section eyebrows and metadata
  are uppercase SF Mono: `YOUR ROLE`, `NOTIFICATIONS`, `APPEARANCE`, `MEMBERS ONLY · BY
  INVITATION`, `USERNAME OR EMAIL`, `2 ACTIVE`, `96% MATCH`. This is the strongest copy tell —
  the chrome speaks in mono caps, the content speaks in sans.
- **Tags are bare lowercase nouns**, mono: `script`, `camera`, `locations`, `post`, `gear`.
- **Buttons are verbs, often one word**: *Message*, *Open*, *Set*, *Upload*, *Log in*,
  *Create project*, *Request an invite*, *Save description*.
- **Em-dashes and middots set rhythm**: *"moodboards, briefs, invoices, and more."* ·
  *"Photographer · Lisbon"* · *"3D / Motion · Copenhagen"*.
- **Domain vocabulary** is the film/art studio: crew, commission, discipline, shoot, call
  sheet, storyboard, moodboard, color grade, contract, board, action plan, ticket, review.
- **Numbers stay terse**: `1.2k followers`, `48 works`, `11%`, `#1`. Percentages and IDs are
  always mono.
- **No emoji.** Status and priority are carried by colored dots + mono words, never emoji.
  Unicode is used only as typographic punctuation (·, —, ⌘K, ×, ←).
- **Vibe**: a quiet, members-only studio at night. Restraint over decoration; one warm accent
  against deep black; everything feels tactile and lit-from-within.

---

## VISUAL FOUNDATIONS

### Mood
A creative OS rendered at midnight. **Pure black** canvas (`#000`), panels that float a hair
above it, one **coral-red** accent that glows, and soft **aurora gradient-mesh** imagery as the
only color outside the UI. Cool near-white type, monospace metadata, generous breathing room.

### Color
- **Canvas is `#000000`** ("Pure black" backdrop). An optional **"Living"** backdrop layers a
  blurred coral→violet→ember aurora (`.ars-backdrop-living`) — used full-bleed on auth screens.
- **Surfaces step up subtly**: `surface-1 #0b0b0c` (panels) → `surface-2 #121214` (cards) →
  `surface-3 #1a1a1d` (inputs/chips) → `surface-4 #232327` (hover). The lift is *tiny* — depth
  comes from hairline borders + a faint inset top-light (`--edge-light`), not heavy fills.
- **Borders are hairlines**: white at 6–16% opacity. The top edge is often a touch brighter to
  fake a lit bevel.
- **Accent — Arsyen coral-red `#f95d57`.** One hue, used for primary CTAs, active dock icon,
  selection, focus, links, the High/Urgent priority. Alternate accents (violet/blue/amber)
  exist as a user preference (Settings ▸ Accent color) but red is the brand default.
- **Text inks** are cool: `#f6f6f7` primary → `#9b9ba2` body → `#6c6c74` labels → `#48484f`
  faint. Mono labels sit at the `ink-3` level.
- **Semantic colors** ride translucent pills with a leading dot: amber `PLANNING`/Medium,
  coral High, brighter red Urgent, blue Low, violet Review, mint Done.
- **Imagery vibe**: warm-to-cool aurora blobs (coral, ember, violet, azure, verdant) — soft,
  blurred, slightly desaturated, lit from within. Real film stills (when present) read warm and
  filmic. No stock photography, no flat illustration.

### Type
Arsyen is an Apple-platform product, so its type **is the Apple system stack**:
- **SF Pro Display** (`--font-display`) — titles, names, hero numerals. Bold, tight tracking
  (`-0.03em` at large sizes). *SINNERS*, *Settings*, *Welcome back*.
- **SF Pro Text** (`--font-text`) — body, controls, descriptions. 15px default.
- **SF Mono** (`--font-mono`) — the signature: uppercase eyebrows, tags, metadata, IDs,
  percentages, ⌘K hints. Letter-spaced `0.12em` when uppercase.
- **SF Compact Display** (`--font-compact`) — condensed alt for tight display lines.
- **New York** (`--font-serif`) — editorial serif for quotes / long-form moments (sparing).
- **Wordmark**: *arsyen*, all-lowercase, display face, `-0.04em` tracking, optically rounded.

> **Font delivery & substitution note.** The four families were supplied as macOS `.dmg`
> installers, which cannot be unpacked or legally re-served as webfonts in this sandbox.
> Instead the tokens resolve to the **native system stack** (`-apple-system`, `ui-monospace`,
> `ui-serif`): **on macOS and iOS — Arsyen's actual platforms — these render the genuine
> SF Pro, SF Mono and New York**, pixel-true and zero-download. On non-Apple browsers they
> degrade to the closest `ui-*` generic. The compiler will keep flagging "no @font-face" — that
> is expected and intentional here. **If you need true cross-browser parity, send `.woff2`
> exports of each family and I'll add `@font-face` rules.**

### Spacing & layout
- **4px base scale** (`--space-1…12`). Panels pad `24px`, cards `20px`, card gaps `16px`.
- **Panel-based composition**: screens are clusters of floating panels, not a single document.
  Each panel owns its scroll. The dock and chrome are fixed.
- Generous whitespace; content rarely touches edges; columns are wide and calm.

### Radii
`6px` tags · `10px` chips/icon-buttons · `14px` cards/buttons/inputs · `18px` larger cards ·
`24px` floating panels · `32px` hero panels & modals · `999px` pills, switches, avatars.

### Elevation, shadows & glow
- **Depth = hairline border + inset top-light + soft dark drop.** Shadows are layered
  (ambient + key + contact) and large-radius (`--shadow-sm/md/lg`), never crisp.
- **The Arsyen glow**: primary CTAs, the login card, switches and selected surfaces carry a
  **coral halo** (`--glow-accent`, a two-stage bloom). This is the single most recognizable
  lighting move — color *radiates* from interactive elements.
- Focus rings are a soft coral `--glow-focus`.

### Materials (revamp v2)
The elevated layer that lifts Arsyen from "flat dark UI" to "real OS". All self-contained in
`tokens/base.css` — no binaries:
- **`.ars-glass` / `.ars-glass--strong`** — liquid-glass bars (dock, search, sheets, tab bar):
  translucent fill + `backdrop-filter` blur/saturate + a lit top bevel + soft inner sheen.
- **`.ars-grain`** — a subtle SVG-turbulence film grain (overlay blend) layered on covers and
  large surfaces for the filmic quality.
- **`.ars-bevel` / `.ars-ambient`** — reusable lit-bevel and coral-ambient box-shadow recipes.
- **`--accent-grad` + `--sheen-accent`** — coral CTAs use a vertical gradient fill plus an inner
  top-highlight, not a flat color, so buttons/switches/active dock pills read as lit glass.
- The **gradient mesh** now has a bright lit core + graded vignette (covers read like film
  frames); cards carry a faint top-down surface gradient; numerals use `tabular-nums`
  (`.ars-tnum`).

### Borders & cards
Cards: `surface-2` fill, 1px hairline border (top edge brighter), `14–18px` radius, inset
top-light. Hover lifts `1px` and brightens the border. Selected/active gains the coral glow.
Panels are the same recipe at `surface-1` with `24px` radius and a real drop shadow.

### Motion
- **Calm and quick.** Default `180ms` on `cubic-bezier(0.22,1,0.36,1)` (ease-out).
- **Switch knobs & toggles** use a gentle spring (`cubic-bezier(0.34,1.56,0.64,1)`).
- Press states **shrink** (`scale 0.92–0.97`); hover **brightens** (no movement on buttons).
- Fades and short slides for panels/sheets/modals. **No bounce on content, no infinite loops.**

### Transparency & blur
Used sparingly: the modal **scrim** (`--scrim`, ~62% black) and occasional glass panels over
the "Living" backdrop (`backdrop-filter: blur`). The pure-black default mostly avoids blur.

### Hover / press states
- **Buttons**: hover brightens (`brightness 1.06` primary / `1.25` quiet); press scales down.
- **Cards**: hover brightens border + 1px lift.
- **Icon buttons / chips**: hover steps the surface up one level (`surface-3 → surface-4`).
- **Dock icons**: active = coral; hover = lighter ink.

---

## ICONOGRAPHY

- Arsyen uses a **single, consistent line-icon set**: monochrome, **~1.5px stroke**, rounded
  joins/caps, no fills. Seen in the dock (folder, compass, grid, gear), and throughout: search,
  bell, plus, link, horizontal-dots, calendar, lock, eye, person, person-add, chat bubble,
  users, palette, image, document, briefcase, star, paper-plane, map-pin, share, close (×),
  back (←), chevrons, checkmark.
- Icons are **ink-colored** (`ink-1`/`ink-2`) and turn **coral when active** (the selected dock
  item, the focused tool-tile icon). Tool tiles tint their icon coral inside a coral-soft
  rounded square.
- **No emoji anywhere.** Status/priority use colored dots, not emoji. A few Unicode glyphs act
  as typographic icons only: `·` `—` `×` `←` `⌘` `↑`.

> **Icon substitution (flagged).** The original icon SVGs were not provided (screenshots only).
> The set matches **[Lucide](https://lucide.dev)** almost exactly — same 1.5px rounded stroke,
> same geometric line style — so UI kits and cards use **Lucide via CDN** as the stand-in.
> Small inline SVGs in component cards are hand-matched to the same stroke weight. **If you have
> Arsyen's real icon assets, drop them into `assets/icons/` and I'll swap the CDN out.**
>
> Lucide CDN: `<script src="https://unpkg.com/lucide@latest"></script>` then `lucide.createIcons()`,
> or per-icon `<i data-lucide="folder"></i>`.

---

## Index / Manifest

**Root**
- `styles.css` — the single entry point consumers link (imports only).
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skill front-matter wrapper.

**Tokens** (`tokens/`, all `@import`ed by `styles.css`)
- `fonts.css` · `colors.css` · `typography.css` · `spacing.css` · `base.css`
  (`base.css` also defines the `.ars-mesh*` gradient utilities and `.ars-backdrop-living`).

**Foundations** (`guidelines/cards/`) — specimen cards shown in the Design System tab
(Colors, Type, Spacing, Brand).

**Components** (`components/<group>/` — bundled into `window.ArsyenDesignSystem_992fe7`)
- `buttons/` — **Button**, **IconButton**
- `data-display/` — **Tag**, **StatusPill**, **Badge**, **Avatar**, **ProgressMeter**
- `forms/` — **Input**, **Switch**, **FilterChip**, **SegmentedControl**
- `surfaces/` — **Card**
- `navigation/` — **Tabs**

**UI kits** (`ui_kits/<product>/`)
- `mac/` — the primary OS desktop (projects + board, ticket sheet, discover, settings).
- `iphone/` — the iOS adaptation (home, board, ticket sheet, discover, profile).
- `web/` — invite-gated auth + public portfolio.

*(UI kits are added incrementally — see each kit's own README.)*
