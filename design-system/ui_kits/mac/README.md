# Arsyen — Mac App UI kit

The **primary** Arsyen surface: the OS-like desktop. A pure-black canvas hosts floating
panels; a frosted **dock** (folder · compass · grid · gear) plus the **arsyen** wordmark,
a ⌘K search field, notifications and your avatar form the persistent bottom chrome.

`index.html` is an interactive click-through — use the dock to move between views, the avatar
to open your profile, and click any board ticket to open its detail sheet.

## Views
| Dock | View | File | What it shows |
|---|---|---|---|
| folder | **Board** | `screens_board.jsx` | Projects panel · SINNERS hero · Board/Action Plans/Files tabs · kanban columns. Click a ticket → **Ticket sheet** modal. |
| compass | **Discover** | `screens_more.jsx` | Search + filter chips · featured artist cards (gradient-mesh covers, % match) · the Chat panel. |
| grid | **Tools** | `screens_more.jsx` | The 8 artefact tools as a card grid with coral-tinted icon tiles. |
| gear | **Settings** | `screens_more.jsx` | Notification & privacy switches · Backdrop segmented control · Accent-color picker. |
| avatar | **Profile** | `screens_more.jsx` | Renn Okabe portfolio — mesh banner, stats strip, skills, mesh portfolio grid. |

## Files
- `icons.jsx` — `window.AIcon` line-icon set (Lucide-matched, 1.5px stroke).
- `ui.jsx` — self-contained primitives mirroring the design-system components
  (`ABtn`, `AIconBtn`, `ATag`, `AStatus`, `ABadge`, `AAvatar`, `AProgress`, `AInput`,
  `ASwitch`, `AChip`, `ASeg`, `ATabs`, `ACard`, `ALabel`).
- `screens_board.jsx` — `BoardView`, `TicketSheet`.
- `screens_more.jsx` — `DiscoverView`, `ToolsView`, `SettingsView`, `ProfileView`, `Chrome`.
- `index.html` — view state, dock nav, ticket modal; persists the active view in localStorage.

## Notes
- **Self-contained on purpose.** The kit links only `styles.css` and inlines lightweight
  copies of the primitives, so it previews and ships without the runtime bundle. Production
  code should import the real components from `window.ArsyenDesignSystem_992fe7` instead.
- Project covers / portfolio works use the **gradient-mesh** motif as stand-ins for the real
  film stills and uploaded imagery seen in the baseline (no stills were provided).
