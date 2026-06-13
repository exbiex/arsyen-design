# Flow — Discover + Crew

> Module 8. Artist/crew discovery. Source: DECISIONS.md (Connections; crew =
> Pro/Studio) + Discover Q1–Q3 + the kit (`WebDiscover.jsx`). Depends on: Profile,
> Search index (Meilisearch), Connections, Projects (invite).

## 1. Scope

- **Artists only** here (crew discovery). Projects are found via profiles;
  Communities via their own surface; cross-type universal search = the ⌘K / Search
  module (13).

## 2. Surface

- **Search bar** with realtime suggestions (permission-aware: public/unlisted
  profiles only).
- **Filters:** Discipline (professions) · Location (city/country) · Open to crew
  (availability) · Skills · Rate.
- **Rails:** Featured artists · "Most relevant for your crew."
- **Artist card:** avatar, name, `@handle`, discipline, city, **open-to-crew** dot
  (availability — crew context only), skill chips, **% match**, and actions:
  **Follow / Message** (if connected) / **View profile** / **Invite to project**.
- Collapsible chat panel alongside (Chat module).

## 3. Tier gating (Connections model)

- **Free:** Discover shows **only already-connected** members (via shared
  projects/communities); search/filter/match for new people is locked (upgrade
  nudge). No cold outreach.
- **Pro/Studio:** **full Discover** — search any artists, see **% match**, **follow**
  (→ becomes connected → can **message**), and **invite to a project** (invite
  acceptance also creates a connection).

## 4. % match (Pro/Studio)

Transparent score from: profession overlap, skill overlap, availability (open to
crew), location proximity, and verified-credit relevance to the viewer's recent
projects. Shown as a percentage; never a ranking/leaderboard (no public ratings or
reviews — locked).

## 5. Rate

Optional **rate band** on the profile (e.g. `$`–`$$$$`), **crew-context only**
(shown in Discover, not on the public profile). *(New optional profile field —
confirm.)*

## 6. Data & API

- Index: profiles in **Meilisearch** (permission-aware; reindex on profile change
  via job queue).
- `GET /v1/discover/artists?q=&discipline=&location=&open=&skills=&rate=` — Free →
  restricted to connections; Pro/Studio → full, with match scores.
- `GET /v1/discover/suggest?q=` — realtime suggestions.
- `POST /v1/profiles/{id}/follow` (paid → creates connection) · `DELETE …/follow`.
- Invite to project via `projects` members API (creates connection on accept).
- Availability, skills, professions, rate read from `profiles`.

## 7. Acceptance criteria

- Free user sees only connected members in Discover; new-artist search is locked.
- Pro/Studio search/filter returns permission-aware results with transparent
  match; follow creates a connection and enables messaging.
- Availability shows only in this crew context, never on the public profile.
- No ratings/reviews/leaderboards anywhere.
- Invite-to-project flows into project membership + connection.

## 8. Design notes

Portrait artist cards (embossed, recessed media seat), identity overlaid on the
portrait; green "open to crew" dot; coral on the primary action; calm filters as
inset chips; "No artists match …" empty state in brand voice.
