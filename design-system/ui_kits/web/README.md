# Arsyen — Web App UI kit

The **public / entry** surface, shown inside a browser window: Arsyen is invite-only, so the
open web is just the gate (auth) plus public artist portfolios. The members' app itself is the
Mac kit.

`index.html` is an interactive flow — start on the landing page and move:
**Landing → Log in → Public portfolio**, or **Landing → Request an invite**.

## Views (`screens.jsx`)
- **WebLanding** — full-bleed "Living" aurora backdrop, oversized `arsyen` wordmark,
  `MEMBERS ONLY · BY INVITATION`, and the Log in / Request an invite buttons.
- **WebLogin** — the "Welcome back" **glass card** (blur over the backdrop, faint coral glow),
  mono labels, Log in CTA, back arrow.
- **WebRequest** — invite-request form (name, email, discipline, a few words) in the same glass card.
- **WebPortfolio** — a public artist page (sticky top bar with wordmark + Request-an-invite CTA,
  mesh banner, ringed avatar, stats, skills, 4-up portfolio grid).

## Files
- `browser-window.jsx` — Chrome browser chrome (starter component; traffic lights, tab, URL bar).
- `screens.jsx` — all four views; reuses `../mac/icons.jsx` + `../mac/ui.jsx`.
- `index.html` — view state; sets the tab title and URL per view.

## Notes
- The **glass cards** are the one place Arsyen leans on `backdrop-filter` blur — only ever over
  the Living backdrop, never on the pure-black app canvas.
- Portfolio imagery uses the gradient-mesh motif as stand-ins for real uploaded works.
