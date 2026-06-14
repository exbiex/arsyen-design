// Arsyen — Appearance: live theme / accent / radius switching.
// Proves themeability: one language, stable across every choice.
(function () {
  const A = window.AIcon;
  const ACCENTS = [["coral", "#ff555d"], ["blue", "#2f7bf6"], ["violet", "#8a5cff"], ["green", "#2bb673"], ["amber", "#f0a830"], ["rose", "#f3508a"]];
  const RADII = ["square", "soft", "round"];

  function apply(s) {
    const r = document.documentElement;
    r.setAttribute("data-theme", s.theme);
    r.setAttribute("data-accent", s.accent);
    r.setAttribute("data-radius", s.radius);
    r.setAttribute("data-backdrop", s.backdrop);
    r.classList.add("ars-themed");
  }
  function load() { try { return JSON.parse(localStorage.getItem("arsyen.appearance")) || {}; } catch (e) { return {}; } }

  function useAppearance() {
    const [s, setS] = React.useState(() => ({ theme: "black", accent: "coral", radius: "square", backdrop: "pure", ...load() }));
    React.useEffect(() => { apply(s); try { localStorage.setItem("arsyen.appearance", JSON.stringify(s)); } catch (e) {} }, [s]);
    return [s, setS];
  }

  function Seg({ options, value, onChange }) {
    return (
      <div style={{ display: "inline-flex", padding: 3, gap: 3, borderRadius: "var(--radius-md)", background: "var(--surface-3)", border: "1px solid var(--border-subtle)", width: "100%" }}>
        {options.map((o) => {
          const on = o.v === value;
          return (
            <button key={o.v} onClick={() => onChange(o.v)} style={{ flex: 1, height: 34, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, borderRadius: "var(--radius-sm)", border: "none", cursor: "pointer", background: on ? "var(--surface-1)" : "transparent", color: on ? "var(--fg1)" : "var(--fg3)", fontFamily: "var(--font-text)", fontSize: 13, fontWeight: 600, boxShadow: on ? "var(--shadow-sm)" : "none", transition: "all .15s" }}>
              {o.icon && <A name={o.icon} size={15} />}{o.label}
            </button>
          );
        })}
      </div>
    );
  }

  function AppearancePopover({ s, setS, onClose }) {
    const set = (k, v) => setS({ ...s, [k]: v });
    return (
      <div className="ars-glass ars-glass--strong" style={{ position: "absolute", bottom: 64, right: 0, width: 300, borderRadius: "var(--radius-2xl)", padding: 20, zIndex: 300, display: "flex", flexDirection: "column", gap: 18, animation: "ars-pop-in .22s var(--ease-out)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: "var(--fg1)" }}>Appearance</div>
          <A name="sparkle" size={16} color="var(--accent)" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--fg3)" }}>Theme</span>
          <Seg options={[{ v: "black", label: "Pure Black", icon: "moon" }, { v: "light", label: "Light", icon: "sun" }]} value={s.theme} onChange={(v) => set("theme", v)} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--fg3)" }}>Backdrop</span>
          <Seg options={[{ v: "pure", label: "Pure", icon: "moon" }, { v: "living", label: "Living", icon: "sparkle" }]} value={s.backdrop} onChange={(v) => set("backdrop", v)} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--fg3)" }}>Accent</span>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {ACCENTS.map(([k, c]) => {
              const on = s.accent === k;
              return <button key={k} onClick={() => set("accent", k)} aria-label={k} style={{ width: 30, height: 30, borderRadius: "50%", background: c, border: "none", cursor: "pointer", boxShadow: on ? "0 0 0 2px var(--surface-1), 0 0 0 4px " + c + ", 0 4px 12px " + c + "66" : "0 1px 3px rgba(0,0,0,.4)", transition: "box-shadow .18s" }} />;
            })}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--fg3)" }}>Corner radius</span>
          <Seg options={RADII.map((r) => ({ v: r, label: r[0].toUpperCase() + r.slice(1) }))} value={s.radius} onChange={(v) => set("radius", v)} />
        </div>
        <div style={{ fontSize: 12, color: "var(--fg3)", lineHeight: 1.4, borderTop: "1px solid var(--border-subtle)", paddingTop: 12 }}>One language — stable across every theme, accent and shape.</div>
      </div>
    );
  }

  window.ArsAppearance = { useAppearance, AppearancePopover };
})();
