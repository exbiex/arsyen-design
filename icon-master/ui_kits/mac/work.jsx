// Arsyen Mac — the WORK workflow.
// Left rail = category + object selector. Right = one persistent workspace
// that loads the selected object. Project views (Overview/Board/Plans/Files/
// Activity) are views of the object — opening a task expands inline, context
// preserved. Fullscreen is a focus STATE (hide rail, center workspace).
(function () {
  const A = window.AIcon;
  const { ABtn, AIconBtn, ATag, AStatus, AAvatar, AProgress, ACard, ALabel } = window;

  const CATEGORIES = [
    { sec: "Core", items: [
      { k: "projects", label: "Projects", icon: "folder", count: 2 },
      { k: "inbox", label: "Inbox", icon: "inbox", count: 12 },
      { k: "notes", label: "Notes", icon: "notes", count: 14 },
      { k: "tasks", label: "Tasks", icon: "task", count: 23 },
      { k: "ideas", label: "Ideas", icon: "idea", count: 7 },
    ]},
    { sec: "Creative", items: [
      { k: "moodboards", label: "Moodboards", icon: "moodboard", count: 5 },
      { k: "assets", label: "Assets", icon: "layers", count: 128 },
    ]},
    { sec: "Growth", items: [
      { k: "contacts", label: "Contacts", icon: "users", count: 36 },
      { k: "opportunities", label: "Opportunities", icon: "target", count: 4 },
    ]},
    { sec: "Planning", items: [
      { k: "calendar", label: "Calendar", icon: "calendar" },
    ]},
  ];

  const PROJECTS = [
    { id: "sinners", name: "SINNERS", type: "Feature film", status: "PLANNING", tone: "planning", pct: 11, hue: "ember", role: "Owner" },
    { id: "test", name: "TEST", type: "Short film", status: "PLANNING", tone: "planning", pct: 100, hue: "violet", role: "Owner" },
  ];

  const COLUMNS = [
    { key: "todo", label: "To do", tickets: [
      { id: 1, title: "Lock final shooting script", pr: "high", prl: "High", tag: "script", plan: "Pre-production", comments: 1, desc: "Revision 6 with the new ferry scene folded in." },
      { id: 4, title: "Build shot list for Act I", pr: "medium", prl: "Medium", tag: "camera", plan: "Pre-production" },
      { id: 5, title: "Rent anamorphic lens kit", pr: "low", prl: "Low", tag: "gear", plan: "Pre-production" },
    ]},
    { key: "prog", label: "In progress", tickets: [
      { id: 2, title: "Cast the two leads", pr: "high", prl: "High", tag: "casting", plan: "Pre-production" },
      { id: 3, title: "Scout the harbor location", pr: "medium", prl: "Medium", tag: "locations", plan: "Pre-production" },
    ]},
    { key: "review", label: "Review", tickets: [
      { id: 6, title: "Storyboard the chase sequence", pr: "medium", prl: "Medium", tag: "camera", plan: "Principal photography" },
      { id: 7, title: "Color grade the teaser", pr: "medium", prl: "Medium", tag: "post", plan: "Post & delivery" },
    ]},
    { key: "done", label: "Done", done: true, tickets: [
      { id: 9, title: "Cut the announcement teaser", pr: "medium", prl: "Medium", tag: "post", plan: "Post & delivery" },
    ]},
  ];
  const PLANS = [
    { name: "Pre-production", tone: "planning", pct: 32, tasks: 5, done: 1 },
    { name: "Principal photography", tone: "low", pct: 0, tasks: 1, done: 0 },
    { name: "Post & delivery", tone: "review", pct: 0, tasks: 2, done: 0 },
  ];
  const FILES = [
    { n: "SINNERS_script_rev6.pdf", k: "PDF", s: "2.4 MB", hue: "ember" },
    { n: "harbor_recce.jpg", k: "IMG", s: "5.1 MB", hue: "azure" },
    { n: "teaser_v3.mov", k: "MOV", s: "184 MB", hue: "violet" },
    { n: "moodboard_act1.png", k: "IMG", s: "8.7 MB", hue: "coral" },
    { n: "callsheet_d1.pdf", k: "PDF", s: "0.6 MB", hue: "verdant" },
    { n: "score_draft.wav", k: "WAV", s: "42 MB", hue: "azure" },
  ];
  const ACTIVITY = [
    { who: "Root", hue: "verdant", t: "2m", txt: "moved Color grade the teaser to Review" },
    { who: "Søren K.", hue: "ember", t: "1h", txt: "uploaded score_draft.wav to Files" },
    { who: "Nadia Œ", hue: "coral", t: "3h", txt: "commented on Lock final shooting script" },
    { who: "Root", hue: "verdant", t: "1d", txt: "created the Pre-production action plan" },
  ];
  const VIEWS = [
    ["overview", "Overview", "overview"], ["board", "Board", "grid"],
    ["plans", "Action Plans", "target"], ["files", "Files", "folder"], ["activity", "Activity", "activity"],
  ];

  /* per-category rail panels: each Work section shows its own objects */
  const RAIL = {
    inbox: { label: "Filters", rows: [
      { t: "All", s: "12 new", icon: "inbox" }, { t: "Mentions", s: "3", icon: "at" },
      { t: "Assigned to me", s: "4", icon: "task" }, { t: "Comments", s: "5", icon: "message" },
    ]},
    notes: { label: "Last opened", rows: [
      { t: "Ferry scene — rev notes", s: "SINNERS · 2m", icon: "notes" }, { t: "Lens test thoughts", s: "SINNERS · 1h", icon: "notes" },
      { t: "Score references", s: "3h", icon: "notes" }, { t: "Casting shortlist", s: "yesterday", icon: "notes" },
      { t: "Title ideas", s: "2d", icon: "notes" },
    ]},
    tasks: { label: "Lists", rows: [
      { t: "Today", s: "5", icon: "task" }, { t: "Upcoming", s: "12", icon: "clock" },
      { t: "Someday", s: "7", icon: "idea" }, { t: "Done", s: "·", icon: "checkCircle" },
    ]},
    ideas: { label: "Boards", rows: [
      { t: "Night & neon", s: "9 ideas", icon: "idea" }, { t: "Sound world", s: "4 ideas", icon: "idea" }, { t: "Loose ends", s: "3 ideas", icon: "idea" },
    ]},
    calendar: { label: "Upcoming", rows: [
      { t: "Recce — harbour", s: "Thu 09:00", icon: "calendar" }, { t: "Table read", s: "Fri 14:00", icon: "calendar" }, { t: "Score session", s: "Mon 11:00", icon: "calendar" },
    ]},
    moodboards: { label: "Boards", rows: [{ t: "Act I look", s: "24 refs", icon: "moodboard" }, { t: "Costume", s: "11 refs", icon: "moodboard" }] },
    assets: { label: "Collections", rows: [{ t: "Stills", s: "86", icon: "layers" }, { t: "Audio", s: "22", icon: "layers" }, { t: "Docs", s: "20", icon: "file" }] },
    contacts: { label: "Crew", rows: [{ t: "Søren K.", s: "Composer", icon: "user" }, { t: "Nadia Œ", s: "DP", icon: "user" }, { t: "Mara Vey", s: "Production design", icon: "user" }] },
    opportunities: { label: "Open", rows: [{ t: "Grant — Nordic Film", s: "due 14d", icon: "target" }, { t: "Festival submission", s: "due 30d", icon: "target" }] },
  };

  /* ---------------- LEFT RAIL ---------------- */
  function WorkRail({ cat, setCat, project, setProject }) {
    return (
      <ACard panel style={{ width: 282, flex: "none", alignSelf: "stretch", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "20px 20px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "var(--fg1)", letterSpacing: "-.02em" }}>Work</div>
            <div style={{ marginTop: 4 }}><ALabel>Your studio</ALabel></div>
          </div>
          <AIconBtn name="plus" label="New" size="sm" />
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "0 12px 14px" }}>
          {CATEGORIES.map((g) => (
            <div key={g.sec} style={{ marginTop: 10 }}>
              <div style={{ padding: "6px 8px" }}><ALabel style={{ fontSize: 10 }}>{g.sec}</ALabel></div>
              {g.items.map((it) => {
                const on = cat === it.k;
                return (
                  <button key={it.k} onClick={() => setCat(it.k)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 11, padding: "9px 10px", borderRadius: "var(--radius-md)", border: "none", cursor: "pointer", background: on ? "var(--accent-soft)" : "transparent", color: on ? "var(--accent-ink)" : "var(--fg2)", transition: "background .18s, color .18s", textAlign: "left" }}
                    onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = "var(--overlay-04)"; }}
                    onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = "transparent"; }}>
                    <A name={it.icon} size={18} stroke={on ? 1.9 : 1.7} />
                    <span style={{ flex: 1, fontFamily: "var(--font-text)", fontSize: 14, fontWeight: on ? 600 : 500, color: on ? "var(--fg1)" : "var(--fg2)" }}>{it.label}</span>
                    {it.count != null && <span className="ars-tnum" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg3)" }}>{it.count}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        {/* object list for the active category */}
        {cat === "projects" ? (
          <div style={{ borderTop: "1px solid var(--border-subtle)", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {PROJECTS.map((p) => {
              const on = project && project.id === p.id;
              return (
                <button key={p.id} onClick={() => setProject(p)} style={{ display: "flex", alignItems: "center", gap: 11, padding: 9, borderRadius: "var(--radius-md)", border: `1px solid ${on ? "var(--accent-line)" : "transparent"}`, background: on ? "var(--accent-soft)" : "var(--surface-2)", cursor: "pointer", textAlign: "left", transition: "all .18s" }}>
                  <span className={"ars-mesh ars-mesh--" + p.hue} style={{ width: 34, height: 34, borderRadius: "var(--radius-sm)", flex: "none", border: "1px solid var(--border-default)" }} />
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--fg1)" }}>{p.name}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--planning)" }} /><span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg3)" }}>{p.status}</span></span>
                  </span>
                  <span className="ars-tnum" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg3)" }}>{p.pct}%</span>
                </button>
              );
            })}
          </div>
        ) : RAIL[cat] ? (
          <div style={{ borderTop: "1px solid var(--border-subtle)", padding: 12, display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ padding: "4px 8px 8px" }}><ALabel style={{ fontSize: 10 }}>{RAIL[cat].label}</ALabel></div>
            {RAIL[cat].rows.map((r, i) => (
              <button key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 10px", borderRadius: "var(--radius-md)", border: `1px solid ${i === 0 ? "var(--accent-line)" : "transparent"}`, background: i === 0 ? "var(--accent-soft)" : "transparent", cursor: "pointer", textAlign: "left", transition: "all .15s" }}
                onMouseEnter={(e) => { if (i !== 0) e.currentTarget.style.background = "var(--overlay-04)"; }}
                onMouseLeave={(e) => { if (i !== 0) e.currentTarget.style.background = "transparent"; }}>
                <span style={{ width: 30, height: 30, flex: "none", borderRadius: "var(--radius-sm)", background: "var(--surface-3)", border: "1px solid var(--border-subtle)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: i === 0 ? "var(--accent)" : "var(--fg3)" }}><A name={r.icon} size={15} /></span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: "block", fontSize: 13.5, fontWeight: 500, color: "var(--fg1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.t}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--fg3)" }}>{r.s}</span>
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </ACard>
    );
  }

  window.ArsWork = { CATEGORIES, PROJECTS, COLUMNS, PLANS, FILES, ACTIVITY, VIEWS, RAIL, WorkRail };
})();
