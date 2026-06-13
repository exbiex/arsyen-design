// Arsyen Mac kit — self-contained UI primitives (mirror the DS components).
// All exported to window for use across screen files.
(function () {
  const A = window.AIcon;

  const mesh = (hue) => `ars-mesh ars-mesh--${hue || "coral"}`;

  function Button({ children, variant = "primary", size = "md", icon, glow = true, full, disabled, style = {}, ...rest }) {
    const S = { sm: [32, "0 12px", 13], md: [42, "0 18px", 14], lg: [52, "0 24px", 15] }[size];
    const V = {
      primary: { background: "var(--coral)", color: "var(--on-coral)", border: "1px solid var(--coral-press)", boxShadow: glow ? "var(--glow-accent)" : "none" },
      secondary: { background: "var(--surface-3)", color: "var(--fg1)", border: "1px solid var(--border-default)", boxShadow: "var(--edge-light)" },
      ghost: { background: "transparent", color: "var(--fg2)", border: "1px solid transparent" },
      outline: { background: "transparent", color: "var(--fg1)", border: "1px solid var(--border-strong)" },
      danger: { background: "var(--coral-soft)", color: "var(--accent-ink)", border: "1px solid var(--accent-line)" },
    }[variant];
    return (
      <button disabled={disabled} {...rest} style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
        height: S[0], padding: S[1], width: full ? "100%" : "auto", borderRadius: "var(--radius-full)",
        fontFamily: "var(--font-text)", fontSize: S[2], fontWeight: 600, lineHeight: 1, letterSpacing: "-0.005em",
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.45 : 1,
        transition: "transform .12s var(--ease-out), filter .18s var(--ease-out), box-shadow .2s var(--ease-out)", ...V, ...style,
      }}
        onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = "scale(.97)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.filter = "none"; }}
        onMouseEnter={(e) => !disabled && (e.currentTarget.style.filter = variant === "primary" ? "brightness(1.08)" : "brightness(1.2)")}>
        {icon && <A name={icon} size={16} />}{children}
      </button>
    );
  }

  function IconButton({ name, size = "md", active, variant = "default", label, children, style = {}, ...rest }) {
    const dim = { sm: 30, md: 38, lg: 46 }[size];
    const V = {
      default: { background: "var(--surface-3)", color: active ? "var(--accent)" : "var(--ink-1)", border: "1px solid var(--border-default)" },
      ghost: { background: "transparent", color: active ? "var(--accent)" : "var(--ink-2)", border: "1px solid transparent" },
      accent: { background: "var(--accent-soft)", color: "var(--accent)", border: "1px solid var(--accent-line)" },
    }[variant];
    return (
      <button aria-label={label} title={label} {...rest} style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", width: dim, height: dim,
        borderRadius: "var(--radius-sm)", cursor: "pointer", transition: "background .18s, transform .12s", ...V, ...style,
      }}
        onMouseEnter={(e) => variant === "default" && (e.currentTarget.style.background = "var(--surface-4)")}
        onMouseLeave={(e) => variant === "default" && (e.currentTarget.style.background = "var(--surface-3)")}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(.92)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}>
        {children || <A name={name} size={size === "sm" ? 16 : 19} />}
      </button>
    );
  }

  function Tag({ children, style = {} }) {
    return <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-2)", background: "var(--surface-3)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-xs)", padding: "4px 8px", lineHeight: 1.1, ...style }}>{children}</span>;
  }

  const TONES = {
    planning: ["var(--planning)", "var(--planning-soft)"], medium: ["var(--planning)", "var(--planning-soft)"],
    high: ["var(--high)", "var(--high-soft)"], urgent: ["var(--urgent)", "var(--urgent-soft)"],
    low: ["var(--low)", "var(--low-soft)"], review: ["var(--review)", "var(--review-soft)"], done: ["var(--done)", "var(--done-soft)"],
  };
  function StatusPill({ tone = "planning", children, dot = true, bare = false, style = {} }) {
    const [c, bg] = TONES[tone] || TONES.planning;
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-mono)", fontSize: 12, color: c, background: bare ? "transparent" : bg, borderRadius: "var(--radius-full)", padding: bare ? 0 : "4px 11px 4px 9px", lineHeight: 1.1, ...style }}>
        {dot && <span style={{ width: 7, height: 7, borderRadius: "50%", background: c, flex: "none", boxShadow: `0 0 7px ${c}` }} />}{children}
      </span>
    );
  }

  function Badge({ children, tone = "neutral", style = {} }) {
    const T = { neutral: ["var(--ink-2)", "var(--surface-3)", "var(--border-subtle)"], accent: ["var(--accent-ink)", "var(--accent-soft)", "var(--accent-line)"], outline: ["var(--ink-2)", "transparent", "var(--border-default)"], done: ["var(--done)", "var(--done-soft)", "transparent"] }[tone];
    return <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: T[0], background: T[1], border: `1px solid ${T[2]}`, borderRadius: "var(--radius-full)", padding: "3px 9px", lineHeight: 1.1, ...style }}>{children}</span>;
  }

  function Avatar({ hue = "coral", size = 40, ring, presence, initials, src, style = {} }) {
    return (
      <span style={{ position: "relative", display: "inline-flex", flex: "none", width: size, height: size, ...style }}>
        <span className={src ? "" : mesh(hue)} style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", display: "inline-flex", alignItems: "center", justifyContent: "center", border: ring ? "2px solid var(--accent)" : "1px solid var(--border-default)", boxShadow: ring ? "var(--glow-accent-sm)" : "none", background: src ? "var(--surface-3)" : undefined }}>
          {src ? <img src={src} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials ? <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: size * 0.38, color: "#fff", mixBlendMode: "overlay" }}>{initials}</span> : null}
        </span>
        {presence && <span style={{ position: "absolute", right: -1, bottom: -1, width: Math.max(8, size * 0.26), height: Math.max(8, size * 0.26), borderRadius: "50%", background: "var(--presence-online)", border: "2px solid var(--bg-canvas)" }} />}
      </span>
    );
  }

  function ProgressMeter({ value = 0, showValue = true, style = {} }) {
    const v = Math.max(0, Math.min(100, value));
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", ...style }}>
        <div style={{ position: "relative", flex: 1, height: 5, background: "var(--surface-4)", borderRadius: 999, boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)" }}>
          <div style={{ position: "absolute", inset: 0, width: `${v}%`, background: "linear-gradient(90deg, var(--ink-3), var(--ink-0))", borderRadius: 999 }} />
          <div style={{ position: "absolute", top: "50%", left: `${v}%`, transform: "translate(-50%,-50%)", width: 13, height: 13, borderRadius: "50%", background: "var(--ink-0)", boxShadow: "0 2px 5px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.8)" }} />
        </div>
        {showValue && <span className="ars-tnum" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-3)", minWidth: 38, textAlign: "right" }}>{Math.round(v)}%</span>}
      </div>
    );
  }

  function Input({ label, icon, type = "text", style = {}, wrap = {}, ...rest }) {
    return (
      <label style={{ display: "flex", flexDirection: "column", gap: 9, ...wrap }}>
        {label && <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-3)" }}>{label}</span>}
        <span style={{ position: "relative", display: "flex", alignItems: "center" }}>
          {icon && <span style={{ position: "absolute", left: 14, display: "inline-flex", color: "var(--ink-3)", pointerEvents: "none" }}><A name={icon} size={16} /></span>}
          <input type={type} {...rest} style={{ width: "100%", height: 48, padding: icon ? "0 16px 0 42px" : "0 16px", background: "var(--surface-3)", color: "var(--ink-0)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", fontFamily: "var(--font-text)", fontSize: 15, outline: "none", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.35)", transition: "border-color .18s, box-shadow .18s", ...style }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent-line)"; e.currentTarget.style.boxShadow = "inset 0 1px 2px rgba(0,0,0,0.35), var(--glow-focus)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-default)"; e.currentTarget.style.boxShadow = "inset 0 1px 2px rgba(0,0,0,0.35)"; }} />
        </span>
      </label>
    );
  }

  function Switch({ checked, onChange, disabled, style = {} }) {
    return (
      <button role="switch" aria-checked={!!checked} disabled={disabled} onClick={() => !disabled && onChange && onChange(!checked)} style={{ position: "relative", width: 46, height: 28, flex: "none", borderRadius: 999, border: "none", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, background: checked ? "var(--coral)" : "var(--surface-4)", boxShadow: checked ? "var(--glow-accent-sm)" : "inset 0 0 0 1px var(--border-default)", transition: "background .2s var(--ease-out), box-shadow .2s", padding: 0, ...style }}>
        <span style={{ position: "absolute", top: 3, left: 3, width: 22, height: 22, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.5)", transform: checked ? "translateX(18px)" : "translateX(0)", transition: "transform .2s var(--ease-out)" }} />
      </button>
    );
  }

  function FilterChip({ children, selected, icon, onClick, style = {} }) {
    return (
      <button onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 7, height: 34, padding: "0 15px", borderRadius: 999, fontFamily: "var(--font-text)", fontSize: 14, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", background: selected ? "var(--coral)" : "var(--surface-3)", color: selected ? "var(--on-coral)" : "var(--fg2)", border: `1px solid ${selected ? "var(--coral-press)" : "var(--border-default)"}`, boxShadow: selected ? "var(--glow-accent-sm)" : "none", transition: "all .2s var(--ease-out)", ...style }}>
        {icon && <A name={icon} size={15} />}{children}
      </button>
    );
  }

  function Segmented({ options = [], value, onChange, chips, style = {} }) {
    const items = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
    if (chips) {
      return (
        <div style={{ display: "inline-flex", gap: 10, flexWrap: "wrap", ...style }}>
          {items.map((it) => { const a = it.value === value; return (
            <button key={it.value} onClick={() => onChange && onChange(it.value)} style={{ height: 40, padding: "0 16px", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-text)", fontSize: 14, fontWeight: 500, cursor: "pointer", background: a ? "var(--accent-soft)" : "var(--surface-3)", color: a ? "var(--accent-ink)" : "var(--ink-1)", border: `1px solid ${a ? "var(--accent-line)" : "var(--border-default)"}`, transition: "all .18s" }}>{it.label}</button>
          ); })}
        </div>
      );
    }
    return (
      <div style={{ display: "inline-flex", padding: 4, gap: 4, borderRadius: "var(--radius-md)", background: "var(--surface-2)", border: "1px solid var(--border-subtle)", ...style }}>
        {items.map((it) => { const a = it.value === value; return (
          <button key={it.value} onClick={() => onChange && onChange(it.value)} style={{ flex: 1, height: 40, padding: "0 22px", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-text)", fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", background: a ? "var(--accent-soft)" : "transparent", color: a ? "var(--ink-0)" : "var(--ink-3)", border: `1px solid ${a ? "var(--accent-line)" : "transparent"}`, transition: "all .18s" }}>{it.label}</button>
        ); })}
      </div>
    );
  }

  function Tabs({ tabs = [], value, onChange, style = {} }) {
    const items = tabs.map((t) => (typeof t === "string" ? { value: t, label: t } : t));
    return (
      <div style={{ display: "inline-flex", padding: 5, gap: 4, borderRadius: "var(--radius-md)", background: "var(--surface-2)", border: "1px solid var(--border-subtle)", ...style }}>
        {items.map((it) => { const a = it.value === value; return (
          <button key={it.value} onClick={() => onChange && onChange(it.value)} style={{ height: 38, padding: "0 20px", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-text)", fontSize: 14, fontWeight: 600, cursor: "pointer", background: a ? "var(--surface-4)" : "transparent", color: a ? "var(--ink-0)" : "var(--ink-3)", border: "none", boxShadow: a ? "var(--edge-light)" : "none", transition: "all .18s" }}>{it.label}</button>
        ); })}
      </div>
    );
  }

  function Card({ children, panel, interactive, glow, onClick, className = "", style = {} }) {
    if (panel) {
      return (
        <div onClick={onClick} className={("ars-glass " + className).trim()} style={{ borderRadius: "var(--radius-2xl)", boxShadow: glow ? "var(--edge-light), 0 0 0 1px var(--accent-line), var(--glow-accent), var(--shadow-panel)" : undefined, transition: "box-shadow .2s var(--ease-out)", ...style }}>
          {children}
        </div>
      );
    }
    const rest = "var(--shadow-sm)";
    const base = { background: "var(--surface-2)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", boxShadow: glow ? "0 0 0 1px var(--accent-line), var(--glow-accent-sm)" : rest, transition: "transform .2s var(--ease-out), box-shadow .2s var(--ease-out), border-color .2s var(--ease-out)" };
    return (
      <div onClick={onClick} className={className} style={{ ...base, ...style }}
        onMouseEnter={(e) => { if (!interactive) return; e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
        onMouseLeave={(e) => { if (!interactive) return; e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = rest; }}>
        {children}
      </div>
    );
  }

  function Label({ children, style = {} }) {
    return <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-3)", ...style }}>{children}</span>;
  }

  Object.assign(window, { ABtn: Button, AIconBtn: IconButton, ATag: Tag, AStatus: StatusPill, ABadge: Badge, AAvatar: Avatar, AProgress: ProgressMeter, AInput: Input, ASwitch: Switch, AChip: FilterChip, ASeg: Segmented, ATabs: Tabs, ACard: Card, ALabel: Label, aMesh: mesh });
})();
