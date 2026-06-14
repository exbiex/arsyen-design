import React from "react";

/**
 * Arsyen Tabs — pill group. Active tab gets a light fill; the rest are
 * muted (Board / Action Plans / Files).
 */
export function Tabs({ tabs = [], value, onChange, style = {}, ...rest }) {
  const items = tabs.map((t) => (typeof t === "string" ? { value: t, label: t } : t));
  return (
    <div style={{
      display: "inline-flex", padding: 5, gap: 4, borderRadius: "var(--radius-md)",
      background: "var(--surface-2)", border: "1px solid var(--border-subtle)", ...style,
    }} {...rest}>
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button key={it.value} onClick={() => onChange && onChange(it.value)}
            style={{
              height: 38, padding: "0 20px", borderRadius: "var(--radius-sm)",
              fontFamily: "var(--font-text)", fontSize: 14, fontWeight: 600, cursor: "pointer",
              whiteSpace: "nowrap",
              background: active ? "var(--surface-4)" : "transparent",
              color: active ? "var(--ink-0)" : "var(--ink-3)",
              border: "none",
              boxShadow: active ? "var(--edge-light)" : "none",
              transition: "all var(--dur-base) var(--ease-out)", WebkitTapHighlightColor: "transparent",
            }}>
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
