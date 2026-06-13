# Arsyen Platform — Task Backlog (`platform/TASKS.md`)

> The sequenced, actionable plan for the **platform** production push (Flutter + Go).
> Per-service detail behind the master **[`../TASK.md`](../TASK.md)**. Cross-repo phasing
> in `../ROADMAP.md`; product direction in `context/VISION_JUNE_2026.md`; design law in
> `../DESIGN_LANGUAGE.md`; the design kit in `../design-system/`; per-feature specs in
> `context/flows/*`; platform architecture in `context/SUPERARCHITECTURE.md`. The previous
> POC build plan is archived at **`../_archive/platform_task_poc.md`**.

## How to use
- Work by **workstream**; within one, top-to-bottom. Each task is a self-contained unit:
  Backend / Frontend / Tests / Acceptance + the reference doc.
- Status: `[ ]` todo · `[~]` in progress · `[x]` done. Update as you go.
- **Definition of done (every task):** code + tests green in CI; migrations up/down clean;
  acceptance met; `SUPERARCHITECTURE.md` updated if schema/APIs/modules changed.
- **Quality bar (always):** authz + validation + audit on mutations; permission-aware reads;
  observability; soft-delete user data; UI never blanks (loading/empty/error/just-deleted);
  brand-accurate per `DESIGN_LANGUAGE.md`; reuse `liquid/controls.dart` + `glass.dart`
  (re-rolling shared controls is a reject); no N+1 (`ENGINEERING.md`).

## Primary target — macOS only (decision 2026-06-14)
**macOS desktop (Flutter) is THE client — complete features.** iOS = later (keep code iOS-ready).
**Web is DROPPED** — no web client app, no Flutter web preview as a run target. Build/verify on
macOS. "Start the app" = `flutter run -d macos`, nothing else.

---

## POC status (delivered — see `task_poc.md`)
M0 Foundation · M1 Identity/Onboarding/Admin · M2 Media/Assets · M3 Profile · Projects slice 1
· the liquid-glass shell + auth funnel. Canvas was built then **deleted** (now its own repo).
Treat POC code as a ~4/10 baseline to **evolve**, not rewrite.

---

## WS-A — macOS app foundation & native shell
- [x] **A1 Toolchain.** Xcode 26.5 + CocoaPods 1.16.2 installed; `xcode-select` switched;
  `flutter doctor` green for macOS (Simulator-runtime warning is iOS-only, ignore).
- [x] **A0 ✅ relocated off iCloud.** Codebase moved `~/Desktop/codebase` → **`~/Developer/codebase`**
  via `rsync` (plain `mv` timed out on iCloud FileProvider); xattrs stripped (FinderInfo gone,
  sticks now); `node_modules`/`build`/Pods excluded (regenerate with `pub get`/`pnpm i`). Main
  repo since renamed `arsyen` → **`arsyen-platform`**; AI repo `arsyen-generative-engine` created.
- [x] **A2 First macOS build.** `flutter build macos --debug` compiles **and codesigns** at the
  new path (adhoc, `com.arsyen.arsyen`, arm64; FinderInfo count 0). **Remaining:** launch via
  `flutter run -d macos` and eyeball the shell on pure-black (needs API running for live data).
- [x] **A3 Network entitlement.** Added `com.apple.security.network.client` to both
  `macos/Runner/{DebugProfile,Release}.entitlements` so the sandboxed app reaches `:8080`.
  *(Verify on first run: live data loads; Keychain `flutter_secure_storage` + `file_picker` work.)*
- [ ] **A4 Native window chrome.** Title-bar style, min window size, traffic-light inset,
  full-screen behavior, restore window frame. Match the Mac UI kit (`design-system/ui_kits/mac/`).
  **Acceptance:** window feels native; the liquid shell fills it edge-to-edge.
- [ ] **A5 App identity.** Bundle id, app name, version, icon (from `design-system/assets/`),
  category. **Acceptance:** correct icon + name in Dock/Finder.
- [ ] **A6 Distribution (decide channel first — roadmap §5.5).** Developer-ID signing +
  notarization OR Mac App Store; then auto-update channel. **Acceptance:** a signed,
  notarized build opens on a clean Mac without Gatekeeper warnings. *(needs paid Apple Dev Program)*

## WS-B — Design-system → Flutter port
- [x] **B1 Token port.** Colors (pure-black base, surface ramp, overlays/borders), type
  (SF Pro Display/Text, SF Mono, New York serif), accents → `theme/tokens.dart`,
  `theme/app_theme.dart`, `liquid/liquid_tokens.dart`. `flutter analyze` clean.
- [x] **B2 Primitive parity.** Done 2026-06-14. New `features/liquid/primitives.dart` adds the
  kit-parity set (prefixed `A` to dodge Material name clashes): `AIconButton · ATag · AStatusPill
  · ABadge · AAvatar · AProgressMeter · AInput · ASwitch · AFilterChip · ACard`. Button unified:
  `GlassButton` (variants primary/secondary/ghost/outline/danger × sizes sm/md/lg, icon/iconRight/
  glow/fullWidth/busy) with **`CoralButton` now delegating to it** (one implementation; API kept).
  `GlassSegmented` gained a **`chips`** mode (covers kit `SegmentedControl(chips)` + `Tabs`). Added
  a shared **`Pressable`** (hover+press+scale) to `controls.dart` so new primitives don't re-roll it.
  All palette-backed (re-colour live across Pure-Black/Dark/Light); `flutter analyze` clean.
  **Parity note (eyeball):** primary-button text is now near-black `on-coral #1a0608` per the design
  law (was white) — confirm or flip back.
- [x] **B3 Specimen screen.** Done 2026-06-14. `features/liquid/views/design_view.dart` + `/design`
  route (always reachable; `--dart-define=DESIGN=true` boots straight in, no backend). Self-contained
  screen with a live Pure-Black/Dark/Light switch rendering every primitive + the type ramp. Verified:
  macOS app builds, launches, renders with zero runtime exceptions.
- [x] **B4 Font fidelity (macOS).** SF Pro Display/Text, SF Mono, New York wired in `AType`
  and render natively in the Mac build (web falls back — expected).
- [x] **B5 Theme layer — Light / Dark / Pure-Black.** Done 2026-06-13. `AColors`/`AType` are now
  palette-backed (`ArsPalette` dark+light in `theme/tokens.dart`); `AppearanceController.setTheme`
  swaps the global palette + backdrop and notifies → the WHOLE app re-colours live. Studio has a
  three-way Theme switch; persisted. Wallpaper paints a clean light field in light mode. Verified
  light renders legibly end-to-end (surfaces, text, glass, board cards, shadows all flip).
- [x] **B6 Glass / texture fidelity.** Done 2026-06-13: panel LIFT (top-down gradient + bright top
  edge), `backdrop-filter saturate(135%)` on glass (`ui.ImageFilter.compose`), themed glass
  fill/edge/border/shadow, and board ticket cards now lift (themed surface gradient + soft shadow).
  *(Optional later: richer mesh-gradient placeholders.)*

## WS-C — Work workflow (Projects → Work)  — ref `flows/projects.md` (→ rename `work.md`), `VISION_JUNE_2026.md`, `design-system/ui_kits/mac/work*.jsx`
- [x] **C1 Rename + IA.** Built `views/work_view.dart` `LiquidWorkView`; dock label → "Work";
  left rail = category selector (Core/Creative/Growth/Planning) + project object list (live).
  Non-projects categories show a "coming soon" placeholder. Wired into the shell.
- [x] **C2 Persistent workspace.** Workspace loads the selected object; switching category/object/
  view is `setState`, not a route — wallpaper/shell never reset.
- [x] **C3 Object views = not pages.** Project shows Overview / Board / Action Plans / Files /
  Activity as in-workspace view tabs (Board/Plans/Files reuse the live controllers; Overview =
  stats + Canvas teaser; Activity = placeholder). *(Settings tab + richer Overview/Activity TODO.)*
- [x] **C4 Synchronized selection.** Done 2026-06-14. Focused ticket lifted to a shared
  `boardSelectionProvider` (Riverpod `Notifier.family` by project). The ticket detail now opens in
  the kit's **340px rail beside the board** (both normal + fullscreen; rail scrolls internally;
  board area flexes), replacing the below/floating presentations. **Cross-view focus:** tapping a
  ticket in **Action Plans** sets the shared selection + switches to the Board, where it opens in
  the rail. Stale-selection guard (rail only opens for a ticket that still exists). `flutter
  analyze` clean; full app builds + launches with zero exceptions. *(Create form still floats /
  inline-below — its fields are wider than 340.)*
- [x] **C5 Fullscreen as state.** Focus toggle in the action bar slides the rail away + widens
  the workspace via `AnimatedPositioned` (shell-owned `immersive` notifier); changing tab exits.
  *(Polish: center/cap workspace width in focus per the kit.)*
- [ ] **C6 Backend deltas.** Any schema/endpoint changes for Notes/Ideas/References etc. as
  they come online (migrations + Go module + tests). **Acceptance:** new categories CRUD live.

## WS-D — Web app — ❌ DROPPED (2026-06-14)
The web client/companion is **no longer built**; the app ships on macOS (+ iOS later) only.
Public-web *publishing* of creative work (D3 / `/username/<slug>`, the Next.js SEO surface in
`context/SUPERARCHITECTURE.md §8b`, and Canvas's `publishing-engine`) is **deferred, not deleted** —
the design `ui_kits/web/` and the Next `web/` dir stay as reference. Revive only if the founder does.
- ~~D1 Web shell from the React kit~~ · ~~D2 Limited surfaces~~ · ~~D3 Public publishing routes~~ — dropped.

## WS-E — Canvas engine bootstrap (schema-first)  — repo `arsyen-canvas-engine`, ref its `context/*` + `CLAUDE.md`
- [ ] **E1 Monorepo scaffold.** pnpm 11 / turbo / biome / TS, `apps/*`+`packages/*` (match
  research-platform). **Acceptance:** `pnpm i && pnpm build && pnpm typecheck` green.
- [ ] **E2 `canvas-schema`.** The universal graph: Canvas→Sections→Components→Asset refs;
  semantic identity, motion-profile ref, design-pack ref, data contracts. Versioned.
  **Acceptance:** schema validates a hand-authored sample canvas; round-trips JSON.
- [ ] **E3 `canvas-renderer` (web runtime).** Render a sample schema to a vertical-scroll
  experience + one design pack + the Minimal motion pack. **Acceptance:** sample renders;
  reduced-motion respected.
- [ ] **E4 `publishing-engine` (MVP).** Serve a rendered canvas at `/username/<slug>`.
  **Acceptance:** a static published canvas loads end-to-end (no editor/AI).
- [ ] **E5 Rendering decision (roadmap §5.1).** Decide WebView-embed vs native renderer for
  the Flutter app; document in `SUPERARCHITECTURE.md`. **Blocks** Canvas-in-Work (Phase 2).

## WS-F — Cross-repo contracts & decisions  — ref `roadmap.md` §5
- [ ] **F1 Contract home.** Decide where `canvas-schema` + the intent-patch protocol live
  (npm package vs submodule); set it up. **Acceptance:** one repo can import the other's contract.
- [ ] **F2 Identity/asset bridge.** Token/SSO sharing + signed-URL asset-reference contract
  between platform (Go/S3) and Canvas. **Acceptance:** Canvas can reference a platform asset.
- [ ] **F3 Generative boundary stub.** Define the Intent-Patch interface; stub the Generative
  Engine behind it. **Acceptance:** Canvas applies a mock intent-patch (no real AI yet).

---

## Immediate next  (updated 2026-06-14)
Done: macOS builds/runs/code-signs + login (A0–A3), token port (B1), fonts (B4), **theme layer
B5** + **glass fidelity B6**, and the **Work** view (C1/C2/C3/C5). Now → primitive fidelity, then
breadth, then native chrome:
1. **B2 primitive parity** — reconcile Flutter `glass.dart`/`controls.dart` with the kit's
   `components/` (Button, IconButton, Input, Switch, SegmentedControl, Tabs, FilterChip, Avatar,
   Badge, StatusPill, ProgressMeter, Tag); one implementation each. **→ this is the platform's next task.**
2. **C4** — the kit's 340px inline task detail beside the board + cross-view task focus from Plans.
3. **A4 / A5** — native window chrome + app icon/identity.
4. **B3** specimen `/design` route; **C3 leftovers** (Settings tab, live Overview/Activity).
5. Breadth: port **Discover / Tools / Studio / Profile** to the new kit.
Parallel track (separate repo): **E1/E2** scaffold `arsyen-canvas-engine` + lock `canvas-schema`.
Resolve **`../ECOSYSTEM.md §5.1` (does Flutter render Canvas via WebView or native?)** before Phase 2.
