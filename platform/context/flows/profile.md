# Flow — Profile

> The public identity surface. Source: DECISIONS.md + Profile Q1–Q7 + the design
> kit (`ui_kits/web/WebProfile.jsx`, screenshot `web-profile.png`).
> Depends on: **Media/Assets** (cover + portfolio pieces incl. video → HLS), Identity.
> Sibling modules referenced: Creative Works (`works.md`), Feed (`feed.md`),
> Website/Portfolio-page builder + Résumé (own later module), Chat (`chat.md`).

## 1. Content model (three SEPARATE entities)

1. **Portfolio piece** — a lightweight gallery item on the profile's *Portfolio*
   tab. Created via **"Upload work."** Image **or video**. Fields: asset, title,
   medium, year (all optional except asset), position (orderable), visibility.
2. **Creative Work** — a richer published work with multiple assets + **credits**
   (accept/reject). Lives on the *Works* tab. Full spec in `works.md`.
3. **Portfolio page / Website / Résumé** — curated, published *pages* built in the
   page builder. Own later module; published to the open web (Next.js).

These never duplicate content — pages/works reference the same underlying assets
("create once, reference everywhere").

## 2. Profile screen (per `web-profile.png`)

- **Cover image** (optional, editable) — full-width embossed banner.
- **Avatar** + **Name** (display name) + meta line `@username · <professions> ·
  <city, country>`.
- **Bio** (≤160 chars).
- **Skill chips** — freeform skill tags (separate from professions; power Discover
  Skills filter + crew matching).
- **Stats row** — **Works** count + **Projects** count shown. **Followers /
  Following counts are HIDDEN** (follow graph exists, vanity numbers do not).
- **Owner actions:** `Edit profile`, `Share`, settings gear, and a **Create**
  section with four cards: **Create portfolio**, **Create résumé**, **Upload
  work**, **Post**.
- **Visitor actions:** `Follow` / `Following`, `Message` (opens 1:1 chat), `Share`.
- **Tabs:** **Portfolio** (gallery grid) · **Works** (Creative Works) · **Posts**
  (the user's feed posts) · **About** (long-form text, separate from bio).

### Portfolio tab
- Gallery grid of portfolio pieces (embossed tiles, recessed art seat). Owner can
  **upload** (image/video), **reorder** (drag), **edit metadata**, **delete**.
  Tap → full-bleed viewer. Video pieces use the HLS player.

### Works / Posts / About
- **Works:** cards for Creative Works (see `works.md`); credits shown.
- **Posts:** the user's feed posts (see `feed.md`).
- **About:** long-form text (markdown-lite, ≤2000 chars). *(Default — confirm.)*

## 3. Visibility

- **Profile visibility:** Public (default) · Unlisted · Private. This is the outer
  gate. Public → rendered on open web (Next.js) + appears in Discover/Search.
  Unlisted → reachable by link, not indexed/searched. Private → logged-in members
  only, never on open web.
- Each portfolio piece / work / page also has its **own** visibility; effective
  visibility = min(profile, item).

## 4. Edit profile

Editable: cover, avatar, Name, professions (taxonomy multi-select), skills
(freeform tags), availability (multi, crew-only), bio (160), about (2000),
city + country, links (curated platform+URL, ≤6), username (6-month rule),
profile visibility. Validation mirrors `identity.md`.

## 5. Data model (owned by `profiles`)

- `profiles` (extends identity): + `cover_asset_id`, `about`, `visibility`
  (`public|unlisted|private`).
- `skills`: user_id, skill (citext), position. (≤ ~20)
- `portfolio_pieces`: id (uuidv7), user_id, asset_id (image|video), title, medium,
  year, position, visibility, created_at, updated_at, deleted_at.
- `follows`: follower_id, followee_id, created_at (unique pair). Counts never
  exposed via API.
- Stats: `works_count` = public portfolio pieces + public creative works;
  `projects_count` = projects the user is owner/collaborator on (public-visible).

## 6. API (REST `/v1`)

- `GET /v1/profiles/{username}` — permission-aware profile (app). Honors viewer
  identity; private → 404 unless owner.
- `GET /v1/public/profiles/{username}` — open-web read (public/unlisted only;
  used by Next.js, CDN-cached, revalidate-on-publish).
- `GET /v1/me` — own profile + edit state.
- `PATCH /v1/me/profile` — edit fields above.
- Portfolio: `POST /v1/me/portfolio` (create from asset), `PATCH
  /v1/me/portfolio/{id}` (metadata/visibility), `PATCH /v1/me/portfolio/reorder`,
  `DELETE /v1/me/portfolio/{id}` (soft).
- Follow: `POST /v1/profiles/{id}/follow`, `DELETE /v1/profiles/{id}/follow`.
- All writes transactional + audited; uploads via pre-signed flow (`assets.md`).

## 7. Acceptance criteria

- Public profile renders in-app and on the open web (Next.js) with correct SEO
  meta; private/unlisted never leak to open web.
- Follower/following numbers appear nowhere; Follow/Following toggle works.
- Upload work supports image + video (video transcoded to HLS, playable); reorder,
  edit, delete work; soft-delete recoverable.
- Edit profile persists all fields; username change respects the 6-month rule.
- Effective visibility = min(profile, item) is enforced on every read path.

## 8. Design notes

Matt-black embossed surfaces; recessed art seats for media; single coral accent
(the primary CTA / active tab); skill chips are inset pills; stats sit in an inset
well; calm transitions; brand-voice empty states ("Nothing here yet. When you add
work, it lives here.").
