// Arsyen Mac — the persistent WORKSPACE that loads a Work object (Project).
// Views are facets of the same object; opening a task expands inline.
(function () {
  const A = window.AIcon;
  const { ABtn, AIconBtn, ATag, AStatus, AAvatar, AProgress, ACard, ALabel } = window;
  const W = window.ArsWork;

  const Chip = ({ on, onClick, children }) => (
    <button onClick={onClick} style={{ flex: "none", height: 34, padding: "0 13px", borderRadius: "var(--radius-md)", background: on ? "var(--accent-soft)" : "var(--surface-3)", color: on ? "var(--accent-ink)" : "var(--fg2)", border: `1px solid ${on ? "var(--accent-line)" : "var(--border-default)"}`, fontFamily: "var(--font-text)", fontSize: 13.5, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", transition: "all .15s" }}>{children}</button>
  );
  const Field = ({ label, children }) => (<div style={{ display: "flex", flexDirection: "column", gap: 9 }}><ALabel>{label}</ALabel>{children}</div>);

  /* ---- inline task detail (context preserved) ---- */
  function TaskDetail({ t, onClose }) {
    const [col, setCol] = React.useState("To do");
    const [pr, setPr] = React.useState(t.prl || "High");
    return (
      <div style={{ width: 340, flex: "none", borderLeft: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", overflow: "hidden", animation: "ars-detail-in .28s var(--ease-out)" }}>
        <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: 10 }}>
          <span className="ars-tnum" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg3)" }}>#{t.id}</span>
          <div style={{ flex: 1, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "var(--fg1)", letterSpacing: "-.01em" }}>{t.title}</div>
          <AIconBtn name="x" label="Close" size="sm" onClick={onClose} />
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 18, display: "flex", flexDirection: "column", gap: 18 }}>
          <Field label="Column"><div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>{["To do", "In progress", "Review", "Done"].map((k) => <Chip key={k} on={col === k} onClick={() => setCol(k)}>{k}</Chip>)}</div></Field>
          <Field label="Priority"><div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>{["Low", "Medium", "High", "Urgent"].map((k) => <Chip key={k} on={pr === k} onClick={() => setPr(k)}>{k}</Chip>)}</div></Field>
          <Field label="Action plan"><AStatus tone="planning" style={{ alignSelf: "flex-start" }}>{t.plan || "Pre-production"}</AStatus></Field>
          <Field label="Assignees"><ABtn variant="secondary" size="sm" icon="user">Root</ABtn></Field>
          <Field label="Description"><div style={{ background: "var(--surface-3)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", padding: 13, fontSize: 14, color: "var(--fg1)", lineHeight: 1.5 }}>{t.desc || "Add a description…"}</div></Field>
          <Field label="Labels"><div style={{ display: "flex", gap: 7 }}><ATag>{t.tag}</ATag></div></Field>
        </div>
      </div>
    );
  }

  /* ---- views ---- */
  function Overview({ project, go }) {
    const stats = [["9", "Tasks"], ["3", "Plans"], ["6", "Files"], ["4", "Crew"]];
    return (
      <div style={{ padding: 26, display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
          {stats.map(([v, l]) => (
            <ACard key={l} style={{ padding: 18 }}>
              <div className="ars-tnum" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, color: "var(--fg1)" }}>{v}</div>
              <div style={{ marginTop: 4 }}><ALabel>{l}</ALabel></div>
            </ACard>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18 }}>
          <ACard style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}><ALabel>Action plans</ALabel><button onClick={() => go("plans")} style={{ background: "none", border: "none", color: "var(--accent-ink)", fontSize: 13, cursor: "pointer", fontFamily: "var(--font-text)" }}>View all</button></div>
            {W.PLANS.map((p, i) => (
              <div key={p.name} style={{ marginTop: i ? 16 : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ fontSize: 14, color: "var(--fg1)", fontWeight: 500 }}>{p.name}</span><span className="ars-tnum" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg3)" }}>{p.done}/{p.tasks}</span></div>
                <AProgress value={p.pct} showValue={false} />
              </div>
            ))}
          </ACard>
          <ACard style={{ padding: 20 }}>
            <div style={{ marginBottom: 14 }}><ALabel>Recent activity</ALabel></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {W.ACTIVITY.slice(0, 3).map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 10 }}>
                  <AAvatar hue={a.hue} size={26} />
                  <div style={{ flex: 1, fontSize: 13, color: "var(--fg2)", lineHeight: 1.4 }}><span style={{ color: "var(--fg1)", fontWeight: 600 }}>{a.who}</span> {a.txt} <span style={{ color: "var(--fg3)", fontFamily: "var(--font-mono)", fontSize: 11 }}>· {a.t}</span></div>
                </div>
              ))}
            </div>
          </ACard>
        </div>
        {/* Project → Canvas (the universal Canvas primitive) */}
        <a href="canvas.html" style={{ textDecoration: "none" }}>
          <ACard interactive style={{ padding: 0, overflow: "hidden", display: "flex", alignItems: "stretch", cursor: "pointer" }}>
            <div className="ars-mesh ars-mesh--ember" style={{ width: 180, flex: "none", position: "relative" }}>
              <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}><A name="play" size={26} /></span>
            </div>
            <div style={{ flex: 1, padding: 22, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <ALabel>Canvas</ALabel>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--fg1)", letterSpacing: "-.02em", marginTop: 6 }}>NOCTURNE — the pitch</div>
              <div style={{ fontSize: 14, color: "var(--fg2)", marginTop: 6, lineHeight: 1.5 }}>A scroll-narrative Canvas for the film — hero, chapters, stills, storyboard. Built on the universal Canvas engine.</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", paddingRight: 22, color: "var(--fg3)" }}><A name="chevronRight" size={20} /></div>
          </ACard>
        </a>
      </div>
    );
  }

  function Board({ onOpen, task }) {
    return (
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <div style={{ flex: 1, minWidth: 0, overflowX: "auto", padding: 24, display: "flex", gap: 18 }}>
          {W.COLUMNS.map((c) => (
            <div key={c.key} style={{ width: 264, flex: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 4px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>{c.done && <A name="checkCircle" size={14} color="var(--done)" />}<ALabel style={{ color: c.done ? "var(--done)" : "var(--fg3)" }}>{c.label}</ALabel></span>
                <span className="ars-tnum" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg3)" }}>{c.tickets.length}</span>
              </div>
              {c.tickets.map((t) => {
                const sel = task && task.id === t.id;
                return (
                  <ACard key={t.id} interactive glow={sel} onClick={() => onOpen(t)} style={{ padding: 14, cursor: "pointer", display: "flex", flexDirection: "column", gap: 11 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span className="ars-tnum" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg3)" }}>#{t.id}</span><AStatus tone={t.pr}>{t.prl}</AStatus></div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15.5, color: "var(--fg1)", letterSpacing: "-.01em", lineHeight: 1.25 }}>{t.title}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}><ATag>{t.tag}</ATag>{t.comments && <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg3)" }}><A name="message" size={13} />{t.comments}</span>}</div>
                  </ACard>
                );
              })}
            </div>
          ))}
        </div>
        {task && <TaskDetail t={task} onClose={() => onOpen(null)} />}
      </div>
    );
  }

  function Plans() {
    return (
      <div style={{ padding: 26, display: "flex", flexDirection: "column", gap: 16 }}>
        {W.PLANS.map((p) => (
          <ACard key={p.name} interactive style={{ padding: 22, display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", background: "var(--accent-soft)", border: "1px solid var(--accent-line)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}><A name="target" size={22} /></span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, color: "var(--fg1)" }}>{p.name}</div>
              <div style={{ marginTop: 8, maxWidth: 360 }}><AProgress value={p.pct} /></div>
            </div>
            <div style={{ textAlign: "right" }}><div className="ars-tnum" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--fg1)" }}>{p.done}/{p.tasks}</div><ALabel>tasks</ALabel></div>
          </ACard>
        ))}
      </div>
    );
  }

  function Files() {
    return (
      <div style={{ padding: 26, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        {W.FILES.map((f) => (
          <ACard key={f.n} interactive style={{ padding: 0, overflow: "hidden", cursor: "pointer" }}>
            <div className={"ars-mesh ars-mesh--" + f.hue} style={{ height: 100, position: "relative" }}><span style={{ position: "absolute", top: 10, left: 10, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".08em", color: "#fff", background: "rgba(0,0,0,.4)", padding: "3px 7px", borderRadius: "var(--radius-xs)" }}>{f.k}</span></div>
            <div style={{ padding: 14 }}><div style={{ fontSize: 13.5, color: "var(--fg1)", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.n}</div><div style={{ marginTop: 4, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg3)" }}>{f.s}</div></div>
          </ACard>
        ))}
      </div>
    );
  }

  function Activity() {
    return (
      <div style={{ padding: 26 }}>
        <ACard style={{ padding: 22 }}>
          {W.ACTIVITY.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 13, padding: "14px 0", borderBottom: i < W.ACTIVITY.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
              <AAvatar hue={a.hue} size={32} />
              <div style={{ flex: 1, fontSize: 14, color: "var(--fg2)", lineHeight: 1.45 }}><span style={{ color: "var(--fg1)", fontWeight: 600 }}>{a.who}</span> {a.txt}</div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg3)" }}>{a.t}</span>
            </div>
          ))}
        </ACard>
      </div>
    );
  }

  /* ---------------- WORKSPACE ---------------- */
  function Workspace({ project, fullscreen, setFullscreen }) {
    const [view, setView] = React.useState("board");
    const [task, setTask] = React.useState(null);
    const p = project || W.PROJECTS[0];
    React.useEffect(() => { setTask(null); }, [view, project]);

    const Body = { overview: () => <Overview project={p} go={setView} />, board: () => <Board onOpen={setTask} task={task} />, plans: () => <Plans />, files: () => <Files />, activity: () => <Activity /> }[view];

    return (
      <ACard panel className="ars-breathe" style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* cover header — taller, cinematic */}
        <div style={{ position: "relative", flex: "none" }}>
          <div className={"ars-mesh ars-mesh--" + p.hue} style={{ height: 220 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.04) 0%, rgba(6,4,4,.32) 50%, rgba(6,4,4,.88) 100%)" }} />
          <div style={{ position: "absolute", top: 18, right: 18, display: "flex", gap: 8 }}>
            <AIconBtn name="link" label="Copy link" size="sm" />
            <AIconBtn name="more" label="More" size="sm" />
          </div>
          <div style={{ position: "absolute", left: 28, bottom: 22, right: 28, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <AStatus tone={p.tone} bare style={{ marginBottom: 10 }}>{p.status}</AStatus>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 52, color: "#fff", letterSpacing: "-.03em", lineHeight: 1 }}>{p.name}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, paddingBottom: 6 }}>
              <div style={{ textAlign: "right" }}><ALabel style={{ color: "rgba(255,255,255,.7)" }}>{p.type}</ALabel></div>
              <span style={{ display: "flex" }}><AAvatar hue="azure" size={30} ring /><AAvatar hue="coral" size={30} style={{ marginLeft: -10 }} /></span>
            </div>
          </div>
        </div>
        {/* action bar: views + fullscreen toggle */}
        <div style={{ flex: "none", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4, padding: "10px 14px 10px 18px", borderBottom: "1px solid var(--border-subtle)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, overflowX: "auto", minWidth: 0 }}>
            {W.VIEWS.map(([k, label, icon]) => {
              const on = view === k;
              return (
                <button key={k} onClick={() => setView(k)} style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 36, padding: "0 14px", borderRadius: "var(--radius-md)", border: "none", cursor: "pointer", background: on ? "var(--surface-3)" : "transparent", color: on ? "var(--fg1)" : "var(--fg3)", fontFamily: "var(--font-text)", fontSize: 14, fontWeight: on ? 600 : 500, transition: "all .15s", whiteSpace: "nowrap" }}>
                  <A name={icon} size={16} stroke={on ? 1.9 : 1.7} />{label}
                </button>
              );
            })}
          </div>
          <button onClick={() => setFullscreen(!fullscreen)} aria-label={fullscreen ? "Exit focus" : "Focus mode"} title={fullscreen ? "Exit focus" : "Focus mode"} style={{ flex: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: "var(--radius-md)", border: "1px solid var(--border-default)", background: fullscreen ? "var(--accent-soft)" : "var(--surface-3)", color: fullscreen ? "var(--accent)" : "var(--fg2)", cursor: "pointer", transition: "all .15s" }}>
            <A name={fullscreen ? "collapse" : "expand"} size={17} />
          </button>
        </div>
        {/* view body */}
        <div style={{ flex: 1, minHeight: 0, overflowY: view === "board" ? "hidden" : "auto", display: "flex", flexDirection: "column" }}>
          {Body()}
        </div>
      </ACard>
    );
  }

  window.ArsWorkspace = Workspace;
})();
