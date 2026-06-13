# Flow — Projects

> Module 5. The Work Layer core. Source: DECISIONS.md + Projects Q1–Q6 + the kit
> (`ui_kits/web/WebProjects.jsx`). Depends on: Identity, Media/Assets. Siblings:
> Canvas (`canvas.md`, module 6), Chat (`chat.md`, module 10), Tools (Resources,
> module 11).

## 1. Structure & navigation

- **Projects Navigator** (left): list of projects (cover, title, status pill,
  crew stack, progress %); collapsible to a thin **rail** of thumbnails. `+` to
  create.
- **Project detail** (right) with tabs: **Canvas · Board · Action Plans ·
  Resources · Files** (+ team chat). Hero (cover, status, title), meta row (your
  role, type, crew, progress), and a **zen focus mode** (Canvas takes the full
  page, chrome hides).
- Hierarchy: **Project → Action Plan → Task → Subtask.**

## 2. Create a project

- **Blank** — empty project (seeds default board columns; **no Action Plan is
  seeded** — the first plan is named by the user, usually while creating the
  first ticket. *Founder revision 2026-06-12.*)
- **From template** — starter templates (e.g. Short film, Album art, Exhibition,
  Photo zine) that seed Action Plans, board columns, and starter tasks.
- *(AI-assisted — later, with the AI module: generate Action Plans + tasks from a
  brief.)*

## 3. Action Plans (replaces "Milestones") — *revised 2026-06-12*

- An **Action Plan** = a phase/goal (e.g. "Pre-production") that **holds a set of
  Tasks** + a quick **description** + an optional **target date**.
- **No plan exists by default**, and **every task requires exactly one plan**:
  the task form lists the existing plans to pick from; when none exist (or the
  user wants a new phase) it says so and takes a **new plan's name**, creating
  the plan with the ticket.
- The tab shows each plan as a **card** (title, description, target date,
  progress) with its **tasks as sub-cards inside** + a per-card **create task**
  affordance. Tasks created in a plan card appear on the Board instantly, and
  vice versa — one source of truth.
- Deleting a plan moves its tickets to the first remaining plan; the **last**
  plan can't be deleted while it still holds tickets (an empty plan always can).

## 4. Board

- Columns = **per-project customizable statuses** (seeded: To do · In progress ·
  Review · Done; editable/reorderable; one marked the "done" state).
- **Task cards:** title, assignee avatar(s), priority, label; drag between columns
  to change status.
- **Filters:** by **assignee** and by **Action Plan**.
- **Task panel** (opens from a card): description, assignee(s), status, priority,
  due date, labels, **subtasks** (checklist), **attachments** (from asset
  library), **comments** (one level of replies), and its Action Plan link.
- **Presentation** (*founder 2026-06-12*): the create-task form opens **below the
  board**; in **fullscreen** the ticket detail also opens inline below — outside
  fullscreen, ticket detail and the create form float as a **work panel over the
  gently dimmed shell**.
- **Canvas ↔ Board sync** — *deferred: the Canvas implementation was removed
  2026-06-12 and will be redone from scratch.*

## 5. Resources & Files

- **Resources** — artefacts created from **Tools** (moodboards, briefs, invoices…)
  attached to the project. Built with the Tools module (11); the tab references
  them and offers "New in <tool>".
- **Files** — assets attached to the project (from the library or uploaded), grid
  view with type/name; references tracked in `assets`.

## 6. Roles & permissions (configurable ACL)

- **Owner** — can do anything (incl. delete, visibility, billing context).
- **Manager** — capabilities **configured per-manager by the Owner**: any of
  `manage_members, manage_action_plans, manage_tasks, manage_board, manage_files,
  manage_canvas, manage_settings, view_all`.
- **Member** — view/modify **assigned tasks**; view tasks within an Action Plan
  **only as granted** by Owner/Manager (`action_plan_view_ids`). No blanket access.
- Viewing is governed by grants, not a separate Viewer role. All enforced in the
  service-layer authz; every mutation audited.

## 7. Visibility

- **Private** (default) · **Shared** (collaborators) · **Unlisted** · **Public**.
- Public/Unlisted projects appear on the owner's profile **Projects** and in
  **Discover** (showcase / crew-seeking). **Internals (tasks, files, canvas,
  chat) are always restricted to members**, regardless of outer visibility.

## 8. Data model (owned by `projects`)

- `projects`: id, owner_id, title, type, cover_asset_id, status_id, visibility,
  created_at, updated_at, deleted_at.
- `project_statuses`: id, project_id, label, color, position, is_terminal.
- `project_members`: project_id, user_id, role (`owner|manager|member`),
  permissions (jsonb grants), added_at.
- `action_plans`: id, project_id, title, description, target_date, position,
  created_at, updated_at, deleted_at.
- `board_columns`: id, project_id, name, position, is_done.
- `tasks`: id, project_id, action_plan_id, column_id, title, description,
  priority, due_date, position, created_by, created_at, updated_at, deleted_at.
- `task_assignees` (task_id, user_id); `subtasks` (id, task_id, text, done,
  position); `task_labels` (task_id, label); `task_attachments` (task_id,
  asset_id); `task_comments` (id, task_id, author_id, body, parent_id, created_at).
- `project_files` (project_id, asset_id, added_by). Resources reference project
  via tool artefacts (Tools module).
- `project_templates` (built-in seed definitions).

## 9. API (REST `/v1`) — representative

- Projects: `POST/GET/PATCH/DELETE /v1/projects[/{id}]`;
  `GET /v1/projects/{id}` (perm-aware); `GET /v1/public/projects/{id}` (open web,
  public/unlisted, internals excluded). `GET /v1/project-templates`.
- Members: `POST/PATCH/DELETE /v1/projects/{id}/members` (role + permission grants).
- Statuses/columns: CRUD + reorder under the project.
- Action plans: `POST/GET/PATCH/DELETE /v1/projects/{id}/action-plans[/{apid}]`.
- Tasks: CRUD; `POST /v1/tasks/{id}:move` (column/position); subtasks, labels,
  attachments, comments sub-resources.
- Files: `POST/GET/DELETE /v1/projects/{id}/files`.

## 10. Acceptance criteria

- Create blank/template project; template seeds plans/columns/tasks.
- Customize board columns + project statuses per project; drag a task changes
  status; reorder persists.
- No plan exists on a fresh project; a ticket without a plan is rejected; naming
  a plan in the task form creates it; plan cards hold their tasks as sub-cards
  with a per-card create that lands on the Board too.
- Permission grants enforced: a Member sees only assigned tasks + granted plans; a
  Manager only the capabilities the Owner granted; unauthorized actions 403.
- Visibility: public project shows on profile/Discover but internals stay
  member-only; private never leaks to open web.
- Canvas to-do creates a board task; @mention links resolve both directions
  *(deferred until the Canvas redo)*.

## 11. Design notes

Embossed navigator + inset board troughs with raised task cards (press = inset);
status dots colored (coral = in progress); progress bar coral with glow; calm
drag; zen mode hides chrome for Canvas focus; brand-voice empty states.
