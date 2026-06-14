// Arsyen Mac — WORK category workspaces: Notes, ToDo, Inbox, Calendar, Generic.
// Each is a persistent workspace with a shared action-bar (title + fullscreen).
(function () {
  const A = window.AIcon;
  const { ABtn, AIconBtn, ATag, AStatus, AAvatar, ACard, ALabel } = window;

  function Shell({ eyebrow, title, actions, fullscreen, setFullscreen, children, bodyPad = true }) {
    return (
      <ACard panel className="ars-breathe" style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ flex: "none", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 14px 16px 22px", borderBottom: "1px solid var(--border-subtle)" }}>
          <div>
            {eyebrow && <ALabel>{eyebrow}</ALabel>}
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--fg1)", letterSpacing: "-.02em", marginTop: eyebrow ? 5 : 0 }}>{title}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {actions}
            <button onClick={() => setFullscreen(!fullscreen)} aria-label={fullscreen ? "Exit focus" : "Focus mode"} title={fullscreen ? "Exit focus" : "Focus mode"} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: "var(--radius-md)", border: "1px solid var(--border-default)", background: fullscreen ? "var(--accent-soft)" : "var(--surface-3)", color: fullscreen ? "var(--accent)" : "var(--fg2)", cursor: "pointer", transition: "all .15s" }}><A name={fullscreen ? "collapse" : "expand"} size={17} /></button>
          </div>
        </div>
        <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: bodyPad ? 24 : 0 }}>{children}</div>
      </ACard>
    );
  }

  /* ---------------- NOTES ---------------- */
  const NOTES = [
    { t: "Ferry scene — rev notes", body: "The ferry has to feel like a held breath. Cut the second exchange; let the silence carry it. Renn likes the idea of the horn as a clock.", tag: "SINNERS", time: "2m", hue: "ember" },
    { t: "Lens test thoughts", body: "Anamorphic on the harbour wides, spherical for the diner. Keep the flares honest — no manufactured streaks.", tag: "SINNERS", time: "1h", hue: "azure" },
    { t: "Score references", body: "Low strings + a single detuned piano. Nothing that resolves. Send Søren the Reykjavík mixes.", tag: "Sound", time: "3h", hue: "violet" },
    { t: "Casting shortlist", body: "Two leads + the night clerk. Read-through Friday. Note: the clerk should feel like he's seen this night a hundred times.", tag: "Casting", time: "yesterday", hue: "coral" },
    { t: "Title ideas", body: "NOCTURNE / The Last Ferry / Harbour Light. Renn leaning NOCTURNE.", tag: "SINNERS", time: "2d", hue: "verdant" },
    { t: "Production budget v3", body: "Anamorphic kit rental is the swing line. Trim two night exteriors or find a sponsor.", tag: "Business", time: "4d", hue: "ember" },
  ];
  function Notes({ fullscreen, setFullscreen }) {
    return (
      <Shell eyebrow="Work" title="Notes" fullscreen={fullscreen} setFullscreen={setFullscreen}
        actions={<ABtn size="sm" icon="plus">New note</ABtn>}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {NOTES.map((n, i) => (
            <ACard key={i} interactive style={{ padding: 18, display: "flex", flexDirection: "column", gap: 10, cursor: "pointer", minHeight: 180 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ width: 30, height: 30, borderRadius: "var(--radius-sm)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff" }} className={"ars-mesh ars-mesh--" + n.hue}></span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--fg3)" }}>{n.time}</span>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16.5, color: "var(--fg1)", letterSpacing: "-.01em" }}>{n.t}</div>
              <div style={{ fontSize: 13.5, color: "var(--fg2)", lineHeight: 1.5, flex: 1, display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{n.body}</div>
              <ATag style={{ alignSelf: "flex-start" }}>{n.tag}</ATag>
            </ACard>
          ))}
        </div>
      </Shell>
    );
  }

  /* ---------------- TODO ---------------- */
  function TodoRow({ done, t, project, pr, due }) {
    const [d, setD] = React.useState(!!done);
    const tone = { High: "var(--high)", Medium: "var(--planning)", Low: "var(--low)" }[pr] || "var(--fg3)";
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 6px", borderBottom: "1px solid var(--border-subtle)" }}>
        <button onClick={() => setD(!d)} aria-label="toggle" style={{ width: 22, height: 22, flex: "none", borderRadius: "50%", border: "none", background: "none", cursor: "pointer", color: d ? "var(--accent)" : "var(--fg3)", display: "inline-flex" }}><A name={d ? "checkCircle" : "circle"} size={22} /></button>
        <span style={{ flex: 1, fontSize: 15, color: d ? "var(--fg3)" : "var(--fg1)", textDecoration: d ? "line-through" : "none" }}>{t}</span>
        <ATag>{project}</ATag>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, minWidth: 78 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: tone }} /><span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg3)" }}>{pr}</span></span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg3)", minWidth: 64, textAlign: "right" }}>{due}</span>
      </div>
    );
  }
  function Todo({ fullscreen, setFullscreen }) {
    const groups = [
      { label: "Today", items: [
        { t: "Lock final shooting script", project: "SINNERS", pr: "High", due: "5:00 PM" },
        { t: "Confirm anamorphic rental", project: "SINNERS", pr: "Medium", due: "EOD" },
        { t: "Send Søren the score refs", project: "Sound", pr: "Low", due: "EOD" },
      ]},
      { label: "Upcoming", items: [
        { t: "Cast the two leads", project: "SINNERS", pr: "High", due: "Thu" },
        { t: "Scout the harbour location", project: "SINNERS", pr: "Medium", due: "Fri" },
        { t: "Draft the festival submission", project: "Growth", pr: "Low", due: "Mon" },
      ]},
      { label: "Done", items: [ { t: "Cut the announcement teaser", project: "Post", pr: "Medium", due: "", done: true } ]},
    ];
    return (
      <Shell eyebrow="Work" title="To-do" fullscreen={fullscreen} setFullscreen={setFullscreen}
        actions={<ABtn size="sm" icon="plus">Add task</ABtn>}>
        <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", flexDirection: "column", gap: 26 }}>
          {groups.map((g) => (
            <div key={g.label}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}><ALabel>{g.label}</ALabel><span className="ars-tnum" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg3)" }}>{g.items.length}</span></div>
              {g.items.map((it, i) => <TodoRow key={i} {...it} />)}
            </div>
          ))}
        </div>
      </Shell>
    );
  }

  /* ---------------- INBOX (work activities) ---------------- */
  function Inbox({ fullscreen, setFullscreen }) {
    const [filter, setFilter] = React.useState("All");
    const ITEMS = [
      { grp: "Today", who: "Nadia Œ", hue: "coral", icon: "at", txt: "mentioned you on", target: "Lock final shooting script", t: "12m", unread: true, kind: "Mentions" },
      { grp: "Today", who: "Søren K.", hue: "ember", icon: "task", txt: "assigned you", target: "Color grade the teaser", t: "1h", unread: true, kind: "Assigned to me" },
      { grp: "Today", who: "Mara Vey", hue: "violet", icon: "message", txt: "commented on", target: "Act I look — moodboard", t: "3h", kind: "Comments" },
      { grp: "Earlier", who: "Root", hue: "verdant", icon: "task", txt: "completed", target: "Cut the announcement teaser", t: "1d", kind: "Assigned to me" },
      { grp: "Earlier", who: "Nadia Œ", hue: "coral", icon: "message", txt: "replied to your note on", target: "Lens test thoughts", t: "2d", kind: "Comments" },
    ];
    const filters = [["All", "inbox"], ["Mentions", "at"], ["Assigned to me", "task"], ["Comments", "message"]];
    const shown = ITEMS.filter((x) => filter === "All" || x.kind === filter);
    const groups = ["Today", "Earlier"].map((g) => ({ g, items: shown.filter((x) => x.grp === g) })).filter((x) => x.items.length);
    return (
      <Shell eyebrow="Work" title="Inbox" fullscreen={fullscreen} setFullscreen={setFullscreen}
        actions={<ABtn size="sm" variant="secondary">Mark all read</ABtn>}>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {filters.map(([f, ic]) => { const on = filter === f; return (
            <button key={f} onClick={() => setFilter(f)} style={{ display: "inline-flex", alignItems: "center", gap: 7, height: 34, padding: "0 14px", borderRadius: 999, border: `1px solid ${on ? "var(--coral-press)" : "var(--border-default)"}`, background: on ? "var(--coral)" : "var(--surface-3)", color: on ? "var(--on-coral)" : "var(--fg2)", fontFamily: "var(--font-text)", fontSize: 13.5, fontWeight: 500, cursor: "pointer", transition: "all .15s" }}><A name={ic} size={15} />{f}</button>
          ); })}
        </div>
        <div style={{ maxWidth: 860, display: "flex", flexDirection: "column", gap: 22 }}>
          {groups.map(({ g, items }) => (
            <div key={g}>
              <div style={{ marginBottom: 8 }}><ALabel>{g}</ALabel></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {items.map((it, i) => (
                  <ACard key={i} interactive style={{ padding: 14, display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
                    <span style={{ position: "relative", flex: "none" }}>
                      <AAvatar hue={it.hue} size={38} />
                      <span style={{ position: "absolute", right: -3, bottom: -3, width: 18, height: 18, borderRadius: "50%", background: "var(--surface-3)", border: "1px solid var(--border-default)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}><A name={it.icon} size={11} /></span>
                    </span>
                    <div style={{ flex: 1, minWidth: 0, fontSize: 14.5, color: "var(--fg2)", lineHeight: 1.45 }}><span style={{ color: "var(--fg1)", fontWeight: 600 }}>{it.who}</span> {it.txt} <span style={{ color: "var(--fg1)", fontWeight: 500 }}>{it.target}</span></div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg3)", flex: "none" }}>{it.t}</span>
                    {it.unread && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", flex: "none" }} />}
                  </ACard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Shell>
    );
  }

  /* ---------------- CALENDAR ---------------- */
  function Calendar({ fullscreen, setFullscreen }) {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const EVENTS = { 11: [{ t: "Recce — harbour", tone: "low" }], 12: [{ t: "Table read", tone: "planning" }], 16: [{ t: "Score session", tone: "review" }], 18: [{ t: "Shoot D1", tone: "high" }, { t: "Shoot D2", tone: "high" }], 22: [{ t: "Edit review", tone: "planning" }], 26: [{ t: "Festival deadline", tone: "high" }] };
    const cells = []; for (let i = 0; i < 35; i++) { const day = i - 2; cells.push(day >= 1 && day <= 31 ? day : null); }
    const toneC = (t) => ({ low: "var(--low)", planning: "var(--planning)", review: "var(--review)", high: "var(--high)" }[t]);
    return (
      <Shell eyebrow="Work · June 2026" title="Calendar" fullscreen={fullscreen} setFullscreen={setFullscreen} bodyPad={false}
        actions={<div style={{ display: "flex", gap: 6 }}><AIconBtn name="arrowLeft" label="Prev" size="sm" /><AIconBtn name="chevronRight" label="Next" size="sm" /></div>}>
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", borderBottom: "1px solid var(--border-subtle)" }}>
            {days.map((d) => <div key={d} style={{ padding: "12px 14px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--fg3)" }}>{d}</div>)}
          </div>
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(7,1fr)", gridAutoRows: "1fr" }}>
            {cells.map((day, i) => (
              <div key={i} style={{ borderRight: (i % 7 !== 6) ? "1px solid var(--border-subtle)" : "none", borderBottom: "1px solid var(--border-subtle)", padding: 8, minHeight: 96, position: "relative" }}>
                {day && <span className="ars-tnum" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: day === 13 ? "var(--on-coral)" : "var(--fg2)", background: day === 13 ? "var(--coral)" : "transparent", borderRadius: "50%", width: 22, height: 22, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{day}</span>}
                <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 4 }}>
                  {(EVENTS[day] || []).map((e, k) => (
                    <span key={k} style={{ fontSize: 11.5, color: "var(--fg1)", background: "color-mix(in srgb," + toneC(e.tone) + " 16%, transparent)", borderLeft: "2px solid " + toneC(e.tone), borderRadius: "var(--radius-xs)", padding: "3px 6px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Shell>
    );
  }

  /* ---------------- GENERIC (ideas / moodboards / assets / contacts / opportunities) ---------------- */
  function Generic({ cat, fullscreen, setFullscreen }) {
    const META = {
      ideas: { title: "Ideas", hues: ["violet", "coral", "ember", "azure", "verdant", "violet"], labels: ["Night & neon", "The horn as a clock", "Silence between lines", "Diner warmth", "First-light palette", "Loose ends"] },
      moodboards: { title: "Moodboards", hues: ["ember", "azure", "violet", "coral"], labels: ["Act I look", "Costume", "Locations", "Colour script"] },
      assets: { title: "Assets", hues: ["azure", "ember", "violet", "coral", "verdant", "azure"], labels: ["harbour_wide.tiff", "ferry_deck.jpg", "neon_rain.png", "diner_warm.jpg", "score_draft.wav", "title_card.png"] },
      contacts: { title: "Contacts", hues: ["ember", "coral", "violet", "azure"], labels: ["Søren K.", "Nadia Œ", "Mara Vey", "Lena Asgard"] },
      opportunities: { title: "Opportunities", hues: ["coral", "azure"], labels: ["Nordic Film Grant", "Festival submission"] },
    }[cat] || { title: "Work", hues: ["coral"], labels: ["Item"] };
    return (
      <Shell eyebrow="Work" title={META.title} fullscreen={fullscreen} setFullscreen={setFullscreen}
        actions={<ABtn size="sm" icon="plus">New</ABtn>}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))", gap: 16 }}>
          {META.labels.map((l, i) => (
            <ACard key={i} interactive style={{ padding: 0, overflow: "hidden", cursor: "pointer" }}>
              <div className={"ars-mesh ars-mesh--" + META.hues[i % META.hues.length]} style={{ height: 130 }} />
              <div style={{ padding: 14, fontSize: 14, color: "var(--fg1)", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l}</div>
            </ACard>
          ))}
        </div>
      </Shell>
    );
  }

  window.ArsWorkViews = { Notes, Todo, Inbox, Calendar, Generic };
})();
