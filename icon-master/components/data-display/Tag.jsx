import React from "react";

/**
 * Arsyen Tag — a low-key mono label chip (script, camera, locations).
 * Optional remove affordance.
 */
export function Tag({ children, onRemove, style = {}, ...rest }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.01em",
        color: "var(--ink-2)",
        background: "var(--surface-3)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-xs)",
        padding: "4px 8px",
        lineHeight: 1.1,
        ...style,
      }}
      {...rest}
    >
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          aria-label="Remove"
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            background: "transparent", border: "none", padding: 0, marginRight: -1,
            color: "var(--ink-3)", cursor: "pointer", fontSize: 12, lineHeight: 1,
          }}
        >×</button>
      )}
    </span>
  );
}
