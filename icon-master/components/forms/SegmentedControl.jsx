import React from "react";

/**
 * Arsyen SegmentedControl — pill container of options. The active segment
 * is coral-tinted with a coral border (Settings "Pure black / Living",
 * ticket Column/Priority rows). Set `chips` for the row-of-pills style
 * where the active option is coral text + coral border on dark.
 */
export function SegmentedControl({ options = [], value, onChange, chips = false, style = {}, ...rest }) {
  const items = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));

  if (chips) {
    return (
      <div style={{ display: "inline-flex", gap: 10, flexWrap: "wrap", ...style }} {...rest}>
        {items.map((it) => {
          const active = it.value === value;
          return (
            <button key={it.value} onClick={() => onChange && onChange(it.value)}
              style={{
                height: 40, padding: "0 16px", borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-text)", fontSize: 14, fontWeight: 500, cursor: "pointer",
                background: active ? "var(--accent-soft)" : "var(--surface-3)",
                color: active ? "var(--accent-ink)" : "var(--ink-1)",
                border: `1px solid ${active ? "var(--accent-line)" : "var(--border-default)"}`,
                transition: "all var(--dur-base) var(--ease-out)", WebkitTapHighlightColor: "transparent",
              }}>
              {it.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{
      display: "inline-flex", padding: 4, gap: 4, borderRadius: "var(--radius-md)",
      background: "var(--surface-2)", border: "1px solid var(--border-subtle)", ...style,
    }} {...rest}>
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button key={it.value} onClick={() => onChange && onChange(it.value)}
            style={{
              flex: 1, height: 40, padding: "0 22px", borderRadius: "var(--radius-sm)",
              fontFamily: "var(--font-text)", fontSize: 14, fontWeight: 600, cursor: "pointer",
              whiteSpace: "nowrap",
              background: active ? "var(--accent-soft)" : "transparent",
              color: active ? "var(--ink-0)" : "var(--ink-3)",
              border: `1px solid ${active ? "var(--accent-line)" : "transparent"}`,
              transition: "all var(--dur-base) var(--ease-out)", WebkitTapHighlightColor: "transparent",
            }}>
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
