// Arsyen iPhone kit — screens + tab bar. Reuses ../mac icons & primitives.
(function () {
  const A = window.AIcon;
  const { ABtn, AIconBtn, ATag, AStatus, ABadge, AAvatar, AInput, AChip, ASeg, ATabs, ACard, ALabel, AProgress } = window;

  const PROJECTS = [
    { id: "sinners", name: "SINNERS", type: "Feature film", tone: "planning", status: "PLANNING", pct: 11, hue: "ember" },
    { id: "test", name: "TEST", type: "Short film", tone: "planning", status: "PLANNING", pct: 100, hue: "violet" },
  ];
  const COLUMNS = {
    "To do": [
      { id: 1, title: "Lock final shooting script", pr: "high", prl: "High", tag: "script", comments: 1 },
      { id: 4, title: "Build shot list for Act I", pr: "medium", prl: "Medium", tag: "camera" },
      { id: 5, title: "Rent anamorphic lens kit", pr: "low", prl: "Low", tag: "gear" },
    ],
    "In progress": [
      { id: 2, title: "Cast the two leads", pr: "high", prl: "High", tag: "casting" },
      { id: 3, title: "Scout the harbor location", pr: "medium", prl: "Medium", tag: "locations" },
    ],
    "Review": [
      { id: 6, title: "Storyboard the chase sequence", pr: "medium", prl: "Medium", tag: "camera" },
      { id: 7, title: "Color grade the teaser", pr: "medium", prl: "Medium", tag: "post" },
    ],
    "Done": [{ id: 9, title: "Cut the announcement teaser", pr: "medium", prl: "Medium", tag: "post" }],
  };
  const ARTISTS = [
    { n: "Nadia Œ", r: "Photographer · Lisbon", m: 96, hue: "coral", tags: ["Analog", "Editorial", "Print"] },
    { n: "Mara Vey", r: "Painter · Oslo", m: 93, hue: "azure", tags: ["Oil", "Portrait", "Set design"] },
    { n: "Søren K.", r: "3D / Motion · Copenhagen", m: 84, hue: "ember", tags: ["Houdini", "Score"] },
  ];
  const TOOLS = [
    { n: "Moodboard", k: "Visual", i: "palette" }, { n: "Color grade", k: "Visual", i: "image" },
    { n: "Brief builder", k: "Docs", i: "file" }, { n: "Invoice", k: "Business", i: "briefcase" },
    { n: "Call sheet", k: "Production", i: "users" }, { n: "Storyboard", k: "Production", i: "grid" },
    { n: "Portfolio", k: "Profile", i: "star" }, { n: "Contract", k: "Business", i: "send" },
  ];

  const Title = ({ children, sub, action }) => (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "6px 20px 18px" }}>
      <div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 32, color: "var(--ink-0)", letterSpacing: "-.02em" }}>{children}</div>
        {sub && <div style={{ marginTop: 6 }}><ALabel>{sub}</ALabel></div>}
      </div>
      {action}
    </div>
  );

  /* ---------- PROJECTS (home) ---------- */
  function ProjectsScreen({ openProject }) {
    return (
      <div style={{ padding: "0 0 8px" }}>
        <Title sub="2 Active" action={<AIconBtn name="plus" label="New" />}>Projects</Title>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "0 20px" }}>
          {PROJECTS.map((p) => (
            <ACard key={p.id} interactive onClick={() => openProject(p)} style={{ padding: 0, overflow: "hidden", cursor: "pointer" }}>
              <div className={window.aMesh(p.hue)} style={{ height: 132, position: "relative" }} data-grain>
                <div className="ars-grain" style={{ position: "absolute", inset: 0 }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent,rgba(8,4,4,.88))" }} />
                <div style={{ position: "absolute", left: 16, bottom: 14 }}>
                  <AStatus tone={p.tone} bare style={{ marginBottom: 6 }}>{p.status}</AStatus>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "#fff", letterSpacing: "-.02em" }}>{p.name}</div>
                </div>
              </div>
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-3)" }}>{p.type}</span>
                  <span style={{ display: "inline-flex" }}><AAvatar hue="azure" size={24} /><AAvatar hue="coral" size={24} style={{ marginLeft: -7 }} /></span>
                </div>
                <AProgress value={p.pct} />
              </div>
            </ACard>
          ))}
        </div>
      </div>
    );
  }

  /* ---------- BOARD ---------- */
  function BoardScreen({ project, back, openTicket }) {
    const p = project || PROJECTS[0];
    const [col, setCol] = React.useState("To do");
    const counts = Object.fromEntries(Object.entries(COLUMNS).map(([k, v]) => [k, v.length]));
    return (
      <div style={{ padding: "0 0 8px" }}>
        <div style={{ padding: "0 16px 12px" }}>
          <button onClick={back} aria-label="Back" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "var(--ink-2)", fontSize: 15, cursor: "pointer", padding: "4px 0", fontFamily: "var(--font-text)" }}><A name="arrowLeft" size={18} /> Projects</button>
        </div>
        <div style={{ margin: "0 16px", borderRadius: "var(--radius-xl)", overflow: "hidden", position: "relative", border: "1px solid var(--border-subtle)" }}>
          <div className={window.aMesh(p.hue) + " ars-grain"} style={{ height: 150 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,.06),rgba(8,4,4,.92))" }} />
          <div style={{ position: "absolute", left: 18, bottom: 16, right: 18 }}>
            <AStatus tone={p.tone} bare style={{ marginBottom: 6 }}>{p.status}</AStatus>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 38, color: "#fff", letterSpacing: "-.03em", lineHeight: 1 }}>{p.name}</div>
          </div>
        </div>
        <div style={{ padding: "18px 16px 14px", display: "flex", gap: 8, overflowX: "auto" }}>
          {Object.keys(COLUMNS).map((k) => (
            <button key={k} onClick={() => setCol(k)} style={{ flex: "none", height: 36, padding: "0 14px", borderRadius: 999, border: `1px solid ${col === k ? "transparent" : "var(--border-default)"}`, background: col === k ? "var(--accent)" : "var(--surface-3)", color: col === k ? "#fff" : "var(--ink-2)", fontFamily: "var(--font-text)", fontSize: 14, fontWeight: 500, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 7 }}>
              {k} <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, opacity: .7 }}>{counts[k]}</span>
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "0 16px" }}>
          {COLUMNS[col].map((t) => (
            <ACard key={t.id} interactive onClick={() => openTicket(t)} style={{ padding: 16, cursor: "pointer", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-4)" }}>#{t.id}</span>
                <AStatus tone={t.pr}>{t.prl}</AStatus>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, color: "var(--ink-0)", letterSpacing: "-.01em" }}>{t.title}</div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <ATag>{t.tag}</ATag>
                {t.comments && <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-4)" }}><A name="message" size={14} />{t.comments}</span>}
              </div>
            </ACard>
          ))}
        </div>
      </div>
    );
  }

  /* ---------- TICKET SHEET (mobile) ---------- */
  function TicketSheet({ ticket, onClose }) {
    const t = ticket;
    const [col, setCol] = React.useState("To do");
    const [pr, setPr] = React.useState("High");
    return (
      <div style={{ position: "absolute", inset: 0, zIndex: 70, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "var(--scrim)" }} />
        <div style={{ position: "relative", background: "var(--surface-1)", borderRadius: "26px 26px 0 0", border: "1px solid var(--border-default)", borderBottom: "none", maxHeight: "88%", overflow: "auto", boxShadow: "var(--shadow-modal)" }}>
          <div style={{ position: "sticky", top: 0, background: "var(--surface-1)", padding: "14px 20px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--ink-4)" }}>#{t.id}</span>
            <div style={{ flex: 1, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--ink-0)", letterSpacing: "-.01em" }}>{t.title}</div>
            <AIconBtn name="x" label="Close" onClick={onClose} />
          </div>
          <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 20 }}>
            <Field label="Column"><div style={{ display: "flex", gap: 8, overflowX: "auto" }}>{["To do", "In progress", "Review", "Done"].map((k) => <Chip key={k} on={col === k} onClick={() => setCol(k)}>{k}</Chip>)}</div></Field>
            <Field label="Priority"><div style={{ display: "flex", gap: 8, overflowX: "auto" }}>{["Low", "Medium", "High", "Urgent"].map((k) => <Chip key={k} on={pr === k} onClick={() => setPr(k)}>{k}</Chip>)}</div></Field>
            <Field label="Assignees"><ABtn variant="secondary" size="md" icon="user">Root</ABtn></Field>
            <Field label="Description"><div style={{ background: "var(--surface-3)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", padding: 14, fontSize: 15, color: "var(--ink-0)" }}>Revision 6 with the new ferry scene folded in.</div></Field>
            <Field label="Labels"><div style={{ display: "flex", gap: 8 }}><ATag>{t.tag}</ATag></div></Field>
            <Field label="Comments">
              <div style={{ display: "flex", gap: 10 }}>
                <AAvatar hue="verdant" size={30} />
                <div>
                  <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}><span style={{ fontWeight: 600, color: "var(--ink-0)", fontSize: 14 }}>Root</span><span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-4)" }}>Jun 13</span></div>
                  <div style={{ marginTop: 4, color: "var(--ink-2)", fontSize: 14 }}>Rev 6 reads much tighter — the ferry scene finally earns its place.</div>
                </div>
              </div>
            </Field>
          </div>
        </div>
      </div>
    );
  }
  const Field = ({ label, children }) => <div style={{ display: "flex", flexDirection: "column", gap: 10 }}><ALabel>{label}</ALabel>{children}</div>;
  const Chip = ({ on, onClick, children }) => <button onClick={onClick} style={{ flex: "none", height: 38, padding: "0 14px", borderRadius: "var(--radius-sm)", background: on ? "var(--accent-soft)" : "var(--surface-3)", color: on ? "var(--accent-ink)" : "var(--ink-1)", border: `1px solid ${on ? "var(--accent-line)" : "var(--border-default)"}`, fontFamily: "var(--font-text)", fontSize: 14, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" }}>{children}</button>;

  /* ---------- DISCOVER ---------- */
  function DiscoverScreen() {
    const [crew, setCrew] = React.useState(true);
    return (
      <div style={{ padding: "0 0 8px" }}>
        <Title>Discover</Title>
        <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 14 }}>
          <AInput icon="search" placeholder="Search artists, skills…" />
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 }}>
            <AChip>Discipline</AChip><AChip selected={crew} onClick={() => setCrew(!crew)}>Open to crew</AChip><AChip>Rate</AChip>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "20px 20px 12px" }}><A name="star" size={15} color="var(--accent)" /><ALabel>Featured artists</ALabel></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "0 20px" }}>
          {ARTISTS.map((a) => (
            <ACard key={a.n} interactive style={{ padding: 0, overflow: "hidden" }}>
              <div className={window.aMesh(a.hue)} style={{ height: 120, position: "relative" }}>
                <ABadge tone="accent" style={{ position: "absolute", top: 12, right: 12 }}>{a.m}% MATCH</ABadge>
              </div>
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 14, marginTop: -28 }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
                  <AAvatar hue={a.hue} size={48} presence style={{ border: "3px solid var(--surface-2)", borderRadius: "50%" }} />
                  <div style={{ paddingBottom: 2 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--ink-0)" }}>{a.n}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{a.r}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>{a.tags.map((tg) => <span key={tg} style={{ fontSize: 13, color: "var(--ink-2)", background: "var(--surface-3)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", padding: "5px 11px" }}>{tg}</span>)}</div>
                <ABtn full icon="message">Message</ABtn>
              </div>
            </ACard>
          ))}
        </div>
      </div>
    );
  }

  /* ---------- TOOLS ---------- */
  function ToolsScreen() {
    return (
      <div style={{ padding: "0 0 8px" }}>
        <Title sub="Make the artefacts you need">Tools</Title>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, padding: "0 20px" }}>
          {TOOLS.map((t) => (
            <ACard key={t.n} interactive style={{ padding: 18, display: "flex", flexDirection: "column", gap: 14, cursor: "pointer" }}>
              <span style={{ width: 42, height: 42, borderRadius: 11, background: "var(--accent-soft)", border: "1px solid var(--accent-line)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}><A name={t.i} size={20} /></span>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: "var(--ink-0)" }}>{t.n}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-4)", marginTop: 8 }}>{t.k}</div>
              </div>
            </ACard>
          ))}
        </div>
      </div>
    );
  }

  /* ---------- PROFILE ---------- */
  function ProfileScreen() {
    const stats = [["48", "Works"], ["4", "Projects"], ["1.2k", "Followers"], ["312", "Following"]];
    const skills = ["Direction", "Oil", "Editing", "Color", "Curation"];
    const port = ["coral", "ember", "violet", "azure"];
    return (
      <div>
        <div className="ars-mesh ars-mesh--azure" style={{ height: 150, opacity: .8 }} />
        <div style={{ padding: "0 20px 8px", marginTop: -42 }}>
          <AAvatar hue="verdant" size={84} ring />
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, color: "var(--ink-0)", letterSpacing: "-.02em", marginTop: 14 }}>Renn Okabe</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-3)", marginTop: 6 }}>Director · Oil &amp; Light</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--ink-3)", marginTop: 8, fontSize: 14 }}><A name="mapPin" size={14} /> Oslo, NO</div>
          <div style={{ fontSize: 15, color: "var(--ink-1)", marginTop: 14, lineHeight: 1.5 }}>Night studies, slow work. Building small crews for short films and exhibitions. Commissions open.</div>
          <ACard style={{ display: "flex", marginTop: 18, padding: "16px 0" }}>
            {stats.map(([v, l], i) => (
              <div key={l} style={{ flex: 1, textAlign: "center", borderLeft: i ? "1px solid var(--border-subtle)" : "none" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--ink-0)" }}>{v}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-3)", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </ACard>
          <div style={{ display: "flex", gap: 8, marginTop: 18, flexWrap: "wrap" }}>{skills.map((s) => <span key={s} style={{ fontSize: 13, color: "var(--ink-1)", background: "var(--surface-2)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-sm)", padding: "7px 13px" }}>{s}</span>)}</div>
          <div style={{ marginTop: 18 }}><ABtn full size="lg">Edit profile</ABtn></div>
          <div style={{ marginTop: 24 }}><ALabel>Portfolio</ALabel></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>{port.map((h, i) => <div key={i} className={window.aMesh(h)} style={{ aspectRatio: "1", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)" }} />)}</div>
        </div>
      </div>
    );
  }

  /* ---------- TAB BAR ---------- */
  function TabBar({ tab, setTab }) {
    const items = [["projects", "folder"], ["discover", "compass"], ["tools", "grid"], ["profile", "user"]];
    return (
      <div style={{ flex: "none", display: "flex", justifyContent: "space-around", alignItems: "center", padding: "10px 16px 30px", background: "rgba(10,10,12,.8)", backdropFilter: "blur(24px) saturate(150%)", WebkitBackdropFilter: "blur(24px) saturate(150%)", borderTop: "1px solid var(--border-default)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
        {items.map(([k, ic]) => {
          const on = tab === k;
          return (
            <button key={k} onClick={() => setTab(k)} aria-label={k} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, color: on ? "var(--accent-ink)" : "var(--ink-4)", padding: "4px 14px", transition: "color .18s" }}>
              <A name={ic} size={24} stroke={on ? 2.1 : 1.7} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, letterSpacing: ".06em", textTransform: "uppercase" }}>{k}</span>
            </button>
          );
        })}
      </div>
    );
  }

  Object.assign(window, { ProjectsScreen, BoardScreen, TicketSheet, DiscoverScreen, ToolsScreen, ProfileScreen, TabBar });
})();
