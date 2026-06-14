// Arsyen Mac kit — Discover, Tools, Settings, Profile + Dock & Chrome.
(function () {
  const A = window.AIcon;
  const { ABtn, AIconBtn, ATag, AStatus, ABadge, AAvatar, AInput, ASwitch, AChip, ASeg, ACard, ALabel } = window;

  /* ---------------- DISCOVER ---------------- */
  const ARTISTS = [
    { n: "Nadia Œ", r: "Photographer · Lisbon", m: 96, hue: "coral", tags: ["Analog", "Editorial", "Print"], feat: true },
    { n: "Mara Vey", r: "Painter · Oslo", m: 93, hue: "azure", tags: ["Oil", "Portrait", "Set design"], feat: true },
    { n: "Ilo Bran", r: "Photographer · Berlin", m: 88, hue: "verdant", tags: ["Documentary", "16mm"] },
    { n: "Søren K.", r: "3D / Motion · Copenhagen", m: 84, hue: "ember", tags: ["Houdini", "Score", "Title design"] },
    { n: "Lena Asgard", r: "Composer · Reykjavik", m: 80, hue: "violet", tags: ["Ambient", "Strings", "Mix"] },
  ];
  const CHATS = [
    { n: "Nightwork crew", last: "Søren: score draft is up", t: "2m", hue: "ember", unread: true, online: true },
    { n: "Nadia Œ", last: "sent the contact sheet", t: "18m", hue: "coral", online: true },
    { n: "Studio Æon", last: "Let's lock the sleeve dielines", t: "1h", hue: "azure" },
    { n: "Mara Vey", last: "love it. ship it.", t: "3h", hue: "violet" },
  ];

  function ArtistCard({ a, big }) {
    return (
      <ACard interactive style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div className={window.aMesh(a.hue)} style={{ position: "relative", height: big ? 200 : 150 }}>
          <ABadge tone="accent" style={{ position: "absolute", top: 14, right: 14 }}>{a.m}% MATCH</ABadge>
        </div>
        <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 16, marginTop: -34 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
            <AAvatar hue={a.hue} size={56} presence ring={false} style={{ border: "3px solid var(--surface-2)", borderRadius: "50%" }} />
            <div style={{ paddingBottom: 4 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19, color: "var(--ink-0)" }}>{a.n}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-3)", marginTop: 3 }}>{a.r}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {a.tags.map((t) => <span key={t} style={{ fontSize: 13, color: "var(--ink-2)", background: "var(--surface-3)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", padding: "6px 12px" }}>{t}</span>)}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <ABtn full icon="message">Message</ABtn>
            <AIconBtn name="userPlus" label="Add to crew" size="lg" />
          </div>
        </div>
      </ACard>
    );
  }

  function ChatPanel() {
    const [tab, setTab] = React.useState("Direct");
    return (
      <ACard panel style={{ width: 330, flex: "none", padding: 20, display: "flex", flexDirection: "column", gap: 18, alignSelf: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <A name="message" size={20} color="var(--accent)" />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "var(--ink-0)" }}>Chat</span>
          </div>
          <AIconBtn name="plus" label="New chat" />
        </div>
        <window.ASeg options={["Direct", "Community"]} value={tab} onChange={setTab} />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {CHATS.map((c) => (
            <div key={c.n} style={{ display: "flex", gap: 12, alignItems: "center", padding: 12, borderRadius: "var(--radius-md)", cursor: "pointer" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-2)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
              <AAvatar hue={c.hue} size={42} presence={c.online} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 15, color: "var(--ink-0)" }}>{c.n}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-4)" }}>{c.t}</span>
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.last}</div>
              </div>
              {c.unread && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", flex: "none" }} />}
            </div>
          ))}
        </div>
      </ACard>
    );
  }

  function DiscoverView() {
    const [crew, setCrew] = React.useState(true);
    return (
      <div style={{ display: "flex", gap: 26, padding: "30px 34px 120px", alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", gap: 14 }}>
            <div style={{ flex: 1 }}><AInput icon="search" placeholder="Search artists, disciplines, skills…" /></div>
            <ABtn variant="secondary" icon="sliders">Filters</ABtn>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <AChip>Discipline</AChip><AChip>Location</AChip>
            <AChip selected={crew} onClick={() => setCrew(!crew)}>Open to crew</AChip>
            <AChip>Skills</AChip><AChip>Rate</AChip>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <A name="star" size={15} color="var(--accent)" /><ALabel>Featured artists</ALabel>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            {ARTISTS.filter((a) => a.feat).map((a) => <ArtistCard key={a.n} a={a} big />)}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 4 }}>
            <A name="compass" size={15} color="var(--ink-3)" /><ALabel>Most relevant for your crew</ALabel>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18 }}>
            {ARTISTS.filter((a) => !a.feat).map((a) => <ArtistCard key={a.n} a={a} />)}
          </div>
        </div>
        <ChatPanel />
      </div>
    );
  }

  /* ---------------- TOOLS ---------------- */
  const TOOLS = [
    { n: "Moodboard", d: "Collect references into a board", k: "Visual", i: "palette" },
    { n: "Color grade", d: "Build & save LUT-style palettes", k: "Visual", i: "image" },
    { n: "Brief builder", d: "Turn a chat into a creative brief", k: "Docs", i: "file" },
    { n: "Invoice", d: "Bill a commission, get paid", k: "Business", i: "briefcase" },
    { n: "Call sheet", d: "Schedule a shoot with your crew", k: "Production", i: "users" },
    { n: "Storyboard", d: "Frame out a sequence", k: "Production", i: "grid" },
    { n: "Portfolio", d: "Compose a gallery-grade set", k: "Profile", i: "star" },
    { n: "Contract", d: "Scope, terms, signatures", k: "Business", i: "send" },
  ];
  function ToolsView() {
    return (
      <div style={{ padding: "44px 60px 120px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 34, color: "var(--ink-0)", letterSpacing: "-.02em" }}>Tools</div>
        <div style={{ fontSize: 16, color: "var(--ink-2)", marginTop: 8 }}>Make the artefacts your projects need — moodboards, briefs, invoices, and more.</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, marginTop: 34 }}>
          {TOOLS.map((t) => (
            <ACard key={t.n} interactive style={{ padding: 22, minHeight: 200, display: "flex", flexDirection: "column", cursor: "pointer" }}>
              <span style={{ width: 46, height: 46, borderRadius: 12, background: "var(--accent-soft)", border: "1px solid var(--accent-line)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
                <A name={t.i} size={22} />
              </span>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--ink-0)", marginTop: 20 }}>{t.n}</div>
              <div style={{ fontSize: 14, color: "var(--ink-3)", marginTop: 6, flex: 1 }}>{t.d}</div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-4)", border: "1px solid var(--border-default)", borderRadius: 999, padding: "4px 10px", alignSelf: "flex-start", marginTop: 16 }}>{t.k}</span>
            </ACard>
          ))}
        </div>
      </div>
    );
  }

  /* ---------------- SETTINGS ---------------- */
  function SettingRow({ icon, title, desc, children, last }) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "20px 0", borderBottom: last ? "none" : "1px solid var(--border-subtle)" }}>
        <span style={{ width: 42, height: 42, borderRadius: 12, background: "var(--surface-3)", border: "1px solid var(--border-subtle)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--ink-2)", flex: "none" }}><A name={icon} size={19} /></span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 16, color: "var(--ink-0)" }}>{title}</div>
          <div style={{ fontSize: 14, color: "var(--ink-3)", marginTop: 3 }}>{desc}</div>
        </div>
        {children}
      </div>
    );
  }
  function SettingsView() {
    const [n1, setN1] = React.useState(true), [n2, setN2] = React.useState(true), [n3, setN3] = React.useState(false), [pub, setPub] = React.useState(true);
    const [back, setBack] = React.useState("Pure black");
    const [accent, setAccent] = React.useState("red");
    const ACCENTS = [["red", "var(--accent-red)"], ["violet", "var(--accent-violet)"], ["blue", "var(--accent-blue)"], ["amber", "var(--accent-amber)"]];
    return (
      <div style={{ padding: "44px 24px 120px", display: "flex", justifyContent: "center" }}>
        <ACard panel style={{ width: 760, maxWidth: "100%", padding: 36 }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 34, color: "var(--ink-0)", letterSpacing: "-.02em" }}>Studio</div>
          <div style={{ fontSize: 16, color: "var(--ink-2)", marginTop: 8 }}>Tune your studio, the way you like it.</div>

          <div style={{ marginTop: 30 }}><ALabel>Notifications</ALabel></div>
          <SettingRow icon="briefcase" title="Commission requests" desc="When someone wants to commission you"><ASwitch checked={n1} onChange={setN1} /></SettingRow>
          <SettingRow icon="message" title="Mentions & replies" desc="On your work and in threads"><ASwitch checked={n2} onChange={setN2} /></SettingRow>
          <SettingRow icon="users" title="Crew activity" desc="Updates from your active crews" last><ASwitch checked={n3} onChange={setN3} /></SettingRow>

          <div style={{ marginTop: 30 }}><ALabel>Privacy</ALabel></div>
          <SettingRow icon="eye" title="Public portfolio" desc="Anyone can view your published work"><ASwitch checked={pub} onChange={setPub} /></SettingRow>
          <SettingRow icon="lock" title="Commissions" desc="Open to commission requests" last><ABtn variant="danger" size="sm">Open</ABtn></SettingRow>

          <div style={{ marginTop: 30, display: "flex", justifyContent: "space-between" }}><ALabel>Appearance</ALabel><ALabel>{back === "Pure black" ? "Pure black" : "Living"}</ALabel></div>
          <SettingRow icon="image" title="Backdrop" desc="Pick the canvas behind your panels">
            <ASeg options={["Pure black", "Living"]} value={back} onChange={setBack} style={{ width: 320 }} />
          </SettingRow>
          <SettingRow icon="palette" title="Accent color" desc="The one hue that pops on black" last>
            <div style={{ display: "flex", gap: 14 }}>
              {ACCENTS.map(([k, c]) => (
                <button key={k} onClick={() => setAccent(k)} aria-label={k} style={{ width: 34, height: 34, borderRadius: "50%", background: c, border: "none", cursor: "pointer", boxShadow: accent === k ? "0 0 0 2px var(--surface-1), 0 0 0 4px " + c : "none" }} />
              ))}
            </div>
          </SettingRow>
        </ACard>
      </div>
    );
  }

  /* ---------------- PROFILE ---------------- */
  function ProfileView() {
    const stats = [["48", "Works"], ["4", "Projects"], ["1.2k", "Followers"], ["312", "Following"]];
    const skills = ["Direction", "Oil", "Editing", "Color", "Curation"];
    const port = ["coral", "ember", "violet", "azure", "verdant"];
    return (
      <div style={{ padding: "0 24px 120px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: 920, maxWidth: "100%" }}>
          <div className="ars-mesh ars-mesh--azure" style={{ height: 220, borderRadius: "0 0 var(--radius-2xl) var(--radius-2xl)", opacity: .8 }} />
          <div style={{ padding: "0 12px", marginTop: -54 }}>
            <AAvatar hue="verdant" size={108} ring />
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 38, color: "var(--ink-0)", letterSpacing: "-.02em", marginTop: 16 }}>Renn Okabe</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-3)", marginTop: 8 }}>Director · Oil &amp; Light</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--ink-3)", marginTop: 10, fontSize: 15 }}><A name="mapPin" size={15} /> Oslo, NO</div>
            <div style={{ fontSize: 17, color: "var(--ink-1)", marginTop: 16, maxWidth: 620, lineHeight: 1.5 }}>Night studies, slow work. Building small crews for short films and exhibitions. Commissions open.</div>

            <ACard style={{ display: "flex", marginTop: 22, padding: "22px 0" }}>
              {stats.map(([v, l], i) => (
                <div key={l} style={{ flex: 1, textAlign: "center", borderLeft: i ? "1px solid var(--border-subtle)" : "none" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--ink-0)" }}>{v}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-3)", marginTop: 6 }}>{l}</div>
                </div>
              ))}
            </ACard>

            <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
              {skills.map((s) => <span key={s} style={{ fontSize: 14, color: "var(--ink-1)", background: "var(--surface-2)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-sm)", padding: "9px 16px" }}>{s}</span>)}
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
              <ABtn full size="lg">Edit profile</ABtn>
              <AIconBtn name="share" label="Share" size="lg" />
            </div>

            <div style={{ marginTop: 34 }}><ALabel>Portfolio</ALabel></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginTop: 16 }}>
              {port.map((h, i) => <div key={i} className={window.aMesh(h)} style={{ aspectRatio: "1", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)" }} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- DOCK & CHROME ---------------- */
  function Dock({ view, setView }) {
    const items = [["board", "folder"], ["discover", "compass"], ["tools", "grid"], ["settings", "settings"]];
    return (
      <div style={{ display: "inline-flex", gap: 26, alignItems: "center" }}>
        {items.map(([k, ic]) => {
          const active = view === k;
          return (
            <button key={k} onClick={() => setView(k)} aria-label={k} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "inline-flex", alignItems: "center", justifyContent: "center", color: active ? "var(--coral)" : "var(--fg2)", transform: active ? "scale(1.24)" : "scale(1)", transformOrigin: "center bottom", transition: "transform .2s var(--ease-out), color .2s var(--ease-out)" }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.transform = "scale(1.12)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = active ? "scale(1.24)" : "scale(1)"; }}>
              <A name={ic} size={24} stroke={active ? 2 : 1.7} />
            </button>
          );
        })}
      </div>
    );
  }

  function Chrome({ view, setView, search }) {
    return (
      <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, height: 84, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 30px", zIndex: 100, pointerEvents: "none" }}>
        <div style={{ pointerEvents: "auto", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, letterSpacing: "-.04em", color: "#fff", cursor: "pointer" }}>arsyen</div>
        <div style={{ pointerEvents: "auto" }}><Dock view={view} setView={setView} /></div>
        <div style={{ pointerEvents: "auto", display: "flex", alignItems: "center", gap: 16 }}>
          <div className="ars-glass" style={{ display: "flex", alignItems: "center", gap: 10, height: 44, padding: "0 16px", borderRadius: "var(--radius-full)", minWidth: 280 }}>
            <A name="search" size={16} color="var(--ink-3)" />
            <span style={{ flex: 1, fontSize: 14, color: "var(--ink-4)" }}>{search}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-4)" }}><A name="command" size={12} />K</span>
          </div>
          <button aria-label="Notifications" style={{ position: "relative", width: 44, height: 44, borderRadius: "50%", background: "transparent", border: "none", color: "var(--ink-2)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <A name="bell" size={20} />
            <span style={{ position: "absolute", top: 10, right: 11, width: 7, height: 7, borderRadius: "50%", background: "var(--accent)" }} />
          </button>
          <button onClick={() => setView("profile")} aria-label="Profile" style={{ padding: 0, border: "none", background: "none", cursor: "pointer" }}>
            <AAvatar hue="verdant" size={40} ring={view === "profile"} />
          </button>
        </div>
      </div>
    );
  }

  Object.assign(window, { DiscoverView, ToolsView, SettingsView, ProfileView, Chrome });
})();
