# Flow — Identity & Onboarding

> Status: **fully specified** (source: DECISIONS.md Q1–Q24). This is the first
> module built after Foundation. Auth, invite gating, onboarding, sessions, admin.

## 1. Surfaces & user journey

```
Landing / Auth
 ├─ Login  ............... username OR email + password → app (if active)
 └─ Don't have an account
     ├─ I have an invite  → Signup form → (code valid & review off) → ACTIVE → Onboarding
     │                                   → (review on / code pending) → "Verification in process"
     └─ Request invite    → Request form → admin review → emailed a one-time code

Onboarding (first login, account ACTIVE, profile incomplete)
  Username → Availability → Photo → Bio → (optional Location + Links) → App (Projects tab)
```

### 1.1 Landing / Auth screen
- Brand wordmark + tagline ("Members only · by invitation"), embossed.
- Two primary actions: **Login** and **Don't have an account yet**.
- "Don't have an account yet" expands to two choices: **I have an invite** /
  **Request invite**.

### 1.2 Login
- Fields: **identifier** (username or email) + **password**.
- Errors: generic "Wrong username/email or password" (no user enumeration).
- On success: if account `active` & onboarding complete → app; if `active` &
  onboarding incomplete → resume onboarding; if `pending` → show pending screen.
- Links: "Forgot password" (flow stub now; email-based reset later).

### 1.3 Signup — "I have an invite"
- Fields (all required unless noted): **Invite code**, **Name**, **Professions**
  (multi-select, min 1, from the taxonomy), **Date of birth** (18+),
  **Phone** (country code + number), **Email**, **Password**, **Confirm password**.
- Validation (client + server):
  - Invite code: exists, unused, not expired.
  - Email: valid format, not already registered.
  - DOB: computed age ≥ 18.
  - Phone: valid for selected country.
  - Password: min 8, contains upper + lower + digit + symbol; confirm matches.
  - Professions: ≥ 1 from the fixed list.
- On submit: create `user` (status `pending`) + `profile` (incomplete) + consume
  code atomically.
  - If code valid **and** global manual-review **off** → set `active`, issue
    session, route to **Onboarding**.
  - Else → keep `pending`; show **"Account verification in process — you'll be
    notified."** Send status email via SES.

### 1.4 Request invite
- Fields: **Name, Email, Professions, Portfolio link, Short note**.
- On submit: create `invite_request` (status `pending`); confirmation screen
  ("We'll email you."). Admin approves → generate one-time code → SES email it.

### 1.5 Pending screen
- Calm state: "Account verification in process — you'll be notified." Offers log
  out. Polling/refresh re-checks status.

### 1.6 Onboarding (stepper)
1. **Username** — live availability check; rules: 3–20 chars `a–z 0–9 _ .`,
   case-insensitive unique, reserved blocklist, no leading/trailing/double
   separators. Sets the public @handle. (Login-by-username enabled after this.)
2. **Availability** — multi-select: Open to work · Open to collaborate · Open to
   commissions · Busy · Not available. (Crew-context only; not public.)
3. **Photo** — **required**; upload + square crop/zoom; default monogram "a";
   JPEG/PNG/WebP ≤ 10 MB; pre-signed upload to object storage.
4. **Bio** — optional, plain text, ≤ 160 chars.
5. **Location + Links** — optional; city + country (country dropdown), links by
   platform + URL (curated set, ≤ 6, URL-validated).
- On finish: mark onboarding complete → app (Projects). No hard gate; gentle
  "complete your profile" nudge remains for skipped optional fields.

## 2. Data model (owned by `auth` + `users` + `profiles` modules)

- `users`: id (uuidv7), email (unique, citext), phone, phone_country, dob,
  password_hash (argon2id), status (`pending`|`active`|`suspended`|`deleted`),
  email_verified (bool, default false), manual_review_flag is global (settings),
  created_at, updated_at, deleted_at.
- `profiles`: user_id (fk, 1:1), name, username (unique, citext, nullable until
  onboarding), username_changed_at, bio, city, country, photo_asset_id,
  onboarding_completed_at, created_at, updated_at.
- `professions`: user_id, profession (enum) — many per user (≥1).
- `availability`: user_id, status (enum) — many per user.
- `links`: user_id, platform (enum), url, position (≤6).
- `invite_codes`: code (unique), created_by (admin), used_by (nullable),
  used_at, expires_at, created_at.
- `invite_requests`: id, name, email, professions[], portfolio_url, note,
  status (`pending`|`approved`|`rejected`), reviewed_by, reviewed_at, created_at.
- `refresh_tokens`: id, user_id, token_hash, family_id, expires_at, revoked_at,
  replaced_by (rotation + reuse detection). Stored in Redis (+ audit in PG).
- `app_settings`: singleton incl. `manual_review_enabled` (bool).
- `audit_log`: actor, action, entity, ts (all auth/admin actions logged).

## 3. API (REST, `/v1`)

Public:
- `POST /v1/auth/signup` — invited signup (body incl. invite_code). → 201 {status}.
- `POST /v1/auth/login` — {identifier, password} → tokens (if active).
- `POST /v1/auth/refresh` — rotate refresh; reuse → revoke family + 401.
- `POST /v1/auth/logout` — revoke current refresh.
- `POST /v1/invite-requests` — request access.
- `GET  /v1/auth/username-available?u=` — onboarding live check.

Authed (access token):
- `GET  /v1/me` — user + profile + onboarding state.
- `PATCH /v1/me/profile` — name/bio/city/country/professions/availability/links.
- `PUT  /v1/me/username` — set/change (enforces 6-month rule).
- `POST /v1/me/photo` — pre-signed upload + set photo.
- `POST /v1/me/onboarding/complete`.

Admin (admin auth, server-rendered pages + endpoints):
- list/approve/reject pending signups; list/approve/reject invite requests;
  generate/seed invite codes; toggle `manual_review_enabled`.

## 4. Security & rules
- argon2id hashing; access JWT 15 min; refresh rotating ~7 days with reuse
  detection; rate-limit signup/login/refresh (Redis); no user enumeration in
  errors; DOB & phone never returned in public responses; all mutations
  transactional + audited; invite code consumption is atomic (no double-use).

## 5. Email (AWS SES; local = Mailpit)
- Templates: invite-request received, invite approved (with code), account active,
  (later) password reset. Plain, brand-voiced, no emoji.

## 6. Acceptance criteria
- Cannot sign up without a valid unused invite code (when review off, code
  auto-activates; when review on, stays pending).
- Under-18 DOB rejected. Duplicate email/username rejected. Weak password rejected.
- Refresh-token reuse revokes the whole family.
- Onboarding cannot be completed without username + photo; bio/location/links
  skippable.
- Admin can seed codes, approve/reject, toggle review; actions are audited.
- Request-invite approval emails a working one-time code.

## 7. Design notes
- Embossed/neumorphic surfaces; single coral accent on the primary CTA per screen;
  inputs are inset wells, focus = coral halo; calm transitions; brand voice
  microcopy ("Nothing here yet…"). Stepper uses an inset progress indicator.
