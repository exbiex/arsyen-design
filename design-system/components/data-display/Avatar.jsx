import React from "react";

const ARS_MESH = {
  coral: "ars-mesh ars-mesh--coral",
  ember: "ars-mesh ars-mesh--ember",
  violet: "ars-mesh ars-mesh--violet",
  azure: "ars-mesh ars-mesh--azure",
  verdant: "ars-mesh ars-mesh--verdant",
};

/**
 * Arsyen Avatar — circular, gradient-mesh fallback, optional coral ring
 * (marks "you") and presence dot. Pass `src` for a real image.
 */
export function Avatar({
  src,
  alt = "",
  size = 40,
  mesh = "coral",
  ring = false,
  presence = false,
  initials,
  style = {},
  ...rest
}) {
  const meshClass = !src ? (ARS_MESH[mesh] || ARS_MESH.coral) : "";
  return (
    <span
      style={{ position: "relative", display: "inline-flex", flex: "none", width: size, height: size, ...style }}
      {...rest}
    >
      <span
        className={meshClass}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          overflow: "hidden",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          border: ring ? "2px solid var(--accent)" : "1px solid var(--border-default)",
          boxShadow: ring ? "var(--glow-accent-sm)" : "none",
          background: src ? "var(--surface-3)" : undefined,
        }}
      >
        {src
          ? <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : initials
            ? <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: size * 0.4, color: "#fff", mixBlendMode: "overlay" }}>{initials}</span>
            : null}
      </span>
      {presence && (
        <span style={{
          position: "absolute", right: -1, bottom: -1,
          width: Math.max(8, size * 0.26), height: Math.max(8, size * 0.26),
          borderRadius: "50%", background: "var(--presence-online)",
          border: "2px solid var(--bg-canvas)",
        }} />
      )}
    </span>
  );
}
