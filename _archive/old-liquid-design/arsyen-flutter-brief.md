# arsyen — Flutter Implementation Brief

You are building the **arsyen** mobile/desktop app in **Flutter** (Dart, latest stable, Material 3 disabled in favour of a fully custom design system). arsyen is a workspace for artists: managing creative **Projects**, **Discovering** other artists + chat, and a **Studio** (profile + settings).

This brief defines a single, opinionated visual architecture. Implement it exactly. A working HTML/React reference exists; this document is the source of truth for the Flutter port.

---

> **Revision — 2026-06-09 (founder; supersedes conflicting shell details below):** the top bar and bottom tab bar are replaced by the **Arsyen Bar** — NOT one bar but a *collection* of floating glass elements along the bottom: brand `arsyen` (left); the **workflows bar** (center, macOS-dock-style **bare floating square icons** — `Projects · Discover · Studio`, no panel, no labels; selected **enlarges and turns coral**, no glow; hover magnifies); and three separate utilities (right): a **dark matte Google-search-shaped capsule** (fully rounded; cycling hints, hover-widens) + a bare notifications icon + the profile avatar. Everything in the Arsyen Bar floats **bare** except the dark search capsule; the `arsyen` logo (left) is the bare wordmark. Views start from the **top** (no top chrome). Panels are **clear glass** (low ~8% fill — the black behind stays the dominant colour), read as a pane via subtle details (soft vertical sheen + diffuse top-left light + top-edge hairline + a crisp 1px edge + deep outer shadow); matte *finish* (diffuse, never glossy) — **NOT an opaque grey fill.** **Pure black** is the shipping default backdrop.

## 0. The one big idea — read this first

The entire app is **one screen**. There is exactly **one persistent animated background** ("the wallpaper") that lives behind everything and **never rebuilds or resets** when the user navigates. On top of it float **translucent glass surfaces** (frosted, blurred panels). Switching tabs **only swaps the floating cards** — the wallpaper keeps animating continuously underneath, uninterrupted.

> Think: macOS/iOS home screen. The wallpaper is alive and constant; windows (glass panels) come and go over it.

Concretely:
- The wallpaper is a single long-lived widget mounted **once** at the root, above which a `Stack` places the chrome (top bar, bottom tab bar) and the active view's glass panels.
- Navigating tabs must **not** dispose/recreate the wallpaper. Use an `IndexedStack` or an `AnimatedSwitcher` for the *content layer only*, while the wallpaper sits in a sibling layer that is built once.
- View transitions animate the **panels** (a soft rise + fade), never the background.

**Default look (ship this as the out-of-box state):**
- Surface material: **Glass**
- Backdrop: **Pure black** (the wallpaper renders as solid `#000000`, no color blobs)
- Glass translucency: **7%** fill opacity
- Accent: **Coral** `#FF555D`
- Corners: **Square** (small radii)
- Overall finish: **matte** — diffuse, low-gloss; no shiny specular rims.

The colorful "living" wallpaper is **opt-in** by the user from the Studio → Appearance settings (see §7).

---

## 1. Design tokens

Create `lib/theme/tokens.dart` exposing these as `const` values. Do **not** invent new colors.

### Brand & surfaces
```
brandPaper   #EAEAEA
brandInk     #26282B   // signature matt charcoal
coral        #FF555D   // the single accent
coralHover   #FF6E75
coralPress   #E8454D
coralGlow    rgba(255,85,93,0.45)

bgBase       #0B0C0D
bgSunken     #050506
surface1     #161719
surface2     #1F2123
surface3     #26282B
surface4     #303237
```

### Text
```
fg1  #EDEDEE   // primary
fg2  #9B9DA2   // secondary / labels
fg3  #66686D   // tertiary / muted / placeholder
fgDisabled #44464A
fgOnCoral  #1A0608
```

### Borders / hairlines (white at low alpha)
```
hairline      rgba(255,255,255,0.07)
border        rgba(255,255,255,0.10)
borderStrong  rgba(255,255,255,0.16)
borderCoral   rgba(255,85,93,0.55)
```

### Status (kept muted — monochrome system)
```
ok #4ADE80   warn #F5B544   info #5B9DFF   danger #FF555D
```

### Radii — **two sets**, switchable live by the Shape setting
The app ships **Square**. Provide all three; the active set drives every corner.
```
Square : xs 3, sm 4, md 6,  lg 8,  xl 9,  pill 9
Soft   : xs 6, sm 8, md 13, lg 18, xl 22, pill 22
Round  : xs 8, sm 10,md 16, lg 22, xl 30, pill 999
```
> Note the brand's native CSS radii are the "Soft" set; this exploration defaults to Square per design direction.

### Spacing (4pt base)
`4, 8, 12, 16, 20, 24, 32, 40, 48, 64`

### Motion
```
easeOut    Cubic(0.22, 1, 0.36, 1)
easeInOut  Cubic(0.65, 0, 0.35, 1)
durFast 120ms   dur 200ms   durSlow 360ms
```

---

## 2. Typography

Use `google_fonts`. Three families:
- **Display** — `Space Grotesk` (titles, big numerics). Weights 500/600. Tight tracking.
- **Text/UI** — `Hanken Grotesk` (body, labels, buttons). Weights 400–700.
- **Mono** — `Space Mono` (captions, metadata, technical labels — ALWAYS uppercase, letter-spacing ~0.12em).

Type scale (size / lineHeight / letterSpacing, color):
```
display 56 / 1.02 / -0.03em   fg1   (Space Grotesk 600)
h1      38 / 1.06 / -0.02em   fg1   (Space Grotesk 600)
h2      28 / 1.12 / -0.015em  fg1   (Space Grotesk 600)
h3      21 / 1.20 / -0.01em   fg1   (Space Grotesk 500)
title   17 / 1.30 / -0.005em  fg1   (Hanken 600)
body    15 / 1.50 / 0         fg2   (Hanken 400)
sm      13 / 1.45 / 0         fg2   (Hanken 400)
caption 11 / 1.30 / 0.06em    fg3   (Space Mono 400, UPPERCASE)
```
Expose as a `TextTheme`-like helper, e.g. `AppText.h2`, `AppText.caption`.

---

## 3. The wallpaper engine (the heart of the app)

Implement as a single `Wallpaper` widget driven by a `Ticker` (use `SingleTickerProviderStateMixin` + a repeating `AnimationController` or a raw `Ticker`). Render with a **`CustomPainter`** (or a fragment shader via `FragmentProgram` for best perf — CustomPainter is fine to start).

It has **three modes**, chosen by settings:

### a) Pure black (DEFAULT)
Paint the whole canvas solid `#000000`. Nothing else. The glass panels then read as dark frosted glass over true black. This is the shipping default and the look the team approved.

### b) Living
A field of **5 large, soft radial "light blobs"** drifting forever over a near-black base (`#070809`), blended **additively** (`BlendMode.plus`). This evokes an Apple-style living wallpaper.

Each blob has: an RGB color, a radius fraction, a parallax depth, and a drift scale. Animate each blob's center along a slow **Lissajous** path (independent sine/cosine per blob) so motion is organic and never loops visibly. Blob alpha ≈ `0.42 * glow`. Radius ≈ `radiusFrac * max(W,H)`, gently pulsing.

After the blobs, lay a faint dark radial in the center so text panels stay legible.

**Always moving:** the drift has a constant base speed *plus* the user's motion multiplier — even at motion = 0 it keeps a gentle baseline drift. It must animate continuously regardless of navigation.

**Per-tab hue shift:** each tab has its own 5-color palette. On tab change, **lerp** the current blob colors toward the new palette over ~1s (don't snap). Palettes:
- **Projects:** coral `#FF555D`, violet `#9646DC`, magenta `#E84078`, blue `#406ED2`, ember `#D2603C`
- **Discover:** violet `#7850EB`, blue `#3878E0`, indigo `#563CC8`, teal `#28AAB4`, coral `#FF555D`
- **Studio:** coral `#FF555D`, amber `#F0964A`, rose `#E14682`, blue `#466ED7`, violet `#9650DC`

**User accent override:** when Living, the **lead blob (index 0)** is biased to the user's chosen accent color so the wallpaper feels personalised ("their chosen colors").

**Cursor / pointer reactivity (parallax):** track pointer position (desktop/web: hover; touch: drag). Offset each blob opposite to the pointer by `depth * reactivity * 0.10`, smoothed. On touch-only devices, you may instead drive a subtle parallax from the **accelerometer** (`sensors_plus`) or fall back to none — keep it optional and cheap.

### c) Matte charcoal (only when surface = Embossed — see §6)
A flat `#191A1D` field with one very faint, slowly drifting light patch. This gives the neumorphic surfaces a mid-tone to emboss against.

**Performance:** render the painter at a reduced internal resolution and apply a heavy blur (the blobs should be buttery, not crisp). In Flutter, achieve the soft look via large `MaskFilter.blur` on the blob circles, or paint to a low-res layer and scale up with an `ImageFiltered`/`BackdropFilter`. Target 60fps; cap work on low-end devices. Respect `MediaQuery.disableAnimations` / reduce-motion → drop to a static gradient.

---

## 4. Glass surfaces (matte)

Build a reusable `GlassPanel` widget = `ClipRRect` + `BackdropFilter(ImageFilter.blur(sigmaX/Y ≈ blur*0.6))` + a translucent fill + 1px border + soft shadow. Keep it **matte**: minimal top highlight, no glossy bloom.

Recipe (Glass material, the default):
- Fill: `surface tint (rgb 18,19,23)` at **`translucency`** opacity (default **0.07**), with a barely-there top→transparent vertical gradient (`white @ 0.025 → transparent` over top 40%).
- `backdropFilter`: gaussian blur, sigma ≈ `blur` px (default 26) → use ~`blur * 0.6` as Flutter sigma; add a slight saturation boost if you composite a saturation matrix (optional).
- Border: `1px rgba(255,255,255,0.09)`.
- Corner radius: from the active radii set (`lg` for panels, `pill` for chips/bottom bar).
- Shadow: deep + diffuse — `0 18 50 rgba(0,0,0,0.45)` plus a tiny `0 2 8 rgba(0,0,0,0.30)`; **plus** a 1px inner top highlight `rgba(255,255,255,0.08)` to read as "lifted matte".
- A **single quiet top-edge hairline** (a 1px white gradient at ~0.20 alpha, inset 10% from each side) for definition on black. No bright specular rim.

Variants to provide:
- `GlassPanel` — the big frosted card.
- `GlassChip` — small pill button/segment (slightly higher fill, smaller blur).
- `GlassChip.active` — selected state (a touch brighter).
- `CoralButton` — primary action: coral fill (~82%) with a faint top sheen, coral glow shadow, white text.
- `GlassWell` — recessed inset container (`rgba(0,0,0,0.22)` fill, inset shadow) for seating artwork/inputs.

---

## 5. App shell & layout

Root `Stack`, bottom → top:
1. **`Wallpaper`** (built once, never rebuilt on nav).
2. A subtle **vignette** overlay (radial darkening top & bottom) — `IgnorePointer`.
3. **Content layer** with padding (≈ 20px sides): a column of
   - **TopBar** (brand wordmark "arsyen" in Space Grotesk left; right: a glass quick-search pill, a glass bell button with a coral unread dot, and the user avatar that deep-links to Studio).
   - **Active view** (Projects / Discover / Studio) in an `AnimatedSwitcher` (panel rise + fade, `easeOut`, ~500ms). Keep wallpaper untouched.
   - **Bottom TabBar**: a centered floating **glass pill** containing 3 items (Projects · Discover · Studio). The active item expands to show its label + accent-tinted background + coral glow; inactive items are icon-only. The bar floats with margin from the screen edges (not edge-to-edge).

Icons: use a 1.5px-stroke line icon set (Lucide-style). Bundle as an `IconData` font or inline `CustomPainter`/SVG (`flutter_svg`). Names used: home, search, plus, bell, settings/gear, share, heart, check, more, grid, image, star, eye, palette, folder, compass, chat, sliders, send, fileText, briefcase, comment, lock, pin, users, link, logout, user.

---

## 6. Surface material modes: Glass ↔ Embossed

A global setting `surface` toggles the **entire** surface language:

- **Glass** (default): as §4 — translucent frosted panels over the wallpaper.
- **Embossed** (neumorphic): panels become **matte tiles extruded from the brand ink** — no blur, no translucency. Use the brand's neumorphic shadow pairs (light top-left, dark bottom-right):
  ```
  neuBase   #26282B   neuBase2 #2C2E32   neuWell #212326
  raise:    7 7 16 rgba(0,0,0,.55) / -6 -6 14 rgba(255,255,255,.045)
  raiseSm:  4 4 10 rgba(0,0,0,.5)  / -4 -4 9  rgba(255,255,255,.04)
  raiseLg:  12 12 28 rgba(0,0,0,.6)/ -9 -9 22 rgba(255,255,255,.05)
  inset:    inset 4 4 9 rgba(0,0,0,.6) / inset -4 -4 9 rgba(255,255,255,.05)
  insetSm:  inset 2 2 5 rgba(0,0,0,.55)/ inset -2 -2 5 rgba(255,255,255,.045)
  ```
  Raised tiles = convex; **selected / pressed items go inset** (concave) — e.g. the selected project in the list presses in, segmented-control troughs are recessed, toggle tracks are recessed wells with raised knobs. When `surface = Embossed`, force the wallpaper into **Matte charcoal** mode (§3c) so the emboss reads.

Flutter has no multi-shadow `BoxDecoration` limitation — pass a `List<BoxShadow>` with both the dark and light shadow to get the neumorphic effect.

---

## 7. Studio → Appearance (in-product theming) — REQUIRED

The Studio (profile) screen is the user's settings home. It has a left **profile card** (avatar, name, discipline, location, bio, stats, skill chips, Edit/Share actions) and a right **settings panel** (scrollable) with sections: **Notifications**, **Privacy**, and **Appearance**.

The **Appearance** section is a real product feature that drives the live theme. Build these controls (matte styling — recessed troughs, soft fills, no gloss):

1. **Backdrop** — segmented control: `Pure black` | `Living`. Selecting **Living** turns the wallpaper on in color; selecting **Pure black** returns to the default solid-black void. The active segment is accent-tinted.
2. A **"Living wallpaper" group** (visually **dimmed/disabled** when Backdrop = Pure black, since these only affect the living wallpaper):
   - **Accent color** — a row of color swatches (Coral `#FF555D`, Violet `#9B6BFF`, Azure `#4F9BFF`, Amber `#F5A742`). The chosen accent (a) recolors the whole app's accent (`--accent`: buttons, active states, glows, slider fills) and (b) biases the wallpaper's lead blob — "make it living as per the user's chosen colors".
   - **Glow** — slider, 40–160% (blob brightness).
   - **Motion speed** — slider, 0–220% (drift speed; baseline drift always remains).
   - **Cursor reactivity** — slider, 0–240% (parallax strength).
3. **Shape** — segmented control: `Square` | `Soft` | `Round`. Switches the active radii set across the whole app (applies in any backdrop mode).

Controls styling: segmented control = recessed dark trough with a raised/active selected segment; sliders = recessed track with an accent-colored fill up to the thumb and a soft pale knob; swatches = circular, selected gets a ring in its own color.

All Appearance settings **persist** (`shared_preferences`) and apply instantly app-wide. Also keep the existing toggle rows (Commission requests, Mentions, Crew activity, Public portfolio, Commissions open) — these are plain switches styled as matte toggles (recessed track, raised knob, coral when on).

---

## 8. The three views

Match the reference content and density. Use the sample data shape below.

### Projects
- **Left glass panel (≈340px / full-width sheet on mobile):** header ("Projects", count, + button) and a scrollable list of project rows. Each row: small artwork thumbnail (a generative gradient seat), title, status dot+label, a stacked-avatar crew row, a thin coral progress bar + %. The **selected** row is highlighted (Glass: brighter fill; Embossed: pressed-in/concave).
- **Right larger glass panel:** the selected project's detail —
  - A short **hero banner** (the project's generative artwork with a left-dark gradient), overlaid status + big title (Space Grotesk), and link/more glass buttons top-right.
  - A **meta row**: Your role, Type, Crew avatars, and a Progress bar.
  - A **segmented switch**: `Board · Canvas · Milestones · Files` (recessed trough).
    - **Board** — 4 columns (To do / In progress / Review / Done), each a recessed well holding task cards (title, ticket id, assignee avatar). Cards lift on hover.
    - **Canvas** — a "live doc" well with a heading, intro paragraph, and an inline checklist (checked items show a coral check + strikethrough).
    - **Milestones** — list of milestone rows (star icon tile, label, "Upcoming", date).
    - **Files** — a responsive grid of file tiles (file icon + name).
  - Selecting a project on the left **swaps the right panel content only** (no nav, no wallpaper reset). Switching sub-tabs animates the inner content (panel rise/fade).

### Discover
- **Main glass panel:** a recessed **search well** (icon + input + Filters chip), a row of filter **chips**, then **Featured artists** (2 large cards) and **Most relevant** (3 smaller cards). An **artist card** = artwork header with a bottom gradient, a "% match" mono chip, the artist's avatar + name + discipline·city, skill chips, and a coral **Message** button + a profile icon button.
- **Right glass rail (≈320px):** **Chat** — header + new-chat button, a `Direct | Community` segmented control, and a list of chat rows (avatar with online dot, name, last message preview, timestamp, unread coral dot).

### Studio
See §7 (profile card + settings with the Appearance controls).

---

## 9. Sample data (mirror these shapes)

```dart
// Project
{ id, title, status('In production'|'In review'|'Planning'),
  role, type, progress(0-100), crew:[avatarIdx...], artIdx,
  stages: { 'To do':[{t, who}], 'In progress':[...], 'Review':[...], 'Done':[...] },
  milestones:[{label, date}] }

// Artist
{ id, name, discipline, city, match(0-100), open(bool),
  avatar(int), skills:[String...] }

// Chat
{ id, name, avatar(int), last, when, unread(int), online(bool) }

// Me (Studio)
{ name, discipline, city, bio, avatar, art,
  stats:[{label, value}], skills:[String...] }
```
Generative **artwork** = a stack of 2 radial gradients over a dark base (deterministic per `artIdx`); **avatars** = a diagonal 2-stop gradient per `avatarIdx`, circular, optional online dot + ring. Provide ~6 projects, ~5 artists, ~5 chats.

---

## 10. State & architecture

- State management: **Riverpod** (or Provider) — your call; keep it simple.
- A single `AppearanceController`/`Notifier` holds: `surface`, `backdrop`, `accent`, `glow`, `motion`, `reactivity`, `corners`. Persist to `shared_preferences`; expose as a listenable the `Wallpaper`, theme, and all surfaces read from. Changing any value updates the live UI immediately and does **not** rebuild the wallpaper widget itself (it reads the values each frame from the controller).
- Navigation between the 3 tabs is **in-page index state**, not a `Navigator` push — the shell stays mounted so the wallpaper persists. (Deep links/routes optional later.)
- Folder sketch:
  ```
  lib/
    main.dart
    theme/ tokens.dart  text.dart  radii.dart
    state/ appearance.dart
    wallpaper/ wallpaper.dart  wallpaper_painter.dart  palettes.dart
    surfaces/ glass.dart  emboss.dart  controls.dart   // GlassPanel, CoralButton, Seg, AppSlider, Swatches, Toggle
    shell/ app_shell.dart  top_bar.dart  tab_bar.dart
    views/ projects/…  discover/…  studio/…
    data/ samples.dart  art.dart  avatars.dart
    widgets/ icon.dart  avatar.dart  art_fill.dart  crew.dart
  ```

---

## 11. Acceptance checklist

- [ ] App opens in **Glass · Pure black · 7% translucency · Square corners · Coral** — a near-black, matte, minimal look with artwork + coral as the only color.
- [ ] One wallpaper instance persists across all tab switches; it **never resets**; content panels animate, background does not.
- [ ] The wallpaper is **always animating** (baseline drift even at motion 0).
- [ ] Studio → Appearance can switch to **Living**, choose an **accent** (recolors app + biases wallpaper), and tune **glow / motion / cursor reactivity / shape**, all persisting and applying instantly.
- [ ] Per-tab hue lerp visible in Living mode (Projects coral-led → Discover blue/violet → Studio warm).
- [ ] **Surface = Embossed** swaps every surface to matte neumorphic tiles (selected = concave) over the matte-charcoal field.
- [ ] All three screens match the reference layout and density; everything is **matte** (no glossy rims/blooms).
- [ ] 60fps on a mid-range device; reduce-motion falls back to a static backdrop.
- [ ] Min hit target 44px; text never below the scale in §2.

Build it clean, componentised, and faithful to these tokens. When something is ambiguous, prefer the **most minimal, matte, black** option.
