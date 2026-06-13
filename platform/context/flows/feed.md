# Flow — Feed

> Module 7. Media-only discovery stream. Source: DECISIONS.md + Feed Q1–Q3 + the
> kit (`WebFeed.jsx`). Depends on: Media/Assets, Profile (follow graph), Works.

## 1. What a post is

- **Media required:** one or more images/videos + **caption** (≤ 500 words) +
  **tags** + optional **reference to a Work**. (Text/discussion = Communities.)
- **NSFW:** creator-marked, **blurred by default**, 18+ only.
- Posting a Work (`works.md → post-to-feed`) creates a post referencing it.

## 2. Browsing

- **Modes:** **For you** (transparent affinity ranking) · **Following**
  (chronological from the follow graph) · **Trending** (recent upvote velocity,
  time-decayed). Category **chips** filter by tag/work-type.
- **Layout:** embossed masonry **media pins**; hover reveals author + title; click
  → **post-detail overlay**.
- **Ranking** explicitly **excludes** watch-time, scroll-time, rage engagement,
  and notification-bait. Semantic personalization (pgvector, paid tiers) added
  later.

## 3. Post detail

- Media (HLS player for video) + author (with **Follow**) + title/caption + tags.
- **Upvote/downvote** as signals — **no visible counts**, only an "upvoted" state.
- **Bookmark/save** + **Share**.
- **Comments:** one level of threaded replies (locked rule). **Comment counts ARE
  shown**; comment upvotes exist with hidden counts. Composer at the bottom.

## 4. Rules

- Caption & comments: 500-word max (word-based).
- One level of comment nesting maximum.
- Vote counts never shown; comment counts shown.
- NSFW blurred until tapped; 18+ enforced.

## 5. Open web

- Individual **public** posts can render as shareable, SEO-indexable pages on the
  Next.js surface (OpenGraph media card). The browsing feed itself stays in-app.

## 6. Data model (owned by `feed`)

- `posts`: id (uuidv7), author_id, caption, work_id (nullable), nsfw (bool),
  visibility (`public|unlisted`), created_at, updated_at, deleted_at.
- `post_media`: post_id, asset_id, position.
- `post_tags`: post_id, tag.
- `post_votes`: post_id, user_id, value (+1|-1) — counts never exposed.
- `post_saves`: post_id, user_id.
- `comments`: id, post_id, author_id, body, parent_id (one level), created_at,
  deleted_at.
- `comment_votes`: comment_id, user_id, value (hidden counts).
- Ranking uses: follows, votes, recency, profession/skill/work-type affinity;
  trending = decayed upvote velocity. (Materialized/queried per mode; cached.)

## 7. API (REST `/v1`)

- `GET /v1/feed?mode=for_you|following|trending&tag=` (cursor pagination).
- `POST /v1/posts` (media required) · `PATCH/DELETE /v1/posts/{id}`.
- `GET /v1/posts/{id}` · `GET /v1/public/posts/{id}` (open web).
- `POST /v1/posts/{id}/vote {value}` · `DELETE …/vote`.
- `POST /v1/posts/{id}/save` · `DELETE …/save`.
- Comments: `GET/POST /v1/posts/{id}/comments`; `POST /v1/comments/{cid}/replies`
  (one level); `POST /v1/comments/{cid}/vote`.

## 8. Acceptance criteria

- Create a media post (image/video) with caption/tags/NSFW; over-500-words
  rejected.
- All three modes return sensible ordering; banned signals are not collected.
- Vote has no visible count; comment count shows; replies limited to one level.
- NSFW blurred by default; 18+ enforced.
- Public post renders on open web with correct OG/SEO; private/unlisted respected.

## 9. Design notes

The art is the only saturated thing; embossed pins lift on hover; coral only on
the active mode chip / upvoted state; post-detail is an embossed overlay (glass
only over full-bleed media); calm transitions; brand-voice empty state ("Your feed
is quiet. Follow a few artists.").
