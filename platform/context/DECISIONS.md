# Arsyen — DECISIONS (truth base)

> Running log of locked product/engineering decisions. Date: all 2026-06-06 unless
> noted. Amend here when a decision changes; cite this file as the source of truth.
> Related: `SUPERARCHITECTURE.md` (how we build), `PRODUCT.md` (what we build),
> `flows/*` (per-module specs).

---

## Scope & process

- **Build everything in the user flows, completely** — no "basic"/MVP-reduced
  versions. Each feature is built to its full spec (`USER_FLOWS.md`,
  `ARSYEN_USER_FLOWS_PRODUCTION.md`, the design kit).
- **One master `task.md`** covers the entire product, sequenced into ordered
  milestones; you advance by typing **next** (or a routine). Foundation first,
  then Identity, then the rest.
- **Stack:** Flutter app + Go modular monolith + Postgres + Redis + S3 (MinIO
  local), AWS ap-south-1. Full rationale in `SUPERARCHITECTURE.md`.

## Prior decisions — ALL still stand (confirmed)

Free/Pro/Studio plans + pricing/limits; Razorpay payments; India-first launch
(AWS ap-south-1); Feed modes Discover/Following/Trending with **no visible vote
counts**; 1:1 chat **E2E-encrypted from day one**; AI = **bring-your-own-key**;
Search = Meilisearch + semantic (pgvector) for paid tiers; Video = **HLS adaptive
streaming**. (See the prior product-decisions memory for full detail; reproduced
into `PRODUCT.md`.)

---

## Access & authentication

- **Invite-only at launch.** First users via **founder-seeded one-time invite
  codes**. Per-user invite quotas (e.g. Pro=5, Studio=10) come later.
- **Activation = hybrid:** a valid unused invite code **auto-approves** instantly;
  a global **manual-review switch** (admin-toggled) can gate all signups when on.
- **Email ownership verification (OTP/link) is skipped for now** — but
  **transactional email is live** (see SES below) for invite codes + status.
- **Landing auth screen:** two paths — `Login` and `Don't have an account yet`.
  - **Login:** identifier = **username OR email** + password.
  - **I have an invite →** form fields: **Name, Professions (multi-select), Date
    of birth, Phone (country code), Email, Password, Confirm password**, + invite
    code. On submit: account created; if code valid & manual-review off →
    auto-approved; screen shows *"Account verification in process — you'll be
    notified."* (then they can proceed/await per state).
  - **Request invite →** form fields: **Name, Email, Professions, Portfolio link,
    short note** → lands in admin review → on approval the user is **emailed a
    one-time code**.
- **Username:** chosen in **onboarding** (not at signup). Rules: **3–20 chars,
  `a–z 0–9 _ .`**, case-insensitive uniqueness, reserved-word blocklist
  (admin, arsyen, support, …), no leading/trailing/double separators,
  **changeable once per 6 months**.
- **Professions:** **multi-select at signup** (min 1) from the curated taxonomy:
  Illustrator · Graphic Designer · UI/UX Designer · 3D Artist · Concept Artist ·
  Photographer · Painter · Animator · Filmmaker/Director · Video Editor ·
  Musician/Sound · Writer · Sculptor · Fashion Designer · Architect · Other.
  (More roles addable later in profile.)
- **Date of birth:** collected; **enforce 18+**; stored **private** (never public).
- **Phone:** **required**, country-code picker, format-validated, stored
  **private** (never public, never used for discovery). **No SMS** sent in Phase 1.
- **Password:** **min 8**, classic complexity (upper + lower + digit + symbol),
  confirm-match; hashed server-side with **argon2id**.
- **2FA:** **deferred** to a later phase (schema designed to allow it).
- **Sessions:** short JWT **access token (15 min)** + **rotating refresh token
  (~7 days)** with reuse-detection; refresh stored in secure storage
  (Keychain/Keystore).
- **Transactional email:** **AWS SES now** (invite codes, status notifications),
  behind a clean mailer interface; local dev routes mail to a catcher (Mailpit).
- **Admin surface:** a **minimal internal admin web page** (server-rendered from
  the Go backend, behind admin auth) to: review pending signups + invite requests
  (approve/reject), generate/seed invite codes, toggle the manual-review switch.
  Separate from the Flutter artist app.

## Onboarding (post-activation, first login)

Order: **Username → Availability → Photo → Bio → (optional Location + Links) → app.**

- **Availability:** multi-select — Open to work · Open to collaborate · Open to
  commissions · Busy · Not available. Visible in **crew/discover context only**,
  not on the public profile.
- **Profile photo:** **required to continue**; square crop/zoom; default = brand
  monogram "a"; JPEG/PNG/WebP, ~10 MB max; stored in object storage.
- **Bio:** optional, plain text, **160 chars**.
- **Location:** **structured city + country** (country dropdown / ISO list, city
  text), optional.
- **Links:** add by **platform + URL** from a curated set (Website, Instagram,
  Behance, ArtStation, Dribbble, X, YouTube, LinkedIn, Other), **up to 6**,
  URL-validated.
- **No hard completion gate** in Phase 1 — a gentle "complete your profile" nudge
  for the optional fields. Real gating returns with feed/projects/crew.

## Identity presentation

- **Name** (from signup) is the **public display name**, shown **above @username**;
  Name is editable anytime, username follows the 6-month rule. No separate third
  "display name" field.

## Navigation / app shell (from the design kit)

- **Top bar:** arsyen wordmark · **⌘K quick search** · notifications bell · avatar
  (opens **Profile**).
- **Bottom tab bar:** floating embossed pill — **Projects · Discover · Feed+Chat ·
  Tools · Settings**. Mobile app adds a dedicated **Search** tab. **Profile** is
  reached via the avatar, not a tab.
- App **opens on Projects**. **Canvas** has a full-page **zen focus mode** that
  hides chrome.
- Responsive: bottom tabs on mobile; same destinations may render as a side rail
  on desktop. Exact desktop adaptation specified in `flows/` per view.

## Connections, follow & messaging access

- **Connection** = the relationship that **unlocks 1:1 chat** between two members.
  It forms from: a **shared project**, a **shared community**, or **(paid) a
  follow** made via Discover.
- **Free tier:** Discover is limited to **already-connected** members; new
  connections come only through shared projects/communities. No cold outreach.
- **Paid (Pro/Studio):** **full Discover** — search any artists, **follow** them →
  become **connected** → can **message** them. (Crew discovery = Pro/Studio, per
  plans.)
- **Follow** is one-way and also powers the feed's **Following** mode; for paid
  users a follow additionally establishes the connection that enables messaging.
- 1:1 chat is **only** between connected members (enforced server-side).

## Surfaces & public web

- **Three surfaces, one Go API:** (1) the **Flutter app** (product, all platforms +
  logged-in web app), (2) a **public SEO web surface** (Next.js), (3) the internal
  **admin** pages (server-rendered from Go).
- **Published output is on the open web from day 0.** When an artist Publishes a
  profile / portfolio / website / creative work, it must be viewable by anyone in a
  browser (no login) and be SEO-indexable — not in-app only. (This overrides the
  earlier "public web deferred" stance.)
- **Public web stack:** **Next.js (SSR/ISR)** with on-demand revalidation
  (re-renders the instant something is Published). Read-only, **permission-aware**
  (only public/unlisted; private never rendered), reuses the design-kit CSS,
  CDN-cached. Detail in `SUPERARCHITECTURE.md §8b`.
- Does **not** reopen the Flutter-for-the-app decision — the public surface is a
  separate read-mostly SEO layer.

---

## Build sequence & platform

- **Primary build/test target:** **macOS desktop + Flutter web** (the large-screen
  reference layouts; mobile + iPad built as adaptive breakpoints alongside).
- **Master build sequence (locked):**
  `0 Foundation → 1 Identity (+admin/SES) → 2 Media/Assets → 3 Profile (+public web)
  → 4 Creative Works + Credits → 5 Projects (board/milestones/files/roles) →
  6 Canvas (+board sync) → 7 Feed → 8 Discover + Crew → 9 Communities →
  10 Chat (E2E + realtime) → 11 Tools → 12 Website/Portfolio/Résumé builder →
  13 Search → 14 Notifications → 15 Settings → 16 Billing → 17 AI →
  18 Marketplace (if in scope)`.
- This is the order of milestones in the master `task.md`.

## Resolved since (was open)

- **Tools catalogue** — resolved: 9 tools (Moodboard, Color grade, Storyboard,
  Call sheet, Brief builder, Script, Budget, Invoice, Contract); Portfolio/Résumé
  moved to the builder module. Each tool detailed later. (`flows/tools.md`)
- **Communities** — resolved as a first-class module (`flows/communities.md`).
- **Marketplace** — **deferred** (not in current scope; documented as a future
  module). Billing keeps a revenue-split placeholder.

## Design language

- **Canonical pixel spec: `docs/DesignLanguage.md`** (founder-authored, taken
  from the production design) — the authoritative, pixel-faithful Flutter
  implementation spec. It governs all UI. `DESIGN_SYSTEM.md` summarizes it +
  tracks the deltas the current Flutter code must close. The `docs/Design/`
  kit (JSX/CSS/screenshots/PDF) is the visual source; `DesignLanguage.md`
  correlates with it exactly (ArtFill, colors, components) and adds the literal
  emboss values + mobile/desktop layouts + acceptance checklist.
- Implication: **build the embossed engine to the literal spec values first**;
  bundle the brand fonts (no runtime google_fonts); responsive compact(<700)↔
  expanded(≥1100) layouts; one coral accent; matte; no ripple/bounce.

## Open / minor (confirm when convenient)

- **Rate band** on profile (crew-only) — proposed in `flows/discover.md`; confirm.
- **About** tab length (default 2000 chars) — confirm.
- Feed ranking signal weights; semantic-search blending specifics; HLS ladder
  details — tuned during their module.
