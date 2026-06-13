# Flow — Notifications

> Module 14. In-app notification system. Source: DECISIONS.md + Notifications Q1.
> Depends on: Realtime foundation; emitted by most modules.
> v1 = **in-app only** (realtime bell). Email/push come later. (Account-level
> transactional emails — invites, credit/status — are separate, in Identity.)

## 1. Categories

**Inbox · Projects · Communities · Discover · Tools · System.** Each filterable;
per-category **mute/preferences**.

## 2. Event sources (emitted by other modules)

- **Projects:** task assigned, status change on your task, comment/reply, mention,
  action-plan due, added to a project.
- **Works:** credit request (accept/reject), credit accepted/rejected.
- **Canvas:** @mention of you/your task.
- **Feed:** comment/reply on your post (no vote notifications — anti-bait).
- **Communities:** request approved, post promoted, crew-lead reply, event.
- **Discover:** new follow / new connection.
- **Tools:** artefact export ready, shared artefact.
- **System:** account, security, plan/billing, admin notices.

## 3. Behavior

- **Calm by design:** no manipulative re-engagement bait; batch related events; a
  quiet coral unread dot, no aggressive badges. (Consistent with the feed
  algorithm's exclusion of notification-bait.)
- **Realtime** delivery via the Realtime foundation (push to the bell live).

## 4. Data model (owned by `notifications`)

- `notifications`: id, user_id, category, type, actor_id, entity_type, entity_id,
  data (jsonb), read_at, created_at.
- `notification_prefs`: user_id, category, muted (bool).

## 5. API (REST + WS)

- `GET /v1/notifications?category=` (cursor) · `GET /v1/notifications/unread-count`.
- `POST /v1/notifications/{id}:read` · `POST /v1/notifications:read-all`.
- `GET/PATCH /v1/me/notification-prefs`.
- `WS /v1/realtime?channel=notifications:{userId}` — live delivery.

## 6. Acceptance criteria

- Relevant events create notifications in the right category; muted categories
  suppress delivery.
- Bell shows live unread state; mark-read works; deep-links to the entity.
- No vote/bait notifications; batching reduces noise.

## 7. Design notes

Embossed notification list grouped by category; quiet coral unread dot; calm
copy in brand voice; realtime updates without jarring motion.
