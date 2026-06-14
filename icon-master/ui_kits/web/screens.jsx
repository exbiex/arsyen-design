// Arsyen Web kit — invite-gated auth + public portfolio. Reuses ../mac primitives.
(function () {
  const A = window.AIcon;
  const { ABtn, AIconBtn, AInput, AAvatar, ALabel } = window;

  /* ---------- AUTH LANDING ---------- */
  function Landing({ go }) {
    return (
      <div className="ars-backdrop-living" style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 26, padding: 40 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 96, letterSpacing: "-.05em", color: "#fff", textShadow: "0 8px 60px rgba(0,0,0,.35)" }}>arsyen</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(255,255,255,.55)", marginTop: -10 }}>Members only · By invitation</div>
        <div style={{ display: "flex", gap: 14, marginTop: 12 }}>
          <button onClick={() => go("login")} style={{ height: 48, padding: "0 26px", borderRadius: "var(--radius-md)", border: "1px solid rgba(255,255,255,.14)", background: "rgba(20,16,22,.5)", backdropFilter: "blur(14px)", color: "#fff", fontFamily: "var(--font-text)", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Log in</button>
          <ABtn size="lg" onClick={() => go("request")}>Request an invite</ABtn>
        </div>
      </div>
    );
  }

  /* ---------- GLASS CARD shell over the living backdrop ---------- */
  function AuthShell({ children, onBack }) {
    return (
      <div className="ars-backdrop-living" style={{ minHeight: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 24px", position: "relative" }}>
        {onBack && (
          <button onClick={onBack} aria-label="Back" style={{ position: "absolute", top: 40, left: "50%", transform: "translateX(-280px)", width: 44, height: 44, borderRadius: "var(--radius-md)", border: "1px solid rgba(255,255,255,.12)", background: "rgba(20,16,22,.5)", backdropFilter: "blur(14px)", color: "#fff", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><A name="arrowLeft" size={18} /></button>
        )}
        <div style={{ width: 440, maxWidth: "100%" }}>
          <div style={{ textAlign: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 34, letterSpacing: "-.04em", color: "#fff", marginBottom: 20 }}>arsyen</div>
          <div style={{ background: "rgba(18,14,20,.46)", border: "1px solid rgba(255,255,255,.12)", borderRadius: "var(--radius-2xl)", padding: 30, backdropFilter: "blur(22px) saturate(160%)", boxShadow: "0 30px 90px -20px rgba(0,0,0,.6), 0 0 60px -10px var(--accent-glow-soft)" }}>
            {children}
          </div>
        </div>
      </div>
    );
  }

  /* ---------- LOGIN ---------- */
  function Login({ go }) {
    return (
      <AuthShell onBack={() => go("landing")}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, color: "#fff", letterSpacing: "-.02em", marginBottom: 22 }}>Welcome back</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <AInput label="Username or email" placeholder="renn or you@studio.com" />
          <AInput label="Password" type="password" defaultValue="filmschool" />
          <div style={{ marginTop: 6 }}><ABtn full size="lg" onClick={() => go("portfolio")}>Log in</ABtn></div>
        </div>
      </AuthShell>
    );
  }

  /* ---------- REQUEST INVITE ---------- */
  function RequestInvite({ go }) {
    return (
      <AuthShell onBack={() => go("landing")}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, color: "#fff", letterSpacing: "-.02em" }}>Request an invite</div>
        <div style={{ fontSize: 15, color: "rgba(255,255,255,.6)", marginTop: 8, marginBottom: 22 }}>Tell us who you are and what you make. We review every request by hand.</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <AInput label="Name" placeholder="Renn Okabe" />
          <AInput label="Email" placeholder="you@studio.com" />
          <AInput label="Discipline" icon="tag" placeholder="Director, photographer, composer…" />
          <label style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            <ALabel style={{ color: "rgba(255,255,255,.5)" }}>A few words</ALabel>
            <textarea rows="3" placeholder="What are you building right now?" style={{ background: "rgba(255,255,255,.06)", color: "#fff", border: "1px solid rgba(255,255,255,.14)", borderRadius: "var(--radius-md)", fontFamily: "var(--font-text)", fontSize: 15, padding: 14, outline: "none", resize: "none" }} />
          </label>
          <div style={{ marginTop: 6 }}><ABtn full size="lg" icon="send" onClick={() => go("landing")}>Send request</ABtn></div>
        </div>
      </AuthShell>
    );
  }

  /* ---------- PUBLIC PORTFOLIO (open web) ---------- */
  function Portfolio({ go }) {
    const stats = [["48", "Works"], ["4", "Projects"], ["1.2k", "Followers"], ["312", "Following"]];
    const works = ["coral", "ember", "violet", "azure", "verdant", "coral", "ember", "azure"];
    const skills = ["Direction", "Oil", "Editing", "Color", "Curation"];
    return (
      <div style={{ minHeight: "100%", background: "var(--bg-canvas)" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px", background: "rgba(8,8,9,.7)", backdropFilter: "blur(18px)", borderBottom: "1px solid var(--border-subtle)" }}>
          <button onClick={() => go("landing")} style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, letterSpacing: "-.04em", color: "#fff", background: "none", border: "none", cursor: "pointer" }}>arsyen</button>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-3)" }}>Public portfolio</span>
            <ABtn size="md" onClick={() => go("request")}>Request an invite</ABtn>
          </div>
        </div>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div className="ars-mesh ars-mesh--azure" style={{ height: 240, opacity: .85 }} />
          <div style={{ padding: "0 24px 60px", marginTop: -56 }}>
            <AAvatar hue="verdant" size={112} ring />
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginTop: 16 }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 40, color: "var(--ink-0)", letterSpacing: "-.02em" }}>Renn Okabe</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-3)", marginTop: 8 }}>Director · Oil &amp; Light</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--ink-3)", marginTop: 10, fontSize: 15 }}><A name="mapPin" size={15} /> Oslo, NO</div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <ABtn icon="message">Message</ABtn>
                <AIconBtn name="share" label="Share" size="lg" />
              </div>
            </div>
            <div style={{ fontSize: 17, color: "var(--ink-1)", marginTop: 16, maxWidth: 620, lineHeight: 1.5 }}>Night studies, slow work. Building small crews for short films and exhibitions. Commissions open.</div>
            <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>{skills.map((s) => <span key={s} style={{ fontSize: 14, color: "var(--ink-1)", background: "var(--surface-2)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-sm)", padding: "8px 15px" }}>{s}</span>)}</div>

            <div style={{ display: "flex", gap: 36, marginTop: 30, padding: "22px 0", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
              {stats.map(([v, l]) => (
                <div key={l}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "var(--ink-0)" }}>{v}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-3)", marginLeft: 8 }}>{l}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 26 }}><ALabel>Portfolio</ALabel></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 16 }}>
              {works.map((h, i) => <div key={i} className={window.aMesh(h)} style={{ aspectRatio: "1", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)" }} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function WebApp() {
    const [view, setView] = React.useState("landing");
    const URLS = { landing: "arsyen.com", login: "arsyen.com/login", request: "arsyen.com/request-invite", portfolio: "arsyen.com/renn-okabe" };
    const Body = { landing: Landing, login: Login, request: RequestInvite, portfolio: Portfolio }[view];
    return { Body, view, setView, url: URLS[view] };
  }

  Object.assign(window, { WebLanding: Landing, WebLogin: Login, WebRequest: RequestInvite, WebPortfolio: Portfolio, useWebApp: WebApp });
})();
