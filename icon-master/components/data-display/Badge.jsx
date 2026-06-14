import React from "react";

/**
 * Arsyen Badge — small mono marker for match %, counts and metadata.
 */
export function Badge({ children, tone = "neutral", style = {}, ...rest }) {
  const tones = {
    neutral: { c: "var(--ink-2)", bg: "var(--surface-3)", bd: "var(--border-subtle)" },
    accent:  { c: "var(--accent-ink)", bg: "var(--accent-soft)", bd: "var(--accent-line)" },
    done:    { c: "var(--done)", bg: "var(--done-soft)", bd: "transparent" },
    outline: { c: "var(--ink-2)", bg: "transparent", bd: "var(--border-default)" },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.02em",
        color: t.c,
        background: t.bg,
        border: `1px solid ${t.bd}`,
        borderRadius: "var(--radius-full)",
        padding: "3px 9px",
        lineHeight: 1.1,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
