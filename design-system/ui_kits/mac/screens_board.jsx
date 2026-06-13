// Arsyen Mac kit — Board view (Projects panel + kanban) and Ticket sheet.
(function () {
  const A = window.AIcon;
  const { ABtn, AIconBtn, ATag, AStatus, AProgress, ACard, ALabel, ATabs, ASeg, AAvatar, AInput } = window;

  const PROJECTS = [
    { id: "sinners", name: "SINNERS", status: "PLANNING", tone: "planning", pct: 11, hue: "ember" },
    { id: "test", name: "TEST", status: "PLANNING", tone: "planning", pct: 100, hue: "violet" },
  ];

  const COLUMNS = [
    { key: "todo", label: "TO DO", count: 4, tickets: [
      { id: 1, title: "Lock final shooting script", pr: "high", prl: "High", tag: "script", comments: 1 },
      { id: 4, title: "Build shot list for Act I", pr: "medium", prl: "Medium", tag: "camera" },
      { id: 5, title: "Rent anamorphic lens kit", pr: "low", prl: "Low", tag: "gear" },
    ]},
    { key: "prog", label: "IN PROGRESS", count: 2, tickets: [
      { id: 2, title: "Cast the two leads", pr: "high", prl: "High", tag: "casting" },
      { id: 3, title: "Scout the harbor location", pr: "medium", prl: "Medium", tag: "locations" },
    ]},
    { key: "review", label: "REVIEW", count: 2, tickets: [
      { id: 6, title: "Storyboard the chase sequence", pr: "medium", prl: "Medium", tag: "camera" },
      { id: 7, title: "Color grade the teaser", pr: "medium", prl: "Medium", tag: "post" },
    ]},
    { key: "done", label: "DONE", count: 1, done: true, tickets: [
      { id: 9, title: "Cut the announcement teaser", pr: "medium", prl: "Medium", tag: "post" },
    ]},
  ];

  function ProjectRow({ p, active, onClick }) {
    return (
      <ACard interactive glow={active} onClick={onClick} style={{ padding: 14, cursor: "pointer", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", gap: 13, alignItems: "center" }}>
          <span className={window.aMesh(p.hue)} style={{ width: 48, height: 48, borderRadius: 12, flex: "none", border: "1px solid var(--border-default)" }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--ink-0)", letterSpacing: "-.01em" }}>{p.name}</div>
            <div style={{ marginTop: 4 }}><AStatus tone={p.tone} style={{ padding: 0, background: "transparent" }}>{p.status}</AStatus></div>
          </div>
        </div>
        <AProgress value={p.pct} />
      </ACard>
    );
  }

  function ProjectsPanel({ active, setActive }) {
    return (
      <ACard panel style={{ width: 300, flex: "none", padding: 18, display: "flex", flexDirection: "column", gap: 16, alignSelf: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--ink-0)", letterSpacing: "-.02em" }}>Projects</div>
            <div style={{ marginTop: 4 }}><ALabel>2 Active</ALabel></div>
          </div>
          <AIconBtn name="plus" label="New project" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {PROJECTS.map((p) => <ProjectRow key={p.id} p={p} active={active === p.id} onClick={() => setActive(p.id)} />)}
        </div>
      </ACard>
    );
  }

  function TicketCard({ t, onOpen }) {
    return (
      <ACard interactive onClick={onOpen} style={{ padding: 16, cursor: "pointer", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-4)" }}>#{t.id}</span>
          <AStatus tone={t.pr}>{t.prl}</AStatus>
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, color: "var(--ink-0)", letterSpacing: "-.01em", lineHeight: 1.25 }}>{t.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ATag>{t.tag}</ATag>
          {t.comments && <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-4)" }}><A name="message" size={14} />{t.comments}</span>}
        </div>
      </ACard>
    );
  }

  function Column({ col, onOpen }) {
    return (
      <div style={{ width: 280, flex: "none", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 4px" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            {col.done && <A name="checkCircle" size={15} color="var(--done)" />}
            <ALabel style={{ color: col.done ? "var(--done)" : "var(--ink-3)" }}>{col.label}</ALabel>
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-4)" }}>{col.count}</span>
            <A name="more" size={16} color="var(--ink-4)" />
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {col.tickets.map((t) => <TicketCard key={t.id} t={t} onOpen={() => onOpen(t)} />)}
        </div>
      </div>
    );
  }

  function ProjectHero() {
    return (
      <div style={{ position: "relative", borderRadius: "var(--radius-xl)", overflow: "hidden", border: "1px solid var(--border-default)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), var(--shadow-md)" }}>
        <div className="ars-mesh ars-mesh--ember ars-grain" style={{ height: 320 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.05) 0%, rgba(8,4,4,.55) 55%, rgba(6,3,3,.96) 100%), radial-gradient(120% 90% at 12% 100%, rgba(0,0,0,.6), transparent 60%)" }} />
        <div style={{ position: "absolute", top: 18, right: 18, display: "flex", gap: 10 }}>
          <AIconBtn name="link" label="Copy link" />
          <AIconBtn name="more" label="More" />
        </div>
        <div style={{ position: "absolute", left: 30, right: 30, bottom: 24 }}>
          <AStatus tone="planning" bare style={{ marginBottom: 10 }}>PLANNING</AStatus>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 52, color: "#fff", letterSpacing: "-.03em", lineHeight: 1, margin: "8px 0 18px" }}>SINNERS</div>
          <div style={{ display: "flex", gap: 40, alignItems: "flex-end" }}>
            <div><ALabel style={{ whiteSpace: "nowrap" }}>Your role</ALabel><div style={{ marginTop: 8, fontSize: 15, color: "var(--ink-0)", whiteSpace: "nowrap" }}>Owner</div></div>
            <div><ALabel>Type</ALabel><div style={{ marginTop: 8, fontSize: 15, color: "var(--ink-0)", whiteSpace: "nowrap" }}>Feature film</div></div>
            <div><ALabel>Crew</ALabel><div style={{ marginTop: 10, display: "flex" }}><AAvatar hue="azure" size={26} ring /><AAvatar hue="coral" size={26} style={{ marginLeft: -8 }} /></div></div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><ALabel>Progress</ALabel><span className="ars-tnum" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-2)" }}>11%</span></div>
              <div style={{ height: 5, background: "rgba(255,255,255,.16)", borderRadius: 999, boxShadow: "inset 0 1px 2px rgba(0,0,0,.5)" }}><div style={{ width: "11%", height: "100%", background: "linear-gradient(90deg, rgba(255,255,255,.7), #fff)", borderRadius: 999, boxShadow: "0 0 12px rgba(255,255,255,.5)" }} /></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function BoardView({ onOpenTicket }) {
    const [active, setActive] = React.useState("sinners");
    const [tab, setTab] = React.useState("Board");
    return (
      <div style={{ display: "flex", gap: 26, padding: "30px 34px 120px", alignItems: "flex-start" }}>
        <ProjectsPanel active={active} setActive={setActive} />
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 26 }}>
          <ProjectHero />
          <ATabs tabs={["Board", "Action Plans", "Files"]} value={tab} onChange={setTab} />
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <ALabel>Filter</ALabel>
            <ABtn variant="secondary" size="sm" icon="user">Anyone <A name="chevronDown" size={14} /></ABtn>
            <ABtn variant="secondary" size="sm" icon="flag">All plans <A name="chevronDown" size={14} /></ABtn>
          </div>
          <div style={{ display: "flex", gap: 22, overflowX: "auto", paddingBottom: 8 }}>
            {COLUMNS.map((c) => <Column key={c.key} col={c} onOpen={onOpenTicket} />)}
          </div>
        </div>
      </div>
    );
  }

  function TicketSheet({ ticket, onClose }) {
    const t = ticket || { id: 1, title: "Lock final shooting script" };
    const [col, setCol] = React.useState("To do");
    const [plan, setPlan] = React.useState("Pre-production");
    const [pr, setPr] = React.useState("High");
    return (
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 900, background: "var(--scrim)", backdropFilter: "blur(2px)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "60px 24px", overflowY: "auto" }}>
        <ACard panel onClick={(e) => e.stopPropagation()} style={{ width: 760, maxWidth: "100%", padding: 30, display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--ink-4)", marginTop: 6 }}>#{t.id}</span>
            <div style={{ flex: 1, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--ink-0)", letterSpacing: "-.02em" }}>{t.title}</div>
            <AIconBtn name="more" label="More" />
            <AIconBtn name="x" label="Close" onClick={onClose} />
          </div>
          <Field label="Column"><ASeg chips options={["To do", "In progress", "Review", "Done"]} value={col} onChange={setCol} /></Field>
          <Field label="Action plan"><ASeg chips options={["Pre-production", "Principal photography", "Post & delivery"]} value={plan} onChange={setPlan} /></Field>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            <Field label="Priority"><ASeg chips options={["No priority", "Low", "Medium", "High", "Urgent"]} value={pr} onChange={setPr} /></Field>
            <Field label="Due"><ABtn variant="secondary" size="md" icon="calendar" style={{ color: "var(--accent-ink)" }}>Set</ABtn></Field>
          </div>
          <Field label="Assignees"><ABtn variant="secondary" size="md" icon="user">Root</ABtn></Field>
          <Field label="Description">
            <div style={{ background: "var(--surface-3)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", padding: 16, fontSize: 16, color: "var(--ink-0)" }}>Revision 6 with the new ferry scene folded in.</div>
            <div style={{ marginTop: 12 }}><ABtn variant="danger" size="sm">Save description</ABtn></div>
          </Field>
          <Field label="Labels">
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <ATag style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>script <A name="x" size={11} color="var(--ink-4)" /></ATag>
              <div style={{ flex: 1, maxWidth: 280 }}><AInput placeholder="Add label…" icon="tag" /></div>
            </div>
          </Field>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <ALabel>Comments</ALabel><ABtn variant="secondary" size="sm" icon="upload">Upload</ABtn>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <AAvatar hue="verdant" size={32} />
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontWeight: 600, color: "var(--ink-0)", fontSize: 15 }}>Root</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-4)" }}>Jun 13</span>
              </div>
              <div style={{ marginTop: 5, color: "var(--ink-2)", fontSize: 15 }}>Rev 6 reads much tighter — the ferry scene finally earns its place.</div>
            </div>
          </div>
        </ACard>
      </div>
    );
  }

  function Field({ label, children }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <ALabel>{label}</ALabel>{children}
      </div>
    );
  }

  Object.assign(window, { BoardView, TicketSheet });
})();
