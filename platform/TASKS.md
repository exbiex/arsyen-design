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
- [x] **A4 Native window chrome.** Done 2026-06-14. `MainFlutterWindow.swift`: **transparent
  unified title bar** (`titlebarAppearsTransparent` + `titleVisibility=.hidden` + `.fullSizeContentView`)
  so the animated wallpaper flows behind a hidden title; standard traffic-lights overlay the
  top-left; `backgroundColor = .black` (no white launch flash); min 1040×720; **window frame
  remembered** across launches via `setFrameAutosaveName("ArsyenMainWindow")` (centered 1440×900
  on first run). Deliberately **not** `isMovableByWindowBackground` (it hijacks in-app drags on
  Flutter macOS — the title-bar strip alone stays the drag region). Shell top padding bumped to
  32px on macOS (`liquid_shell.dart`) to clear the traffic lights. Built + codesigned clean
  (adhoc, FinderInfo 0). **Acceptance met** (final eyeball on next `flutter run -d macos`).
- [x] **A5 App identity.** Done 2026-06-14 — fully met. Display name **Arsyen** (`CFBundleName` +
  `CFBundleDisplayName` + MainMenu.xib About/Hide/Quit), bundle id kept **`com.arsyen.arsyen`**
  (changing it breaks the signing identity + Keychain), version 1.0.0, category
  **`public.app-category.productivity`**, copyright fixed — all verified in the built bundle.
  **Icon:** the master is code at `icon-master/icon-master/Arsyen Icon Master.html` (the `a/.` mark,
  "Midnight" colorway). Rendered to a transparent 1024×1024 via headless Chrome
  (`app/tool/icon_source/icon_master_render.html` → `arsyen_icon_1024.png`), then fanned into every
  asset-catalog size by `app/tool/macos_app_icon.sh`; baked into `Assets.car`, legible to 16px.
  **Acceptance met:** correct name + icon in Dock/Finder (final eyeball on next run).
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
  Activity / **Settings** as in-workspace view tabs. **Leftovers done 2026-06-14:** **Activity** is
  now a **live** feed (`GET /v1/projects/{id}/activity`, composed server-side from tickets + files —
  no events table) with a recent-activity strip on **Overview**; a **Settings** tab does rename /
  visibility / status (chips from the project's statuses) / danger-zone delete, wired to
  `ProjectsController.patch`/`delete`.
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
- [x] **C6 Backend deltas.** Done 2026-06-14. New **`work`** module + `00014_work_items.sql`
  (one `kind`-tagged, owner-scoped table for **Notes / Ideas / References**; full + partial
  indexes per the engineering bar). `GET /v1/work/items?kind=`, `GET /v1/work/counts`, `POST`,
  `GET/PATCH/DELETE /v1/work/items/{id}`; owner-scoped authz (no existence leak); idea-status +
  reference-url validation. Integration test green; devseed seeds samples. Flutter `features/work/`
  (models · repo · `FutureProvider.family` + `WorkActions`) wired into the Work rail (live counts +
  object list) + an autosaving editor with all states (loading/empty/error/just-deleted). HTTP
  smoke-tested end-to-end (counts, list, create/patch/delete, 422 on bad status). **Acceptance met:
  the new categories CRUD live.** *(Inbox/Tasks/Moodboards/etc. remain scaffolded placeholders.)*
- [x] **C7 Inbox (notifications).** Done 2026-06-30. New **`notifications`** module + `00016_notifications.sql`
  (recipient-scoped table: `kind` mention|assigned|comment|reply|completed, denormalised actor_name +
  target_title, project/task refs, read_at). `GET /v1/me/notifications?filter=`, `POST …/{id}/read`,
  `POST …/read-all`; per-filter unread counts. Flutter `features/inbox/` (models · repo ·
  `inboxControllerProvider`) + `views/inbox_view.dart` (filter chips All/Mentions/Assigned/Comments,
  TODAY/EARLIER groups, avatar+type-badge rows, unread dots); tapping marks-read + **deep-links to the
  task board**. devseed seeds examples linked to real tasks. Ref `design-overhaul-instructions/ref/inbox.png`.
  **Pending / later:**
  - [x] **Live events (2026-07-01).** Notifications now auto-create on real events. A `Notifier` interface
    (mirroring `SetMedia`) is injected into `projects` **and** `work`, with an adapter in `cmd/api` mapping to
    `notifications.CreateParams` (so neither module imports notifications). `projects` fires **`assigned`**
    (newly-added assignees only, diffed against the prior set in `SetAssignees`), **`comment`**/`reply`
    (task assignees / parent-comment author in `AddComment`), and **`mention`** (`@username` parsed from the
    comment body → `identity.UserIDByUsername`). A `Directory` (identity: `DisplayName` + `UserIDByUsername`)
    denormalises actor names + resolves mentions. Verified live: assign/comment/@mention all land in the
    recipient's Inbox. *(See C9 for note @-mentions.)*
  - [ ] **Sidebar FILTERS section** in the Work rail when Inbox is active (All/Mentions/Assigned/Comments with
    counts), per the mockup. Only the top filter chips exist so far.
  - [ ] Minor: mockup uses a blue accent (we use the monochrome baseline); wire the bottom-bar bell → Inbox.
- [x] **C8 Calendar.** Done 2026-06-30. New **`calendar`** module + `00017_calendar.sql` (`calendar_events`,
  `calendar_event_members`, + `work_items.date`). `GET /v1/me/calendar?from=&to=` **aggregates** standalone
  events + task due-dates (red, from `tasks.due_date`) + dated TODOs (amber) into one feed; `POST/PATCH/DELETE
  /v1/me/calendar/events` (CRUD + members, transactional, owner-scoped). Flutter `features/calendar/` +
  `views/calendar_view.dart` (**Month / 3-month / Year** views via `LayoutBuilder` grids — today circle, colour
  pills, view switcher, ←/→) + `calendar_event_editor.dart` (title/notes/date+time/all-day/colour, create/edit/
  delete). Task chips deep-link to the board. devseed seeds the current month. Ref `…/ref/calendar.png`.
  **Pending / later:**
  - [ ] **Event members picker UI** — backend stores `member_ids`; **`GET /v1/me/people` now exists** (built
    with C9's @-mention, 2026-07-01: distinct project collaborators `{user_id, name, username, role}` +
    `peopleProvider`) — wire the calendar editor's member picker to it.
  - [ ] **UPCOMING sidebar section** in the Work rail when Calendar is active (next events), per the mockup.
  - [ ] Minor: date/time use Material `showDatePicker`/`showTimePicker` (not glass-styled) — build glass pickers.
- [~] **C9 Notes — custom block editor.** Started 2026-06-30. **Decision: custom Flutter block editor**
  (NOT appflowy_editor — avoids the MPL license + heavy restyle; full design-language control), per the
  founder + `temp/EDITOR_SPEC.md` + the `temp/arsyen_notes_*.html` refs. **Backend (done + verified):**
  migration `00018` (`work_items.document jsonb` + `project_id`; `work_item_revisions` append-only). Work
  module: `GET /work/items/{id}/document` (load), `PUT …/document` (autosave → denormalised title/body +
  revision), `GET …/revisions` + `…/revisions/{rev}` (history/restore). **Frontend (done):** `features/notes/`
  (NoteDoc/NoteBlock/NoteSpan/NoteMark model + repo + `notesListProvider`) + `views/notes_view.dart` (card
  grid → opens editor) + `views/note_editor_view.dart` (title, meta, divider, core blocks [text, H1–H3,
  bulleted, numbered, to-do, quote, callout, divider, code]; Enter-split / Backspace-merge via focus-node
  key handling; markdown shortcuts; to-do toggle; debounced autosave; in-panel + full-screen surfaces).
  Wired into the Notes category. Body accent = blue `#2E7DF6`; chrome on app tokens.
  **Done since:**
  - [x] **+ block-inserter** (focus-line gutter `+` → on-screen `showMenu`; the `/` trigger was removed at
    founder request). **Merged (PR #16).**
  - [x] **Selection toolbar + INLINE marks** (2026-06-30): a `RichFieldController` (TextEditingController
    subclass) stores marks as char ranges, renders them via `buildTextSpan`, and shifts ranges on every
    edit; `toSpans()` round-trips to NoteSpan/NoteMark. Marks: **bold/italic/underline/strike/code**.
    Apply via a floating **auto-show selection toolbar** (anchored above the block, minimal marks +
    **Aa** expand → turn-into block types; `TextFieldTapRegion` so taps don't collapse the selection) or
    **Cmd+B/I/U · Cmd+Shift+S · Cmd+E**. Also: Enter on an empty styled block exits to plain text;
    Shift+Enter soft-break; tighter body line-height (1.5). **⚠️ Hard-won fix:** the editor MUST use a
    `ListView` (not `SingleChildScrollView`) — a focused multiline `TextField` in a scroll view relayouts
    every frame and storms the mouse tracker (`!_debugDuringDeviceUpdate`) → frozen input. Also: this
    stateful editor does NOT survive hot-reload (blanks); verify on a full app restart. *(Not committed yet.)*
  - [x] **@mention chip + live Inbox wiring (2026-07-01).** Typing a fresh `@` at a word boundary opens a
    people picker (`showMenu`, mirrors the `+` inserter) sourced from **`GET /v1/me/people`** (`peopleProvider`);
    picking inserts an accent-blue mention. `RichFieldController` gained a parallel mention range→userId set that
    round-trips `NoteMark.mentionId` (previously dropped), renders via `buildTextSpan`, and shifts/clears on edit.
    On autosave the `work` module diffs old-vs-new mention sets and raises a **`mention`** notification carrying
    `work_item_id`; tapping it in the Inbox opens the note (`onOpenNote` → `NotesView(openNoteId:)`). New migration
    `00019` (`notifications.work_item_id`); devseed seeds a 3-person crew (`nadia`/`soren`/`mara`, pw `root`) on a
    demo project so the picker + notifications are exercisable. Backend: unit tests (`parseMentions`, `mentionIDs`)
    + a DB integration test (no-re-notify-on-autosave). **Verified live** (chip renders; recipient's Inbox gets
    the mention). *(picker is list-only for now — live type-to-filter is a follow-up.)*
  - [x] **@mention picker → live inline overlay (2026-07-01).** Reworked per founder feedback from the safe
    `showMenu` into a caret-anchored `CompositedTransformFollower`/`OverlayEntry`: type after `@` and it filters
    live (name/username/word-prefix > substring, ties keep project-closeness order), ↑/↓ move, Enter/Tab picks
    the top match, Esc/space/delete closes. A frosted-glass card (blur + soft shadow + hairline edge), width-clamped
    to the window; rows show **real profile photos** (`/me/people` returns a presigned `photo_url`; devseed seeds
    gradient avatars). *(Left: live type-to-filter DONE; give-access prompt + `@username` free-parse remain.)*
  - [x] **Toolbar extras (2026-07-01):** **link** (capture-selection → URL dialog → restore+apply, so the dialog's
    focus-steal doesn't drop the selection), **text colour** (inline swatch row, 7-colour palette, no focus loss),
    **clear-formatting**. `RichFieldController` now carries value-marks (link URL, colour token) alongside the
    boolean marks — round-trips `NoteMark.link`/`color` (were dropped), renders (link=accent+underline,
    colour=token→Color), shifts on edit.
  - [x] **Revision-history UI (2026-07-01):** ⋯ menu → **Version history** side panel (dim scrim + right drawer)
    over `GET …/revisions`; each row = relative time + **Restore** (fetches the snapshot doc → rebuilds the
    editor → re-saves = non-destructive). *(Note: a revision per autosave → long histories; server-side thinning
    is a follow-up.)*
  - [x] **Embeds — image + bookmark (2026-07-01):** + menu gains **Image** (file_picker → reuse the asset
    presigned-upload pipeline; block stores the **asset id**, render resolves a fresh presigned URL — presigned
    URLs expire so we never persist them) and **Bookmark** (new **`POST /v1/work/unfurl`** — server-side OpenGraph
    fetch with an SSRF guard: http(s) only, resolves+dials the IP, blocks loopback/private/link-local, 6s timeout,
    512KB cap, ≤4 redirects → `{url,title,description,image,site}`; renders a card). Hover-remove on both; video/file
    = Phase 2. Bookmark card is display-only for now (no `url_launcher` dep — open-on-click is a follow-up).
  - [x] **Note access on @mention + read-only (2026-07-02) — fixed a real bug.** The @mention deep-link was
    dead: reads were owner-scoped so a mentioned user got 404. Now migration `00020` **`work_item_access`**
    (item_id,user_id); the note save **grants read access** to everyone mentioned (idempotent, `unnest`);
    `GetDocument`/`Revisions`/`RevisionDocument` are **owner-OR-granted**; the DTO carries `read_only` so the
    editor opens **view-only** for non-owners (fields readOnly, no autosave/+/toolbar/drag, "View only" chip).
    Saves/delete stay owner-only. Integration-tested (mentioned=read-only, owner=editable, stranger=404); verified
    live via API.
  - [x] **Revision thinning (2026-07-02):** the save coalesces rapid autosaves — updates the newest revision if
    it's <90s old (created_at kept, so a fresh snapshot starts after ~90s of activity), else inserts. History
    stays meaningful instead of one-row-per-keystroke.
  - [x] **Drag-handle reorder (2026-07-02):** each block's gutter gets a drag handle (`Draggable<_Blk>` + a
    per-block `DragTarget`, accent drop-line); dropping reorders + persists. Hidden in read-only.
  - [x] **Note meta (2026-07-02):** the meta row gains a **project picker** (`showMenu` over the user's projects →
    sets `project_id`) and **collaborator avatars** (a stack of the note's @-mentioned people, real photos).
  - [x] **Bookmark open-on-click (2026-07-02):** added `url_launcher`; tapping a bookmark card opens its URL
    externally (needed a full rebuild for the native plugin).
  - [ ] **Remaining:** inline-link click-to-open (bookmark opens; inline `link` marks don't yet) · `@username`
    free-parse (type a full `@handle` without picking) · @mention give-access *prompt* (today access is
    auto-granted on mention, no prompt).

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
Done: macOS builds/runs/code-signs + login (A0–A3), **native chrome + identity (A4/A5)**, token
port (B1), **primitive parity B2**, specimen route **B3**, fonts (B4), **theme layer B5** +
**glass fidelity B6**, the **Work** view (C1–**C6**, incl. Settings + live Activity + the **work**
module: Notes/Ideas/References CRUD). The whole WS-B port + WS-C are complete; WS-A is complete
except A6 (distribution, needs a paid Apple Dev account). Now → breadth:
1. Breadth: port **Discover / Tools / Studio / Profile** onto the B-series primitives/kit. **→ next.**
2. Graduate more Work categories: **Inbox (C7) + Calendar (C8) shipped 2026-06-30** (each its own module +
   migration; merged to `main` via PR #15). See their **Pending / later** sub-items — Inbox live-events +
   filters rail; Calendar members picker + UPCOMING rail. Remaining categories: Tasks / Moodboards / Assets /
   Contacts / Opportunities — the `work` / notifications / calendar module + rail pattern is in place to extend.
3. **A6 distribution** — Developer-ID signing + notarization (blocked on a paid Apple Dev Program).
Parallel track (separate repo): **E1/E2** scaffold `arsyen-canvas-engine` + lock `canvas-schema`.
Resolve **`../ECOSYSTEM.md §5.1` (does Flutter render Canvas via WebView or native?)** before Phase 2.
