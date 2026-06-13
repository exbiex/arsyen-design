# Flow — Communities

> Module 9. First-class community spaces. Source: DECISIONS.md + Communities
> Q1–Q4 + the kit (`WEB_COMMUNITIES`). Depends on: Feed (promotion + reposts),
> Realtime (group chat), Connections, Media/Assets.

## 1. What a community is

A **first-class entity** with its own **page** and a **community account** that can
post to the global feed. Contains:

- **Central page** — the live **discussion** stream.
- **Member contributions** — posts, **requests**, and **crew-lead** calls; others
  **react/upvote**.
- **Group chat** (realtime) + **member directory**.
- **Events** (title, description, start/end, location, cover, **RSVP**).
- **Reposts** — the community account can repost global-feed posts into the
  community.

Joining a community **connects** you to its members (enables 1:1 chat).

## 2. Creation, roles, visibility

- **Create:** **Pro/Studio only** (creator = **Owner**). Joining is free for all.
- **Roles:** Owner · **Admin** (set **community rules**, moderate, configure
  promotion, manage events, post as the community account) · Member.
- **Visibility:** **Public** (discoverable, instant join) · **Private**
  (discoverable, **request → admin approval**) · **Hidden** (invite-only, not
  discoverable).

## 3. Promotion to the global feed

- A community post crossing an **upvote threshold** (default **100**,
  admin-configurable) is queued to post to the **global feed** under the
  **community account**.
- Per-community **promotion mode**: **automatic** or **requires admin approval**.
- Public communities only.

## 4. Discovery & placement

- Found via a **Communities browse** surface + universal **Search** (not the
  artists-only Discover). Communities + their chats also surface in the
  **Feed+Chat** area's chat list.

## 5. Data model (owned by `communities`)

- `communities`: id, owner_id, name, handle, description, avatar_asset_id,
  cover_asset_id, visibility, rules, promotion_threshold (default 100),
  promotion_mode (`auto|approval`), created_at, updated_at, deleted_at.
- `community_members`: community_id, user_id, role (`owner|admin|member`), status
  (`member|pending`), joined_at.
- `community_posts`: id, community_id, author_id, kind (`post|request|crew_lead|
  repost`), body, reposted_post_id (nullable), created_at, deleted_at.
- `community_post_media` (post_id, asset_id), `community_post_votes`,
  `community_post_comments` (one level).
- `community_events`: id, community_id, title, description, starts_at, ends_at,
  location, cover_asset_id; `community_event_rsvps` (event_id, user_id, status).
- Promotion: crossing threshold → create a `posts` row authored by the **community
  account** (feed post with `community_id`), gated by promotion_mode.

## 6. API (REST `/v1`)

- Communities: `POST` (Pro/Studio) `/GET/PATCH/DELETE /v1/communities[/{id}]`.
- Membership: `POST /v1/communities/{id}/join` (instant or pending) ·
  `POST …/members/{uid}:approve` · `DELETE …/leave` · role updates.
- Posts: `GET/POST /v1/communities/{id}/posts`; react/upvote; comments (one level);
  `POST …/posts/{pid}:repost-from-feed {feed_post_id}`.
- Promotion config: `PATCH /v1/communities/{id}` (threshold/mode);
  `POST …/posts/{pid}:promote` (approval mode).
- Events: `GET/POST /v1/communities/{id}/events`; `POST …/events/{eid}/rsvp`.
- Group chat: realtime channel `community:{id}` (Chat module).

## 7. Acceptance criteria

- Only Pro/Studio can create; Public/Private/Hidden behave per spec (approval for
  Private; Hidden hidden from discovery/search).
- Joining connects members (1:1 chat unlocked).
- Post/request/crew-lead with reactions; comments one level.
- A post passing the threshold promotes to the global feed via the community
  account (auto or after approval per config).
- Repost-from-feed pulls a feed post into the community.
- Events with RSVP work; admins enforce rules/moderation.

## 8. Design notes

Embossed community page; calm discussion stream; coral on primary action / promoted
badge; community account shown distinctly on promoted feed posts; brand-voice empty
states. Realtime group chat reuses the Canvas realtime foundation.
