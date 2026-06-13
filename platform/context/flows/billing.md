# Flow — Billing & Entitlements

> Module 16 (payment integration sequenced **at the end**). Source: DECISIONS.md +
> prior plan/payment decisions + Billing Q1. India-first; Razorpay launch.

## 1. Two parts, two timings

- **Entitlements engine — introduced EARLY** (with Identity/users). Every module
  checks entitlements to enforce plan limits. Until Razorpay is wired, a user's
  `plan` defaults to **Free** and can be set by **admin** (so paid features are
  testable without payment).
- **Razorpay payment integration — built LAST** (this module): subscriptions,
  upgrade/downgrade/cancel, GST invoices, webhooks, dunning.

## 2. Plans & limits (entitlements)

Free / Pro ($12mo·$99yr) / Studio ($29mo·$239yr). Enforced limits: projects (1/5/∞),
storage (5/50/500 GB), devices (2/5/∞), team per project (5/20/∞), marketplace
selling (no/yes/yes), feed posting (no/yes/yes), crew discovery (no/yes/yes),
analytics (no/basic/advanced), 4K transcode (no/no/yes).

- **Entitlements service:** `can(user, capability)` + `limit(user, resource)`,
  read everywhere (uploads check storage; project create checks count; Discover
  checks crew; feed posting; etc.). Single source — no scattered plan checks.

## 3. Payments (Razorpay, end)

- Subscriptions per plan (monthly/yearly); upgrade/downgrade (proration);
  cancel (grace to period end); GST-compliant invoices; webhook-driven state;
  retries/dunning. Stripe = phase 2. Marketplace payouts + revenue split
  (Free 25% / Pro 18% / Studio 12%) come with the Marketplace module.

## 4. Data model (owned by `billing`)

- `users.plan` (`free|pro|studio`), `plan_source` (`default|admin|razorpay`),
  `plan_renews_at`.
- `subscriptions`: id, user_id, razorpay_sub_id, plan, status, period_start/end,
  created_at.
- `invoices`: id, user_id, razorpay_invoice_id, amount, gst, status, pdf_ref, ts.
- `entitlement_overrides` (admin grants).

## 5. API

- Entitlements (internal service) used by all modules; `GET /v1/me/entitlements`.
- `POST /v1/billing/checkout` (start subscription), `POST /v1/billing/cancel`,
  `POST /v1/billing/webhook` (Razorpay), `GET /v1/me/invoices`.
- Admin: set/override a user's plan.

## 6. Acceptance criteria

- Entitlements enforced consistently from early modules (over-limit blocked with a
  clear upgrade nudge); admin can grant a plan without payment.
- Razorpay subscribe/upgrade/downgrade/cancel work; webhooks keep state correct;
  GST invoices generated.

## 7. Design notes

Calm plan cards; coral on the recommended/active plan; no dark-pattern upsell;
brand-voice upgrade nudges ("Crew discovery is on Pro.").
