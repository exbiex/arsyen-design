# Flow — Media / Assets (global library)

> Module 2. The subsystem all visual content depends on (Profile portfolio video,
> Works, Feed, Canvas, Chat). Source: DECISIONS.md + Media Q1–Q3 + prior media
> decisions (HLS, signed URLs, watermarking, quotas).
> Principle: **create once, reference everywhere** + **universal versioning**.

## 1. Supported types (v1)

| Kind | Accepted | Processing | Preview/playback |
|---|---|---|---|
| image | JPEG/PNG/WebP/HEIC | derivatives: thumb/sm/md/lg (+ blurhash) | `<img>` / recessed art seat |
| video | MP4/MOV/etc. | **HLS ladder** 480/720/1080 (4K Studio); poster frame | HLS player, per-viewer forensic watermark |
| audio | MP3/WAV/AAC/FLAC | transcode to AAC/HLS-audio + **waveform** | audio player w/ waveform |
| document | PDF | first-page preview thumbnail | preview + download |
| file (3D/other) | any | generic thumbnail by extension | download only (no 3D viewer v1) |

## 2. Library UI (in Profile) + Asset Picker

- **Media library** lives in the **Profile** (owner-only archive): grid/list of all
  uploads with search + filter by kind, status, project; each asset shows
  **versions**, **"used in"** references, and **access** stats.
- **Asset Picker** — a reusable modal used everywhere media is attached (Upload
  work, Works, Canvas blocks, Project files, Chat). Pick existing or upload new.

## 3. Upload pipeline (pre-signed, direct-to-storage)

1. `POST /v1/assets:initiate` {kind, mime, bytes, filename} → server checks **plan
   quota**, creates `asset` (status `uploading`), returns **pre-signed PUT** URL.
2. Client uploads bytes directly to object storage (S3/MinIO).
3. `POST /v1/assets/{id}:complete` → enqueue **processing job** (asynq worker).
4. Worker: malware scan (ClamAV) → derivatives/transcode per kind → set
   `ready` (or `failed`). Original always preserved.
5. UI shows states: uploading % → processing → ready (or failed w/ retry).

## 4. Serving & security

- **Signed GET URLs** with expiry: HLS session 15 min, thumbnails 24 h, downloads
  30 min. Permission-aware — private content never served (app or public web).
- **Per-viewer forensic watermark** on video at launch (DRM phase 2).
- CDN (CloudFront) in front; public web uses the same signed-URL mechanism.

## 5. Versioning + reference tracking + access log (all v1)

- **Versioning:** replacing an asset creates a new immutable **version**; `current`
  pointer; compare + **restore**. Derivatives are per-version.
- **Reference tracking:** every place an asset is used writes an `asset_reference`
  (reverse index). Owner sees "used in N works / M projects…"; delete is blocked
  or warned when referenced.
- **Per-viewer access log (full, v1):** append-only `asset_access_events`
  (viewer_id|anon, action view/stream/download, ts, ip_hash, ua). High-volume →
  written async, **aggregated by a scheduled job** into `asset_access_daily` for
  fast owner analytics. Public-web views logged as anonymous.

## 6. Data model (owned by `assets`)

- `assets`: id, owner_id, kind, mime, bytes, width, height, duration, checksum,
  status, current_version_id, blurhash, created_at, updated_at, deleted_at.
- `asset_versions`: id, asset_id, version_no, storage_key, bytes, created_by,
  note, created_at.
- `asset_derivatives`: id, asset_id, version_id, type (thumb|sm|md|lg|hls|
  hls_audio|waveform|pdf_preview|poster), storage_key, width, height, ready.
- `asset_references`: id, asset_id, ref_type, ref_id, created_at (unique).
- `asset_access_events` (append-only) + `asset_access_daily` (aggregates).
- `storage_usage`: owner_id, bytes_used (maintained transactionally; quota by plan:
  Free 5 GB / Pro 50 GB / Studio 500 GB).

## 7. API (REST `/v1`)

- `POST /v1/assets:initiate` · `POST /v1/assets/{id}:complete`.
- `GET /v1/assets/{id}` — metadata + ready derivatives + signed URLs (perm-aware).
- `POST /v1/assets/{id}/versions` (replace) · `GET .../versions` ·
  `POST .../versions/{n}:restore`.
- `GET /v1/assets/{id}/references` · `GET /v1/assets/{id}/access` (owner).
- `DELETE /v1/assets/{id}` (soft; guarded by references).
- `GET /v1/me/media` — library list/search/filter.
- Public-web read goes through permission-aware public endpoints that vend signed
  URLs for public/unlisted assets only.

## 8. Acceptance criteria

- Upload of each supported kind completes, processes, and plays/previews correctly;
  failed processing surfaces a retry.
- Over-quota upload is rejected at `:initiate` with a clear message.
- Replacing an asset versions it; restore works; derivatives regenerate.
- Private assets never produce a working URL for non-authorized viewers or on the
  public web.
- "Used in" reflects real references; deleting a referenced asset is guarded.
- Access events are recorded and aggregated; owner analytics load fast.

## 9. Design notes

Recessed art seats (`--neu-inset-sm`) for all media; calm upload/processing
states; coral only on the primary action; no glossy rims. Empty library:
"Nothing here yet. Drop a file or browse."
