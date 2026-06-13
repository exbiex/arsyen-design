import React from "react";

/**
 * Arsyen IconButton — square, rounded, dark. Used across the dock,
 * panel headers and card actions (link, more, share, add).
 */
export function IconButton({
  children,
  size = "md",
  variant = "default",
  active = false,
  disabled = false,
  label,
  style = {},
  ...rest
}) {
  const sizes = { sm: 30, md: 38, lg: 46 };
  const dim = sizes[size] || sizes.md;

  const variants = {
    default: {
      background: "var(--surface-3)",
      color: active ? "var(--accent)" : "var(--ink-1)",
      border: "1px solid var(--border-default)",
    },
    ghost: {
      background: "transparent",
      color: active ? "var(--accent)" : "var(--ink-2)",
      border: "1px solid transparent",
    },
    accent: {
      background: "var(--accent-soft)",
      color: "var(--accent)",
      border: "1px solid var(--accent-line)",
    },
  };
  const v = variants[variant] || variants.default;

  return (
    <button
      aria-label={label}
      title={label}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dim,
        height: dim,
        borderRadius: "var(--radius-sm)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out)",
        WebkitTapHighlightColor: "transparent",
        ...v,
        ...style,
      }}
      onMouseEnter={(e) => { if (!disabled && variant === "default") e.currentTarget.style.background = "var(--surface-4)"; }}
      onMouseLeave={(e) => { if (variant === "default") e.currentTarget.style.background = "var(--surface-3)"; }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(0.92)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      {...rest}
    >
      {children}
    </button>
  );
}
