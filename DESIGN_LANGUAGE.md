# Arsyen — Design Language (the one canonical law)

> The single written contract for Arsyen's look, feel, and motion across the shipping surfaces
> (**macOS** primary · **iOS** later — web client is dropped) and **every** plane (Platform shell ·
> Canvas experiences). The design-system `ui_kits/web/` stays as visual reference only. The
> machine-readable source is **[`design-system/`](./design-system/)** (CSS tokens + React
> components + Mac/Web/iPhone UI kits). **When this doc and the kit disagree, the kit's
> `tokens/*.css` win — then update this doc.** Long-form philosophy lives in
> `platform/context/DESIGN_BRIEF.md`; the Canvas-specific design system in
> `canvas/context/07_CANVAS_DESIGN_SYSTEM.md`. This file supersedes the old per-repo design docs.

## North stars
Pure-black OS canvas · one **coral** accent that glows · **uppercase mono** micro-labels for
chrome/metadata · gradient-mesh imagery · panel-based "operating-system" layout · the **Apple
system font** stack · motion as storytelling. No emoji. Calm, members-only, cinematic restraint.

> **Apple is the starting point, not the destination.** Start from Apple's quality bar
> (HIG / typography / spacing / motion / AppKit), then develop Arsyen's own personality:
> **Apple + Creative Studio**, never *Apple + SaaS dashboard*. More expressive, artistic,
> emotional, cinematic, storytelling-oriented than Apple. The target is what you'd get if Apple,
> Arc, Framer, Linear, Milanote, Awwwards, Behance, and a high-end film-festival site had a child.

## The language in one paragraph
A single **persistent, slowly-animating wallpaper** (a living field of soft color blobs) sits
behind everything on a **pure-black** base; **clear frosted-glass** panels (matte, black-dominant)
float over it. One coral accent per view. **Square corners.** The bottom **Arsyen Bar** is a set
of *bare floating* elements (wordmark · macOS-style workflow dock · search capsule · notifications
· avatar), not a solid bar. **No dead taps** — every interactive element defines press + hover +
(where it carries accent) glow.

---

## Coral — the one canonical value
The accent is **coral `#ff555d`** (`DESIGN_LANGUAGE` + `design-system/tokens/colors.css`).
The **`#f95d57`** that appears in the kit's old `SKILL.md` / `readme.md` is a superseded
approximation — treat `#ff555d` as canonical and correct those references when touched.

## Themes — Pure Black · Dark · Light  (themeability is first-class)
The app is **themeable** (`design-system/tokens/themes.css`). Defaults:
- **Pure Black** (default) — `#000000` base, **no** living wallpaper. OLED, cinematic, iconic.
- **Dark** — black base **+** the living wallpaper.
- **Light** — white surfaces, dark ink, clean/editorial/Apple-bright.

Architected for **future / community / creator / generated / custom** themes without rewrites.
In Flutter: `ArsPalette` (dark+light) swapped via `AppearanceController.setTheme`; `AColors`/`AType`
are **palette-backed getters** (NOT const) so the whole app re-colours live; 3-way switch in Studio;
persisted. Accent + status colors stay stable across themes.

## Color tokens — dark / pure-black  (`tokens/colors.css`; light in `themes.css`)
**Accent — coral (the one accent):**
`coral #ff555d` · `hover #ff6e75` · `press #e8454d` · `soft rgba(255,85,93,.14)` ·
`glow rgba(255,85,93,.45)` · text-on-coral `#1a0608`.
Accent is **user-switchable** in Studio (always design against the *accent token*, default coral):
violet `#8a7bef` · blue `#5b9dff` · amber `#f5b544` · green · rose. Only `--coral/-hover/-press`
move per accent; everything else derives via `color-mix`.

**Surface ramp — pure-black, black-dominant:**
`bg #000000` (PURE BLACK base) · `sunken #000000` · `surface1 #0c0d0f` (panel) ·
`surface2 #131417` (card) · `surface3 #1b1c20` (input/chip) · `surface4 #25272c` (hover) ·
`surface5 #303237` (active hover). The lift between steps is *tiny* — depth comes from hairline
borders + a faint inset top-light, not heavy fills.

**Text ramp:** `fg1 #ededee` (primary) · `fg2 #9b9da2` (body) · `fg3 #66686d` (muted/labels) ·
`disabled #44464a`.

**Overlays / borders:** overlays white .02/.04/.06/.10; scrim `rgba(0,0,0,.55)` / strong .74;
hairline `rgba(255,255,255,.07)`, border `.10`, strong `.16`, bright `.22`.

**Status / board semantics:** ok `#4ade80` · warn/Planning/Medium `#f5b544` · info/Low `#5b9dff`
· danger/High/Urgent `#ff555d` · Review `#8a7bef` (violet) · Done `#4ade80`. Carried on translucent
pills with a leading colored dot + mono word — **never emoji.**

**Light theme (key values, `themes.css`):** `bg #f3f4f7` · `surface1 #ffffff` · `surface2 #f8f9fb`
· `surface3 #eef0f4` · ink `fg1 #14161b` / `fg2 #565b66` / `fg3 #888e9a`; glass goes white-translucent.

**Glass material:** fill `rgba(18,19,23,.08)` (clear — black stays dominant), blur ~26px, top-edge
highlight `rgba(255,255,255,.20)`, 1px border `rgba(255,255,255,.09)`, deep diffuse outer shadow.
**Matte = the finish (diffuse), never glossy / opaque-grey.** `.ars-glass--strong` for dock/search/sheets.

## Typography  (`tokens/fonts.css` — Apple foundation)
- **SF Pro Display** — display/headings, names, hero numerals · **SF Pro Text** — UI/body ·
  **SF Mono** — uppercase metadata/IDs/tags/⌘K/kbd (the signature label) · **New York** —
  editorial/Canvas serif (sparing). SF Compact Display = condensed alt. Render **natively on
  macOS/iOS**; on Flutter **web** they fall back (CanvasKit can't load system fonts) — expected.
- Scale (size / line / tracking): display 56/1.02/−1.68 · h1 38/1.06/−0.76 · h2 28/1.12/−0.42 ·
  h3 21/1.20/−0.21 · title 17/1.30/−0.085 · body 15/1.50 · sm 13/1.45 · **mono 11/1.30/+0.66
  UPPERCASE**. Flutter: `AType` in `theme/app_theme.dart`.
- **Wordmark:** *arsyen*, all-lowercase, display face, tight tracking, optically rounded.

## Voice (how Arsyen writes)
Calm, crew-room, lowercase-confident; short, declarative, a little cinematic — never corporate or
hypey. **Second person, present tense** ("Search your work"). Title case headings, sentence case
descriptions. **Mono ALL-CAPS** for chrome/metadata eyebrows (`YOUR ROLE`, `96% MATCH`,
`MEMBERS ONLY · BY INVITATION`). Tags are bare lowercase mono nouns. Buttons are one-word verbs.
Domain vocab is the film/art studio (crew, commission, call sheet, moodboard, color grade, board,
action plan, ticket). No emoji.

## Spacing / radii / motion  (`tokens/spacing.css`)
- **Spacing** 4pt: 4·8·12·16·20·24·32·40·48·64. Panels pad 24, cards 20, card gaps 16.
- **Radii — Square default:** xs 3 · sm 4 · md 6 · lg 8 · xl 9 · 2xl 12 · pill 999. Pills stay
  pills in every radius mode (`data-radius` soft/round are user options).
- **Motion — confident settle, no bounce:** ease-out `cubic-bezier(.22,1,.36,1)`; durations fast
  120 · base 200 · slow 360 · view 500ms. Switch knobs use a gentle spring. Press **shrinks**
  (scale .92–.97); hover **brightens** (no movement on buttons). **Always honor reduced-motion**
  (settle + freeze wallpaper).
- **Shadows:** float `0 8px 22px rgba(0,0,0,.40)`; panel `0 18px 50px rgba(0,0,0,.45)`; coral glow
  `0 6px 20px rgba(255,85,93,.45)`. Depth = hairline border + inset top-light + soft dark drop.

## Layout system
- **One screen.** Persistent wallpaper (built once, never reset on nav) + floating glass. Layouts
  are **workflow-driven** — different workflows may use completely different panel structures; only
  the Arsyen Bar + search + notifications + profile + the design language are globally persistent.
- **Panels are independent creative surfaces** — each its own screen/environment, floating in a
  spatial field, not boxes on a webpage.
- **Arsyen Bar** = bare floating elements with empty wallpaper between them: wordmark (left);
  workflow dock (center, bare square macOS-dock icons — active = enlarge ×1.24 + coral, hover ×1.12,
  **no labels, no glow, no panel**); right = dark Google-style search capsule + bare notifications
  (coral dot) + avatar.
- **Per-view wallpaper hue families:** Work/Projects coral-led; Discover violet/indigo-led; Tools
  teal-led; Studio/Profile warm coral/amber. Blobs are large, soft, slow — one breathing painting.
- **Fullscreen is a workspace *state*, not a route** — the left panel hides, the workspace expands
  and centers; cinematic, not mechanical.

## Interaction law ("no dead taps")
Every interactive element defines **press + hover + glow** where it carries accent. Reference:
primary `CoralButton` (pill, coral fill 0.9→1.0 hover, always a coral glow, text `#1a0608`,
`busy` spinner); segmented control 120ms; cards hover-lift + hover-revealed actions; real imagery,
gradient placeholders (never grey boxes). Cursor `click` on anything interactive.

## Motion system — motion is storytelling, not decoration
Executed with extreme restraint and sophistication (Apple / visionOS / film-title-sequence, not
Dribbble). Four layers:
- **Layer 1 — Ambient:** always-running, near-subconscious surface life (breathing surfaces,
  ambient gradients, micro lighting shifts, slow opacity evolution). Capped ~30fps; pure-black
  default paints once and rests (zero idle cost).
- **Layer 2 — State:** selection / focus / hover / surface changes.
- **Layer 3 — Workflow:** entering workflows, switching contexts, expanding panels, fullscreen.
  Switching workflows should feel like entering a different creative space.
- **Layer 4 — Narrative (Canvas):** scroll-driven storytelling — see below.
**Quality over quantity:** stable framerate, smoothness, battery efficiency; one perfect animation
beats ten mediocre ones. The interface should feel alive even when untouched — "this product has presence."

## Canvas design — the experience layer
The Canvas (portfolios, blogs, decks, story worlds, project canvases) feels expressive, narrative,
immersive, cinematic. Built on the same language but with its own first-class systems:
- **Default themes:** Light · Dark · Pure Black (same as the platform).
- **Design Packs (creative operating modes):** Apple Narrative · Cinematic · Editorial · Minimal ·
  Experimental. A pack is a presentation personality, swappable without touching content/structure.
- **Motion Packs:** Minimal · Editorial · Cinematic · Apple Narrative · Experimental — owning
  pinning, parallax, chapter transitions, scroll sequencing, reduced-motion, performance limits.
- **Scroll Narrative Engine** (a major differentiator): Reveal (fade/slide/scale/progressive) ·
  Sticky Narrative (pinned sections, changing content) · Scroll Transformations (scale/blur/mask/
  morph/rotate/depth/parallax) · Scroll Chapters · Horizontal Experiences (galleries/film strips/
  reference boards) · Scroll Sequences (frame-by-frame).
- **Motion Profiles** (not hardcoded Apple templates): Static · Editorial · Cinematic · Product
  Reveal · Narrative · Parallax · Story Scroll — any section can adopt one.
- **Layout = structured creative freedom:** Sections · Containers · Columns · Stacks · Grids ·
  responsive blocks. **Do NOT build Photoshop/Figma** (no fully freeform positioning).
- The bottom **Arsyen Bar stays the only globally fixed UI element**, even in Canvas.

## Guardrails (do / don't)
**Do:** keep black dominant; one coral accent per view; square corners; matte clear glass;
mono-uppercase section labels; design *every* state (default/hover/press/loading/empty/error/
just-deleted) — the UI must never blank; real imagery or gradient-mesh placeholders.
**Don't:** no second accent in a view; no glossy/white-frosted glass; no solid opaque bottom bar;
no neumorphic/embossed clay (dead system); no friendly rounded corners by default; no labels/glow
on the dock; no SaaS drop-shadow-on-white look; no emoji; no stock photography / flat illustration.

## Flutter mapping
`theme/tokens.dart` (`AColors`/`ASpace`/`ARadii`/`AMotion`) · `theme/app_theme.dart` (`AType`) ·
`features/liquid/` (`liquid_tokens.dart`, `wallpaper.dart`, `glass.dart`, `controls.dart`,
`liquid_shell.dart`). **Reuse `glass.dart` + `controls.dart` — re-rolling shared controls is a
reject** (see `platform/context/ENGINEERING.md` + the `glass-component` skill).

> Full visual ground truth: `design-system/ui_kits/{mac,web,iphone}/` and `design-system/_ref/`
> (baseline screenshots). The `design-system/SKILL.md` is installable as a Claude design skill.
