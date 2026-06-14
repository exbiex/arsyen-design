import React from "react";

/**
 * Arsyen Button — the coral-red CTA and its quieter siblings.
 * Primary carries the signature glow halo.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  icon = null,
  iconRight = null,
  glow = true,
  fullWidth = false,
  disabled = false,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { height: 32, padding: "0 12px", fontSize: 13, radius: "var(--radius-sm)", gap: 7 },
    md: { height: 42, padding: "0 18px", fontSize: 14, radius: "var(--radius-md)", gap: 9 },
    lg: { height: 52, padding: "0 24px", fontSize: 15, radius: "var(--radius-md)", gap: 10 },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    primary: {
      background: "var(--accent)",
      color: "var(--on-accent)",
      border: "1px solid transparent",
      boxShadow: glow ? "var(--glow-accent)" : "none",
    },
    secondary: {
      background: "var(--surface-3)",
      color: "var(--ink-0)",
      border: "1px solid var(--border-default)",
      boxShadow: "var(--edge-light)",
    },
    ghost: {
      background: "transparent",
      color: "var(--ink-1)",
      border: "1px solid transparent",
      boxShadow: "none",
    },
    outline: {
      background: "transparent",
      color: "var(--ink-0)",
      border: "1px solid var(--border-strong)",
      boxShadow: "none",
    },
    danger: {
      background: "var(--surface-3)",
      color: "var(--accent-ink)",
      border: "1px solid var(--accent-line)",
      boxShadow: "none",
    },
  };
  const v = variants[variant] || variants.primary;

  return (
    <button
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        height: s.height,
        padding: s.padding,
        width: fullWidth ? "100%" : "auto",
        borderRadius: s.radius,
        fontFamily: "var(--font-text)",
        fontSize: s.fontSize,
        fontWeight: 600,
        letterSpacing: "-0.005em",
        lineHeight: 1,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "transform var(--dur-fast) var(--ease-out), filter var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)",
        WebkitTapHighlightColor: "transparent",
        ...v,
        ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(0.97)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.filter = "brightness(1)"; }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.filter = variant === "primary" ? "brightness(1.06)" : "brightness(1.25)"; }}
      {...rest}
    >
      {icon && <span style={{ display: "inline-flex", marginLeft: -2 }}>{icon}</span>}
      {children}
      {iconRight && <span style={{ display: "inline-flex", marginRight: -2 }}>{iconRight}</span>}
    </button>
  );
}
