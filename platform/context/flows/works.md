# Flow — Creative Works + Credits

> Module 4. Published works with attached assets and **verified credits**.
> Source: DECISIONS.md + Works Q1–Q3. Depends on: Media/Assets, Profile,
> Notifications (credit requests). Engagement lives on the Feed (`feed.md`).

## 1. Create a Work

Flow: **Title → Description → Work Type → Assets → Credits → Visibility → Publish.**

- **Title** (required), **Description** (rich-lite, optional).
- **Work Type** (required) — fixed taxonomy: Illustration · Painting ·
  Photograph/Series · Short film · Music/Track · Album art · 3D/Motion · Animation
  · Design · Exhibition · Writing · Other.
- **Assets** — one or more from the library (Asset Picker); first = cover (or pick
  a cover). Any supported kind (image/video/audio/document).
- **Credits** — see §2.
- **Visibility** — Public · Unlisted · Private (gated by profile visibility:
  effective = min(profile, work)).
- **Publish** — drafts allowed; publishing makes it visible per visibility and
  (if public/unlisted) renders on the open web (Next.js) + lists on the profile
  **Works** tab. Versioned (universal versioning).

## 2. Credits & verification

- A credit = **person + role label**.
  - **Member credit:** tag an Arsyen member (@handle) → they receive a
    **notification to Accept / Reject**. Accepted → **verified credit** (counts as
    verified collaboration history and surfaces on *their* profile). Rejected →
    removed. Pending → shown as "pending" to the owner only.
  - **External credit:** add a collaborator by **name** (not on Arsyen) → shows as
    **unverified**.
- **Role label:** freeform with suggestions (Director, Colorist, Composer, Editor,
  Gaffer, Photographer, Writer…).
- A Work can list many credits; the owner is implicitly the author.

## 3. Engagement

- A Work is a **showcase** object: **view · save/bookmark · share**.
- Social engagement (comments, upvotes) happens on the **Feed**. **Post to feed**
  creates a Feed post that *references* the work; comments/votes live on that post.
- Reference tracking: posting/embedding a work records `asset_reference`s.

## 4. Surfaces

- **Profile → Works tab** — the owner's published works (cards w/ cover, type,
  credit avatars).
- **Credited member's profile** — verified credits appear (e.g. "Credited on …").
- **Open web** — public/unlisted works render via Next.js with schema.org
  `CreativeWork` + OpenGraph.

## 5. Data model (owned by `works`)

- `creative_works`: id (uuidv7), owner_id, title, description, work_type (enum),
  cover_asset_id, visibility, status (`draft|published`), published_at,
  created_at, updated_at, deleted_at. (+ version rows for universal versioning)
- `work_assets`: work_id, asset_id, position.
- `work_credits`: id, work_id, credited_user_id (nullable), external_name
  (nullable), role_label, status (`pending|accepted|rejected|external`),
  responded_at, created_at. (exactly one of credited_user_id / external_name)
- `work_saves`: user_id, work_id, created_at.

## 6. API (REST `/v1`)

- `POST /v1/works` (draft) · `PATCH /v1/works/{id}` · `POST /v1/works/{id}:publish`
  · `DELETE /v1/works/{id}` (soft).
- `GET /v1/works/{id}` (perm-aware) · `GET /v1/public/works/{id}` (open web).
- `GET /v1/profiles/{username}/works`.
- Credits: `POST /v1/works/{id}/credits` · `DELETE …/credits/{cid}` ·
  `POST /v1/credits/{cid}:accept` · `POST /v1/credits/{cid}:reject` (by credited
  member). Each member credit emits a notification.
- Save: `POST /v1/works/{id}/save` · `DELETE …/save`.
- `POST /v1/works/{id}:post-to-feed` → creates a referencing feed post.

## 7. Acceptance criteria

- Create→publish a work with multiple assets, a cover, and visibility.
- Member credit triggers a notification; accept → verified + appears on their
  profile; reject → removed; the owner can't fake a verified credit.
- External credit shows as unverified.
- Public/unlisted works render on open web with correct SEO; private never leaks.
- Save and Post-to-feed work; posting creates a feed post that references the work.
- Effective visibility = min(profile, work) enforced everywhere.

## 8. Design notes

Gallery-grade presentation; the work (imagery) is the brightest thing; embossed
chrome stays quiet; credits shown as small avatar+role rows; verified = subtle
coral check; brand-voice empty/pending states.
