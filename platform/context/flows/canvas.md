# Flow — Canvas (free-form moodboard surface)

> Module 6. A **free-form visual surface** inside a project (and later the engine
> behind **blogs**, sans project features). Depends on: Projects, Media/Assets.
> Realtime multiplayer is a **later sub-slice**.

## 0. Canvas V2 — free-form moodboard (2026-06-08) — BINDING

**Supersedes the "Notion-like linear block doc" framing below wherever they differ.**
Founder pivot: the Canvas is a **fixed-width, endless-height, free-drag moodboard /
whiteboard** — write text anywhere, drop images/videos, position every element
absolutely. It also becomes the **blog** authoring surface later.

- **Layout model:** every element (`block`) carries `x, y, w` and `h?` in **design-px**
  against `kCanvasDesignWidth` (960). `h` null = auto-height (text, measured). Array
  order = z-order. Optional **groups** (`group_id` on members + a `groups[]` list) move
  together and are the reflow unit. All of this rides inside the **opaque document
  JSON** — server unchanged (no migration, still `{"blocks":[…]}`).
- **Cross-device = responsive reflow** (founder-confirmed), two regimes by viewport:
  - **Wide (≥720px):** absolute free-form layout at the design width, uniformly
    downscaled to fit (centered, never clipped) — pixel-faithful authoring.
  - **Narrow (<720px):** **reflow** to a single readable column, elements + groups in
    reading order (sort by y, then x; group members contiguous). "Format doesn't break."
- **Interaction:** drag (body), resize (corner handles; media aspect-locked unless
  Shift), coral **snap guides** (align to siblings + canvas center), select chip
  (delete/border/settings), `+` insert menu, **double-click text to edit**.
- **Text:** contextual **format bar** floats above the caret **only while editing** —
  B/I/U/S/code/link/@mention + heading + **font/size/color/shadow** + **text animations**
  (typewriter/fade/billboard, rendered in read + published views via the shared
  `text_fx.dart`).
- **Media:** per-element panel (re-crop via the shared `showImageEditor` → **new asset**,
  non-destructive; title; **link**; border), **image carousels** (`asset_ids` + arrows).
- **Persistence:** kept-alive `CanvasController` (Riverpod `AsyncNotifier` family) holds
  the working doc across tab switches; write-through on edit + debounced PATCH. (Fixed
  the "not saving" bug — the server always persisted; the old `FutureProvider` re-seeded
  stale.)
- **Full-page focus** is now an **app-wide** behavior (`FullscreenHost` + morphing
  scroll-to-top/exit FAB), not Canvas-specific — see DesignLanguage §8.
- **Deferred:** group-creation UI (multi-select), Yjs/CRDT realtime (T6.5), to-do→Board
  + entity @mentions (T6.6), Next.js public renderer mirroring the reflow rules.

> Flutter: `features/canvas/` — `canvas_editor` (orchestrator), `canvas_surface`
> (wide/narrow scaffolding), `positioned_element` (drag/resize/measure),
> `responsive_layout` (CanvasScale + migration + reflow), `snap_guides`,
> `text_format_bar`, `text_fx`, `state/canvas_controller`.

## 0b. Build decisions (2026-06-07) — superseded in part by §0 above

These re-scope the original full-multiplayer spec into shippable slices. Where this
section and the rest of the doc differ, **this section wins**.

1. **Single-user first.** Realtime/CRDT collaboration is deferred to T6.5. Build the
   editor and persistence single-user now.
2. **One default canvas per project** (multi-canvas / standalone canvases: later).
3. **Comprehensive block set** from v1 (see §3).
4. **CRDT-ready data model now** so the multiplayer migration is mechanical: stable
   block ids + **fractional-index order keys** + per-block rich text (maps to
   Y.Array / Y.Text later).
5. **Server stays CRDT-agnostic forever** — it stores the document opaquely and
   **never parses it** (today: `jsonb` block-doc; later: opaque CRDT update log +
   snapshots).
6. **Desktop-first authoring** (mobile/iPad after).
7. **Deferred until their deps exist:** to-do → Board task sync (to-dos are plain
   checkboxes for now) and task/action-plan/work @mentions. **People @mentions
   work now** (T6.4).

### Cross-platform tech (one stack, one seam)

- **Editor UI:** a single **Flutter/Dart** codebase → macOS, web, iOS/iPad, Android.
- **Document (now):** same `jsonb` block-doc on every client; server opaque.
- **CRDT engine (T6.5):** same **Yrs (Rust) core** on every platform — bound via
  **FFI on native** and **WASM on web** (one engine, two bridges). This is the only
  platform-specific seam, and it's invisible above the CRDT layer. **Spike at T6.5**
  confirms the Flutter-web + WASM + Yrs toolchain before committing; **Dart-native
  CRDT** is the fallback (pure Dart, identical everywhere — chosen only if robustly
  Yjs-compatible).
- **Server:** single **Go** service, CRDT-agnostic, same for all clients.
- **Public web (Next.js):** not involved — canvas is a project-**internal**
  authoring surface, not a published public page.

## 1. Scope

- **One canvas per project** now (the project's Canvas tab opens it). Many named
  canvases per project, and standalone non-project canvases, come later.
- **Single-user editing** now; **real-time multiplayer** (presence/multi-cursor) at
  T6.5.
- **Universal versioning** (snapshots + restore) — from the start.

## 2. Realtime foundation (LATER — T6.5; shared infra, reused by Chat)

Deferred. When built, it introduces the shared realtime layer:

- **WebSocket gateway** in the Go service; auth on connect (access token);
  per-document **channels**; **Redis pub/sub** fans messages across API instances.
- **CRDT doc model (Yjs-compatible, via Yrs).** The client holds the CRDT; the
  server is a **relay + persistence** layer that does **not** understand the CRDT:
  - append opaque binary **updates** to a log; periodically **compact to a
    snapshot**; on join, send latest snapshot + tail of updates.
  - relay **awareness** messages (cursors/presence) without persisting them.
- **Flutter CRDT:** Yrs core via FFI (native) + WASM (web); Dart-native fallback.
  Server stays CRDT-agnostic. Decided by the T6.5 spike.

## 3. Blocks (v1, comprehensive)

Text, Headings H1–H3, bulleted & numbered lists, **to-do (plain checkbox now; →
Board task later)**, quote, callout, divider, image, image gallery, video, audio,
file/document, link/embed (with preview), and inline **@mentions** (**people now**;
tasks · action plans · works later). Authoring: **slash menu** + hover **+**/
drag-handle gutter, **drag to reorder**. Media blocks use the Asset Picker + the
shared image editor + recessed art seats; video/audio use the players from
`assets.md`.

## 4. Structured side-effects (LATER — kept in the relational model)

Deferred until their deps exist (Board tasks, action plans, works). When built, the
visual doc stays in the document blob and structured links are driven by **explicit
API calls** from the client (so the server never parses the doc):

- **To-do → Task:** creating/editing a to-do block calls the tasks API → creates a
  Board task (default Action Plan + first column) and stores a `canvas_block_tasks`
  mapping. Checking it off ↔ task done stays in sync. *(Until then: plain checkbox.)*
- **@mention → link:** mentioning a Task/Action Plan/Work/person writes a
  `canvas_mentions` row. **Bidirectional:** the target page shows "mentioned in
  <canvas>"; clicking a mention opens the target. *(People mentions land at T6.4;
  task/plan/work mentions follow.)*

## 5. Data model (owned by `canvas`)

**Now (single-user, T6.1 — `00007_canvas.sql`):**

- `canvases`: id, project_id (**unique while not deleted** — one per project),
  title, **document `jsonb`** (`{"blocks":[{id,type,...}]}`, opaque to the server,
  CRDT-ready ids+order keys inside), created_by, created_at, updated_at, deleted_at.
- `canvas_snapshots`: id, canvas_id, version_no, **document `jsonb`**, label,
  created_at (periodic + named versions for restore).

**Later (multiplayer, T6.5):**

- `canvas_updates`: id, canvas_id, seq, update_blob (bytea), author_id, ts
  (append-only CRDT log). Snapshots gain a binary/S3 `state_ref` alongside the JSON.

**Later (side-effects, T6.6):**

- `canvas_block_tasks`: canvas_id, block_id, task_id.
- `canvas_mentions`: canvas_id, block_id, target_type (`task|action_plan|work|
  user`), target_id, created_at.

## 6. API

**Now (single-user, REST):**

- `GET /v1/projects/{id}/canvas` — get-or-create the project's canvas (latest doc).
- `PATCH /v1/projects/{id}/canvas` — **debounced autosave**; replaces the document
  (title optional).
- `GET /v1/projects/{id}/canvas/versions` · `POST .../versions/{n}:restore`.
- (snapshot creation: periodic/named, server-side or on explicit save.)
- Access = **project membership** + permission grants (`projects.md`).

**Later (multiplayer, T6.5):**

- `GET /v1/canvases/{cid}/snapshot` (latest state + update tail).
- `WS /v1/realtime?doc=canvas:{cid}` — join, send/receive CRDT updates + awareness.
- To-do/mention side-effects go through the tasks + a `mentions` endpoint (T6.6).

## 7. Acceptance criteria

**Now (single-user subset):**

- All block types insert/edit/reorder via slash menu + drag.
- Autosave persists; reload restores the exact document.
- Version snapshot + restore works.
- Access respects project permissions (non-member → 403, no read/write).
- People @mentions resolve to a working chip (T6.4).

**Later (T6.5+):**

- Two clients editing the same canvas see each other's changes live, with cursors;
  offline edits reconcile on reconnect (CRDT).
- A to-do block appears as a Board task; toggling either side syncs; deleting the
  block resolves the task link sensibly.
- @mentioning a task/action-plan creates a working two-way link.

## 8. Design notes

Endless embossed doc on the matt base; max-width centered column; quiet hover
gutter; coral only for the active/primary affordance (and the "→ board" hint on
to-dos, later); zen focus mode (from Projects) hides chrome; calm presence cursors
tinted per-user (later).
