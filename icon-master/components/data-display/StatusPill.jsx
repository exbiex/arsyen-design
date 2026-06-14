import React from "react";

const ARS_STATUS = {
  planning: { c: "var(--planning)", bg: "var(--planning-soft)" },
  medium:   { c: "var(--planning)", bg: "var(--planning-soft)" },
  high:     { c: "var(--high)", bg: "var(--high-soft)" },
  urgent:   { c: "var(--urgent)", bg: "var(--urgent-soft)" },
  low:      { c: "var(--low)", bg: "var(--low-soft)" },
  review:   { c: "var(--review)", bg: "var(--review-soft)" },
  done:     { c: "var(--done)", bg: "var(--done-soft)" },
};

/**
 * Arsyen StatusPill — colored dot + label for project status and ticket
 * priority. `tone` picks the semantic color.
 */
export function StatusPill({ tone = "planning", children, dot = true, solid = false, style = {}, ...rest }) {
  const t = ARS_STATUS[tone] || ARS_STATUS.planning;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        letterSpacing: "0.02em",
        color: t.c,
        background: solid ? "transparent" : t.bg,
        borderRadius: "var(--radius-full)",
        padding: solid ? "0" : "4px 11px 4px 9px",
        lineHeight: 1.1,
        ...style,
      }}
      {...rest}
    >
      {dot && <span style={{ width: 7, height: 7, borderRadius: "50%", background: t.c, flex: "none" }} />}
      {children}
    </span>
  );
}
