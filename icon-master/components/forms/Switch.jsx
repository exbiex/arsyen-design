import React from "react";

/**
 * Arsyen Switch — pill toggle. On = coral track + white knob + faint glow.
 */
export function Switch({ checked = false, onChange, disabled = false, style = {}, ...rest }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange && onChange(!checked)}
      style={{
        position: "relative",
        width: 50,
        height: 30,
        flex: "none",
        borderRadius: "var(--radius-full)",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        background: checked ? "var(--accent)" : "var(--surface-4)",
        boxShadow: checked ? "var(--glow-accent-sm)" : "inset 0 0 0 1px var(--border-default)",
        transition: "background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
        WebkitTapHighlightColor: "transparent",
        padding: 0,
        ...style,
      }}
      {...rest}
    >
      <span style={{
        position: "absolute", top: 3, left: 3,
        width: 24, height: 24, borderRadius: "50%",
        background: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
        transform: checked ? "translateX(20px)" : "translateX(0)",
        transition: "transform var(--dur-base) var(--ease-spring)",
      }} />
    </button>
  );
}
