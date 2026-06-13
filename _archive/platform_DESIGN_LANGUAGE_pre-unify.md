# Arsyen — Design Language (written law)

> The canonical written contract for Arsyen's look & feel. The machine-readable
> source is **`design-system/`** (CSS tokens + React components + Mac/Web/iPhone UI
> kits). When this doc and the kit disagree, the kit's `tokens/*.css` win — update
> this doc. Division of labor: **`design-system/` = the Web app + reference; Flutter
> (`app/`) = the macOS(primary)/iOS implementation** mirroring it.

## North stars
Pure-black OS canvas · one **coral** accent that glows · **uppercase mono** micro-labels
for chrome/metadata · gradient-mesh imagery · panel-based "operating-system" layout ·
the **Apple system font** stack. No emoji. Calm, members-only, cinematic restraint.

## The language in one paragraph
A single **persistent, slowly-animating wallpaper** (a living field of soft color blobs)
sits behind everything on a **pure-black** base; **clear frosted-glass** panels (matte,
black-dominant) float over it. One coral accent per view. **Square corners.** The bottom
**Arsyen Bar** is a set of *bare floating* elements (wordmark · macOS-style workflow dock ·
search capsule · notifications · avatar), not a solid bar. **No dead taps** — every
interactive element defines press + hover + (where it carries accent) glow.

---

## Themes — Pure Black · Dark · Light
The app is **themeable** (design-system `tokens/themes.css`): **Pure Black** (default; black theme,
no living wallpaper), **Dark** (black theme + living wallpaper), **Light** (white surfaces, dark ink).
Switchable in Studio. In Flutter: `ArsPalette` (dark+light) swapped via `AppearanceController.setTheme`;
`AColors`/`AType` are palette-backed so the whole app re-colours live. Accent + status are stable across themes.

## Color tokens — dark/pure-black (`colors.css`; light values in `themes.css`)
**Accent — coral (the one accent):**
`coral #ff555d` · `hover #ff6e75` · `press #e8454d` · `soft rgba(255,85,93,.14)` ·
`glow rgba(255,85,93,.45)` · text-on-coral `#1a0608`.
(Accent is user-switchable in Studio: violet `#8a7bef`, blue `#5b9dff`, amber `#f5b544` —
always build against the *accent token*, default coral. The `#f95d57` in the kit's SKILL.md
is an approximation; `#ff555d` is canonical.)

**Surface ramp — pure-black, black-dominant:**
`bg #000000` (PURE BLACK base) · `sunken #000000` · `surface1 #0c0d0f` (panel) ·
`surface2 #131417` (card) · `surface3 #1b1c20` (input/chip) · `surface4 #25272c` (hover) ·
`surface5 #303237` (active hover).

**Text ramp:** `fg1 #ededee` (primary) · `fg2 #9b9da2` (body) · `fg3 #66686d` (muted/labels) ·
`disabled #44464a`.

**Overlays / borders:** overlays white .02/.04/.06/.10; scrim `rgba(0,0,0,.55)` / strong .74;
hairline `rgba(255,255,255,.07)`, border `.10`, strong `.16`, bright `.22`.

**Status:** ok `#4ade80` · warn `#f5b544` · info `#5b9dff` · danger `#ff555d`.

**Glass material:** fill `rgba(18,19,23,.08)` (clear — black stays dominant), blur ~26px,
top-edge highlight `rgba(255,255,255,.20)`, 1px border `rgba(255,255,255,.09)`, deep diffuse
outer shadow. **Matte = the finish (diffuse), never glossy/opaque-grey.**

## Typography (`design-system/tokens/fonts.css` — Apple foundation)
- **SF Pro Display** — display/headings · **SF Pro Text** — UI/body · **SF Mono** — uppercase
  metadata/IDs/kbd · **New York** — editorial/Canvas serif. Render natively on macOS/iOS;
  on Flutter **web** they fall back (CanvasKit doesn't load system fonts) — that's expected.
- Scale (size / line / tracking): display 56/1.02/−1.68 · h1 38/1.06/−0.76 · h2 28/1.12/−0.42
  · h3 21/1.20/−0.21 · title 17/1.30/−0.085 · body 15/1.50 · sm 13/1.45 · **mono 11/1.30/+0.66
  UPPERCASE** (the signature label). Flutter: `AType` in `theme/app_theme.dart`.

## Spacing / radii / motion (`design-system/tokens/spacing.css`)
- **Spacing** 4pt: 4·8·12·16·20·24·32·40·48·64.
- **Radii — Square default:** xs 3 · sm 4 · md 6 · lg 8 · xl 9 · 2xl 12 · pill 999. Pills stay pills.
- **Motion — confident settle, no bounce:** ease-out `cubic-bezier(.22,1,.36,1)`; durations
  fast 120 · base 200 · slow 360 · view 500ms. Always honor reduced-motion (settle + freeze wallpaper).
- **Shadows:** float `0 8px 22px rgba(0,0,0,.40)`; panel `0 18px 50px rgba(0,0,0,.45)`;
  coral glow `0 6px 20px rgba(255,85,93,.45)`.

## Layout system
- **One screen.** Persistent wallpaper (built once, never reset on nav) + floating glass.
- **Arsyen Bar** = bare floating elements with empty wallpaper between them: wordmark (left);
  workflow dock (center, bare square icons, macOS-dock style — active = enlarge ×1.24 + coral,
  hover ×1.12, **no labels, no glow, no panel**); right = dark Google-style search capsule +
  bare notifications (coral dot) + avatar.
- Views start from the top (no chrome above them).
- **Per-view wallpaper hue families:** Work/Projects coral-led; Discover violet/indigo-led;
  Tools teal-led; Studio/Profile warm coral/amber. Blobs are large, soft, slow — one breathing painting.

## Interaction law ("no dead taps")
Every interactive element defines **press + hover + glow** where it carries accent. Reference:
primary `CoralButton` (pill, coral fill 0.9→1.0 hover, always a coral glow, text `#1a0608`,
`busy` spinner); segmented control 120ms; cards hover-lift with hover-revealed actions; real
imagery, gradient placeholders (never grey boxes). Cursor `click` on anything interactive.

## Guardrails (do / don't)
**Do:** keep black dominant; one coral accent per view; square corners; matte clear glass;
mono-uppercase section labels; design every state (default/hover/press/loading/empty/error/
just-deleted) — the UI must never blank.
**Don't:** no second accent in a view; no glossy/white-frosted glass; no solid
opaque bottom bar; no neumorphic/embossed clay (dead system); no friendly rounded corners by
default; no labels/glow on the dock; no SaaS drop-shadow-on-white look.

## Flutter mapping
`theme/tokens.dart` (`AColors`/`ASpace`/`ARadii`/`AMotion`) · `theme/app_theme.dart` (`AType`)
· `features/liquid/` (`liquid_tokens.dart`, `wallpaper.dart`, `glass.dart`, `controls.dart`,
`liquid_shell.dart`). **Reuse `glass.dart` + `controls.dart` — re-rolling shared controls is a reject.**

> Full visual ground truth: `design-system/ui_kits/{mac,web,iphone}/` and `design-system/_ref/`
> (screenshots). Detailed brand framing also in `liquid-glass` memory + `VISION_JUNE_2026.md`.
