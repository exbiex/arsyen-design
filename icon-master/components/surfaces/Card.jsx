import React from "react";

/**
 * Arsyen Card — the base surface. `as="panel"` for floating panels (darker,
 * larger radius); default is a card. `interactive` adds hover lift.
 */
export function Card({
  children,
  as = "card",
  interactive = false,
  glow = false,
  padding,
  style = {},
  ...rest
}) {
  const isPanel = as === "panel";
  const base = {
    background: isPanel ? "var(--surface-1)" : "var(--surface-2)",
    border: "1px solid var(--border-subtle)",
    borderRadius: isPanel ? "var(--radius-xl)" : "var(--radius-lg)",
    boxShadow: glow ? "var(--glow-accent-sm)" : (isPanel ? "var(--edge-light), var(--shadow-md)" : "var(--edge-light)"),
    padding: padding != null ? padding : (isPanel ? "var(--pad-panel)" : "var(--pad-card)"),
    transition: "transform var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)",
  };
  return (
    <div
      style={{ ...base, ...style }}
      onMouseEnter={(e) => {
        if (!interactive) return;
        e.currentTarget.style.borderColor = "var(--border-default)";
        e.currentTarget.style.background = isPanel ? "var(--surface-1)" : "var(--surface-3)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        if (!interactive) return;
        e.currentTarget.style.borderColor = "var(--border-subtle)";
        e.currentTarget.style.background = isPanel ? "var(--surface-1)" : "var(--surface-2)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
