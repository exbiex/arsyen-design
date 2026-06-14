# Arsyen — iPhone App UI kit

The **complementary** mobile surface: the same pure-black, coral-glow language adapted to iOS.
A dark device frame (status bar, dynamic island, home indicator) wraps a custom Arsyen app
with a **bottom tab bar** (Projects · Discover · Tools · Profile) standing in for the desktop dock.

`index.html` is interactive — tap a tab, tap a project to open its **Board**, tap a ticket to
raise the **Ticket sheet** (a bottom sheet).

## Screens (`screens.jsx`)
- **ProjectsScreen** — large-title home; mesh-cover project cards with status + progress.
- **BoardScreen** — compact project hero, a horizontal **column switcher** (To do / In progress
  / Review / Done) and a vertical ticket list (mobile-native kanban).
- **TicketSheet** — bottom sheet with column/priority chips, assignee, description, labels, comments.
- **DiscoverScreen** — search + filter chips + stacked artist cards (mesh cover, % match, message).
- **ToolsScreen** — the 8 tools as a 2-column grid.
- **ProfileScreen** — mesh banner, ringed avatar, stats strip, skills, Edit profile, portfolio grid.
- **TabBar** — coral active item, mono caps labels.

## Files
- `ios-frame.jsx` — the device bezel (starter component; dark mode, no nav title).
- `screens.jsx` — all screens + tab bar.
- `index.html` — tab + project + ticket state; reuses `../mac/icons.jsx` and `../mac/ui.jsx`
  so the two kits share one icon set and one set of primitives.

## Notes
- Reuses the Mac kit's `icons.jsx` + `ui.jsx` to stay DRY — the design language is identical
  across surfaces, only the layout and navigation chrome differ.
- Device frame is **dark** (`<IOSDevice dark>`); the app paints its own pure-black canvas inside.
