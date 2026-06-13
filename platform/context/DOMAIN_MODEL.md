# Arsyen — DOMAIN MODEL (truth base)

> Consolidated entity map + cross-cutting models. Per-module detail lives in
> `flows/*`. Conventions: UUIDv7 keys, `created_at/updated_at` (UTC), soft-delete
> (`deleted_at`) on user data, append-only `audit_log`, universal versioning where
> noted.

## Cross-cutting models

- **Visibility:** `private | shared | unlisted | public` (entity-level). Effective
  visibility = **min(profile, item)**. Only public/unlisted render on the open web.
- **Connections:** unlock 1:1 chat; formed by shared project, shared community, or
  (paid) a follow. Distinct from **follow** (one-way, feed Following mode).
- **Project permissions:** role (`owner|manager|member`) + per-member **permission
  grants** (jsonb). Owner = all; Manager = owner-configured caps; Member =
  assigned tasks + granted action-plan views.
- **Versioning:** assets, creative works, canvases, builder pages, tool artefacts
  keep immutable versions + restore.
- **Audit:** every auth/admin/sensitive mutation → `audit_log`.
- **Entitlements:** `users.plan` (free/pro/studio) drives a central entitlements
  service checked by all modules.

## Entities by module

**Identity/users/profiles** — `users` (email, phone, dob, password_hash, status,
plan), `profiles` (name, username, bio, about, city, country, cover/photo asset,
visibility), `professions`, `skills`, `availability`, `links`, `follows`,
`invite_codes`, `invite_requests`, `refresh_tokens`, `app_settings`, `admins`,
`blocks`, `audit_log`.

**Assets** — `assets`, `asset_versions`, `asset_derivatives`, `asset_references`,
`asset_access_events` (+ `asset_access_daily`), `storage_usage`.

**Works** — `creative_works` (+versions), `work_assets`, `work_credits`
(member/external, accept/reject), `work_saves`.

**Projects** — `projects`, `project_statuses`, `project_members` (role+grants),
`action_plans`, `board_columns`, `tasks`, `task_assignees`, `subtasks`,
`task_labels`, `task_attachments`, `task_comments`, `project_files`,
`project_templates`.

**Canvas** — `canvases` (+`canvas_snapshots`/`canvas_updates` CRDT),
`canvas_block_tasks`, `canvas_mentions`.

**Feed** — `posts`, `post_media`, `post_tags`, `post_votes`, `post_saves`,
`comments`, `comment_votes`.

**Discover** — (reads profiles; Meilisearch index) + uses `follows`/connections.

**Communities** — `communities`, `community_members`, `community_posts`
(+media/votes/comments), `community_events` (+rsvps); promotion → `posts`.

**Chat** — `conversations`, `conversation_members`, `messages`,
`message_attachments`, `message_reactions`, `read_receipts`; E2E:
`device_keys`, `one_time_prekeys`, `e2e_backups`.

**Tools** — `artefacts` (+versions), `artefact_assets`.

**Builder** — `pages` (+versions), `page_sections`, `section_refs`, `resume_data`,
`page_templates`.

**Notifications** — `notifications`, `notification_prefs`.

**Billing** — `users.plan`, `subscriptions`, `invoices`, `entitlement_overrides`.

**AI** — `byok_keys`, `ai_audit_log`, `ai_threads`, `ai_messages`.

## Key relationships

- user 1—1 profile; user 1—N professions/skills/availability/links; user N—N user
  (follows; connections derived).
- project 1—N action_plans; action_plan 1—N tasks; task 1—N subtasks/comments;
  project N—N user (project_members).
- canvas N—1 project; canvas to-do block 1—1 task (mapping); canvas mention →
  task/action_plan/work/user.
- creative_work 1—N work_assets (→assets), 1—N credits (→users/external).
- post N—1 author, 1—N media (→assets), optional →work; comments 1 level.
- community 1—N members/posts/events; promoted post → feed post (community account).
- asset 1—N versions/derivatives; asset N—N everywhere via `asset_references`.

## Notes

This is the map, not the migrations. Each module's `flows/*` doc holds the
authoritative field lists; migrations are written per the build plan (`task.md`).
