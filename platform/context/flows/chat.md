# Flow — Conversations / Chat

> Module 10. 1:1 (E2E), project/team, and community chat. Source: DECISIONS.md
> (E2E from day one; Connections) + Chat Q1–Q2 + the kit (`WebChat.jsx`,
> profile TeamChat). Depends on: Realtime foundation, Connections, Media/Assets.

## 1. Conversation types & encryption

- **1:1 (DM)** — **full end-to-end encryption** (Signal protocol: X3DH +
  Double Ratchet). Per-device identity keys; **optional passphrase-encrypted cloud
  backup** so a new device restores history. **Server never sees plaintext/keys.**
  AI features are **opt-in**, client-side only, never server-stored.
- **Project / Team chat** — one per project; encrypted **in transit + at rest**
  (server-managed), enabling full AI. Members per project roles.
- **Community group chat** — per community; encrypted in transit + at rest.

DM is **only** allowed between **connected** members (`DECISIONS.md →
Connections`). Project/community chats are gated by membership.

## 2. Features (v1)

Text · media (image/video/audio/file) · **entity attachments** (share a
project/task/canvas/work/asset/community as a rich card; recipient renders with
their own permissions) · emoji reactions · reply-to · typing indicators · voice
notes · **read receipts OFF by default** (opt-in) · in-conversation search.
Instagram-like chat list (DMs + project + community), collapsible.

## 3. Realtime

Reuses the **Realtime foundation** (websockets + Redis pub/sub). Channels:
`dm:{id}`, `project:{id}`, `community:{id}`. Delivery, typing, presence,
reactions, receipts flow over WS; messages persisted (ciphertext for DM).

## 4. Data model (owned by `chat`)

- `conversations`: id, kind (`dm|project|community`), project_id?/community_id?,
  e2e (bool), created_at.
- `conversation_members`: conversation_id, user_id, last_read_at, joined_at.
- `messages`: id, conversation_id, sender_id, type, body_or_ciphertext, reply_to,
  created_at, edited_at, deleted_at. (DM rows store ciphertext + per-recipient
  device-wrapped keys; group rows store server-encrypted content.)
- `message_attachments`: message_id, ref_type (`asset|project|task|canvas|work|
  community`), ref_id (or asset_id).
- `message_reactions`, `read_receipts` (opt-in).
- **E2E key material:** `device_keys` (user_id, device_id, identity_pubkey,
  signed_prekey, sig), `one_time_prekeys`, `e2e_backups` (user_id,
  passphrase-encrypted blob). Private keys never leave the device.

## 5. API (REST + WS)

- `GET /v1/conversations` · `GET /v1/conversations/{id}/messages` (cursor).
- `POST /v1/conversations` (start DM — requires connection; project/community
  auto-provisioned).
- `POST /v1/conversations/{id}/messages` (ciphertext for DM).
- E2E keys: `POST /v1/e2e/devices` (register), `GET /v1/e2e/{userId}/prekey`
  (fetch bundle), `PUT /v1/e2e/backup`.
- `WS /v1/realtime?channel=…` — delivery, typing, presence, reactions, receipts.

## 6. Acceptance criteria

- DM is end-to-end encrypted (server stores only ciphertext); a second device with
  the backup passphrase restores history; without it, starts fresh.
- DM blocked between non-connected members.
- Project/community chats work for members; full AI hooks available (built with AI
  module).
- Entity attachments render permission-aware on the recipient side.
- Reactions, reply, typing, voice notes work; read receipts off unless enabled.

## 7. Design notes

Embossed bubbles (mine = coral, theirs = raised); calm, no aggressive unread
badges beyond a quiet coral dot; entity cards are embossed mini-cards; brand-voice
empty state ("No messages yet."). E2E status shown subtly (a small lock note),
never alarmist.
