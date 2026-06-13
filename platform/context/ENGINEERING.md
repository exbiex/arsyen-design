# Arsyen — Engineering Standards

> The code-quality bar, established in the 2026-06-12 tech-debt pass. These are
> enforced expectations, not suggestions. Architecture lives in
> `SUPERARCHITECTURE.md`; the design language in `new design/arsyen-flutter-brief.md`.
> Update this file whenever a new standard is set.

## The premise

Arsyen will hold huge data and must stay fast despite it. Every query, list, and
frame is written for that future from day 0 — but with the **lean** discipline
(no speculative infra; the cheap-at-scale version of the simple thing, not the
complicated thing).

## Backend (Go)

1. **No N+1 queries.** Anything list-shaped resolves its media URLs through the
   assets service's batch `URLsFor(ids) → (mains, thumbs)` — 2 queries for any
   list length. Calling `URLs()` per row is a bug. The same rule applies to any
   future cross-module per-row lookup: add a batch method.
2. **Batch multi-row writes.** Insert/update sets with `unnest($n::type[])`
   (+ `WITH ORDINALITY` when position matters). Never loop `Exec` per row.
3. **Multi-step writes are one transaction.** A half-created aggregate must
   never survive (task + assignees + labels; project + statuses + columns +
   plan + membership).
4. **Every FK column that gets scanned has an index.** Cascades, ON DELETE SET
   NULL, and reassignment UPDATEs scan the referencing table; partial indexes
   (`WHERE deleted_at IS NULL`) do NOT serve them. See `00012_perf_indexes.sql`.
5. **Index-shaped queries.** No `OR` across joins that defeats both indexes
   (use UNION of two indexed lookups — see `AuthByIdentifier`). Keyset/cursor
   pagination (the `httpx.Page` envelope) the moment a list is unbounded per
   user (feed, search); per-user bounded lists (own projects) may stay whole.
6. **One transport toolkit.** `httpx.Decode` (strict), `httpx.JSON`,
   `httpx.Error`, the `ok`/`okFE` handler helpers. No per-module copies.
7. **Soft-delete-aware everything.** Reads exclude `deleted_at`; writes that
   reassign children must include soft-deleted rows (that's why FK indexes are
   full, not partial).

## Frontend (Flutter)

1. **The liquid layer is componentised — reuse, don't re-roll.**
   `features/liquid/controls.dart` holds the shared controls: `Tappable`
   (cursor+tap), `HoverBuilder`, `GhostButton`, `GlassSegmented`,
   `LoadingPanel`, `LabeledField`, `AssetTile`, `showGlassDialog`,
   `showGlassMenu`, `promptText`, `pickYmd`, plus `errText/pretty/shortDate/
   ymd/fileSize/kindIcon/avatarIdx/cachePx/progressBar`. A second hand-rolled
   `MouseRegion + GestureDetector`, segmented control, or hover StatefulWidget
   is a review reject.
2. **Every interactive element defines hover + press feedback** (built into
   `GlassChip`/`CoralButton`/`Tappable`+`HoverBuilder`) — no dead taps.
3. **Busy states via the component.** `CoralButton(busy: …)` — never the
   `Opacity + onTap: null` wrap.
4. **Images decode at display size.** Small tiles pass
   `cacheWidth: cachePx(context, logicalWidth)` so a full-res original never
   sits in memory behind a 46px thumbnail. Servers send the thumb derivative
   for tile slots.
5. **The wallpaper never rebuilds and never burns idle frames.** It reads state
   imperatively per tick; pure-black (the default) paints once and rests; living
   mode is capped at ~30fps. Don't add listeners to it.
6. **Dialogs re-provide `AppearanceScope`** — always open them via
   `showGlassDialog` (they mount above the shell's scope).
7. **UI never breaks** (standing rule): guard empty lists (no `.first` without
   `isEmpty`), nulls, loading/error/empty + just-deleted states; the global
   `ErrorWidget` fallback stays in `main.dart`; test the zero-items path of
   every list.
8. **Riverpod stays lean.** `AsyncNotifier` controllers own server state;
   mutations return fresh data or invalidate the affected providers
   (`_touchBoard` pattern). No duplicated client caches.

## Process

- Tests green before commit: `flutter analyze` + `flutter test`;
  `go build ./... && go vet ./... && go test ./internal/...`; migrations must
  survive up → full down → up. Integration tests run against real Postgres +
  Redis when a stack is available.
- Dead code is deleted, not commented out — git history is the archive.
- `SUPERARCHITECTURE.md` is updated in the same change that alters schema,
  APIs, components, or module structure; this file when a standard changes.
