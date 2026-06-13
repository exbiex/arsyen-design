import React from "react";

/**
 * Arsyen FilterChip — selectable pill. Selected = solid coral; otherwise
 * dark glass with a hairline border (Discover filters).
 */
export function FilterChip({ children, selected = false, icon = null, onClick, style = {}, ...rest }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        height: 36,
        padding: "0 16px",
        borderRadius: "var(--radius-full)",
        fontFamily: "var(--font-text)",
        fontSize: 14,
        fontWeight: 500,
        cursor: "pointer",
        whiteSpace: "nowrap",
        background: selected ? "var(--accent)" : "var(--surface-3)",
        color: selected ? "var(--on-accent)" : "var(--ink-1)",
        border: `1px solid ${selected ? "transparent" : "var(--border-default)"}`,
        boxShadow: selected ? "var(--glow-accent-sm)" : "none",
        transition: "background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)",
        WebkitTapHighlightColor: "transparent",
        ...style,
      }}
      {...rest}
    >
      {icon && <span style={{ display: "inline-flex" }}>{icon}</span>}
      {children}
    </button>
  );
}
