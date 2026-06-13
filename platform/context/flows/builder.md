# Flow — Website / Portfolio / Résumé builders

> Module 12. Three **separate dedicated builders** that publish to the open web
> (Next.js). Source: DECISIONS.md + Builder Q1–Q2 + flows (Website Builder
> sections). Depends on: Media/Assets, Works (Featured Works), Profile, verified
> Credits (`works.md`), public web surface (`SUPERARCHITECTURE.md §8b`).
> No custom domains — platform subdirectory only (locked).

## 1. The three builders

1. **Portfolio builder** — gallery-grade showcase page(s) of the artist's work.
2. **Website builder** — a small **multi-page** site under
   `arsyen.com/<username>/<slug>` (Create Page → Choose Template → Add Sections →
   Publish).
3. **Résumé builder** — a structured CV that **auto-populates** from profile +
   **verified credits** + projects (all editable, manual additions allowed) and
   **exports to PDF**; also publishable as a web page.

Each is tailored, but they share: a section/rendering engine, the Next.js public
rendering, and universal versioning. *(Detailed per-builder UX is elaborated in
build sub-tasks; this module ships each builder's framework + sections.)*

## 2. Sections (website/portfolio)

Hero · Text · Gallery · Video · Featured Works (references Creative Works) ·
Resume · Timeline · Contact (+ more later). Sections reference existing
assets/works ("create once, reference everywhere") — never copies.

## 3. Templates

Each builder offers starter **templates**; choosing one seeds sections. v1 ships a
small set per builder.

## 4. Publishing & visibility

- Draft → **Publish** → rendered on the **Next.js** surface; **revalidate-on-
  publish** webhook makes it live instantly. Unpublish/again supported.
- Visibility per page: Public / Unlisted / Private (gated by profile visibility:
  effective = min(profile, page)).
- URLs: profile `arsyen.com/<username>`; pages `arsyen.com/<username>/<slug>`;
  résumé downloadable PDF + web page.
- SEO: meta + OpenGraph + `schema.org` (Person/CreativeWork) + sitemaps.

## 5. Data model (owned by `builder`)

- `pages`: id (uuidv7), owner_id, kind (`portfolio|website|resume`), title, slug,
  template_id, status (`draft|published`), visibility, published_at, created_at,
  updated_at, deleted_at (+ version rows).
- `page_sections`: id, page_id, type, props (jsonb), position.
- `section_refs`: section_id, ref_type (`asset|work`), ref_id (references, not
  copies).
- `resume_data`: owner_id, structured CV (experiences, credits [seeded from
  verified credits], skills, education, custom), editable overrides.
- `page_templates`: built-in seeds per builder kind.

## 6. API (REST `/v1`)

- Pages: `POST/GET/PATCH/DELETE /v1/pages[/{id}]`; `POST /v1/pages/{id}:publish` /
  `:unpublish`; sections sub-resources (CRUD + reorder).
- Résumé: `GET /v1/me/resume` (auto-seeded), `PATCH`, `POST /v1/me/resume:export`
  (PDF).
- Templates: `GET /v1/page-templates?kind=`.
- Public read (Next.js): `GET /v1/public/pages/{username}/{slug}` (public/unlisted
  only; revalidate-on-publish).

## 7. Acceptance criteria

- Build + publish a portfolio page, a multi-page website, and a résumé; each
  renders on the open web with correct SEO; private/unlisted respected.
- Résumé auto-seeds from profile + verified credits + projects; edits persist;
  PDF export works.
- Sections reference live assets/works (updating a work updates the page).
- Publish triggers Next.js revalidation; versioning + restore work.

## 8. Design notes

Builder = embossed editor with a live preview; published output matches the brand
(reuses design-kit CSS on Next.js); gallery-grade, the work is the brightest
thing; calm; brand-voice empty states.
