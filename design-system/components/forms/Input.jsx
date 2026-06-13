import React from "react";

/**
 * Arsyen Input — dark field with a mono uppercase label and optional
 * leading icon. Focus lights a coral ring.
 */
export function Input({
  label,
  icon = null,
  hint,
  type = "text",
  style = {},
  containerStyle = {},
  ...rest
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 9, ...containerStyle }}>
      {label && (
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "var(--ink-3)",
        }}>{label}</span>
      )}
      <span style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {icon && (
          <span style={{ position: "absolute", left: 14, display: "inline-flex", color: "var(--ink-3)", pointerEvents: "none" }}>{icon}</span>
        )}
        <input
          type={type}
          style={{
            width: "100%",
            height: 48,
            padding: icon ? "0 16px 0 42px" : "0 16px",
            background: "var(--surface-3)",
            color: "var(--ink-0)",
            border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-md)",
            fontFamily: "var(--font-text)",
            fontSize: 15,
            outline: "none",
            transition: "border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
            ...style,
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--accent-line)";
            e.currentTarget.style.boxShadow = "var(--glow-focus)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--border-default)";
            e.currentTarget.style.boxShadow = "none";
          }}
          {...rest}
        />
      </span>
      {hint && <span style={{ fontFamily: "var(--font-text)", fontSize: 13, color: "var(--ink-3)" }}>{hint}</span>}
    </label>
  );
}
