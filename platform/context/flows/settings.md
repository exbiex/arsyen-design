# Flow — Settings

> Module 15. Aggregates account/privacy/security/plan controls. Source:
> DECISIONS.md + prior decisions (deletion grace, GDPR, 2FA later, BYOK) +
> Settings Q1. Dark-only (single theme).

## 1. Sections

- **Account** — email, phone (private), password change, username (6-month rule),
  DOB (private, view-only).
- **Profile & visibility** — profile visibility (Public/Unlisted/Private), edit
  shortcuts.
- **Security & sessions** — active devices/sessions (revoke), refresh-token list;
  **2FA (TOTP) later**.
- **Plan & billing** — current plan, upgrade/downgrade, payment (Razorpay),
  invoices. (Billing module 16.)
- **Notifications** — per-category preferences (mute).
- **Privacy & data** — **GDPR right-to-erasure** (initiate deletion, 30-day
  grace), **data export**, data-residency info (India).
- **AI / BYOK** — manage bring-your-own-key (encrypted at rest, never exposed);
  AI provider indicator. (AI module 17.)
- **Blocked users** — block/unblock; blocking severs connection + hides content.
- **Delete account** — 30-day grace, then hard erase.

## 2. Rules (from locked decisions)

- Username changeable once / 6 months. Account deletion = 30-day grace.
- GDPR erasure accessible directly from settings; 30-day compliance window.
- AI audit log always on; user has full access (platform super-users see metadata
  only).
- Dark-only theme (no light mode).

## 3. Data & API

- Reuses module data (users, profiles, sessions, plans, notification_prefs,
  byok_keys, blocks). `blocks`: blocker_id, blocked_id, created_at.
- `GET/PATCH /v1/me/settings/*` per section; `POST /v1/me:request-deletion` /
  `:cancel-deletion`; `POST /v1/me:export-data`; sessions revoke;
  `POST /v1/me/blocks` / `DELETE`.

## 4. Acceptance criteria

- Each section reads/writes correctly; password change revokes other sessions.
- Deletion request enters 30-day grace (cancelable); export produces the user's
  data; erasure hard-deletes after the window.
- Block severs connection + hides mutual content; visibility changes propagate
  (incl. open web).

## 5. Design notes

Embossed settings list (inset rows, segmented toggles as inset troughs with a
raised thumb); coral only on destructive-confirm primary; calm; brand voice.
