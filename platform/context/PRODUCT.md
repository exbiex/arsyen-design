# Arsyen — PRODUCT (truth base)

> What Arsyen is, who it's for, the principles, the modules, and the commercial
> frame. Decisions are logged in `DECISIONS.md`; flows are detailed in `flows/*`.

## What it is

Arsyen is a **creative operating system for artists** — a members-only home where
working artists keep a portfolio, share and discover work, run their creative
projects, and form crews. It unifies identity, production workflow, media,
communication, discovery, and tools in one calm, cinematic space. It is **not** a
generic social network, a SaaS clone, a chatbot, or a plain portfolio builder.

Audience: working artists — illustrators, 3D artists, photographers, designers,
painters, filmmakers, animators, musicians, writers. Because the audience is
artists, **craft and detail matter more than usual**; the interface stays quiet so
the work is the brightest thing on screen.

## Core principles

- **Work Layer vs Public Layer.** Private production (projects, tasks, canvas,
  team chat, assets) is separate from public presence (profile, feed, discover,
  communities).
- **Create once, reference everywhere.** Assets live once in a global library and
  are referenced from projects, profile, works, and communities.
- **Universal versioning.** Assets, creative works, profile pages, and canvases
  keep version history (compare + restore + audit trail).
- **Permission-aware everywhere.** A single role + visibility model governs all
  access (Owner/Manager/Member/Viewer × Private/Shared/Unlisted/Public).
- **AI assists, the user approves.** AI is infrastructural and confirmation-based,
  never dominant (BYOK).
- **Calm, cinematic, restrained.** Never noisy, addictive, gamified, or
  enterprise-heavy. No vanity metrics shoved in the face (e.g. feed vote counts
  are hidden).

## Modules (full product)

- **Identity & Onboarding** — invite-gated signup, professions, onboarding to a
  usable profile. (`flows/identity.md`)
- **Profile** — public identity: cover, avatar, name/@handle, professions,
  availability (crew-only), bio, location, links, stats; portfolio grid; posts;
  team chat; about; plus Create actions (portfolio, résumé, upload, post). Website
  builder + résumé are sub-features. (`flows/profile.md`)
- **Projects** — Project → Action Plans → Tasks → Subtasks + Milestones, with a
  **Canvas** (Notion-like doc; to-dos sync to the Board), **Board** (staged
  Jira-like), **Resources** (tool artefacts), **Files**, and team chat. Roles:
  owner/manager/member/viewer. (`flows/projects.md`, `flows/canvas.md`)
- **Assets / Media** — global asset library; pre-signed upload to object storage;
  derivatives + HLS video; references; versioning. (`flows/assets.md`)
- **Creative Works + Credits** — published works with attached assets and
  **credits that the credited artist must accept/reject** (verified collaboration
  history). (`flows/works.md`)
- **Feed** — media-only masonry; Discover/Following/Trending; upvote/downvote as
  hidden signals; post-detail with comments + one level of threaded replies.
  (`flows/feed.md`)
- **Discover + Crew** — search artists/projects/communities; filters
  (discipline, location, open-to-crew, skills, rate); **% match**; crew formation.
  (`flows/discover.md`)
- **Communities** — public / private / hidden; posts, discussions, chat.
  (`flows/communities.md`)
- **Conversations / Chat** — 1:1 (E2E), project/team, and community chat; share
  projects/tasks/assets/works into chat. (`flows/chat.md`)
- **Tools** — embossed tool tiles opening full-screen workspaces (moodboard,
  color grade, brief builder, invoice, call sheet, storyboard, portfolio,
  contract; reconcile with résumé/budget from flows). Independent or linked to a
  project. (`flows/tools.md`)
- **Search** — universal search (Meilisearch; semantic for paid); future AI
  command layer. (`flows/search.md`)
- **Notifications** — Inbox / Projects / Communities / Discover / Tools / System.
  (`flows/notifications.md`)
- **Admin** — internal review/approval + invite management (server-rendered).

## Commercial frame (prior decisions — all stand)

- **Plans:** Free / Pro ($12mo · $99yr) / Studio ($29mo · $239yr). Limits scale
  projects, storage, devices, team size; selling/feed-posting/crew/analytics/4K
  gated by tier. Revenue split Free 25% / Pro 18% / Studio 12%.
- **Payments:** Razorpay at launch (Stripe phase 2).
- **Launch:** invite-only, **India first** (AWS ap-south-1), 18+ only. Open
  signup + Google/Apple OAuth + US expansion in phase 2.
- **Media:** HLS adaptive streaming, signed URLs, per-viewer forensic watermark;
  transcode ladder 480/720/1080 (4K Studio).
- **Chat:** 1:1 full E2E (Signal-style) from day one; project/community encrypted
  in transit + at rest with full AI.
- **AI:** platform GPT default + BYOK; always permission-scoped, auditable.
- **Search:** Meilisearch launch; semantic (pgvector) for Pro/Studio.

## Platform priority

Desktop = deep orchestration (primary), iPad = touch creative workspace,
mobile = contextual continuity (uploads, notifications, quick interactions). One
Flutter codebase serves all platforms. **Published content is also rendered on a
public, SEO-indexable web surface (Next.js) from day 0** — see `DECISIONS.md →
Surfaces & public web` and `SUPERARCHITECTURE.md §8b`.
