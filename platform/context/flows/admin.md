# Flow — Admin (internal)

> Cross-cutting. A minimal **internal admin web surface**, server-rendered from the
> Go backend, behind admin auth — separate from the Flutter app. Source:
> DECISIONS.md (Q22 + invite/activation model). Introduced with Identity (step 1),
> extended as modules land.

## 1. Access

- Server-rendered pages (Go `html/template`) at an internal route; **admin auth**
  (separate admin accounts + session); IP/role restricted; all actions **audited**.

## 2. Capabilities (v1)

- **Signups:** list pending signups; approve/reject; (auto-approve happens when a
  valid code + manual-review off).
- **Invite requests:** list; approve → generate one-time code + **email it (SES)**;
  reject (with optional note email).
- **Invite codes:** generate/seed one-time codes; view used/unused/expired.
- **Manual-review switch:** global toggle (`app_settings.manual_review_enabled`).
- **Users:** search; view; **set plan / entitlement override** (so paid features
  are testable pre-Razorpay); suspend/unsuspend; handle deletion/erasure requests.
- **Moderation (as modules land):** reported content/users; NSFW review queue.
- **Audit:** browse the `audit_log`.

## 3. Data

Reuses `users`, `profiles`, `invite_codes`, `invite_requests`, `app_settings`,
`audit_log`, `entitlement_overrides`, plus `admins` (admin accounts) and admin
sessions.

## 4. Acceptance criteria

- Admin can seed codes, approve/reject signups + invite requests (emails sent),
  toggle manual review, set a user's plan, and view the audit log.
- All admin actions are authenticated, authorized, and audited.
- Admin surface is fully separate from the artist app.

## 5. Notes

Keep lean and functional (not the embossed brand UI — it's internal). Can graduate
to a richer dashboard later.
