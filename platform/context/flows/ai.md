# Flow — AI layer

> Module 17. Infrastructural, ambient, permission-scoped, confirmation-based.
> Source: DECISIONS.md + prior AI decisions + AI Q1. Default provider = platform
> OpenAI GPT; BYOK supported. (Per product decision; provider is abstracted.)

## 1. Infrastructure

- **Provider abstraction:** platform default (OpenAI GPT) + **BYOK** (OpenAI at
  launch; Anthropic/Gemini phase 2). Keys **encrypted at rest** (KMS), **never**
  exposed client-side, **never** logged.
- **Permission-scoping:** AI acts strictly within the user's permissions; it can
  only read what the user can access.
- **Confirmation framework:** read-only actions execute **instantly**;
  write/create/send/delete require **explicit confirmation** (AI proposes → user
  approves).
- **Always-on audit log:** every AI action logged; the **user has full access**;
  platform super-users see **metadata only**.
- **AI indicator:** always shows the **provider** + whether it's the **platform**
  key or the **user's** key.

## 2. Ambient assistant + wired hooks

- **Ambient assistant** — a persistent, accessible surface (⌘-invokable), never
  dominant; calm.
- **Hooks** (wired now, refined later): Brief-builder tool, **AI project creation**
  (generate Action Plans + tasks from a brief), **chat assist** (1:1 = opt-in,
  client-side only, never server-stored due to E2E; project/community = full),
  **search command layer**.

## 3. Data model (owned by `ai`)

- `byok_keys`: user_id, provider, encrypted_key, created_at.
- `ai_audit_log`: id, user_id, action, provider, key_source (`platform|byok`),
  entity_type, entity_id, confirmed (bool), metadata (jsonb), created_at.
- `ai_threads` / `ai_messages` (ambient assistant history; 1:1-chat AI stays
  client-side).

## 4. API

- `POST /v1/ai/assist` (assistant; returns proposed actions + confirmation tokens
  for writes).
- `POST /v1/ai/confirm` (execute a confirmed write action).
- BYOK: managed in Settings (`/v1/me/byok`).
- `GET /v1/me/ai-audit`.

## 5. Acceptance criteria

- Platform default works; BYOK keys are encrypted, never returned, never logged.
- Read-only AI executes instantly; writes require explicit confirmation.
- AI never accesses data beyond the user's permissions.
- Audit log records every action; user can read their full log.
- AI indicator always visible; 1:1-chat AI never stored server-side.

## 6. Design notes

Ambient, quiet assistant (embossed panel/command surface); coral only on the
confirm-action; AI indicator a small mono label; calm, never pushy.
