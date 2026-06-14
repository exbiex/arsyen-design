import React from "react";

/**
 * Arsyen ProgressMeter — thin track with a draggable-looking knob and a
 * mono % readout, as on project cards.
 */
export function ProgressMeter({ value = 0, showValue = true, width = "100%", style = {}, ...rest }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, width, ...style }} {...rest}>
      <div style={{ position: "relative", flex: 1, height: 4, background: "var(--surface-4)", borderRadius: "var(--radius-full)" }}>
        <div style={{ position: "absolute", inset: 0, width: `${v}%`, background: "var(--ink-2)", borderRadius: "var(--radius-full)" }} />
        <div style={{
          position: "absolute", top: "50%", left: `${v}%`,
          transform: "translate(-50%, -50%)",
          width: 12, height: 12, borderRadius: "50%",
          background: "var(--ink-0)", border: "1px solid var(--border-strong)",
          boxShadow: "var(--shadow-xs)",
        }} />
      </div>
      {showValue && (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-3)", minWidth: 38, textAlign: "right" }}>
          {Math.round(v)}%
        </span>
      )}
    </div>
  );
}
