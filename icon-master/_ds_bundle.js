/* @ds-bundle: {"format":3,"namespace":"ArsyenDesignSystem_992fe7","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Avatar","sourcePath":"components/data-display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/data-display/Badge.jsx"},{"name":"ProgressMeter","sourcePath":"components/data-display/ProgressMeter.jsx"},{"name":"StatusPill","sourcePath":"components/data-display/StatusPill.jsx"},{"name":"Tag","sourcePath":"components/data-display/Tag.jsx"},{"name":"FilterChip","sourcePath":"components/forms/FilterChip.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"b7c9f45b4e3e","components/buttons/IconButton.jsx":"ed0247a60f47","components/data-display/Avatar.jsx":"21c89101cd77","components/data-display/Badge.jsx":"21c40cb869fd","components/data-display/ProgressMeter.jsx":"741d4ee9a2fd","components/data-display/StatusPill.jsx":"bf72beec73cd","components/data-display/Tag.jsx":"7b78df84cb5a","components/forms/FilterChip.jsx":"c89097c51459","components/forms/Input.jsx":"108489c9b6d7","components/forms/SegmentedControl.jsx":"2b0fb7ea671b","components/forms/Switch.jsx":"f0eec811be64","components/navigation/Tabs.jsx":"eeb3d8c7f151","components/surfaces/Card.jsx":"ced7799f7c88","icon-master/design-canvas.jsx":"bd8746af6e58","ui_kits/iphone/ios-frame.jsx":"be3343be4b51","ui_kits/iphone/screens.jsx":"d177f6012f7c","ui_kits/mac/appearance.jsx":"c344f0201934","ui_kits/mac/icons.jsx":"76f74a244a07","ui_kits/mac/screens_board.jsx":"9d86a9d64810","ui_kits/mac/screens_more.jsx":"f9b5a6d651c1","ui_kits/mac/ui.jsx":"ff64dcd98c09","ui_kits/mac/work.jsx":"2bd5cdefe794","ui_kits/mac/work_space.jsx":"dbde2a96ee80","ui_kits/mac/work_views.jsx":"6320de6adb41","ui_kits/web/browser-window.jsx":"7afe17ad52c6","ui_kits/web/screens.jsx":"6f9b8bca514d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ArsyenDesignSystem_992fe7 = window.ArsyenDesignSystem_992fe7 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Arsyen Button — the coral-red CTA and its quieter siblings.
 * Primary carries the signature glow halo.
 */
function Button({
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
    sm: {
      height: 32,
      padding: "0 12px",
      fontSize: 13,
      radius: "var(--radius-sm)",
      gap: 7
    },
    md: {
      height: 42,
      padding: "0 18px",
      fontSize: 14,
      radius: "var(--radius-md)",
      gap: 9
    },
    lg: {
      height: 52,
      padding: "0 24px",
      fontSize: 15,
      radius: "var(--radius-md)",
      gap: 10
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: "var(--accent)",
      color: "var(--on-accent)",
      border: "1px solid transparent",
      boxShadow: glow ? "var(--glow-accent)" : "none"
    },
    secondary: {
      background: "var(--surface-3)",
      color: "var(--ink-0)",
      border: "1px solid var(--border-default)",
      boxShadow: "var(--edge-light)"
    },
    ghost: {
      background: "transparent",
      color: "var(--ink-1)",
      border: "1px solid transparent",
      boxShadow: "none"
    },
    outline: {
      background: "transparent",
      color: "var(--ink-0)",
      border: "1px solid var(--border-strong)",
      boxShadow: "none"
    },
    danger: {
      background: "var(--surface-3)",
      color: "var(--accent-ink)",
      border: "1px solid var(--accent-line)",
      boxShadow: "none"
    }
  };
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    style: {
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
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = "scale(0.97)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "scale(1)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.filter = "brightness(1)";
    },
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.filter = variant === "primary" ? "brightness(1.06)" : "brightness(1.25)";
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      marginLeft: -2
    }
  }, icon), children, iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      marginRight: -2
    }
  }, iconRight));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Arsyen IconButton — square, rounded, dark. Used across the dock,
 * panel headers and card actions (link, more, share, add).
 */
function IconButton({
  children,
  size = "md",
  variant = "default",
  active = false,
  disabled = false,
  label,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: 30,
    md: 38,
    lg: 46
  };
  const dim = sizes[size] || sizes.md;
  const variants = {
    default: {
      background: "var(--surface-3)",
      color: active ? "var(--accent)" : "var(--ink-1)",
      border: "1px solid var(--border-default)"
    },
    ghost: {
      background: "transparent",
      color: active ? "var(--accent)" : "var(--ink-2)",
      border: "1px solid transparent"
    },
    accent: {
      background: "var(--accent-soft)",
      color: "var(--accent)",
      border: "1px solid var(--accent-line)"
    }
  };
  const v = variants[variant] || variants.default;
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    disabled: disabled,
    style: {
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
      ...style
    },
    onMouseEnter: e => {
      if (!disabled && variant === "default") e.currentTarget.style.background = "var(--surface-4)";
    },
    onMouseLeave: e => {
      if (variant === "default") e.currentTarget.style.background = "var(--surface-3)";
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = "scale(0.92)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "scale(1)";
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ARS_MESH = {
  coral: "ars-mesh ars-mesh--coral",
  ember: "ars-mesh ars-mesh--ember",
  violet: "ars-mesh ars-mesh--violet",
  azure: "ars-mesh ars-mesh--azure",
  verdant: "ars-mesh ars-mesh--verdant"
};

/**
 * Arsyen Avatar — circular, gradient-mesh fallback, optional coral ring
 * (marks "you") and presence dot. Pass `src` for a real image.
 */
function Avatar({
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
  const meshClass = !src ? ARS_MESH[mesh] || ARS_MESH.coral : "";
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: "relative",
      display: "inline-flex",
      flex: "none",
      width: size,
      height: size,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: meshClass,
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      overflow: "hidden",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      border: ring ? "2px solid var(--accent)" : "1px solid var(--border-default)",
      boxShadow: ring ? "var(--glow-accent-sm)" : "none",
      background: src ? "var(--surface-3)" : undefined
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: size * 0.4,
      color: "#fff",
      mixBlendMode: "overlay"
    }
  }, initials) : null), presence && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: -1,
      bottom: -1,
      width: Math.max(8, size * 0.26),
      height: Math.max(8, size * 0.26),
      borderRadius: "50%",
      background: "var(--presence-online)",
      border: "2px solid var(--bg-canvas)"
    }
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Arsyen Badge — small mono marker for match %, counts and metadata.
 */
function Badge({
  children,
  tone = "neutral",
  style = {},
  ...rest
}) {
  const tones = {
    neutral: {
      c: "var(--ink-2)",
      bg: "var(--surface-3)",
      bd: "var(--border-subtle)"
    },
    accent: {
      c: "var(--accent-ink)",
      bg: "var(--accent-soft)",
      bd: "var(--accent-line)"
    },
    done: {
      c: "var(--done)",
      bg: "var(--done-soft)",
      bd: "transparent"
    },
    outline: {
      c: "var(--ink-2)",
      bg: "transparent",
      bd: "var(--border-default)"
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data-display/ProgressMeter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Arsyen ProgressMeter — thin track with a draggable-looking knob and a
 * mono % readout, as on project cards.
 */
function ProgressMeter({
  value = 0,
  showValue = true,
  width = "100%",
  style = {},
  ...rest
}) {
  const v = Math.max(0, Math.min(100, value));
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      width,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1,
      height: 4,
      background: "var(--surface-4)",
      borderRadius: "var(--radius-full)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      width: `${v}%`,
      background: "var(--ink-2)",
      borderRadius: "var(--radius-full)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "50%",
      left: `${v}%`,
      transform: "translate(-50%, -50%)",
      width: 12,
      height: 12,
      borderRadius: "50%",
      background: "var(--ink-0)",
      border: "1px solid var(--border-strong)",
      boxShadow: "var(--shadow-xs)"
    }
  })), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: "var(--ink-3)",
      minWidth: 38,
      textAlign: "right"
    }
  }, Math.round(v), "%"));
}
Object.assign(__ds_scope, { ProgressMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/ProgressMeter.jsx", error: String((e && e.message) || e) }); }

// components/data-display/StatusPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ARS_STATUS = {
  planning: {
    c: "var(--planning)",
    bg: "var(--planning-soft)"
  },
  medium: {
    c: "var(--planning)",
    bg: "var(--planning-soft)"
  },
  high: {
    c: "var(--high)",
    bg: "var(--high-soft)"
  },
  urgent: {
    c: "var(--urgent)",
    bg: "var(--urgent-soft)"
  },
  low: {
    c: "var(--low)",
    bg: "var(--low-soft)"
  },
  review: {
    c: "var(--review)",
    bg: "var(--review-soft)"
  },
  done: {
    c: "var(--done)",
    bg: "var(--done-soft)"
  }
};

/**
 * Arsyen StatusPill — colored dot + label for project status and ticket
 * priority. `tone` picks the semantic color.
 */
function StatusPill({
  tone = "planning",
  children,
  dot = true,
  solid = false,
  style = {},
  ...rest
}) {
  const t = ARS_STATUS[tone] || ARS_STATUS.planning;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: t.c,
      flex: "none"
    }
  }), children);
}
Object.assign(__ds_scope, { StatusPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/StatusPill.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Arsyen Tag — a low-key mono label chip (script, camera, locations).
 * Optional remove affordance.
 */
function Tag({
  children,
  onRemove,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: "transparent",
      border: "none",
      padding: 0,
      marginRight: -1,
      color: "var(--ink-3)",
      cursor: "pointer",
      fontSize: 12,
      lineHeight: 1
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/FilterChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Arsyen FilterChip — selectable pill. Selected = solid coral; otherwise
 * dark glass with a hairline border (Discover filters).
 */
function FilterChip({
  children,
  selected = false,
  icon = null,
  onClick,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      height: 36,
      padding: "0 16px",
      borderRadius: "var(--radius-full)",
      fontFamily: "var(--font-text)",
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer",
      whiteSpace: "nowrap",
      background: selected ? "var(--accent)" : "var(--surface-3)",
      color: selected ? "var(--on-accent)" : "var(--ink-1)",
      border: `1px solid ${selected ? "transparent" : "var(--border-default)"}`,
      boxShadow: selected ? "var(--glow-accent-sm)" : "none",
      transition: "background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)",
      WebkitTapHighlightColor: "transparent",
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex"
    }
  }, icon), children);
}
Object.assign(__ds_scope, { FilterChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FilterChip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Arsyen Input — dark field with a mono uppercase label and optional
 * leading icon. Focus lights a coral ring.
 */
function Input({
  label,
  icon = null,
  hint,
  type = "text",
  style = {},
  containerStyle = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 9,
      ...containerStyle
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--ink-3)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center"
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 14,
      display: "inline-flex",
      color: "var(--ink-3)",
      pointerEvents: "none"
    }
  }, icon), /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    style: {
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
      ...style
    },
    onFocus: e => {
      e.currentTarget.style.borderColor = "var(--accent-line)";
      e.currentTarget.style.boxShadow = "var(--glow-focus)";
    },
    onBlur: e => {
      e.currentTarget.style.borderColor = "var(--border-default)";
      e.currentTarget.style.boxShadow = "none";
    }
  }, rest))), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-text)",
      fontSize: 13,
      color: "var(--ink-3)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Arsyen SegmentedControl — pill container of options. The active segment
 * is coral-tinted with a coral border (Settings "Pure black / Living",
 * ticket Column/Priority rows). Set `chips` for the row-of-pills style
 * where the active option is coral text + coral border on dark.
 */
function SegmentedControl({
  options = [],
  value,
  onChange,
  chips = false,
  style = {},
  ...rest
}) {
  const items = options.map(o => typeof o === "string" ? {
    value: o,
    label: o
  } : o);
  if (chips) {
    return /*#__PURE__*/React.createElement("div", _extends({
      style: {
        display: "inline-flex",
        gap: 10,
        flexWrap: "wrap",
        ...style
      }
    }, rest), items.map(it => {
      const active = it.value === value;
      return /*#__PURE__*/React.createElement("button", {
        key: it.value,
        onClick: () => onChange && onChange(it.value),
        style: {
          height: 40,
          padding: "0 16px",
          borderRadius: "var(--radius-sm)",
          fontFamily: "var(--font-text)",
          fontSize: 14,
          fontWeight: 500,
          cursor: "pointer",
          background: active ? "var(--accent-soft)" : "var(--surface-3)",
          color: active ? "var(--accent-ink)" : "var(--ink-1)",
          border: `1px solid ${active ? "var(--accent-line)" : "var(--border-default)"}`,
          transition: "all var(--dur-base) var(--ease-out)",
          WebkitTapHighlightColor: "transparent"
        }
      }, it.label);
    }));
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "inline-flex",
      padding: 4,
      gap: 4,
      borderRadius: "var(--radius-md)",
      background: "var(--surface-2)",
      border: "1px solid var(--border-subtle)",
      ...style
    }
  }, rest), items.map(it => {
    const active = it.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      onClick: () => onChange && onChange(it.value),
      style: {
        flex: 1,
        height: 40,
        padding: "0 22px",
        borderRadius: "var(--radius-sm)",
        fontFamily: "var(--font-text)",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap",
        background: active ? "var(--accent-soft)" : "transparent",
        color: active ? "var(--ink-0)" : "var(--ink-3)",
        border: `1px solid ${active ? "var(--accent-line)" : "transparent"}`,
        transition: "all var(--dur-base) var(--ease-out)",
        WebkitTapHighlightColor: "transparent"
      }
    }, it.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Arsyen Switch — pill toggle. On = coral track + white knob + faint glow.
 */
function Switch({
  checked = false,
  onChange,
  disabled = false,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    role: "switch",
    "aria-checked": checked,
    disabled: disabled,
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
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
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 3,
      left: 3,
      width: 24,
      height: 24,
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
      transform: checked ? "translateX(20px)" : "translateX(0)",
      transition: "transform var(--dur-base) var(--ease-spring)"
    }
  }));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Arsyen Tabs — pill group. Active tab gets a light fill; the rest are
 * muted (Board / Action Plans / Files).
 */
function Tabs({
  tabs = [],
  value,
  onChange,
  style = {},
  ...rest
}) {
  const items = tabs.map(t => typeof t === "string" ? {
    value: t,
    label: t
  } : t);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "inline-flex",
      padding: 5,
      gap: 4,
      borderRadius: "var(--radius-md)",
      background: "var(--surface-2)",
      border: "1px solid var(--border-subtle)",
      ...style
    }
  }, rest), items.map(it => {
    const active = it.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      onClick: () => onChange && onChange(it.value),
      style: {
        height: 38,
        padding: "0 20px",
        borderRadius: "var(--radius-sm)",
        fontFamily: "var(--font-text)",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap",
        background: active ? "var(--surface-4)" : "transparent",
        color: active ? "var(--ink-0)" : "var(--ink-3)",
        border: "none",
        boxShadow: active ? "var(--edge-light)" : "none",
        transition: "all var(--dur-base) var(--ease-out)",
        WebkitTapHighlightColor: "transparent"
      }
    }, it.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Arsyen Card — the base surface. `as="panel"` for floating panels (darker,
 * larger radius); default is a card. `interactive` adds hover lift.
 */
function Card({
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
    boxShadow: glow ? "var(--glow-accent-sm)" : isPanel ? "var(--edge-light), var(--shadow-md)" : "var(--edge-light)",
    padding: padding != null ? padding : isPanel ? "var(--pad-panel)" : "var(--pad-card)",
    transition: "transform var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      ...base,
      ...style
    },
    onMouseEnter: e => {
      if (!interactive) return;
      e.currentTarget.style.borderColor = "var(--border-default)";
      e.currentTarget.style.background = isPanel ? "var(--surface-1)" : "var(--surface-3)";
      e.currentTarget.style.transform = "translateY(-1px)";
    },
    onMouseLeave: e => {
      if (!interactive) return;
      e.currentTarget.style.borderColor = "var(--border-subtle)";
      e.currentTarget.style.background = isPanel ? "var(--surface-1)" : "var(--surface-2)";
      e.currentTarget.style.transform = "translateY(0)";
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// icon-master/design-canvas.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Exports (to window): DesignCanvas, DCSection, DCArtboard, DCPostIt.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>
//
// Artboards are static design frames, not scroll regions — never use
// height: 100% + overflow: auto/scroll on inner elements; size each artboard
// to fit its content (explicit pixel height, or let it grow).
/* END USAGE */

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
  // isolation:isolate contains artboard content's z-indexes so a
  // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
  // the .dc-menu popover that drops into the top of the card.
  '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}',
  // Per-artboard header: grip + label on the left, delete/expand on the
  // right. Single flex row; when the artboard's on-screen width is too
  // narrow for both the label yields (ellipsis, then hidden entirely below
  // ~4ch via the container query) and the buttons stay on the row.
  '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;', '  display:flex;align-items:center;container-type:inline-size}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}', '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;', '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
  // Below ~4ch of label room: hide the label entirely, and drop the grip to
  // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
  // until the card is moused.
  '@container (max-width: 110px){', '  .dc-labeltext{display:none}', '  .dc-grip{opacity:0}', '  [data-dc-slot]:hover .dc-grip{opacity:1}', '}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}', '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}', '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}', '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}', '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;', '  font:inherit;transition:background .12s,color .12s}', '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
  // Slot hosting an open menu floats above later siblings (which otherwise
  // paint on top — same z-index:auto, later DOM order) so the popup isn't
  // clipped by the next card.
  '[data-dc-slot]:has(.dc-menu){z-index:10}', '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;', '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}', '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;', '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;', '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}', '.dc-menu button:hover{background:rgba(0,0,0,.05)}', '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}', '.dc-menu .dc-danger{color:#c96442}', '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
  // Chrome (titles / labels / buttons) counter-scales against the viewport
  // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
  // DCViewport on every transform update and inherits to all descendants —
  // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
  // it the same way.
  //
  // The header uses transform:scale (out-of-flow, so layout impact doesn't
  // matter) with its world-space width set to card-width / inv-zoom so that
  // after counter-scaling its on-screen width exactly matches the card's —
  // that's what lets the container query + text-overflow behave against the
  // card's visible edge at every zoom level.
  //
  // The section head uses CSS zoom instead of transform so its layout box
  // grows with the counter-scale, pushing the card row down — otherwise the
  // constant-screen-size title would overflow into the (shrinking) world-
  // space gap and overlap the artboard headers at low zoom.
  '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));', '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}', '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, c => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach(sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach(ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? persisted.hidden || [] : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);
  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({
        type: '__dc_zoom',
        scale
      }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    }, 200);
  }, [tfKey]);
  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = {
          x: s.x,
          y: s.y,
          scale: Math.min(maxScale, Math.max(minScale, s.scale))
        };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null,
        markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) {
          t.y -= drift;
          apply();
        }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = e => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({
          type: '__dc_present'
        }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({
      type: '__dc_present'
    }, '*');
    lastPostedScale.current = undefined;
    apply();
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const sec = ctx && sid && ctx.section(sid) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map(a => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? sec.hidden || [] : [];
  const srcOrder = allIds.filter(k => !hidden.includes(k));
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-sectionhead",
    style: {
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onDelete: () => ctx && ctx.patchSection(sid, x => ({
      hidden: [...(x.srcKey === srcKey ? x.hidden || [] : []), k],
      srcKey
    })),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try {
    await document.fonts.ready;
  } catch {}
  const toDataURL = url => fetch(url).then(r => r.blob()).then(b => new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(url);
    fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [],
    pending = [],
    seen = new Set();
  const scrapeCss = href => {
    if (seen.has(href)) return;
    seen.add(href);
    pending.push(fetch(href).then(r => r.text()).then(css => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({
        css: m,
        base: href
      });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({
        css: r.cssText,
        base
      });else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try {
          walk(r.styleSheet.cssRules, ibase);
        } catch {
          scrapeCss(ibase);
        }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try {
      walk(ss.cssRules, base);
    } catch {
      if (ss.href) scrapeCss(ss.href);
    }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async rule => {
    let out = rule.css,
      m;
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    while (m = re.exec(rule.css)) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs;
      try {
        abs = new URL(m[2], rule.base).href;
      } catch {
        continue;
      }
      out = out.split(m[0]).join('url("' + (await toDataURL(abs)) + '")');
    }
    return out;
  }))).join('\n');
  const cloneStyled = src => {
    if (src.nodeType === 8 || src.nodeType === 1 && src.tagName === 'SCRIPT') return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src);
      let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try {
        const im = document.createElement('img');
        im.src = src.toDataURL();
        im.setAttribute('style', txt);
        return im;
      } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  const jobs = [];
  clone.querySelectorAll('img').forEach(el => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then(d => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach(el => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let m;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while (m = re.exec(bg)) {
      const tok = m[0],
        url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then(d => {
        el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")');
      }));
    }
  });
  await Promise.all(jobs);
  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' + (fontCss ? '<style>' + fontCss + '</style>' : '') + '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], {
      type: 'text/html'
    }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' + (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px;
  cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob(blob => save(blob, 'png'), 'image/png');
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus,
  onDelete
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) {
      setConfirming(false);
      return;
    }
    const off = e => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);
  const doExport = kind => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind).catch(e => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-header",
    "data-omelette-chrome": "",
    style: {
      color: DC.label
    },
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-btns"
  }, /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dc-kebab",
    title: "More",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2.5",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "6",
    r: "1.1"
  }))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dc-menu",
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('png')
  }, "Download PNG"), /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('html')
  }, "Download HTML"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    className: "dc-danger",
    onClick: () => {
      if (confirming) {
        setMenuOpen(false);
        onDelete();
      } else setConfirming(true);
    }
  }, confirming ? 'Click again to delete' : 'Delete'))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[((secIdx + d * i) % n + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) {
        ctx.setFocus(`${ns}/${first}`);
        return;
      }
    }
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.filter(sid => sectionMeta[sid].slotIds.length).map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "icon-master/design-canvas.jsx", error: String((e && e.message) || e) }); }

// ui_kits/iphone/ios-frame.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports (to window): IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard
//
// Usage — wrap your screen content in <IOSDevice> to get the bezel, status bar
// and home indicator (props: title, dark, keyboard):
//
//   <IOSDevice title="Settings">
//     ...your screen content...
//   </IOSDevice>
//   <IOSDevice dark title="Search" keyboard>…</IOSDevice>
/* END USAGE */

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({
  dark = false,
  time = '9:41'
}) {
  const c = dark ? '#fff' : '#000';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 154,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '21px 24px 19px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 20,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system, "SF Pro", system-ui',
      fontWeight: 590,
      fontSize: 17,
      lineHeight: '22px',
      color: c
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      paddingTop: 1,
      paddingRight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "12",
    viewBox: "0 0 19 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7.5",
    width: "3.2",
    height: "4.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.8",
    y: "5",
    width: "3.2",
    height: "7",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.6",
    y: "2.5",
    width: "3.2",
    height: "9.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14.4",
    y: "0",
    width: "3.2",
    height: "12",
    rx: "0.7",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z",
    fill: c
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.5",
    r: "1.5",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "27",
    height: "13",
    viewBox: "0 0 27 13"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "23",
    height: "12",
    rx: "3.5",
    stroke: c,
    strokeOpacity: "0.35",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "9",
    rx: "2",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z",
    fill: c,
    fillOpacity: "0.4"
  }))));
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({
  children,
  dark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      minWidth: 44,
      borderRadius: 9999,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: dark ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({
  title = 'Title',
  dark = false,
  trailingIcon = true
}) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = content => /*#__PURE__*/React.createElement(IOSGlassPill, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 62,
      paddingBottom: 10,
      position: 'relative',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px'
    }
  }, pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "20",
    viewBox: "0 0 12 20",
    fill: "none",
    style: {
      marginLeft: -1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 2L2 10l8 8",
    stroke: muted,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), trailingIcon && pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "6",
    viewBox: "0 0 22 6"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "3",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "3",
    r: "2.5",
    fill: muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      fontFamily: '-apple-system, system-ui',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: '41px',
      color: text,
      letterSpacing: 0.4
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({
  title,
  detail,
  icon,
  chevron = true,
  isLast = false,
  dark = false
}) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 52,
      padding: '0 16px',
      position: 'relative',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      letterSpacing: -0.43
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 7,
      background: icon,
      marginRight: 12,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: text
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sec,
      marginRight: 6
    }
  }, detail), chevron && /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l6 6-6 6",
    stroke: ter,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: icon ? 58 : 16,
      height: 0.5,
      background: sep
    }
  }));
}
function IOSList({
  header,
  children,
  dark = false
}) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return /*#__PURE__*/React.createElement("div", null, header && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '-apple-system, system-ui',
      fontSize: 13,
      color: hc,
      textTransform: 'uppercase',
      padding: '8px 36px 6px',
      letterSpacing: -0.08
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 26,
      margin: '0 16px',
      overflow: 'hidden'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children,
  width = 402,
  height = 874,
  dark = false,
  title,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 48,
      overflow: 'hidden',
      position: 'relative',
      background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 11,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 126,
      height: 37,
      borderRadius: 24,
      background: '#000',
      zIndex: 50
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement(IOSStatusBar, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, title !== undefined && /*#__PURE__*/React.createElement(IOSNavBar, {
    title: title,
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(IOSKeyboard, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 60,
      height: 34,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingBottom: 8,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 139,
      height: 5,
      borderRadius: 100,
      background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)'
    }
  })));
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({
  dark = false
}) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: /*#__PURE__*/React.createElement("svg", {
      width: "19",
      height: "17",
      viewBox: "0 0 19 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z",
      fill: glyph
    })),
    del: /*#__PURE__*/React.createElement("svg", {
      width: "23",
      height: "17",
      viewBox: "0 0 23 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z",
      fill: "none",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 5l7 7M17 5l-7 7",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinecap: "round"
    })),
    ret: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "14",
      viewBox: "0 0 20 14"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 1v6H4m0 0l4-4M4 7l4 4",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))
  };
  const key = (content, {
    w,
    flex,
    ret,
    fs = 25,
    k
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 42,
      borderRadius: 8.5,
      flex: flex ? 1 : undefined,
      width: w,
      minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs,
      fontWeight: 458,
      color: ret ? '#fff' : glyph
    }
  }, content);
  const row = (keys, pad = 0) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      justifyContent: 'center',
      padding: `0 ${pad}px`
    }
  }, keys.map(l => key(l, {
    flex: true,
    k: l
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 15,
      borderRadius: 27,
      overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: dark ? '0 -2px 20px rgba(0,0,0,0.09)' : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: '8px 22px 13px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, ['"The"', 'the', 'to'].map((w, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 25,
      background: '#ccc',
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      color: sugg,
      letterSpacing: -0.43,
      lineHeight: '22px'
    }
  }, w)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      padding: '0 6.5px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 20), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14.25,
      alignItems: 'center'
    }
  }, key(icons.shift, {
    w: 45,
    k: 'shift'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      flex: 1
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l, {
    flex: true,
    k: l
  }))), key(icons.del, {
    w: 45,
    k: 'del'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, key('ABC', {
    w: 92.25,
    fs: 18,
    k: 'abc'
  }), key('', {
    flex: true,
    k: 'space'
  }), key(icons.ret, {
    w: 92.25,
    ret: true,
    k: 'ret'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      width: '100%',
      position: 'relative'
    }
  }));
}
Object.assign(window, {
  IOSDevice,
  IOSStatusBar,
  IOSNavBar,
  IOSGlassPill,
  IOSList,
  IOSListRow,
  IOSKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/iphone/ios-frame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/iphone/screens.jsx
try { (() => {
// Arsyen iPhone kit — screens + tab bar. Reuses ../mac icons & primitives.
(function () {
  const A = window.AIcon;
  const {
    ABtn,
    AIconBtn,
    ATag,
    AStatus,
    ABadge,
    AAvatar,
    AInput,
    AChip,
    ASeg,
    ATabs,
    ACard,
    ALabel,
    AProgress
  } = window;
  const PROJECTS = [{
    id: "sinners",
    name: "SINNERS",
    type: "Feature film",
    tone: "planning",
    status: "PLANNING",
    pct: 11,
    hue: "ember"
  }, {
    id: "test",
    name: "TEST",
    type: "Short film",
    tone: "planning",
    status: "PLANNING",
    pct: 100,
    hue: "violet"
  }];
  const COLUMNS = {
    "To do": [{
      id: 1,
      title: "Lock final shooting script",
      pr: "high",
      prl: "High",
      tag: "script",
      comments: 1
    }, {
      id: 4,
      title: "Build shot list for Act I",
      pr: "medium",
      prl: "Medium",
      tag: "camera"
    }, {
      id: 5,
      title: "Rent anamorphic lens kit",
      pr: "low",
      prl: "Low",
      tag: "gear"
    }],
    "In progress": [{
      id: 2,
      title: "Cast the two leads",
      pr: "high",
      prl: "High",
      tag: "casting"
    }, {
      id: 3,
      title: "Scout the harbor location",
      pr: "medium",
      prl: "Medium",
      tag: "locations"
    }],
    "Review": [{
      id: 6,
      title: "Storyboard the chase sequence",
      pr: "medium",
      prl: "Medium",
      tag: "camera"
    }, {
      id: 7,
      title: "Color grade the teaser",
      pr: "medium",
      prl: "Medium",
      tag: "post"
    }],
    "Done": [{
      id: 9,
      title: "Cut the announcement teaser",
      pr: "medium",
      prl: "Medium",
      tag: "post"
    }]
  };
  const ARTISTS = [{
    n: "Nadia Œ",
    r: "Photographer · Lisbon",
    m: 96,
    hue: "coral",
    tags: ["Analog", "Editorial", "Print"]
  }, {
    n: "Mara Vey",
    r: "Painter · Oslo",
    m: 93,
    hue: "azure",
    tags: ["Oil", "Portrait", "Set design"]
  }, {
    n: "Søren K.",
    r: "3D / Motion · Copenhagen",
    m: 84,
    hue: "ember",
    tags: ["Houdini", "Score"]
  }];
  const TOOLS = [{
    n: "Moodboard",
    k: "Visual",
    i: "palette"
  }, {
    n: "Color grade",
    k: "Visual",
    i: "image"
  }, {
    n: "Brief builder",
    k: "Docs",
    i: "file"
  }, {
    n: "Invoice",
    k: "Business",
    i: "briefcase"
  }, {
    n: "Call sheet",
    k: "Production",
    i: "users"
  }, {
    n: "Storyboard",
    k: "Production",
    i: "grid"
  }, {
    n: "Portfolio",
    k: "Profile",
    i: "star"
  }, {
    n: "Contract",
    k: "Business",
    i: "send"
  }];
  const Title = ({
    children,
    sub,
    action
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      padding: "6px 20px 18px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 32,
      color: "var(--ink-0)",
      letterSpacing: "-.02em"
    }
  }, children), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(ALabel, null, sub))), action);

  /* ---------- PROJECTS (home) ---------- */
  function ProjectsScreen({
    openProject
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 0 8px"
      }
    }, /*#__PURE__*/React.createElement(Title, {
      sub: "2 Active",
      action: /*#__PURE__*/React.createElement(AIconBtn, {
        name: "plus",
        label: "New"
      })
    }, "Projects"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: "0 20px"
      }
    }, PROJECTS.map(p => /*#__PURE__*/React.createElement(ACard, {
      key: p.id,
      interactive: true,
      onClick: () => openProject(p),
      style: {
        padding: 0,
        overflow: "hidden",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: window.aMesh(p.hue),
      style: {
        height: 132,
        position: "relative"
      },
      "data-grain": true
    }, /*#__PURE__*/React.createElement("div", {
      className: "ars-grain",
      style: {
        position: "absolute",
        inset: 0
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg,transparent,rgba(8,4,4,.88))"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: 16,
        bottom: 14
      }
    }, /*#__PURE__*/React.createElement(AStatus, {
      tone: p.tone,
      bare: true,
      style: {
        marginBottom: 6
      }
    }, p.status), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 26,
        color: "#fff",
        letterSpacing: "-.02em"
      }
    }, p.name))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--ink-3)"
      }
    }, p.type), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex"
      }
    }, /*#__PURE__*/React.createElement(AAvatar, {
      hue: "azure",
      size: 24
    }), /*#__PURE__*/React.createElement(AAvatar, {
      hue: "coral",
      size: 24,
      style: {
        marginLeft: -7
      }
    }))), /*#__PURE__*/React.createElement(AProgress, {
      value: p.pct
    }))))));
  }

  /* ---------- BOARD ---------- */
  function BoardScreen({
    project,
    back,
    openTicket
  }) {
    const p = project || PROJECTS[0];
    const [col, setCol] = React.useState("To do");
    const counts = Object.fromEntries(Object.entries(COLUMNS).map(([k, v]) => [k, v.length]));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 0 8px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 16px 12px"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: back,
      "aria-label": "Back",
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: "none",
        border: "none",
        color: "var(--ink-2)",
        fontSize: 15,
        cursor: "pointer",
        padding: "4px 0",
        fontFamily: "var(--font-text)"
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: "arrowLeft",
      size: 18
    }), " Projects")), /*#__PURE__*/React.createElement("div", {
      style: {
        margin: "0 16px",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        position: "relative",
        border: "1px solid var(--border-subtle)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: window.aMesh(p.hue) + " ars-grain",
      style: {
        height: 150
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg,rgba(0,0,0,.06),rgba(8,4,4,.92))"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: 18,
        bottom: 16,
        right: 18
      }
    }, /*#__PURE__*/React.createElement(AStatus, {
      tone: p.tone,
      bare: true,
      style: {
        marginBottom: 6
      }
    }, p.status), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 38,
        color: "#fff",
        letterSpacing: "-.03em",
        lineHeight: 1
      }
    }, p.name))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "18px 16px 14px",
        display: "flex",
        gap: 8,
        overflowX: "auto"
      }
    }, Object.keys(COLUMNS).map(k => /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => setCol(k),
      style: {
        flex: "none",
        height: 36,
        padding: "0 14px",
        borderRadius: 999,
        border: `1px solid ${col === k ? "transparent" : "var(--border-default)"}`,
        background: col === k ? "var(--accent)" : "var(--surface-3)",
        color: col === k ? "#fff" : "var(--ink-2)",
        fontFamily: "var(--font-text)",
        fontSize: 14,
        fontWeight: 500,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 7
      }
    }, k, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        opacity: .7
      }
    }, counts[k])))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: "0 16px"
      }
    }, COLUMNS[col].map(t => /*#__PURE__*/React.createElement(ACard, {
      key: t.id,
      interactive: true,
      onClick: () => openTicket(t),
      style: {
        padding: 16,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--ink-4)"
      }
    }, "#", t.id), /*#__PURE__*/React.createElement(AStatus, {
      tone: t.pr
    }, t.prl)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 18,
        color: "var(--ink-0)",
        letterSpacing: "-.01em"
      }
    }, t.title), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 12,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(ATag, null, t.tag), t.comments && /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--ink-4)"
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: "message",
      size: 14
    }), t.comments))))));
  }

  /* ---------- TICKET SHEET (mobile) ---------- */
  function TicketSheet({
    ticket,
    onClose
  }) {
    const t = ticket;
    const [col, setCol] = React.useState("To do");
    const [pr, setPr] = React.useState("High");
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        zIndex: 70,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end"
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: onClose,
      style: {
        position: "absolute",
        inset: 0,
        background: "var(--scrim)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        background: "var(--surface-1)",
        borderRadius: "26px 26px 0 0",
        border: "1px solid var(--border-default)",
        borderBottom: "none",
        maxHeight: "88%",
        overflow: "auto",
        boxShadow: "var(--shadow-modal)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "sticky",
        top: 0,
        background: "var(--surface-1)",
        padding: "14px 20px",
        borderBottom: "1px solid var(--border-subtle)",
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        color: "var(--ink-4)"
      }
    }, "#", t.id), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 20,
        color: "var(--ink-0)",
        letterSpacing: "-.01em"
      }
    }, t.title), /*#__PURE__*/React.createElement(AIconBtn, {
      name: "x",
      label: "Close",
      onClick: onClose
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 20
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Column"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        overflowX: "auto"
      }
    }, ["To do", "In progress", "Review", "Done"].map(k => /*#__PURE__*/React.createElement(Chip, {
      key: k,
      on: col === k,
      onClick: () => setCol(k)
    }, k)))), /*#__PURE__*/React.createElement(Field, {
      label: "Priority"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        overflowX: "auto"
      }
    }, ["Low", "Medium", "High", "Urgent"].map(k => /*#__PURE__*/React.createElement(Chip, {
      key: k,
      on: pr === k,
      onClick: () => setPr(k)
    }, k)))), /*#__PURE__*/React.createElement(Field, {
      label: "Assignees"
    }, /*#__PURE__*/React.createElement(ABtn, {
      variant: "secondary",
      size: "md",
      icon: "user"
    }, "Root")), /*#__PURE__*/React.createElement(Field, {
      label: "Description"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--surface-3)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-md)",
        padding: 14,
        fontSize: 15,
        color: "var(--ink-0)"
      }
    }, "Revision 6 with the new ferry scene folded in.")), /*#__PURE__*/React.createElement(Field, {
      label: "Labels"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(ATag, null, t.tag))), /*#__PURE__*/React.createElement(Field, {
      label: "Comments"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(AAvatar, {
      hue: "verdant",
      size: 30
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        alignItems: "baseline"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        color: "var(--ink-0)",
        fontSize: 14
      }
    }, "Root"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--ink-4)"
      }
    }, "Jun 13")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4,
        color: "var(--ink-2)",
        fontSize: 14
      }
    }, "Rev 6 reads much tighter \u2014 the ferry scene finally earns its place.")))))));
  }
  const Field = ({
    label,
    children
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(ALabel, null, label), children);
  const Chip = ({
    on,
    onClick,
    children
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      flex: "none",
      height: 38,
      padding: "0 14px",
      borderRadius: "var(--radius-sm)",
      background: on ? "var(--accent-soft)" : "var(--surface-3)",
      color: on ? "var(--accent-ink)" : "var(--ink-1)",
      border: `1px solid ${on ? "var(--accent-line)" : "var(--border-default)"}`,
      fontFamily: "var(--font-text)",
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer",
      whiteSpace: "nowrap"
    }
  }, children);

  /* ---------- DISCOVER ---------- */
  function DiscoverScreen() {
    const [crew, setCrew] = React.useState(true);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 0 8px"
      }
    }, /*#__PURE__*/React.createElement(Title, null, "Discover"), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 20px",
        display: "flex",
        flexDirection: "column",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(AInput, {
      icon: "search",
      placeholder: "Search artists, skills\u2026"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        overflowX: "auto",
        paddingBottom: 2
      }
    }, /*#__PURE__*/React.createElement(AChip, null, "Discipline"), /*#__PURE__*/React.createElement(AChip, {
      selected: crew,
      onClick: () => setCrew(!crew)
    }, "Open to crew"), /*#__PURE__*/React.createElement(AChip, null, "Rate"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "20px 20px 12px"
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: "star",
      size: 15,
      color: "var(--accent)"
    }), /*#__PURE__*/React.createElement(ALabel, null, "Featured artists")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: "0 20px"
      }
    }, ARTISTS.map(a => /*#__PURE__*/React.createElement(ACard, {
      key: a.n,
      interactive: true,
      style: {
        padding: 0,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: window.aMesh(a.hue),
      style: {
        height: 120,
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement(ABadge, {
      tone: "accent",
      style: {
        position: "absolute",
        top: 12,
        right: 12
      }
    }, a.m, "% MATCH")), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        marginTop: -28
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-end",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(AAvatar, {
      hue: a.hue,
      size: 48,
      presence: true,
      style: {
        border: "3px solid var(--surface-2)",
        borderRadius: "50%"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        paddingBottom: 2
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 18,
        color: "var(--ink-0)"
      }
    }, a.n), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--ink-3)",
        marginTop: 2
      }
    }, a.r))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 7,
        flexWrap: "wrap"
      }
    }, a.tags.map(tg => /*#__PURE__*/React.createElement("span", {
      key: tg,
      style: {
        fontSize: 13,
        color: "var(--ink-2)",
        background: "var(--surface-3)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-sm)",
        padding: "5px 11px"
      }
    }, tg))), /*#__PURE__*/React.createElement(ABtn, {
      full: true,
      icon: "message"
    }, "Message"))))));
  }

  /* ---------- TOOLS ---------- */
  function ToolsScreen() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 0 8px"
      }
    }, /*#__PURE__*/React.createElement(Title, {
      sub: "Make the artefacts you need"
    }, "Tools"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 14,
        padding: "0 20px"
      }
    }, TOOLS.map(t => /*#__PURE__*/React.createElement(ACard, {
      key: t.n,
      interactive: true,
      style: {
        padding: 18,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 42,
        height: 42,
        borderRadius: 11,
        background: "var(--accent-soft)",
        border: "1px solid var(--accent-line)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--accent)"
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: t.i,
      size: 20
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 17,
        color: "var(--ink-0)"
      }
    }, t.n), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: ".1em",
        textTransform: "uppercase",
        color: "var(--ink-4)",
        marginTop: 8
      }
    }, t.k))))));
  }

  /* ---------- PROFILE ---------- */
  function ProfileScreen() {
    const stats = [["48", "Works"], ["4", "Projects"], ["1.2k", "Followers"], ["312", "Following"]];
    const skills = ["Direction", "Oil", "Editing", "Color", "Curation"];
    const port = ["coral", "ember", "violet", "azure"];
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "ars-mesh ars-mesh--azure",
      style: {
        height: 150,
        opacity: .8
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 20px 8px",
        marginTop: -42
      }
    }, /*#__PURE__*/React.createElement(AAvatar, {
      hue: "verdant",
      size: 84,
      ring: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 28,
        color: "var(--ink-0)",
        letterSpacing: "-.02em",
        marginTop: 14
      }
    }, "Renn Okabe"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: ".1em",
        textTransform: "uppercase",
        color: "var(--ink-3)",
        marginTop: 6
      }
    }, "Director \xB7 Oil & Light"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        color: "var(--ink-3)",
        marginTop: 8,
        fontSize: 14
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: "mapPin",
      size: 14
    }), " Oslo, NO"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        color: "var(--ink-1)",
        marginTop: 14,
        lineHeight: 1.5
      }
    }, "Night studies, slow work. Building small crews for short films and exhibitions. Commissions open."), /*#__PURE__*/React.createElement(ACard, {
      style: {
        display: "flex",
        marginTop: 18,
        padding: "16px 0"
      }
    }, stats.map(([v, l], i) => /*#__PURE__*/React.createElement("div", {
      key: l,
      style: {
        flex: 1,
        textAlign: "center",
        borderLeft: i ? "1px solid var(--border-subtle)" : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 20,
        color: "var(--ink-0)"
      }
    }, v), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: ".08em",
        textTransform: "uppercase",
        color: "var(--ink-3)",
        marginTop: 4
      }
    }, l)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginTop: 18,
        flexWrap: "wrap"
      }
    }, skills.map(s => /*#__PURE__*/React.createElement("span", {
      key: s,
      style: {
        fontSize: 13,
        color: "var(--ink-1)",
        background: "var(--surface-2)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-sm)",
        padding: "7px 13px"
      }
    }, s))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement(ABtn, {
      full: true,
      size: "lg"
    }, "Edit profile")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 24
      }
    }, /*#__PURE__*/React.createElement(ALabel, null, "Portfolio")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
        marginTop: 14
      }
    }, port.map((h, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: window.aMesh(h),
      style: {
        aspectRatio: "1",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-subtle)"
      }
    })))));
  }

  /* ---------- TAB BAR ---------- */
  function TabBar({
    tab,
    setTab
  }) {
    const items = [["projects", "folder"], ["discover", "compass"], ["tools", "grid"], ["profile", "user"]];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: "none",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px 16px 30px",
        background: "rgba(10,10,12,.8)",
        backdropFilter: "blur(24px) saturate(150%)",
        WebkitBackdropFilter: "blur(24px) saturate(150%)",
        borderTop: "1px solid var(--border-default)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)"
      }
    }, items.map(([k, ic]) => {
      const on = tab === k;
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        onClick: () => setTab(k),
        "aria-label": k,
        style: {
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
          color: on ? "var(--accent-ink)" : "var(--ink-4)",
          padding: "4px 14px",
          transition: "color .18s"
        }
      }, /*#__PURE__*/React.createElement(A, {
        name: ic,
        size: 24,
        stroke: on ? 2.1 : 1.7
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: "var(--font-mono)",
          fontSize: 9.5,
          letterSpacing: ".06em",
          textTransform: "uppercase"
        }
      }, k));
    }));
  }
  Object.assign(window, {
    ProjectsScreen,
    BoardScreen,
    TicketSheet,
    DiscoverScreen,
    ToolsScreen,
    ProfileScreen,
    TabBar
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/iphone/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mac/appearance.jsx
try { (() => {
// Arsyen — Appearance: live theme / accent / radius switching.
// Proves themeability: one language, stable across every choice.
(function () {
  const A = window.AIcon;
  const ACCENTS = [["coral", "#ff555d"], ["blue", "#2f7bf6"], ["violet", "#8a5cff"], ["green", "#2bb673"], ["amber", "#f0a830"], ["rose", "#f3508a"]];
  const RADII = ["square", "soft", "round"];
  function apply(s) {
    const r = document.documentElement;
    r.setAttribute("data-theme", s.theme);
    r.setAttribute("data-accent", s.accent);
    r.setAttribute("data-radius", s.radius);
    r.setAttribute("data-backdrop", s.backdrop);
    r.classList.add("ars-themed");
  }
  function load() {
    try {
      return JSON.parse(localStorage.getItem("arsyen.appearance")) || {};
    } catch (e) {
      return {};
    }
  }
  function useAppearance() {
    const [s, setS] = React.useState(() => ({
      theme: "black",
      accent: "coral",
      radius: "square",
      backdrop: "pure",
      ...load()
    }));
    React.useEffect(() => {
      apply(s);
      try {
        localStorage.setItem("arsyen.appearance", JSON.stringify(s));
      } catch (e) {}
    }, [s]);
    return [s, setS];
  }
  function Seg({
    options,
    value,
    onChange
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "inline-flex",
        padding: 3,
        gap: 3,
        borderRadius: "var(--radius-md)",
        background: "var(--surface-3)",
        border: "1px solid var(--border-subtle)",
        width: "100%"
      }
    }, options.map(o => {
      const on = o.v === value;
      return /*#__PURE__*/React.createElement("button", {
        key: o.v,
        onClick: () => onChange(o.v),
        style: {
          flex: 1,
          height: 34,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 7,
          borderRadius: "var(--radius-sm)",
          border: "none",
          cursor: "pointer",
          background: on ? "var(--surface-1)" : "transparent",
          color: on ? "var(--fg1)" : "var(--fg3)",
          fontFamily: "var(--font-text)",
          fontSize: 13,
          fontWeight: 600,
          boxShadow: on ? "var(--shadow-sm)" : "none",
          transition: "all .15s"
        }
      }, o.icon && /*#__PURE__*/React.createElement(A, {
        name: o.icon,
        size: 15
      }), o.label);
    }));
  }
  function AppearancePopover({
    s,
    setS,
    onClose
  }) {
    const set = (k, v) => setS({
      ...s,
      [k]: v
    });
    return /*#__PURE__*/React.createElement("div", {
      className: "ars-glass ars-glass--strong",
      style: {
        position: "absolute",
        bottom: 64,
        right: 0,
        width: 300,
        borderRadius: "var(--radius-2xl)",
        padding: 20,
        zIndex: 300,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        animation: "ars-pop-in .22s var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 17,
        color: "var(--fg1)"
      }
    }, "Appearance"), /*#__PURE__*/React.createElement(A, {
      name: "sparkle",
      size: 16,
      color: "var(--accent)"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 9
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 10.5,
        letterSpacing: ".1em",
        textTransform: "uppercase",
        color: "var(--fg3)"
      }
    }, "Theme"), /*#__PURE__*/React.createElement(Seg, {
      options: [{
        v: "black",
        label: "Pure Black",
        icon: "moon"
      }, {
        v: "light",
        label: "Light",
        icon: "sun"
      }],
      value: s.theme,
      onChange: v => set("theme", v)
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 9
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 10.5,
        letterSpacing: ".1em",
        textTransform: "uppercase",
        color: "var(--fg3)"
      }
    }, "Backdrop"), /*#__PURE__*/React.createElement(Seg, {
      options: [{
        v: "pure",
        label: "Pure",
        icon: "moon"
      }, {
        v: "living",
        label: "Living",
        icon: "sparkle"
      }],
      value: s.backdrop,
      onChange: v => set("backdrop", v)
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 9
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 10.5,
        letterSpacing: ".1em",
        textTransform: "uppercase",
        color: "var(--fg3)"
      }
    }, "Accent"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 12,
        flexWrap: "wrap"
      }
    }, ACCENTS.map(([k, c]) => {
      const on = s.accent === k;
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        onClick: () => set("accent", k),
        "aria-label": k,
        style: {
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: c,
          border: "none",
          cursor: "pointer",
          boxShadow: on ? "0 0 0 2px var(--surface-1), 0 0 0 4px " + c + ", 0 4px 12px " + c + "66" : "0 1px 3px rgba(0,0,0,.4)",
          transition: "box-shadow .18s"
        }
      });
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 9
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 10.5,
        letterSpacing: ".1em",
        textTransform: "uppercase",
        color: "var(--fg3)"
      }
    }, "Corner radius"), /*#__PURE__*/React.createElement(Seg, {
      options: RADII.map(r => ({
        v: r,
        label: r[0].toUpperCase() + r.slice(1)
      })),
      value: s.radius,
      onChange: v => set("radius", v)
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--fg3)",
        lineHeight: 1.4,
        borderTop: "1px solid var(--border-subtle)",
        paddingTop: 12
      }
    }, "One language \u2014 stable across every theme, accent and shape."));
  }
  window.ArsAppearance = {
    useAppearance,
    AppearancePopover
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mac/appearance.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mac/icons.jsx
try { (() => {
// Arsyen icon set — hand-matched to Lucide's 1.5px rounded line style.
// Exposed as window.AIcon (a component) + window.AICONS (path map).
(function () {
  const P = {
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H1a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 2.6 7a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 7 2.6h.1A1.6 1.6 0 0 0 8.9 1a2 2 0 1 1 4 0v.1A1.6 1.6 0 0 0 15 2.6a1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8v.1a1.6 1.6 0 0 0 1.5 1h.2a2 2 0 1 1 0 4h-.2a1.6 1.6 0 0 0-1.5 1Z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    link: '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"/>',
    more: '<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    userPlus: '<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 12.5-4.3M18 8v6M21 11h-6"/>',
    message: '<path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-6.5A8 8 0 1 1 21 12Z"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 5.5a3.5 3.5 0 0 1 0 6.8M21 20a6 6 0 0 0-4-5.7"/>',
    palette: '<path d="M12 21a9 9 0 1 1 0-18c5 0 9 3.6 9 8 0 2.2-1.8 3.5-4 3.5h-1.8c-1.2 0-2.2 1-2.2 2.2 0 .5.2 1 .5 1.4.3.5.5.9.5 1.4 0 .8-.7 1.1-1.5 1.1Z"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16.5" cy="10.5" r="1"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m21 16-4.5-4.5L7 21"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8-4.3-4.1 5.9-.9L12 3.5Z"/>',
    send: '<path d="M21 3 3 10.5l7 2.5 2.5 7L21 3Z"/><path d="M10 13 21 3"/>',
    mapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    share: '<path d="M12 15V3M8 7l4-4 4 4"/><path d="M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    arrowUp: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    chevronRight: '<path d="m9 6 6 6-6 6"/>',
    check: '<path d="M5 12.5 10 17l9-10"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    filter: '<path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z"/>',
    flag: '<path d="M5 21V4h13l-2 4 2 4H5"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M5 16v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"/>',
    tag: '<path d="M3 7v5l8 8 9-9-8-8H4a1 1 0 0 0-1 1Z"/><circle cx="7.5" cy="8.5" r="1.3"/>',
    sliders: '<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
    command: '<path d="M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6Z"/>',
    notes: '<path d="M6 3h12a1 1 0 0 1 1 1v15l-3.5-2-3.5 2-3.5-2L5 19V4a1 1 0 0 1 1-1Z"/><path d="M9 8h6M9 12h4"/>',
    task: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="m8 12 2.5 2.5L16 9"/>',
    idea: '<path d="M9.5 18h5M10.5 21h3"/><path d="M12 3a6 6 0 0 0-3.8 10.7c.6.5.9 1.1 1 1.8l.1.5h5.4l.1-.5c.1-.7.4-1.3 1-1.8A6 6 0 0 0 12 3Z"/>',
    moodboard: '<rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M3 9.5h18M9.5 21V9.5"/>',
    layers: '<path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z"/><path d="m3 12.5 9 4.5 9-4.5M3 17l9 4.5L21 17"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
    maximize: '<path d="M4 9V5.5A1.5 1.5 0 0 1 5.5 4H9M20 9V5.5A1.5 1.5 0 0 0 18.5 4H15M4 15v3.5A1.5 1.5 0 0 0 5.5 20H9M20 15v3.5a1.5 1.5 0 0 1-1.5 1.5H15"/>',
    minimize: '<path d="M9 4v3.5A1.5 1.5 0 0 1 7.5 9H4M15 4v3.5A1.5 1.5 0 0 0 16.5 9H20M9 20v-3.5A1.5 1.5 0 0 0 7.5 15H4M15 20v-3.5a1.5 1.5 0 0 1 1.5-1.5H20"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2.2M12 19.8V22M2 12h2.2M19.8 12H22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M19.1 4.9l-1.6 1.6M6.5 17.5l-1.6 1.6"/>',
    moon: '<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8Z"/>',
    feed: '<path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1.6"/>',
    sparkle: '<path d="M12 3l1.7 5L19 9.7l-5.3 1.7L12 17l-1.7-5.6L5 9.7l5.3-1.7L12 3Z"/>',
    activity: '<path d="M3 12h3.5l2.5 7 4-15 2.5 8H21"/>',
    panel: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M9.5 4v16"/>',
    overview: '<rect x="3" y="3" width="7" height="9.5" rx="1.6"/><rect x="14" y="3" width="7" height="5.5" rx="1.6"/><rect x="14" y="11" width="7" height="10" rx="1.6"/><rect x="3" y="15" width="7" height="6" rx="1.6"/>',
    type: '<path d="M5 7V5h14v2M12 5v14M9.5 19h5"/>',
    play: '<path d="M7 4.5v15l12-7.5-12-7.5Z"/>',
    inbox: '<path d="M4 13h4l1.6 2.5h4.8L16 13h4"/><path d="M5.5 6h13a1 1 0 0 1 .9.6l1.6 6.4V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5l1.6-6.4A1 1 0 0 1 5.5 6Z"/>',
    expand: '<path d="M14 4h6v6M20 4l-7.5 7.5M10 20H4v-6M4 20l7.5-7.5"/>',
    collapse: '<path d="M20 9h-5V4M20 4l-6.5 6.5M4 15h5v5M4 20l6.5-6.5"/>',
    circle: '<circle cx="12" cy="12" r="8.5"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    at: '<circle cx="12" cy="12" r="4"/><path d="M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-3.5 7.1"/>',
    dot: '<circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none"/>'
  };
  function AIcon({
    name,
    size = 20,
    stroke = 1.6,
    color = "currentColor",
    style = {}
  }) {
    const d = P[name] || "";
    return React.createElement("svg", {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: stroke,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style,
      dangerouslySetInnerHTML: {
        __html: d
      }
    });
  }
  window.AIcon = AIcon;
  window.AICONS = P;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mac/icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mac/screens_board.jsx
try { (() => {
// Arsyen Mac kit — Board view (Projects panel + kanban) and Ticket sheet.
(function () {
  const A = window.AIcon;
  const {
    ABtn,
    AIconBtn,
    ATag,
    AStatus,
    AProgress,
    ACard,
    ALabel,
    ATabs,
    ASeg,
    AAvatar,
    AInput
  } = window;
  const PROJECTS = [{
    id: "sinners",
    name: "SINNERS",
    status: "PLANNING",
    tone: "planning",
    pct: 11,
    hue: "ember"
  }, {
    id: "test",
    name: "TEST",
    status: "PLANNING",
    tone: "planning",
    pct: 100,
    hue: "violet"
  }];
  const COLUMNS = [{
    key: "todo",
    label: "TO DO",
    count: 4,
    tickets: [{
      id: 1,
      title: "Lock final shooting script",
      pr: "high",
      prl: "High",
      tag: "script",
      comments: 1
    }, {
      id: 4,
      title: "Build shot list for Act I",
      pr: "medium",
      prl: "Medium",
      tag: "camera"
    }, {
      id: 5,
      title: "Rent anamorphic lens kit",
      pr: "low",
      prl: "Low",
      tag: "gear"
    }]
  }, {
    key: "prog",
    label: "IN PROGRESS",
    count: 2,
    tickets: [{
      id: 2,
      title: "Cast the two leads",
      pr: "high",
      prl: "High",
      tag: "casting"
    }, {
      id: 3,
      title: "Scout the harbor location",
      pr: "medium",
      prl: "Medium",
      tag: "locations"
    }]
  }, {
    key: "review",
    label: "REVIEW",
    count: 2,
    tickets: [{
      id: 6,
      title: "Storyboard the chase sequence",
      pr: "medium",
      prl: "Medium",
      tag: "camera"
    }, {
      id: 7,
      title: "Color grade the teaser",
      pr: "medium",
      prl: "Medium",
      tag: "post"
    }]
  }, {
    key: "done",
    label: "DONE",
    count: 1,
    done: true,
    tickets: [{
      id: 9,
      title: "Cut the announcement teaser",
      pr: "medium",
      prl: "Medium",
      tag: "post"
    }]
  }];
  function ProjectRow({
    p,
    active,
    onClick
  }) {
    return /*#__PURE__*/React.createElement(ACard, {
      interactive: true,
      glow: active,
      onClick: onClick,
      style: {
        padding: 14,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 13,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: window.aMesh(p.hue),
      style: {
        width: 48,
        height: 48,
        borderRadius: 12,
        flex: "none",
        border: "1px solid var(--border-default)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 16,
        color: "var(--ink-0)",
        letterSpacing: "-.01em"
      }
    }, p.name), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement(AStatus, {
      tone: p.tone,
      style: {
        padding: 0,
        background: "transparent"
      }
    }, p.status)))), /*#__PURE__*/React.createElement(AProgress, {
      value: p.pct
    }));
  }
  function ProjectsPanel({
    active,
    setActive
  }) {
    return /*#__PURE__*/React.createElement(ACard, {
      panel: true,
      style: {
        width: 300,
        flex: "none",
        padding: 18,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignSelf: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 26,
        color: "var(--ink-0)",
        letterSpacing: "-.02em"
      }
    }, "Projects"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement(ALabel, null, "2 Active"))), /*#__PURE__*/React.createElement(AIconBtn, {
      name: "plus",
      label: "New project"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, PROJECTS.map(p => /*#__PURE__*/React.createElement(ProjectRow, {
      key: p.id,
      p: p,
      active: active === p.id,
      onClick: () => setActive(p.id)
    }))));
  }
  function TicketCard({
    t,
    onOpen
  }) {
    return /*#__PURE__*/React.createElement(ACard, {
      interactive: true,
      onClick: onOpen,
      style: {
        padding: 16,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--ink-4)"
      }
    }, "#", t.id), /*#__PURE__*/React.createElement(AStatus, {
      tone: t.pr
    }, t.prl)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 17,
        color: "var(--ink-0)",
        letterSpacing: "-.01em",
        lineHeight: 1.25
      }
    }, t.title), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(ATag, null, t.tag), t.comments && /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--ink-4)"
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: "message",
      size: 14
    }), t.comments)));
  }
  function Column({
    col,
    onOpen
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: 280,
        flex: "none",
        display: "flex",
        flexDirection: "column",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 4px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8
      }
    }, col.done && /*#__PURE__*/React.createElement(A, {
      name: "checkCircle",
      size: 15,
      color: "var(--done)"
    }), /*#__PURE__*/React.createElement(ALabel, {
      style: {
        color: col.done ? "var(--done)" : "var(--ink-3)"
      }
    }, col.label)), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--ink-4)"
      }
    }, col.count), /*#__PURE__*/React.createElement(A, {
      name: "more",
      size: 16,
      color: "var(--ink-4)"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 14
      }
    }, col.tickets.map(t => /*#__PURE__*/React.createElement(TicketCard, {
      key: t.id,
      t: t,
      onOpen: () => onOpen(t)
    }))));
  }
  function ProjectHero() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        border: "1px solid var(--border-default)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), var(--shadow-md)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ars-mesh ars-mesh--ember ars-grain",
      style: {
        height: 320
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, rgba(0,0,0,.05) 0%, rgba(8,4,4,.55) 55%, rgba(6,3,3,.96) 100%), radial-gradient(120% 90% at 12% 100%, rgba(0,0,0,.6), transparent 60%)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 18,
        right: 18,
        display: "flex",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(AIconBtn, {
      name: "link",
      label: "Copy link"
    }), /*#__PURE__*/React.createElement(AIconBtn, {
      name: "more",
      label: "More"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: 30,
        right: 30,
        bottom: 24
      }
    }, /*#__PURE__*/React.createElement(AStatus, {
      tone: "planning",
      bare: true,
      style: {
        marginBottom: 10
      }
    }, "PLANNING"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 52,
        color: "#fff",
        letterSpacing: "-.03em",
        lineHeight: 1,
        margin: "8px 0 18px"
      }
    }, "SINNERS"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 40,
        alignItems: "flex-end"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ALabel, {
      style: {
        whiteSpace: "nowrap"
      }
    }, "Your role"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        fontSize: 15,
        color: "var(--ink-0)",
        whiteSpace: "nowrap"
      }
    }, "Owner")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ALabel, null, "Type"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        fontSize: 15,
        color: "var(--ink-0)",
        whiteSpace: "nowrap"
      }
    }, "Feature film")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ALabel, null, "Crew"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement(AAvatar, {
      hue: "azure",
      size: 26,
      ring: true
    }), /*#__PURE__*/React.createElement(AAvatar, {
      hue: "coral",
      size: 26,
      style: {
        marginLeft: -8
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 180
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement(ALabel, null, "Progress"), /*#__PURE__*/React.createElement("span", {
      className: "ars-tnum",
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--ink-2)"
      }
    }, "11%")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 5,
        background: "rgba(255,255,255,.16)",
        borderRadius: 999,
        boxShadow: "inset 0 1px 2px rgba(0,0,0,.5)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: "11%",
        height: "100%",
        background: "linear-gradient(90deg, rgba(255,255,255,.7), #fff)",
        borderRadius: 999,
        boxShadow: "0 0 12px rgba(255,255,255,.5)"
      }
    }))))));
  }
  function BoardView({
    onOpenTicket
  }) {
    const [active, setActive] = React.useState("sinners");
    const [tab, setTab] = React.useState("Board");
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 26,
        padding: "30px 34px 120px",
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement(ProjectsPanel, {
      active: active,
      setActive: setActive
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        gap: 26
      }
    }, /*#__PURE__*/React.createElement(ProjectHero, null), /*#__PURE__*/React.createElement(ATabs, {
      tabs: ["Board", "Action Plans", "Files"],
      value: tab,
      onChange: setTab
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(ALabel, null, "Filter"), /*#__PURE__*/React.createElement(ABtn, {
      variant: "secondary",
      size: "sm",
      icon: "user"
    }, "Anyone ", /*#__PURE__*/React.createElement(A, {
      name: "chevronDown",
      size: 14
    })), /*#__PURE__*/React.createElement(ABtn, {
      variant: "secondary",
      size: "sm",
      icon: "flag"
    }, "All plans ", /*#__PURE__*/React.createElement(A, {
      name: "chevronDown",
      size: 14
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 22,
        overflowX: "auto",
        paddingBottom: 8
      }
    }, COLUMNS.map(c => /*#__PURE__*/React.createElement(Column, {
      key: c.key,
      col: c,
      onOpen: onOpenTicket
    })))));
  }
  function TicketSheet({
    ticket,
    onClose
  }) {
    const t = ticket || {
      id: 1,
      title: "Lock final shooting script"
    };
    const [col, setCol] = React.useState("To do");
    const [plan, setPlan] = React.useState("Pre-production");
    const [pr, setPr] = React.useState("High");
    return /*#__PURE__*/React.createElement("div", {
      onClick: onClose,
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 900,
        background: "var(--scrim)",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "60px 24px",
        overflowY: "auto"
      }
    }, /*#__PURE__*/React.createElement(ACard, {
      panel: true,
      onClick: e => e.stopPropagation(),
      style: {
        width: 760,
        maxWidth: "100%",
        padding: 30,
        display: "flex",
        flexDirection: "column",
        gap: 22
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 14,
        color: "var(--ink-4)",
        marginTop: 6
      }
    }, "#", t.id), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 26,
        color: "var(--ink-0)",
        letterSpacing: "-.02em"
      }
    }, t.title), /*#__PURE__*/React.createElement(AIconBtn, {
      name: "more",
      label: "More"
    }), /*#__PURE__*/React.createElement(AIconBtn, {
      name: "x",
      label: "Close",
      onClick: onClose
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Column"
    }, /*#__PURE__*/React.createElement(ASeg, {
      chips: true,
      options: ["To do", "In progress", "Review", "Done"],
      value: col,
      onChange: setCol
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Action plan"
    }, /*#__PURE__*/React.createElement(ASeg, {
      chips: true,
      options: ["Pre-production", "Principal photography", "Post & delivery"],
      value: plan,
      onChange: setPlan
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 40,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Priority"
    }, /*#__PURE__*/React.createElement(ASeg, {
      chips: true,
      options: ["No priority", "Low", "Medium", "High", "Urgent"],
      value: pr,
      onChange: setPr
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Due"
    }, /*#__PURE__*/React.createElement(ABtn, {
      variant: "secondary",
      size: "md",
      icon: "calendar",
      style: {
        color: "var(--accent-ink)"
      }
    }, "Set"))), /*#__PURE__*/React.createElement(Field, {
      label: "Assignees"
    }, /*#__PURE__*/React.createElement(ABtn, {
      variant: "secondary",
      size: "md",
      icon: "user"
    }, "Root")), /*#__PURE__*/React.createElement(Field, {
      label: "Description"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--surface-3)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-md)",
        padding: 16,
        fontSize: 16,
        color: "var(--ink-0)"
      }
    }, "Revision 6 with the new ferry scene folded in."), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement(ABtn, {
      variant: "danger",
      size: "sm"
    }, "Save description"))), /*#__PURE__*/React.createElement(Field, {
      label: "Labels"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(ATag, {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6
      }
    }, "script ", /*#__PURE__*/React.createElement(A, {
      name: "x",
      size: 11,
      color: "var(--ink-4)"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        maxWidth: 280
      }
    }, /*#__PURE__*/React.createElement(AInput, {
      placeholder: "Add label\u2026",
      icon: "tag"
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement(ALabel, null, "Comments"), /*#__PURE__*/React.createElement(ABtn, {
      variant: "secondary",
      size: "sm",
      icon: "upload"
    }, "Upload")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(AAvatar, {
      hue: "verdant",
      size: 32
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        color: "var(--ink-0)",
        fontSize: 15
      }
    }, "Root"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--ink-4)"
      }
    }, "Jun 13")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 5,
        color: "var(--ink-2)",
        fontSize: 15
      }
    }, "Rev 6 reads much tighter \u2014 the ferry scene finally earns its place.")))));
  }
  function Field({
    label,
    children
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(ALabel, null, label), children);
  }
  Object.assign(window, {
    BoardView,
    TicketSheet
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mac/screens_board.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mac/screens_more.jsx
try { (() => {
// Arsyen Mac kit — Discover, Tools, Settings, Profile + Dock & Chrome.
(function () {
  const A = window.AIcon;
  const {
    ABtn,
    AIconBtn,
    ATag,
    AStatus,
    ABadge,
    AAvatar,
    AInput,
    ASwitch,
    AChip,
    ASeg,
    ACard,
    ALabel
  } = window;

  /* ---------------- DISCOVER ---------------- */
  const ARTISTS = [{
    n: "Nadia Œ",
    r: "Photographer · Lisbon",
    m: 96,
    hue: "coral",
    tags: ["Analog", "Editorial", "Print"],
    feat: true
  }, {
    n: "Mara Vey",
    r: "Painter · Oslo",
    m: 93,
    hue: "azure",
    tags: ["Oil", "Portrait", "Set design"],
    feat: true
  }, {
    n: "Ilo Bran",
    r: "Photographer · Berlin",
    m: 88,
    hue: "verdant",
    tags: ["Documentary", "16mm"]
  }, {
    n: "Søren K.",
    r: "3D / Motion · Copenhagen",
    m: 84,
    hue: "ember",
    tags: ["Houdini", "Score", "Title design"]
  }, {
    n: "Lena Asgard",
    r: "Composer · Reykjavik",
    m: 80,
    hue: "violet",
    tags: ["Ambient", "Strings", "Mix"]
  }];
  const CHATS = [{
    n: "Nightwork crew",
    last: "Søren: score draft is up",
    t: "2m",
    hue: "ember",
    unread: true,
    online: true
  }, {
    n: "Nadia Œ",
    last: "sent the contact sheet",
    t: "18m",
    hue: "coral",
    online: true
  }, {
    n: "Studio Æon",
    last: "Let's lock the sleeve dielines",
    t: "1h",
    hue: "azure"
  }, {
    n: "Mara Vey",
    last: "love it. ship it.",
    t: "3h",
    hue: "violet"
  }];
  function ArtistCard({
    a,
    big
  }) {
    return /*#__PURE__*/React.createElement(ACard, {
      interactive: true,
      style: {
        padding: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: window.aMesh(a.hue),
      style: {
        position: "relative",
        height: big ? 200 : 150
      }
    }, /*#__PURE__*/React.createElement(ABadge, {
      tone: "accent",
      style: {
        position: "absolute",
        top: 14,
        right: 14
      }
    }, a.m, "% MATCH")), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 18,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        marginTop: -34
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-end",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(AAvatar, {
      hue: a.hue,
      size: 56,
      presence: true,
      ring: false,
      style: {
        border: "3px solid var(--surface-2)",
        borderRadius: "50%"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        paddingBottom: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 19,
        color: "var(--ink-0)"
      }
    }, a.n), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--ink-3)",
        marginTop: 3
      }
    }, a.r))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap"
      }
    }, a.tags.map(t => /*#__PURE__*/React.createElement("span", {
      key: t,
      style: {
        fontSize: 13,
        color: "var(--ink-2)",
        background: "var(--surface-3)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-sm)",
        padding: "6px 12px"
      }
    }, t))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(ABtn, {
      full: true,
      icon: "message"
    }, "Message"), /*#__PURE__*/React.createElement(AIconBtn, {
      name: "userPlus",
      label: "Add to crew",
      size: "lg"
    }))));
  }
  function ChatPanel() {
    const [tab, setTab] = React.useState("Direct");
    return /*#__PURE__*/React.createElement(ACard, {
      panel: true,
      style: {
        width: 330,
        flex: "none",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        alignSelf: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: "message",
      size: 20,
      color: "var(--accent)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 24,
        color: "var(--ink-0)"
      }
    }, "Chat")), /*#__PURE__*/React.createElement(AIconBtn, {
      name: "plus",
      label: "New chat"
    })), /*#__PURE__*/React.createElement(window.ASeg, {
      options: ["Direct", "Community"],
      value: tab,
      onChange: setTab
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 6
      }
    }, CHATS.map(c => /*#__PURE__*/React.createElement("div", {
      key: c.n,
      style: {
        display: "flex",
        gap: 12,
        alignItems: "center",
        padding: 12,
        borderRadius: "var(--radius-md)",
        cursor: "pointer"
      },
      onMouseEnter: e => e.currentTarget.style.background = "var(--surface-2)",
      onMouseLeave: e => e.currentTarget.style.background = "transparent"
    }, /*#__PURE__*/React.createElement(AAvatar, {
      hue: c.hue,
      size: 42,
      presence: c.online
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        fontSize: 15,
        color: "var(--ink-0)"
      }
    }, c.n), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--ink-4)"
      }
    }, c.t)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "var(--ink-3)",
        marginTop: 2,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, c.last)), c.unread && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "var(--accent)",
        flex: "none"
      }
    })))));
  }
  function DiscoverView() {
    const [crew, setCrew] = React.useState(true);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 26,
        padding: "30px 34px 120px",
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        gap: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(AInput, {
      icon: "search",
      placeholder: "Search artists, disciplines, skills\u2026"
    })), /*#__PURE__*/React.createElement(ABtn, {
      variant: "secondary",
      icon: "sliders"
    }, "Filters")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(AChip, null, "Discipline"), /*#__PURE__*/React.createElement(AChip, null, "Location"), /*#__PURE__*/React.createElement(AChip, {
      selected: crew,
      onClick: () => setCrew(!crew)
    }, "Open to crew"), /*#__PURE__*/React.createElement(AChip, null, "Skills"), /*#__PURE__*/React.createElement(AChip, null, "Rate")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 9
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: "star",
      size: 15,
      color: "var(--accent)"
    }), /*#__PURE__*/React.createElement(ALabel, null, "Featured artists")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 18
      }
    }, ARTISTS.filter(a => a.feat).map(a => /*#__PURE__*/React.createElement(ArtistCard, {
      key: a.n,
      a: a,
      big: true
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 9,
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: "compass",
      size: 15,
      color: "var(--ink-3)"
    }), /*#__PURE__*/React.createElement(ALabel, null, "Most relevant for your crew")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 18
      }
    }, ARTISTS.filter(a => !a.feat).map(a => /*#__PURE__*/React.createElement(ArtistCard, {
      key: a.n,
      a: a
    })))), /*#__PURE__*/React.createElement(ChatPanel, null));
  }

  /* ---------------- TOOLS ---------------- */
  const TOOLS = [{
    n: "Moodboard",
    d: "Collect references into a board",
    k: "Visual",
    i: "palette"
  }, {
    n: "Color grade",
    d: "Build & save LUT-style palettes",
    k: "Visual",
    i: "image"
  }, {
    n: "Brief builder",
    d: "Turn a chat into a creative brief",
    k: "Docs",
    i: "file"
  }, {
    n: "Invoice",
    d: "Bill a commission, get paid",
    k: "Business",
    i: "briefcase"
  }, {
    n: "Call sheet",
    d: "Schedule a shoot with your crew",
    k: "Production",
    i: "users"
  }, {
    n: "Storyboard",
    d: "Frame out a sequence",
    k: "Production",
    i: "grid"
  }, {
    n: "Portfolio",
    d: "Compose a gallery-grade set",
    k: "Profile",
    i: "star"
  }, {
    n: "Contract",
    d: "Scope, terms, signatures",
    k: "Business",
    i: "send"
  }];
  function ToolsView() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "44px 60px 120px",
        maxWidth: 1280,
        margin: "0 auto"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 34,
        color: "var(--ink-0)",
        letterSpacing: "-.02em"
      }
    }, "Tools"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        color: "var(--ink-2)",
        marginTop: 8
      }
    }, "Make the artefacts your projects need \u2014 moodboards, briefs, invoices, and more."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 18,
        marginTop: 34
      }
    }, TOOLS.map(t => /*#__PURE__*/React.createElement(ACard, {
      key: t.n,
      interactive: true,
      style: {
        padding: 22,
        minHeight: 200,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 46,
        height: 46,
        borderRadius: 12,
        background: "var(--accent-soft)",
        border: "1px solid var(--accent-line)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--accent)"
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: t.i,
      size: 22
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 20,
        color: "var(--ink-0)",
        marginTop: 20
      }
    }, t.n), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: "var(--ink-3)",
        marginTop: 6,
        flex: 1
      }
    }, t.d), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: ".1em",
        textTransform: "uppercase",
        color: "var(--ink-4)",
        border: "1px solid var(--border-default)",
        borderRadius: 999,
        padding: "4px 10px",
        alignSelf: "flex-start",
        marginTop: 16
      }
    }, t.k)))));
  }

  /* ---------------- SETTINGS ---------------- */
  function SettingRow({
    icon,
    title,
    desc,
    children,
    last
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "20px 0",
        borderBottom: last ? "none" : "1px solid var(--border-subtle)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 42,
        height: 42,
        borderRadius: 12,
        background: "var(--surface-3)",
        border: "1px solid var(--border-subtle)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--ink-2)",
        flex: "none"
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: icon,
      size: 19
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 16,
        color: "var(--ink-0)"
      }
    }, title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: "var(--ink-3)",
        marginTop: 3
      }
    }, desc)), children);
  }
  function SettingsView() {
    const [n1, setN1] = React.useState(true),
      [n2, setN2] = React.useState(true),
      [n3, setN3] = React.useState(false),
      [pub, setPub] = React.useState(true);
    const [back, setBack] = React.useState("Pure black");
    const [accent, setAccent] = React.useState("red");
    const ACCENTS = [["red", "var(--accent-red)"], ["violet", "var(--accent-violet)"], ["blue", "var(--accent-blue)"], ["amber", "var(--accent-amber)"]];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "44px 24px 120px",
        display: "flex",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(ACard, {
      panel: true,
      style: {
        width: 760,
        maxWidth: "100%",
        padding: 36
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 34,
        color: "var(--ink-0)",
        letterSpacing: "-.02em"
      }
    }, "Studio"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        color: "var(--ink-2)",
        marginTop: 8
      }
    }, "Tune your studio, the way you like it."), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 30
      }
    }, /*#__PURE__*/React.createElement(ALabel, null, "Notifications")), /*#__PURE__*/React.createElement(SettingRow, {
      icon: "briefcase",
      title: "Commission requests",
      desc: "When someone wants to commission you"
    }, /*#__PURE__*/React.createElement(ASwitch, {
      checked: n1,
      onChange: setN1
    })), /*#__PURE__*/React.createElement(SettingRow, {
      icon: "message",
      title: "Mentions & replies",
      desc: "On your work and in threads"
    }, /*#__PURE__*/React.createElement(ASwitch, {
      checked: n2,
      onChange: setN2
    })), /*#__PURE__*/React.createElement(SettingRow, {
      icon: "users",
      title: "Crew activity",
      desc: "Updates from your active crews",
      last: true
    }, /*#__PURE__*/React.createElement(ASwitch, {
      checked: n3,
      onChange: setN3
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 30
      }
    }, /*#__PURE__*/React.createElement(ALabel, null, "Privacy")), /*#__PURE__*/React.createElement(SettingRow, {
      icon: "eye",
      title: "Public portfolio",
      desc: "Anyone can view your published work"
    }, /*#__PURE__*/React.createElement(ASwitch, {
      checked: pub,
      onChange: setPub
    })), /*#__PURE__*/React.createElement(SettingRow, {
      icon: "lock",
      title: "Commissions",
      desc: "Open to commission requests",
      last: true
    }, /*#__PURE__*/React.createElement(ABtn, {
      variant: "danger",
      size: "sm"
    }, "Open")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 30,
        display: "flex",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement(ALabel, null, "Appearance"), /*#__PURE__*/React.createElement(ALabel, null, back === "Pure black" ? "Pure black" : "Living")), /*#__PURE__*/React.createElement(SettingRow, {
      icon: "image",
      title: "Backdrop",
      desc: "Pick the canvas behind your panels"
    }, /*#__PURE__*/React.createElement(ASeg, {
      options: ["Pure black", "Living"],
      value: back,
      onChange: setBack,
      style: {
        width: 320
      }
    })), /*#__PURE__*/React.createElement(SettingRow, {
      icon: "palette",
      title: "Accent color",
      desc: "The one hue that pops on black",
      last: true
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 14
      }
    }, ACCENTS.map(([k, c]) => /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => setAccent(k),
      "aria-label": k,
      style: {
        width: 34,
        height: 34,
        borderRadius: "50%",
        background: c,
        border: "none",
        cursor: "pointer",
        boxShadow: accent === k ? "0 0 0 2px var(--surface-1), 0 0 0 4px " + c : "none"
      }
    }))))));
  }

  /* ---------------- PROFILE ---------------- */
  function ProfileView() {
    const stats = [["48", "Works"], ["4", "Projects"], ["1.2k", "Followers"], ["312", "Following"]];
    const skills = ["Direction", "Oil", "Editing", "Color", "Curation"];
    const port = ["coral", "ember", "violet", "azure", "verdant"];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 24px 120px",
        display: "flex",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 920,
        maxWidth: "100%"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ars-mesh ars-mesh--azure",
      style: {
        height: 220,
        borderRadius: "0 0 var(--radius-2xl) var(--radius-2xl)",
        opacity: .8
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 12px",
        marginTop: -54
      }
    }, /*#__PURE__*/React.createElement(AAvatar, {
      hue: "verdant",
      size: 108,
      ring: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 38,
        color: "var(--ink-0)",
        letterSpacing: "-.02em",
        marginTop: 16
      }
    }, "Renn Okabe"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        letterSpacing: ".1em",
        textTransform: "uppercase",
        color: "var(--ink-3)",
        marginTop: 8
      }
    }, "Director \xB7 Oil & Light"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        color: "var(--ink-3)",
        marginTop: 10,
        fontSize: 15
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: "mapPin",
      size: 15
    }), " Oslo, NO"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 17,
        color: "var(--ink-1)",
        marginTop: 16,
        maxWidth: 620,
        lineHeight: 1.5
      }
    }, "Night studies, slow work. Building small crews for short films and exhibitions. Commissions open."), /*#__PURE__*/React.createElement(ACard, {
      style: {
        display: "flex",
        marginTop: 22,
        padding: "22px 0"
      }
    }, stats.map(([v, l], i) => /*#__PURE__*/React.createElement("div", {
      key: l,
      style: {
        flex: 1,
        textAlign: "center",
        borderLeft: i ? "1px solid var(--border-subtle)" : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 26,
        color: "var(--ink-0)"
      }
    }, v), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: ".1em",
        textTransform: "uppercase",
        color: "var(--ink-3)",
        marginTop: 6
      }
    }, l)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        marginTop: 22,
        flexWrap: "wrap"
      }
    }, skills.map(s => /*#__PURE__*/React.createElement("span", {
      key: s,
      style: {
        fontSize: 14,
        color: "var(--ink-1)",
        background: "var(--surface-2)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-sm)",
        padding: "9px 16px"
      }
    }, s))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 12,
        marginTop: 22
      }
    }, /*#__PURE__*/React.createElement(ABtn, {
      full: true,
      size: "lg"
    }, "Edit profile"), /*#__PURE__*/React.createElement(AIconBtn, {
      name: "share",
      label: "Share",
      size: "lg"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 34
      }
    }, /*#__PURE__*/React.createElement(ALabel, null, "Portfolio")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 16,
        marginTop: 16
      }
    }, port.map((h, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: window.aMesh(h),
      style: {
        aspectRatio: "1",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-subtle)"
      }
    }))))));
  }

  /* ---------------- DOCK & CHROME ---------------- */
  function Dock({
    view,
    setView
  }) {
    const items = [["board", "folder"], ["discover", "compass"], ["tools", "grid"], ["settings", "settings"]];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "inline-flex",
        gap: 26,
        alignItems: "center"
      }
    }, items.map(([k, ic]) => {
      const active = view === k;
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        onClick: () => setView(k),
        "aria-label": k,
        style: {
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 4,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: active ? "var(--coral)" : "var(--fg2)",
          transform: active ? "scale(1.24)" : "scale(1)",
          transformOrigin: "center bottom",
          transition: "transform .2s var(--ease-out), color .2s var(--ease-out)"
        },
        onMouseEnter: e => {
          if (!active) e.currentTarget.style.transform = "scale(1.12)";
        },
        onMouseLeave: e => {
          e.currentTarget.style.transform = active ? "scale(1.24)" : "scale(1)";
        }
      }, /*#__PURE__*/React.createElement(A, {
        name: ic,
        size: 24,
        stroke: active ? 2 : 1.7
      }));
    }));
  }
  function Chrome({
    view,
    setView,
    search
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        height: 84,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        zIndex: 100,
        pointerEvents: "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        pointerEvents: "auto",
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 24,
        letterSpacing: "-.04em",
        color: "#fff",
        cursor: "pointer"
      }
    }, "arsyen"), /*#__PURE__*/React.createElement("div", {
      style: {
        pointerEvents: "auto"
      }
    }, /*#__PURE__*/React.createElement(Dock, {
      view: view,
      setView: setView
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        pointerEvents: "auto",
        display: "flex",
        alignItems: "center",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ars-glass",
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        height: 44,
        padding: "0 16px",
        borderRadius: "var(--radius-full)",
        minWidth: 280
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: "search",
      size: 16,
      color: "var(--ink-3)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        fontSize: 14,
        color: "var(--ink-4)"
      }
    }, search), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--ink-4)"
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: "command",
      size: 12
    }), "K")), /*#__PURE__*/React.createElement("button", {
      "aria-label": "Notifications",
      style: {
        position: "relative",
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "transparent",
        border: "none",
        color: "var(--ink-2)",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: "bell",
      size: 20
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: 10,
        right: 11,
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: "var(--accent)"
      }
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => setView("profile"),
      "aria-label": "Profile",
      style: {
        padding: 0,
        border: "none",
        background: "none",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(AAvatar, {
      hue: "verdant",
      size: 40,
      ring: view === "profile"
    }))));
  }
  Object.assign(window, {
    DiscoverView,
    ToolsView,
    SettingsView,
    ProfileView,
    Chrome
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mac/screens_more.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mac/ui.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Arsyen Mac kit — self-contained UI primitives (mirror the DS components).
// All exported to window for use across screen files.
(function () {
  const A = window.AIcon;
  const mesh = hue => `ars-mesh ars-mesh--${hue || "coral"}`;
  function Button({
    children,
    variant = "primary",
    size = "md",
    icon,
    glow = true,
    full,
    disabled,
    style = {},
    ...rest
  }) {
    const S = {
      sm: [32, "0 12px", 13],
      md: [42, "0 18px", 14],
      lg: [52, "0 24px", 15]
    }[size];
    const V = {
      primary: {
        background: "var(--coral)",
        color: "var(--on-coral)",
        border: "1px solid var(--coral-press)",
        boxShadow: glow ? "var(--glow-accent)" : "none"
      },
      secondary: {
        background: "var(--surface-3)",
        color: "var(--fg1)",
        border: "1px solid var(--border-default)",
        boxShadow: "var(--edge-light)"
      },
      ghost: {
        background: "transparent",
        color: "var(--fg2)",
        border: "1px solid transparent"
      },
      outline: {
        background: "transparent",
        color: "var(--fg1)",
        border: "1px solid var(--border-strong)"
      },
      danger: {
        background: "var(--coral-soft)",
        color: "var(--accent-ink)",
        border: "1px solid var(--accent-line)"
      }
    }[variant];
    return /*#__PURE__*/React.createElement("button", _extends({
      disabled: disabled
    }, rest, {
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        height: S[0],
        padding: S[1],
        width: full ? "100%" : "auto",
        borderRadius: "var(--radius-full)",
        fontFamily: "var(--font-text)",
        fontSize: S[2],
        fontWeight: 600,
        lineHeight: 1,
        letterSpacing: "-0.005em",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "transform .12s var(--ease-out), filter .18s var(--ease-out), box-shadow .2s var(--ease-out)",
        ...V,
        ...style
      },
      onMouseDown: e => !disabled && (e.currentTarget.style.transform = "scale(.97)"),
      onMouseUp: e => e.currentTarget.style.transform = "scale(1)",
      onMouseLeave: e => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.filter = "none";
      },
      onMouseEnter: e => !disabled && (e.currentTarget.style.filter = variant === "primary" ? "brightness(1.08)" : "brightness(1.2)")
    }), icon && /*#__PURE__*/React.createElement(A, {
      name: icon,
      size: 16
    }), children);
  }
  function IconButton({
    name,
    size = "md",
    active,
    variant = "default",
    label,
    children,
    style = {},
    ...rest
  }) {
    const dim = {
      sm: 30,
      md: 38,
      lg: 46
    }[size];
    const V = {
      default: {
        background: "var(--surface-3)",
        color: active ? "var(--accent)" : "var(--ink-1)",
        border: "1px solid var(--border-default)"
      },
      ghost: {
        background: "transparent",
        color: active ? "var(--accent)" : "var(--ink-2)",
        border: "1px solid transparent"
      },
      accent: {
        background: "var(--accent-soft)",
        color: "var(--accent)",
        border: "1px solid var(--accent-line)"
      }
    }[variant];
    return /*#__PURE__*/React.createElement("button", _extends({
      "aria-label": label,
      title: label
    }, rest, {
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dim,
        height: dim,
        borderRadius: "var(--radius-sm)",
        cursor: "pointer",
        transition: "background .18s, transform .12s",
        ...V,
        ...style
      },
      onMouseEnter: e => variant === "default" && (e.currentTarget.style.background = "var(--surface-4)"),
      onMouseLeave: e => variant === "default" && (e.currentTarget.style.background = "var(--surface-3)"),
      onMouseDown: e => e.currentTarget.style.transform = "scale(.92)",
      onMouseUp: e => e.currentTarget.style.transform = "scale(1)"
    }), children || /*#__PURE__*/React.createElement(A, {
      name: name,
      size: size === "sm" ? 16 : 19
    }));
  }
  function Tag({
    children,
    style = {}
  }) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--ink-2)",
        background: "var(--surface-3)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-xs)",
        padding: "4px 8px",
        lineHeight: 1.1,
        ...style
      }
    }, children);
  }
  const TONES = {
    planning: ["var(--planning)", "var(--planning-soft)"],
    medium: ["var(--planning)", "var(--planning-soft)"],
    high: ["var(--high)", "var(--high-soft)"],
    urgent: ["var(--urgent)", "var(--urgent-soft)"],
    low: ["var(--low)", "var(--low-soft)"],
    review: ["var(--review)", "var(--review-soft)"],
    done: ["var(--done)", "var(--done-soft)"]
  };
  function StatusPill({
    tone = "planning",
    children,
    dot = true,
    bare = false,
    style = {}
  }) {
    const [c, bg] = TONES[tone] || TONES.planning;
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: c,
        background: bare ? "transparent" : bg,
        borderRadius: "var(--radius-full)",
        padding: bare ? 0 : "4px 11px 4px 9px",
        lineHeight: 1.1,
        ...style
      }
    }, dot && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: c,
        flex: "none",
        boxShadow: `0 0 7px ${c}`
      }
    }), children);
  }
  function Badge({
    children,
    tone = "neutral",
    style = {}
  }) {
    const T = {
      neutral: ["var(--ink-2)", "var(--surface-3)", "var(--border-subtle)"],
      accent: ["var(--accent-ink)", "var(--accent-soft)", "var(--accent-line)"],
      outline: ["var(--ink-2)", "transparent", "var(--border-default)"],
      done: ["var(--done)", "var(--done-soft)", "transparent"]
    }[tone];
    return /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: T[0],
        background: T[1],
        border: `1px solid ${T[2]}`,
        borderRadius: "var(--radius-full)",
        padding: "3px 9px",
        lineHeight: 1.1,
        ...style
      }
    }, children);
  }
  function Avatar({
    hue = "coral",
    size = 40,
    ring,
    presence,
    initials,
    src,
    style = {}
  }) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        position: "relative",
        display: "inline-flex",
        flex: "none",
        width: size,
        height: size,
        ...style
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: src ? "" : mesh(hue),
      style: {
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: ring ? "2px solid var(--accent)" : "1px solid var(--border-default)",
        boxShadow: ring ? "var(--glow-accent-sm)" : "none",
        background: src ? "var(--surface-3)" : undefined
      }
    }, src ? /*#__PURE__*/React.createElement("img", {
      src: src,
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    }) : initials ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: size * 0.38,
        color: "#fff",
        mixBlendMode: "overlay"
      }
    }, initials) : null), presence && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        right: -1,
        bottom: -1,
        width: Math.max(8, size * 0.26),
        height: Math.max(8, size * 0.26),
        borderRadius: "50%",
        background: "var(--presence-online)",
        border: "2px solid var(--bg-canvas)"
      }
    }));
  }
  function ProgressMeter({
    value = 0,
    showValue = true,
    style = {}
  }) {
    const v = Math.max(0, Math.min(100, value));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        flex: 1,
        height: 5,
        background: "var(--surface-4)",
        borderRadius: 999,
        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        width: `${v}%`,
        background: "linear-gradient(90deg, var(--ink-3), var(--ink-0))",
        borderRadius: 999
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: "50%",
        left: `${v}%`,
        transform: "translate(-50%,-50%)",
        width: 13,
        height: 13,
        borderRadius: "50%",
        background: "var(--ink-0)",
        boxShadow: "0 2px 5px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.8)"
      }
    })), showValue && /*#__PURE__*/React.createElement("span", {
      className: "ars-tnum",
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--ink-3)",
        minWidth: 38,
        textAlign: "right"
      }
    }, Math.round(v), "%"));
  }
  function Input({
    label,
    icon,
    type = "text",
    style = {},
    wrap = {},
    ...rest
  }) {
    return /*#__PURE__*/React.createElement("label", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 9,
        ...wrap
      }
    }, label && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: ".12em",
        textTransform: "uppercase",
        color: "var(--ink-3)"
      }
    }, label), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "relative",
        display: "flex",
        alignItems: "center"
      }
    }, icon && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 14,
        display: "inline-flex",
        color: "var(--ink-3)",
        pointerEvents: "none"
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: icon,
      size: 16
    })), /*#__PURE__*/React.createElement("input", _extends({
      type: type
    }, rest, {
      style: {
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
        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.35)",
        transition: "border-color .18s, box-shadow .18s",
        ...style
      },
      onFocus: e => {
        e.currentTarget.style.borderColor = "var(--accent-line)";
        e.currentTarget.style.boxShadow = "inset 0 1px 2px rgba(0,0,0,0.35), var(--glow-focus)";
      },
      onBlur: e => {
        e.currentTarget.style.borderColor = "var(--border-default)";
        e.currentTarget.style.boxShadow = "inset 0 1px 2px rgba(0,0,0,0.35)";
      }
    }))));
  }
  function Switch({
    checked,
    onChange,
    disabled,
    style = {}
  }) {
    return /*#__PURE__*/React.createElement("button", {
      role: "switch",
      "aria-checked": !!checked,
      disabled: disabled,
      onClick: () => !disabled && onChange && onChange(!checked),
      style: {
        position: "relative",
        width: 46,
        height: 28,
        flex: "none",
        borderRadius: 999,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        background: checked ? "var(--coral)" : "var(--surface-4)",
        boxShadow: checked ? "var(--glow-accent-sm)" : "inset 0 0 0 1px var(--border-default)",
        transition: "background .2s var(--ease-out), box-shadow .2s",
        padding: 0,
        ...style
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: 3,
        left: 3,
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,.5)",
        transform: checked ? "translateX(18px)" : "translateX(0)",
        transition: "transform .2s var(--ease-out)"
      }
    }));
  }
  function FilterChip({
    children,
    selected,
    icon,
    onClick,
    style = {}
  }) {
    return /*#__PURE__*/React.createElement("button", {
      onClick: onClick,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        height: 34,
        padding: "0 15px",
        borderRadius: 999,
        fontFamily: "var(--font-text)",
        fontSize: 14,
        fontWeight: 500,
        cursor: "pointer",
        whiteSpace: "nowrap",
        background: selected ? "var(--coral)" : "var(--surface-3)",
        color: selected ? "var(--on-coral)" : "var(--fg2)",
        border: `1px solid ${selected ? "var(--coral-press)" : "var(--border-default)"}`,
        boxShadow: selected ? "var(--glow-accent-sm)" : "none",
        transition: "all .2s var(--ease-out)",
        ...style
      }
    }, icon && /*#__PURE__*/React.createElement(A, {
      name: icon,
      size: 15
    }), children);
  }
  function Segmented({
    options = [],
    value,
    onChange,
    chips,
    style = {}
  }) {
    const items = options.map(o => typeof o === "string" ? {
      value: o,
      label: o
    } : o);
    if (chips) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          display: "inline-flex",
          gap: 10,
          flexWrap: "wrap",
          ...style
        }
      }, items.map(it => {
        const a = it.value === value;
        return /*#__PURE__*/React.createElement("button", {
          key: it.value,
          onClick: () => onChange && onChange(it.value),
          style: {
            height: 40,
            padding: "0 16px",
            borderRadius: "var(--radius-sm)",
            fontFamily: "var(--font-text)",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            background: a ? "var(--accent-soft)" : "var(--surface-3)",
            color: a ? "var(--accent-ink)" : "var(--ink-1)",
            border: `1px solid ${a ? "var(--accent-line)" : "var(--border-default)"}`,
            transition: "all .18s"
          }
        }, it.label);
      }));
    }
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "inline-flex",
        padding: 4,
        gap: 4,
        borderRadius: "var(--radius-md)",
        background: "var(--surface-2)",
        border: "1px solid var(--border-subtle)",
        ...style
      }
    }, items.map(it => {
      const a = it.value === value;
      return /*#__PURE__*/React.createElement("button", {
        key: it.value,
        onClick: () => onChange && onChange(it.value),
        style: {
          flex: 1,
          height: 40,
          padding: "0 22px",
          borderRadius: "var(--radius-sm)",
          fontFamily: "var(--font-text)",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          whiteSpace: "nowrap",
          background: a ? "var(--accent-soft)" : "transparent",
          color: a ? "var(--ink-0)" : "var(--ink-3)",
          border: `1px solid ${a ? "var(--accent-line)" : "transparent"}`,
          transition: "all .18s"
        }
      }, it.label);
    }));
  }
  function Tabs({
    tabs = [],
    value,
    onChange,
    style = {}
  }) {
    const items = tabs.map(t => typeof t === "string" ? {
      value: t,
      label: t
    } : t);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "inline-flex",
        padding: 5,
        gap: 4,
        borderRadius: "var(--radius-md)",
        background: "var(--surface-2)",
        border: "1px solid var(--border-subtle)",
        ...style
      }
    }, items.map(it => {
      const a = it.value === value;
      return /*#__PURE__*/React.createElement("button", {
        key: it.value,
        onClick: () => onChange && onChange(it.value),
        style: {
          height: 38,
          padding: "0 20px",
          borderRadius: "var(--radius-sm)",
          fontFamily: "var(--font-text)",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          background: a ? "var(--surface-4)" : "transparent",
          color: a ? "var(--ink-0)" : "var(--ink-3)",
          border: "none",
          boxShadow: a ? "var(--edge-light)" : "none",
          transition: "all .18s"
        }
      }, it.label);
    }));
  }
  function Card({
    children,
    panel,
    interactive,
    glow,
    onClick,
    className = "",
    style = {}
  }) {
    if (panel) {
      return /*#__PURE__*/React.createElement("div", {
        onClick: onClick,
        className: ("ars-glass " + className).trim(),
        style: {
          borderRadius: "var(--radius-2xl)",
          boxShadow: glow ? "var(--edge-light), 0 0 0 1px var(--accent-line), var(--glow-accent), var(--shadow-panel)" : undefined,
          transition: "box-shadow .2s var(--ease-out)",
          ...style
        }
      }, children);
    }
    const rest = "var(--shadow-sm)";
    const base = {
      background: "var(--surface-2)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      boxShadow: glow ? "0 0 0 1px var(--accent-line), var(--glow-accent-sm)" : rest,
      transition: "transform .2s var(--ease-out), box-shadow .2s var(--ease-out), border-color .2s var(--ease-out)"
    };
    return /*#__PURE__*/React.createElement("div", {
      onClick: onClick,
      className: className,
      style: {
        ...base,
        ...style
      },
      onMouseEnter: e => {
        if (!interactive) return;
        e.currentTarget.style.borderColor = "var(--border-strong)";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "var(--shadow-md)";
      },
      onMouseLeave: e => {
        if (!interactive) return;
        e.currentTarget.style.borderColor = "var(--border-subtle)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = rest;
      }
    }, children);
  }
  function Label({
    children,
    style = {}
  }) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: ".12em",
        textTransform: "uppercase",
        color: "var(--ink-3)",
        ...style
      }
    }, children);
  }
  Object.assign(window, {
    ABtn: Button,
    AIconBtn: IconButton,
    ATag: Tag,
    AStatus: StatusPill,
    ABadge: Badge,
    AAvatar: Avatar,
    AProgress: ProgressMeter,
    AInput: Input,
    ASwitch: Switch,
    AChip: FilterChip,
    ASeg: Segmented,
    ATabs: Tabs,
    ACard: Card,
    ALabel: Label,
    aMesh: mesh
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mac/ui.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mac/work.jsx
try { (() => {
// Arsyen Mac — the WORK workflow.
// Left rail = category + object selector. Right = one persistent workspace
// that loads the selected object. Project views (Overview/Board/Plans/Files/
// Activity) are views of the object — opening a task expands inline, context
// preserved. Fullscreen is a focus STATE (hide rail, center workspace).
(function () {
  const A = window.AIcon;
  const {
    ABtn,
    AIconBtn,
    ATag,
    AStatus,
    AAvatar,
    AProgress,
    ACard,
    ALabel
  } = window;
  const CATEGORIES = [{
    sec: "Core",
    items: [{
      k: "projects",
      label: "Projects",
      icon: "folder",
      count: 2
    }, {
      k: "inbox",
      label: "Inbox",
      icon: "inbox",
      count: 12
    }, {
      k: "notes",
      label: "Notes",
      icon: "notes",
      count: 14
    }, {
      k: "tasks",
      label: "Tasks",
      icon: "task",
      count: 23
    }, {
      k: "ideas",
      label: "Ideas",
      icon: "idea",
      count: 7
    }]
  }, {
    sec: "Creative",
    items: [{
      k: "moodboards",
      label: "Moodboards",
      icon: "moodboard",
      count: 5
    }, {
      k: "assets",
      label: "Assets",
      icon: "layers",
      count: 128
    }]
  }, {
    sec: "Growth",
    items: [{
      k: "contacts",
      label: "Contacts",
      icon: "users",
      count: 36
    }, {
      k: "opportunities",
      label: "Opportunities",
      icon: "target",
      count: 4
    }]
  }, {
    sec: "Planning",
    items: [{
      k: "calendar",
      label: "Calendar",
      icon: "calendar"
    }]
  }];
  const PROJECTS = [{
    id: "sinners",
    name: "SINNERS",
    type: "Feature film",
    status: "PLANNING",
    tone: "planning",
    pct: 11,
    hue: "ember",
    role: "Owner"
  }, {
    id: "test",
    name: "TEST",
    type: "Short film",
    status: "PLANNING",
    tone: "planning",
    pct: 100,
    hue: "violet",
    role: "Owner"
  }];
  const COLUMNS = [{
    key: "todo",
    label: "To do",
    tickets: [{
      id: 1,
      title: "Lock final shooting script",
      pr: "high",
      prl: "High",
      tag: "script",
      plan: "Pre-production",
      comments: 1,
      desc: "Revision 6 with the new ferry scene folded in."
    }, {
      id: 4,
      title: "Build shot list for Act I",
      pr: "medium",
      prl: "Medium",
      tag: "camera",
      plan: "Pre-production"
    }, {
      id: 5,
      title: "Rent anamorphic lens kit",
      pr: "low",
      prl: "Low",
      tag: "gear",
      plan: "Pre-production"
    }]
  }, {
    key: "prog",
    label: "In progress",
    tickets: [{
      id: 2,
      title: "Cast the two leads",
      pr: "high",
      prl: "High",
      tag: "casting",
      plan: "Pre-production"
    }, {
      id: 3,
      title: "Scout the harbor location",
      pr: "medium",
      prl: "Medium",
      tag: "locations",
      plan: "Pre-production"
    }]
  }, {
    key: "review",
    label: "Review",
    tickets: [{
      id: 6,
      title: "Storyboard the chase sequence",
      pr: "medium",
      prl: "Medium",
      tag: "camera",
      plan: "Principal photography"
    }, {
      id: 7,
      title: "Color grade the teaser",
      pr: "medium",
      prl: "Medium",
      tag: "post",
      plan: "Post & delivery"
    }]
  }, {
    key: "done",
    label: "Done",
    done: true,
    tickets: [{
      id: 9,
      title: "Cut the announcement teaser",
      pr: "medium",
      prl: "Medium",
      tag: "post",
      plan: "Post & delivery"
    }]
  }];
  const PLANS = [{
    name: "Pre-production",
    tone: "planning",
    pct: 32,
    tasks: 5,
    done: 1
  }, {
    name: "Principal photography",
    tone: "low",
    pct: 0,
    tasks: 1,
    done: 0
  }, {
    name: "Post & delivery",
    tone: "review",
    pct: 0,
    tasks: 2,
    done: 0
  }];
  const FILES = [{
    n: "SINNERS_script_rev6.pdf",
    k: "PDF",
    s: "2.4 MB",
    hue: "ember"
  }, {
    n: "harbor_recce.jpg",
    k: "IMG",
    s: "5.1 MB",
    hue: "azure"
  }, {
    n: "teaser_v3.mov",
    k: "MOV",
    s: "184 MB",
    hue: "violet"
  }, {
    n: "moodboard_act1.png",
    k: "IMG",
    s: "8.7 MB",
    hue: "coral"
  }, {
    n: "callsheet_d1.pdf",
    k: "PDF",
    s: "0.6 MB",
    hue: "verdant"
  }, {
    n: "score_draft.wav",
    k: "WAV",
    s: "42 MB",
    hue: "azure"
  }];
  const ACTIVITY = [{
    who: "Root",
    hue: "verdant",
    t: "2m",
    txt: "moved Color grade the teaser to Review"
  }, {
    who: "Søren K.",
    hue: "ember",
    t: "1h",
    txt: "uploaded score_draft.wav to Files"
  }, {
    who: "Nadia Œ",
    hue: "coral",
    t: "3h",
    txt: "commented on Lock final shooting script"
  }, {
    who: "Root",
    hue: "verdant",
    t: "1d",
    txt: "created the Pre-production action plan"
  }];
  const VIEWS = [["overview", "Overview", "overview"], ["board", "Board", "grid"], ["plans", "Action Plans", "target"], ["files", "Files", "folder"], ["activity", "Activity", "activity"]];

  /* per-category rail panels: each Work section shows its own objects */
  const RAIL = {
    inbox: {
      label: "Filters",
      rows: [{
        t: "All",
        s: "12 new",
        icon: "inbox"
      }, {
        t: "Mentions",
        s: "3",
        icon: "at"
      }, {
        t: "Assigned to me",
        s: "4",
        icon: "task"
      }, {
        t: "Comments",
        s: "5",
        icon: "message"
      }]
    },
    notes: {
      label: "Last opened",
      rows: [{
        t: "Ferry scene — rev notes",
        s: "SINNERS · 2m",
        icon: "notes"
      }, {
        t: "Lens test thoughts",
        s: "SINNERS · 1h",
        icon: "notes"
      }, {
        t: "Score references",
        s: "3h",
        icon: "notes"
      }, {
        t: "Casting shortlist",
        s: "yesterday",
        icon: "notes"
      }, {
        t: "Title ideas",
        s: "2d",
        icon: "notes"
      }]
    },
    tasks: {
      label: "Lists",
      rows: [{
        t: "Today",
        s: "5",
        icon: "task"
      }, {
        t: "Upcoming",
        s: "12",
        icon: "clock"
      }, {
        t: "Someday",
        s: "7",
        icon: "idea"
      }, {
        t: "Done",
        s: "·",
        icon: "checkCircle"
      }]
    },
    ideas: {
      label: "Boards",
      rows: [{
        t: "Night & neon",
        s: "9 ideas",
        icon: "idea"
      }, {
        t: "Sound world",
        s: "4 ideas",
        icon: "idea"
      }, {
        t: "Loose ends",
        s: "3 ideas",
        icon: "idea"
      }]
    },
    calendar: {
      label: "Upcoming",
      rows: [{
        t: "Recce — harbour",
        s: "Thu 09:00",
        icon: "calendar"
      }, {
        t: "Table read",
        s: "Fri 14:00",
        icon: "calendar"
      }, {
        t: "Score session",
        s: "Mon 11:00",
        icon: "calendar"
      }]
    },
    moodboards: {
      label: "Boards",
      rows: [{
        t: "Act I look",
        s: "24 refs",
        icon: "moodboard"
      }, {
        t: "Costume",
        s: "11 refs",
        icon: "moodboard"
      }]
    },
    assets: {
      label: "Collections",
      rows: [{
        t: "Stills",
        s: "86",
        icon: "layers"
      }, {
        t: "Audio",
        s: "22",
        icon: "layers"
      }, {
        t: "Docs",
        s: "20",
        icon: "file"
      }]
    },
    contacts: {
      label: "Crew",
      rows: [{
        t: "Søren K.",
        s: "Composer",
        icon: "user"
      }, {
        t: "Nadia Œ",
        s: "DP",
        icon: "user"
      }, {
        t: "Mara Vey",
        s: "Production design",
        icon: "user"
      }]
    },
    opportunities: {
      label: "Open",
      rows: [{
        t: "Grant — Nordic Film",
        s: "due 14d",
        icon: "target"
      }, {
        t: "Festival submission",
        s: "due 30d",
        icon: "target"
      }]
    }
  };

  /* ---------------- LEFT RAIL ---------------- */
  function WorkRail({
    cat,
    setCat,
    project,
    setProject
  }) {
    return /*#__PURE__*/React.createElement(ACard, {
      panel: true,
      style: {
        width: 282,
        flex: "none",
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "20px 20px 14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 24,
        color: "var(--fg1)",
        letterSpacing: "-.02em"
      }
    }, "Work"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement(ALabel, null, "Your studio"))), /*#__PURE__*/React.createElement(AIconBtn, {
      name: "plus",
      label: "New",
      size: "sm"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflowY: "auto",
        padding: "0 12px 14px"
      }
    }, CATEGORIES.map(g => /*#__PURE__*/React.createElement("div", {
      key: g.sec,
      style: {
        marginTop: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "6px 8px"
      }
    }, /*#__PURE__*/React.createElement(ALabel, {
      style: {
        fontSize: 10
      }
    }, g.sec)), g.items.map(it => {
      const on = cat === it.k;
      return /*#__PURE__*/React.createElement("button", {
        key: it.k,
        onClick: () => setCat(it.k),
        style: {
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 11,
          padding: "9px 10px",
          borderRadius: "var(--radius-md)",
          border: "none",
          cursor: "pointer",
          background: on ? "var(--accent-soft)" : "transparent",
          color: on ? "var(--accent-ink)" : "var(--fg2)",
          transition: "background .18s, color .18s",
          textAlign: "left"
        },
        onMouseEnter: e => {
          if (!on) e.currentTarget.style.background = "var(--overlay-04)";
        },
        onMouseLeave: e => {
          if (!on) e.currentTarget.style.background = "transparent";
        }
      }, /*#__PURE__*/React.createElement(A, {
        name: it.icon,
        size: 18,
        stroke: on ? 1.9 : 1.7
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1,
          fontFamily: "var(--font-text)",
          fontSize: 14,
          fontWeight: on ? 600 : 500,
          color: on ? "var(--fg1)" : "var(--fg2)"
        }
      }, it.label), it.count != null && /*#__PURE__*/React.createElement("span", {
        className: "ars-tnum",
        style: {
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--fg3)"
        }
      }, it.count));
    })))), cat === "projects" ? /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "1px solid var(--border-subtle)",
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, PROJECTS.map(p => {
      const on = project && project.id === p.id;
      return /*#__PURE__*/React.createElement("button", {
        key: p.id,
        onClick: () => setProject(p),
        style: {
          display: "flex",
          alignItems: "center",
          gap: 11,
          padding: 9,
          borderRadius: "var(--radius-md)",
          border: `1px solid ${on ? "var(--accent-line)" : "transparent"}`,
          background: on ? "var(--accent-soft)" : "var(--surface-2)",
          cursor: "pointer",
          textAlign: "left",
          transition: "all .18s"
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "ars-mesh ars-mesh--" + p.hue,
        style: {
          width: 34,
          height: 34,
          borderRadius: "var(--radius-sm)",
          flex: "none",
          border: "1px solid var(--border-default)"
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          display: "block",
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 14,
          color: "var(--fg1)"
        }
      }, p.name), /*#__PURE__*/React.createElement("span", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginTop: 3
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--planning)"
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--fg3)"
        }
      }, p.status))), /*#__PURE__*/React.createElement("span", {
        className: "ars-tnum",
        style: {
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--fg3)"
        }
      }, p.pct, "%"));
    })) : RAIL[cat] ? /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "1px solid var(--border-subtle)",
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "4px 8px 8px"
      }
    }, /*#__PURE__*/React.createElement(ALabel, {
      style: {
        fontSize: 10
      }
    }, RAIL[cat].label)), RAIL[cat].rows.map((r, i) => /*#__PURE__*/React.createElement("button", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 11,
        padding: "9px 10px",
        borderRadius: "var(--radius-md)",
        border: `1px solid ${i === 0 ? "var(--accent-line)" : "transparent"}`,
        background: i === 0 ? "var(--accent-soft)" : "transparent",
        cursor: "pointer",
        textAlign: "left",
        transition: "all .15s"
      },
      onMouseEnter: e => {
        if (i !== 0) e.currentTarget.style.background = "var(--overlay-04)";
      },
      onMouseLeave: e => {
        if (i !== 0) e.currentTarget.style.background = "transparent";
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 30,
        height: 30,
        flex: "none",
        borderRadius: "var(--radius-sm)",
        background: "var(--surface-3)",
        border: "1px solid var(--border-subtle)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: i === 0 ? "var(--accent)" : "var(--fg3)"
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: r.icon,
      size: 15
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        fontSize: 13.5,
        fontWeight: 500,
        color: "var(--fg1)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, r.t), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 10.5,
        color: "var(--fg3)"
      }
    }, r.s))))) : null);
  }
  window.ArsWork = {
    CATEGORIES,
    PROJECTS,
    COLUMNS,
    PLANS,
    FILES,
    ACTIVITY,
    VIEWS,
    RAIL,
    WorkRail
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mac/work.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mac/work_space.jsx
try { (() => {
// Arsyen Mac — the persistent WORKSPACE that loads a Work object (Project).
// Views are facets of the same object; opening a task expands inline.
(function () {
  const A = window.AIcon;
  const {
    ABtn,
    AIconBtn,
    ATag,
    AStatus,
    AAvatar,
    AProgress,
    ACard,
    ALabel
  } = window;
  const W = window.ArsWork;
  const Chip = ({
    on,
    onClick,
    children
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      flex: "none",
      height: 34,
      padding: "0 13px",
      borderRadius: "var(--radius-md)",
      background: on ? "var(--accent-soft)" : "var(--surface-3)",
      color: on ? "var(--accent-ink)" : "var(--fg2)",
      border: `1px solid ${on ? "var(--accent-line)" : "var(--border-default)"}`,
      fontFamily: "var(--font-text)",
      fontSize: 13.5,
      fontWeight: 500,
      cursor: "pointer",
      whiteSpace: "nowrap",
      transition: "all .15s"
    }
  }, children);
  const Field = ({
    label,
    children
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(ALabel, null, label), children);

  /* ---- inline task detail (context preserved) ---- */
  function TaskDetail({
    t,
    onClose
  }) {
    const [col, setCol] = React.useState("To do");
    const [pr, setPr] = React.useState(t.prl || "High");
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: 340,
        flex: "none",
        borderLeft: "1px solid var(--border-subtle)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        animation: "ars-detail-in .28s var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "16px 18px",
        borderBottom: "1px solid var(--border-subtle)",
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "ars-tnum",
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--fg3)"
      }
    }, "#", t.id), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 16,
        color: "var(--fg1)",
        letterSpacing: "-.01em"
      }
    }, t.title), /*#__PURE__*/React.createElement(AIconBtn, {
      name: "x",
      label: "Close",
      size: "sm",
      onClick: onClose
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflowY: "auto",
        padding: 18,
        display: "flex",
        flexDirection: "column",
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Column"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 7,
        flexWrap: "wrap"
      }
    }, ["To do", "In progress", "Review", "Done"].map(k => /*#__PURE__*/React.createElement(Chip, {
      key: k,
      on: col === k,
      onClick: () => setCol(k)
    }, k)))), /*#__PURE__*/React.createElement(Field, {
      label: "Priority"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 7,
        flexWrap: "wrap"
      }
    }, ["Low", "Medium", "High", "Urgent"].map(k => /*#__PURE__*/React.createElement(Chip, {
      key: k,
      on: pr === k,
      onClick: () => setPr(k)
    }, k)))), /*#__PURE__*/React.createElement(Field, {
      label: "Action plan"
    }, /*#__PURE__*/React.createElement(AStatus, {
      tone: "planning",
      style: {
        alignSelf: "flex-start"
      }
    }, t.plan || "Pre-production")), /*#__PURE__*/React.createElement(Field, {
      label: "Assignees"
    }, /*#__PURE__*/React.createElement(ABtn, {
      variant: "secondary",
      size: "sm",
      icon: "user"
    }, "Root")), /*#__PURE__*/React.createElement(Field, {
      label: "Description"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--surface-3)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-md)",
        padding: 13,
        fontSize: 14,
        color: "var(--fg1)",
        lineHeight: 1.5
      }
    }, t.desc || "Add a description…")), /*#__PURE__*/React.createElement(Field, {
      label: "Labels"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 7
      }
    }, /*#__PURE__*/React.createElement(ATag, null, t.tag)))));
  }

  /* ---- views ---- */
  function Overview({
    project,
    go
  }) {
    const stats = [["9", "Tasks"], ["3", "Plans"], ["6", "Files"], ["4", "Crew"]];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 26,
        display: "flex",
        flexDirection: "column",
        gap: 22
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 14
      }
    }, stats.map(([v, l]) => /*#__PURE__*/React.createElement(ACard, {
      key: l,
      style: {
        padding: 18
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ars-tnum",
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 28,
        color: "var(--fg1)"
      }
    }, v), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement(ALabel, null, l))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr",
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(ACard, {
      style: {
        padding: 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(ALabel, null, "Action plans"), /*#__PURE__*/React.createElement("button", {
      onClick: () => go("plans"),
      style: {
        background: "none",
        border: "none",
        color: "var(--accent-ink)",
        fontSize: 13,
        cursor: "pointer",
        fontFamily: "var(--font-text)"
      }
    }, "View all")), W.PLANS.map((p, i) => /*#__PURE__*/React.createElement("div", {
      key: p.name,
      style: {
        marginTop: i ? 16 : 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: "var(--fg1)",
        fontWeight: 500
      }
    }, p.name), /*#__PURE__*/React.createElement("span", {
      className: "ars-tnum",
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--fg3)"
      }
    }, p.done, "/", p.tasks)), /*#__PURE__*/React.createElement(AProgress, {
      value: p.pct,
      showValue: false
    })))), /*#__PURE__*/React.createElement(ACard, {
      style: {
        padding: 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement(ALabel, null, "Recent activity")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 14
      }
    }, W.ACTIVITY.slice(0, 3).map((a, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(AAvatar, {
      hue: a.hue,
      size: 26
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        fontSize: 13,
        color: "var(--fg2)",
        lineHeight: 1.4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--fg1)",
        fontWeight: 600
      }
    }, a.who), " ", a.txt, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--fg3)",
        fontFamily: "var(--font-mono)",
        fontSize: 11
      }
    }, "\xB7 ", a.t))))))), /*#__PURE__*/React.createElement("a", {
      href: "canvas.html",
      style: {
        textDecoration: "none"
      }
    }, /*#__PURE__*/React.createElement(ACard, {
      interactive: true,
      style: {
        padding: 0,
        overflow: "hidden",
        display: "flex",
        alignItems: "stretch",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ars-mesh ars-mesh--ember",
      style: {
        width: 180,
        flex: "none",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff"
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: "play",
      size: 26
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        padding: 22,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(ALabel, null, "Canvas"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 22,
        color: "var(--fg1)",
        letterSpacing: "-.02em",
        marginTop: 6
      }
    }, "NOCTURNE \u2014 the pitch"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: "var(--fg2)",
        marginTop: 6,
        lineHeight: 1.5
      }
    }, "A scroll-narrative Canvas for the film \u2014 hero, chapters, stills, storyboard. Built on the universal Canvas engine.")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        paddingRight: 22,
        color: "var(--fg3)"
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: "chevronRight",
      size: 20
    })))));
  }
  function Board({
    onOpen,
    task
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flex: 1,
        minHeight: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0,
        overflowX: "auto",
        padding: 24,
        display: "flex",
        gap: 18
      }
    }, W.COLUMNS.map(c => /*#__PURE__*/React.createElement("div", {
      key: c.key,
      style: {
        width: 264,
        flex: "none",
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 4px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7
      }
    }, c.done && /*#__PURE__*/React.createElement(A, {
      name: "checkCircle",
      size: 14,
      color: "var(--done)"
    }), /*#__PURE__*/React.createElement(ALabel, {
      style: {
        color: c.done ? "var(--done)" : "var(--fg3)"
      }
    }, c.label)), /*#__PURE__*/React.createElement("span", {
      className: "ars-tnum",
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--fg3)"
      }
    }, c.tickets.length)), c.tickets.map(t => {
      const sel = task && task.id === t.id;
      return /*#__PURE__*/React.createElement(ACard, {
        key: t.id,
        interactive: true,
        glow: sel,
        onClick: () => onOpen(t),
        style: {
          padding: 14,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: 11
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "ars-tnum",
        style: {
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--fg3)"
        }
      }, "#", t.id), /*#__PURE__*/React.createElement(AStatus, {
        tone: t.pr
      }, t.prl)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 15.5,
          color: "var(--fg1)",
          letterSpacing: "-.01em",
          lineHeight: 1.25
        }
      }, t.title), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10
        }
      }, /*#__PURE__*/React.createElement(ATag, null, t.tag), t.comments && /*#__PURE__*/React.createElement("span", {
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--fg3)"
        }
      }, /*#__PURE__*/React.createElement(A, {
        name: "message",
        size: 13
      }), t.comments)));
    })))), task && /*#__PURE__*/React.createElement(TaskDetail, {
      t: task,
      onClose: () => onOpen(null)
    }));
  }
  function Plans() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 26,
        display: "flex",
        flexDirection: "column",
        gap: 16
      }
    }, W.PLANS.map(p => /*#__PURE__*/React.createElement(ACard, {
      key: p.name,
      interactive: true,
      style: {
        padding: 22,
        display: "flex",
        alignItems: "center",
        gap: 20
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 44,
        height: 44,
        borderRadius: "var(--radius-md)",
        background: "var(--accent-soft)",
        border: "1px solid var(--accent-line)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--accent)"
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: "target",
      size: 22
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 18,
        color: "var(--fg1)"
      }
    }, p.name), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        maxWidth: 360
      }
    }, /*#__PURE__*/React.createElement(AProgress, {
      value: p.pct
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ars-tnum",
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 22,
        color: "var(--fg1)"
      }
    }, p.done, "/", p.tasks), /*#__PURE__*/React.createElement(ALabel, null, "tasks")))));
  }
  function Files() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 26,
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 16
      }
    }, W.FILES.map(f => /*#__PURE__*/React.createElement(ACard, {
      key: f.n,
      interactive: true,
      style: {
        padding: 0,
        overflow: "hidden",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ars-mesh ars-mesh--" + f.hue,
      style: {
        height: 100,
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: 10,
        left: 10,
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: ".08em",
        color: "#fff",
        background: "rgba(0,0,0,.4)",
        padding: "3px 7px",
        borderRadius: "var(--radius-xs)"
      }
    }, f.k)), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        color: "var(--fg1)",
        fontWeight: 500,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, f.n), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4,
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--fg3)"
      }
    }, f.s)))));
  }
  function Activity() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 26
      }
    }, /*#__PURE__*/React.createElement(ACard, {
      style: {
        padding: 22
      }
    }, W.ACTIVITY.map((a, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        gap: 13,
        padding: "14px 0",
        borderBottom: i < W.ACTIVITY.length - 1 ? "1px solid var(--border-subtle)" : "none"
      }
    }, /*#__PURE__*/React.createElement(AAvatar, {
      hue: a.hue,
      size: 32
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        fontSize: 14,
        color: "var(--fg2)",
        lineHeight: 1.45
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--fg1)",
        fontWeight: 600
      }
    }, a.who), " ", a.txt), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--fg3)"
      }
    }, a.t)))));
  }

  /* ---------------- WORKSPACE ---------------- */
  function Workspace({
    project,
    fullscreen,
    setFullscreen
  }) {
    const [view, setView] = React.useState("board");
    const [task, setTask] = React.useState(null);
    const p = project || W.PROJECTS[0];
    React.useEffect(() => {
      setTask(null);
    }, [view, project]);
    const Body = {
      overview: () => /*#__PURE__*/React.createElement(Overview, {
        project: p,
        go: setView
      }),
      board: () => /*#__PURE__*/React.createElement(Board, {
        onOpen: setTask,
        task: task
      }),
      plans: () => /*#__PURE__*/React.createElement(Plans, null),
      files: () => /*#__PURE__*/React.createElement(Files, null),
      activity: () => /*#__PURE__*/React.createElement(Activity, null)
    }[view];
    return /*#__PURE__*/React.createElement(ACard, {
      panel: true,
      className: "ars-breathe",
      style: {
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        flex: "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ars-mesh ars-mesh--" + p.hue,
      style: {
        height: 220
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, rgba(0,0,0,.04) 0%, rgba(6,4,4,.32) 50%, rgba(6,4,4,.88) 100%)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 18,
        right: 18,
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(AIconBtn, {
      name: "link",
      label: "Copy link",
      size: "sm"
    }), /*#__PURE__*/React.createElement(AIconBtn, {
      name: "more",
      label: "More",
      size: "sm"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: 28,
        bottom: 22,
        right: 28,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AStatus, {
      tone: p.tone,
      bare: true,
      style: {
        marginBottom: 10
      }
    }, p.status), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 52,
        color: "#fff",
        letterSpacing: "-.03em",
        lineHeight: 1
      }
    }, p.name)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 16,
        paddingBottom: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement(ALabel, {
      style: {
        color: "rgba(255,255,255,.7)"
      }
    }, p.type)), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement(AAvatar, {
      hue: "azure",
      size: 30,
      ring: true
    }), /*#__PURE__*/React.createElement(AAvatar, {
      hue: "coral",
      size: 30,
      style: {
        marginLeft: -10
      }
    }))))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 4,
        padding: "10px 14px 10px 18px",
        borderBottom: "1px solid var(--border-subtle)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 4,
        overflowX: "auto",
        minWidth: 0
      }
    }, W.VIEWS.map(([k, label, icon]) => {
      const on = view === k;
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        onClick: () => setView(k),
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          height: 36,
          padding: "0 14px",
          borderRadius: "var(--radius-md)",
          border: "none",
          cursor: "pointer",
          background: on ? "var(--surface-3)" : "transparent",
          color: on ? "var(--fg1)" : "var(--fg3)",
          fontFamily: "var(--font-text)",
          fontSize: 14,
          fontWeight: on ? 600 : 500,
          transition: "all .15s",
          whiteSpace: "nowrap"
        }
      }, /*#__PURE__*/React.createElement(A, {
        name: icon,
        size: 16,
        stroke: on ? 1.9 : 1.7
      }), label);
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => setFullscreen(!fullscreen),
      "aria-label": fullscreen ? "Exit focus" : "Focus mode",
      title: fullscreen ? "Exit focus" : "Focus mode",
      style: {
        flex: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--border-default)",
        background: fullscreen ? "var(--accent-soft)" : "var(--surface-3)",
        color: fullscreen ? "var(--accent)" : "var(--fg2)",
        cursor: "pointer",
        transition: "all .15s"
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: fullscreen ? "collapse" : "expand",
      size: 17
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0,
        overflowY: view === "board" ? "hidden" : "auto",
        display: "flex",
        flexDirection: "column"
      }
    }, Body()));
  }
  window.ArsWorkspace = Workspace;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mac/work_space.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mac/work_views.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Arsyen Mac — WORK category workspaces: Notes, ToDo, Inbox, Calendar, Generic.
// Each is a persistent workspace with a shared action-bar (title + fullscreen).
(function () {
  const A = window.AIcon;
  const {
    ABtn,
    AIconBtn,
    ATag,
    AStatus,
    AAvatar,
    ACard,
    ALabel
  } = window;
  function Shell({
    eyebrow,
    title,
    actions,
    fullscreen,
    setFullscreen,
    children,
    bodyPad = true
  }) {
    return /*#__PURE__*/React.createElement(ACard, {
      panel: true,
      className: "ars-breathe",
      style: {
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 14px 16px 22px",
        borderBottom: "1px solid var(--border-subtle)"
      }
    }, /*#__PURE__*/React.createElement("div", null, eyebrow && /*#__PURE__*/React.createElement(ALabel, null, eyebrow), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 26,
        color: "var(--fg1)",
        letterSpacing: "-.02em",
        marginTop: eyebrow ? 5 : 0
      }
    }, title)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, actions, /*#__PURE__*/React.createElement("button", {
      onClick: () => setFullscreen(!fullscreen),
      "aria-label": fullscreen ? "Exit focus" : "Focus mode",
      title: fullscreen ? "Exit focus" : "Focus mode",
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--border-default)",
        background: fullscreen ? "var(--accent-soft)" : "var(--surface-3)",
        color: fullscreen ? "var(--accent)" : "var(--fg2)",
        cursor: "pointer",
        transition: "all .15s"
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: fullscreen ? "collapse" : "expand",
      size: 17
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        padding: bodyPad ? 24 : 0
      }
    }, children));
  }

  /* ---------------- NOTES ---------------- */
  const NOTES = [{
    t: "Ferry scene — rev notes",
    body: "The ferry has to feel like a held breath. Cut the second exchange; let the silence carry it. Renn likes the idea of the horn as a clock.",
    tag: "SINNERS",
    time: "2m",
    hue: "ember"
  }, {
    t: "Lens test thoughts",
    body: "Anamorphic on the harbour wides, spherical for the diner. Keep the flares honest — no manufactured streaks.",
    tag: "SINNERS",
    time: "1h",
    hue: "azure"
  }, {
    t: "Score references",
    body: "Low strings + a single detuned piano. Nothing that resolves. Send Søren the Reykjavík mixes.",
    tag: "Sound",
    time: "3h",
    hue: "violet"
  }, {
    t: "Casting shortlist",
    body: "Two leads + the night clerk. Read-through Friday. Note: the clerk should feel like he's seen this night a hundred times.",
    tag: "Casting",
    time: "yesterday",
    hue: "coral"
  }, {
    t: "Title ideas",
    body: "NOCTURNE / The Last Ferry / Harbour Light. Renn leaning NOCTURNE.",
    tag: "SINNERS",
    time: "2d",
    hue: "verdant"
  }, {
    t: "Production budget v3",
    body: "Anamorphic kit rental is the swing line. Trim two night exteriors or find a sponsor.",
    tag: "Business",
    time: "4d",
    hue: "ember"
  }];
  function Notes({
    fullscreen,
    setFullscreen
  }) {
    return /*#__PURE__*/React.createElement(Shell, {
      eyebrow: "Work",
      title: "Notes",
      fullscreen: fullscreen,
      setFullscreen: setFullscreen,
      actions: /*#__PURE__*/React.createElement(ABtn, {
        size: "sm",
        icon: "plus"
      }, "New note")
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 16
      }
    }, NOTES.map((n, i) => /*#__PURE__*/React.createElement(ACard, {
      key: i,
      interactive: true,
      style: {
        padding: 18,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        cursor: "pointer",
        minHeight: 180
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 30,
        height: 30,
        borderRadius: "var(--radius-sm)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff"
      },
      className: "ars-mesh ars-mesh--" + n.hue
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 10.5,
        color: "var(--fg3)"
      }
    }, n.time)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 16.5,
        color: "var(--fg1)",
        letterSpacing: "-.01em"
      }
    }, n.t), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        color: "var(--fg2)",
        lineHeight: 1.5,
        flex: 1,
        display: "-webkit-box",
        WebkitLineClamp: 4,
        WebkitBoxOrient: "vertical",
        overflow: "hidden"
      }
    }, n.body), /*#__PURE__*/React.createElement(ATag, {
      style: {
        alignSelf: "flex-start"
      }
    }, n.tag)))));
  }

  /* ---------------- TODO ---------------- */
  function TodoRow({
    done,
    t,
    project,
    pr,
    due
  }) {
    const [d, setD] = React.useState(!!done);
    const tone = {
      High: "var(--high)",
      Medium: "var(--planning)",
      Low: "var(--low)"
    }[pr] || "var(--fg3)";
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "13px 6px",
        borderBottom: "1px solid var(--border-subtle)"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setD(!d),
      "aria-label": "toggle",
      style: {
        width: 22,
        height: 22,
        flex: "none",
        borderRadius: "50%",
        border: "none",
        background: "none",
        cursor: "pointer",
        color: d ? "var(--accent)" : "var(--fg3)",
        display: "inline-flex"
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: d ? "checkCircle" : "circle",
      size: 22
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        fontSize: 15,
        color: d ? "var(--fg3)" : "var(--fg1)",
        textDecoration: d ? "line-through" : "none"
      }
    }, t), /*#__PURE__*/React.createElement(ATag, null, project), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        minWidth: 78
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: tone
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--fg3)"
      }
    }, pr)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--fg3)",
        minWidth: 64,
        textAlign: "right"
      }
    }, due));
  }
  function Todo({
    fullscreen,
    setFullscreen
  }) {
    const groups = [{
      label: "Today",
      items: [{
        t: "Lock final shooting script",
        project: "SINNERS",
        pr: "High",
        due: "5:00 PM"
      }, {
        t: "Confirm anamorphic rental",
        project: "SINNERS",
        pr: "Medium",
        due: "EOD"
      }, {
        t: "Send Søren the score refs",
        project: "Sound",
        pr: "Low",
        due: "EOD"
      }]
    }, {
      label: "Upcoming",
      items: [{
        t: "Cast the two leads",
        project: "SINNERS",
        pr: "High",
        due: "Thu"
      }, {
        t: "Scout the harbour location",
        project: "SINNERS",
        pr: "Medium",
        due: "Fri"
      }, {
        t: "Draft the festival submission",
        project: "Growth",
        pr: "Low",
        due: "Mon"
      }]
    }, {
      label: "Done",
      items: [{
        t: "Cut the announcement teaser",
        project: "Post",
        pr: "Medium",
        due: "",
        done: true
      }]
    }];
    return /*#__PURE__*/React.createElement(Shell, {
      eyebrow: "Work",
      title: "To-do",
      fullscreen: fullscreen,
      setFullscreen: setFullscreen,
      actions: /*#__PURE__*/React.createElement(ABtn, {
        size: "sm",
        icon: "plus"
      }, "Add task")
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 820,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 26
      }
    }, groups.map(g => /*#__PURE__*/React.createElement("div", {
      key: g.label
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement(ALabel, null, g.label), /*#__PURE__*/React.createElement("span", {
      className: "ars-tnum",
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--fg3)"
      }
    }, g.items.length)), g.items.map((it, i) => /*#__PURE__*/React.createElement(TodoRow, _extends({
      key: i
    }, it)))))));
  }

  /* ---------------- INBOX (work activities) ---------------- */
  function Inbox({
    fullscreen,
    setFullscreen
  }) {
    const [filter, setFilter] = React.useState("All");
    const ITEMS = [{
      grp: "Today",
      who: "Nadia Œ",
      hue: "coral",
      icon: "at",
      txt: "mentioned you on",
      target: "Lock final shooting script",
      t: "12m",
      unread: true,
      kind: "Mentions"
    }, {
      grp: "Today",
      who: "Søren K.",
      hue: "ember",
      icon: "task",
      txt: "assigned you",
      target: "Color grade the teaser",
      t: "1h",
      unread: true,
      kind: "Assigned to me"
    }, {
      grp: "Today",
      who: "Mara Vey",
      hue: "violet",
      icon: "message",
      txt: "commented on",
      target: "Act I look — moodboard",
      t: "3h",
      kind: "Comments"
    }, {
      grp: "Earlier",
      who: "Root",
      hue: "verdant",
      icon: "task",
      txt: "completed",
      target: "Cut the announcement teaser",
      t: "1d",
      kind: "Assigned to me"
    }, {
      grp: "Earlier",
      who: "Nadia Œ",
      hue: "coral",
      icon: "message",
      txt: "replied to your note on",
      target: "Lens test thoughts",
      t: "2d",
      kind: "Comments"
    }];
    const filters = [["All", "inbox"], ["Mentions", "at"], ["Assigned to me", "task"], ["Comments", "message"]];
    const shown = ITEMS.filter(x => filter === "All" || x.kind === filter);
    const groups = ["Today", "Earlier"].map(g => ({
      g,
      items: shown.filter(x => x.grp === g)
    })).filter(x => x.items.length);
    return /*#__PURE__*/React.createElement(Shell, {
      eyebrow: "Work",
      title: "Inbox",
      fullscreen: fullscreen,
      setFullscreen: setFullscreen,
      actions: /*#__PURE__*/React.createElement(ABtn, {
        size: "sm",
        variant: "secondary"
      }, "Mark all read")
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginBottom: 20
      }
    }, filters.map(([f, ic]) => {
      const on = filter === f;
      return /*#__PURE__*/React.createElement("button", {
        key: f,
        onClick: () => setFilter(f),
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          height: 34,
          padding: "0 14px",
          borderRadius: 999,
          border: `1px solid ${on ? "var(--coral-press)" : "var(--border-default)"}`,
          background: on ? "var(--coral)" : "var(--surface-3)",
          color: on ? "var(--on-coral)" : "var(--fg2)",
          fontFamily: "var(--font-text)",
          fontSize: 13.5,
          fontWeight: 500,
          cursor: "pointer",
          transition: "all .15s"
        }
      }, /*#__PURE__*/React.createElement(A, {
        name: ic,
        size: 15
      }), f);
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 860,
        display: "flex",
        flexDirection: "column",
        gap: 22
      }
    }, groups.map(({
      g,
      items
    }) => /*#__PURE__*/React.createElement("div", {
      key: g
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement(ALabel, null, g)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, items.map((it, i) => /*#__PURE__*/React.createElement(ACard, {
      key: i,
      interactive: true,
      style: {
        padding: 14,
        display: "flex",
        alignItems: "center",
        gap: 14,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "relative",
        flex: "none"
      }
    }, /*#__PURE__*/React.createElement(AAvatar, {
      hue: it.hue,
      size: 38
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        right: -3,
        bottom: -3,
        width: 18,
        height: 18,
        borderRadius: "50%",
        background: "var(--surface-3)",
        border: "1px solid var(--border-default)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--accent)"
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: it.icon,
      size: 11
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0,
        fontSize: 14.5,
        color: "var(--fg2)",
        lineHeight: 1.45
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--fg1)",
        fontWeight: 600
      }
    }, it.who), " ", it.txt, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--fg1)",
        fontWeight: 500
      }
    }, it.target)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--fg3)",
        flex: "none"
      }
    }, it.t), it.unread && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "var(--accent)",
        flex: "none"
      }
    }))))))));
  }

  /* ---------------- CALENDAR ---------------- */
  function Calendar({
    fullscreen,
    setFullscreen
  }) {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const EVENTS = {
      11: [{
        t: "Recce — harbour",
        tone: "low"
      }],
      12: [{
        t: "Table read",
        tone: "planning"
      }],
      16: [{
        t: "Score session",
        tone: "review"
      }],
      18: [{
        t: "Shoot D1",
        tone: "high"
      }, {
        t: "Shoot D2",
        tone: "high"
      }],
      22: [{
        t: "Edit review",
        tone: "planning"
      }],
      26: [{
        t: "Festival deadline",
        tone: "high"
      }]
    };
    const cells = [];
    for (let i = 0; i < 35; i++) {
      const day = i - 2;
      cells.push(day >= 1 && day <= 31 ? day : null);
    }
    const toneC = t => ({
      low: "var(--low)",
      planning: "var(--planning)",
      review: "var(--review)",
      high: "var(--high)"
    })[t];
    return /*#__PURE__*/React.createElement(Shell, {
      eyebrow: "Work \xB7 June 2026",
      title: "Calendar",
      fullscreen: fullscreen,
      setFullscreen: setFullscreen,
      bodyPad: false,
      actions: /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 6
        }
      }, /*#__PURE__*/React.createElement(AIconBtn, {
        name: "arrowLeft",
        label: "Prev",
        size: "sm"
      }), /*#__PURE__*/React.createElement(AIconBtn, {
        name: "chevronRight",
        label: "Next",
        size: "sm"
      }))
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(7,1fr)",
        borderBottom: "1px solid var(--border-subtle)"
      }
    }, days.map(d => /*#__PURE__*/React.createElement("div", {
      key: d,
      style: {
        padding: "12px 14px",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: ".08em",
        textTransform: "uppercase",
        color: "var(--fg3)"
      }
    }, d))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "grid",
        gridTemplateColumns: "repeat(7,1fr)",
        gridAutoRows: "1fr"
      }
    }, cells.map((day, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderRight: i % 7 !== 6 ? "1px solid var(--border-subtle)" : "none",
        borderBottom: "1px solid var(--border-subtle)",
        padding: 8,
        minHeight: 96,
        position: "relative"
      }
    }, day && /*#__PURE__*/React.createElement("span", {
      className: "ars-tnum",
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: day === 13 ? "var(--on-coral)" : "var(--fg2)",
        background: day === 13 ? "var(--coral)" : "transparent",
        borderRadius: "50%",
        width: 22,
        height: 22,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, day), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6,
        display: "flex",
        flexDirection: "column",
        gap: 4
      }
    }, (EVENTS[day] || []).map((e, k) => /*#__PURE__*/React.createElement("span", {
      key: k,
      style: {
        fontSize: 11.5,
        color: "var(--fg1)",
        background: "color-mix(in srgb," + toneC(e.tone) + " 16%, transparent)",
        borderLeft: "2px solid " + toneC(e.tone),
        borderRadius: "var(--radius-xs)",
        padding: "3px 6px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, e.t))))))));
  }

  /* ---------------- GENERIC (ideas / moodboards / assets / contacts / opportunities) ---------------- */
  function Generic({
    cat,
    fullscreen,
    setFullscreen
  }) {
    const META = {
      ideas: {
        title: "Ideas",
        hues: ["violet", "coral", "ember", "azure", "verdant", "violet"],
        labels: ["Night & neon", "The horn as a clock", "Silence between lines", "Diner warmth", "First-light palette", "Loose ends"]
      },
      moodboards: {
        title: "Moodboards",
        hues: ["ember", "azure", "violet", "coral"],
        labels: ["Act I look", "Costume", "Locations", "Colour script"]
      },
      assets: {
        title: "Assets",
        hues: ["azure", "ember", "violet", "coral", "verdant", "azure"],
        labels: ["harbour_wide.tiff", "ferry_deck.jpg", "neon_rain.png", "diner_warm.jpg", "score_draft.wav", "title_card.png"]
      },
      contacts: {
        title: "Contacts",
        hues: ["ember", "coral", "violet", "azure"],
        labels: ["Søren K.", "Nadia Œ", "Mara Vey", "Lena Asgard"]
      },
      opportunities: {
        title: "Opportunities",
        hues: ["coral", "azure"],
        labels: ["Nordic Film Grant", "Festival submission"]
      }
    }[cat] || {
      title: "Work",
      hues: ["coral"],
      labels: ["Item"]
    };
    return /*#__PURE__*/React.createElement(Shell, {
      eyebrow: "Work",
      title: META.title,
      fullscreen: fullscreen,
      setFullscreen: setFullscreen,
      actions: /*#__PURE__*/React.createElement(ABtn, {
        size: "sm",
        icon: "plus"
      }, "New")
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))",
        gap: 16
      }
    }, META.labels.map((l, i) => /*#__PURE__*/React.createElement(ACard, {
      key: i,
      interactive: true,
      style: {
        padding: 0,
        overflow: "hidden",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ars-mesh ars-mesh--" + META.hues[i % META.hues.length],
      style: {
        height: 130
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 14,
        fontSize: 14,
        color: "var(--fg1)",
        fontWeight: 500,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, l)))));
  }
  window.ArsWorkViews = {
    Notes,
    Todo,
    Inbox,
    Calendar,
    Generic
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mac/work_views.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/browser-window.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// Chrome.jsx — Simplified Chrome browser window (dark theme, macOS)
// No dependencies, no image assets. All inline styles + inline SVG.
// Exports (to window): ChromeWindow, ChromeTabBar, ChromeToolbar, ChromeTab, ChromeTrafficLights
//
// Usage — wrap your page content in <ChromeWindow> to get the tab bar + URL bar:
//
//   <ChromeWindow width={1100} height={680} url="acme.design/pricing">
//     ...your page content...
//   </ChromeWindow>
/* END USAGE */

const CHROME_C = {
  barBg: '#202124',
  tabBg: '#35363a',
  text: '#e8eaed',
  dim: '#9aa0a6',
  urlBg: '#282a2d'
};
function ChromeTrafficLights() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: '0 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: '#ff5f57'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: '#febc2e'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: '#28c840'
    }
  }));
}

// Single tab (active has curved scoops)
function ChromeTab({
  title = 'New Tab',
  active = false
}) {
  const curve = flip => /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "10",
    viewBox: "0 0 8 10",
    style: {
      position: 'absolute',
      bottom: 0,
      [flip ? 'right' : 'left']: -8,
      transform: flip ? 'scaleX(-1)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 10C2 9 6 8 8 0V10H0Z",
    fill: CHROME_C.tabBg
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 34,
      alignSelf: 'flex-end',
      padding: '0 12px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: active ? CHROME_C.tabBg : 'transparent',
      borderRadius: '8px 8px 0 0',
      minWidth: 120,
      maxWidth: 220,
      fontFamily: 'system-ui, sans-serif',
      fontSize: 12,
      color: active ? CHROME_C.text : CHROME_C.dim
    }
  }, active && curve(false), active && curve(true), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 14,
      height: 14,
      borderRadius: '50%',
      background: '#5f6368',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title));
}
function ChromeTabBar({
  tabs = [{
    title: 'New Tab'
  }],
  activeIndex = 0
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      height: 44,
      background: CHROME_C.barBg,
      paddingRight: 8
    }
  }, /*#__PURE__*/React.createElement(ChromeTrafficLights, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      height: '100%',
      paddingLeft: 4,
      flex: 1
    }
  }, tabs.map((t, i) => /*#__PURE__*/React.createElement(ChromeTab, {
    key: i,
    title: t.title,
    active: i === activeIndex
  }))));
}
function ChromeToolbar({
  url = 'example.com'
}) {
  const iconDot = /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 16,
      height: 16,
      borderRadius: '50%',
      background: CHROME_C.dim,
      opacity: 0.4
    }
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 40,
      background: CHROME_C.tabBg,
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      padding: '0 8px'
    }
  }, iconDot, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 30,
      borderRadius: 15,
      background: CHROME_C.urlBg,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 14px',
      margin: '0 6px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: CHROME_C.dim,
      opacity: 0.4
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      color: CHROME_C.text,
      fontSize: 13,
      fontFamily: 'system-ui, sans-serif'
    }
  }, url)), iconDot);
}
function ChromeWindow({
  tabs = [{
    title: 'New Tab'
  }],
  activeIndex = 0,
  url = 'example.com',
  width = 900,
  height = 600,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 10,
      overflow: 'hidden',
      boxShadow: '0 24px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      background: CHROME_C.tabBg
    }
  }, /*#__PURE__*/React.createElement(ChromeTabBar, {
    tabs: tabs,
    activeIndex: activeIndex
  }), /*#__PURE__*/React.createElement(ChromeToolbar, {
    url: url
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: '#fff',
      overflow: 'auto'
    }
  }, children));
}
Object.assign(window, {
  ChromeWindow,
  ChromeTabBar,
  ChromeToolbar,
  ChromeTab,
  ChromeTrafficLights
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/browser-window.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/screens.jsx
try { (() => {
// Arsyen Web kit — invite-gated auth + public portfolio. Reuses ../mac primitives.
(function () {
  const A = window.AIcon;
  const {
    ABtn,
    AIconBtn,
    AInput,
    AAvatar,
    ALabel
  } = window;

  /* ---------- AUTH LANDING ---------- */
  function Landing({
    go
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "ars-backdrop-living",
      style: {
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 26,
        padding: 40
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 96,
        letterSpacing: "-.05em",
        color: "#fff",
        textShadow: "0 8px 60px rgba(0,0,0,.35)"
      }
    }, "arsyen"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        letterSpacing: ".22em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,.55)",
        marginTop: -10
      }
    }, "Members only \xB7 By invitation"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 14,
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => go("login"),
      style: {
        height: 48,
        padding: "0 26px",
        borderRadius: "var(--radius-md)",
        border: "1px solid rgba(255,255,255,.14)",
        background: "rgba(20,16,22,.5)",
        backdropFilter: "blur(14px)",
        color: "#fff",
        fontFamily: "var(--font-text)",
        fontSize: 15,
        fontWeight: 600,
        cursor: "pointer"
      }
    }, "Log in"), /*#__PURE__*/React.createElement(ABtn, {
      size: "lg",
      onClick: () => go("request")
    }, "Request an invite")));
  }

  /* ---------- GLASS CARD shell over the living backdrop ---------- */
  function AuthShell({
    children,
    onBack
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "ars-backdrop-living",
      style: {
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        position: "relative"
      }
    }, onBack && /*#__PURE__*/React.createElement("button", {
      onClick: onBack,
      "aria-label": "Back",
      style: {
        position: "absolute",
        top: 40,
        left: "50%",
        transform: "translateX(-280px)",
        width: 44,
        height: 44,
        borderRadius: "var(--radius-md)",
        border: "1px solid rgba(255,255,255,.12)",
        background: "rgba(20,16,22,.5)",
        backdropFilter: "blur(14px)",
        color: "#fff",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: "arrowLeft",
      size: 18
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 440,
        maxWidth: "100%"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 34,
        letterSpacing: "-.04em",
        color: "#fff",
        marginBottom: 20
      }
    }, "arsyen"), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "rgba(18,14,20,.46)",
        border: "1px solid rgba(255,255,255,.12)",
        borderRadius: "var(--radius-2xl)",
        padding: 30,
        backdropFilter: "blur(22px) saturate(160%)",
        boxShadow: "0 30px 90px -20px rgba(0,0,0,.6), 0 0 60px -10px var(--accent-glow-soft)"
      }
    }, children)));
  }

  /* ---------- LOGIN ---------- */
  function Login({
    go
  }) {
    return /*#__PURE__*/React.createElement(AuthShell, {
      onBack: () => go("landing")
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 28,
        color: "#fff",
        letterSpacing: "-.02em",
        marginBottom: 22
      }
    }, "Welcome back"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(AInput, {
      label: "Username or email",
      placeholder: "renn or you@studio.com"
    }), /*#__PURE__*/React.createElement(AInput, {
      label: "Password",
      type: "password",
      defaultValue: "filmschool"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6
      }
    }, /*#__PURE__*/React.createElement(ABtn, {
      full: true,
      size: "lg",
      onClick: () => go("portfolio")
    }, "Log in"))));
  }

  /* ---------- REQUEST INVITE ---------- */
  function RequestInvite({
    go
  }) {
    return /*#__PURE__*/React.createElement(AuthShell, {
      onBack: () => go("landing")
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 28,
        color: "#fff",
        letterSpacing: "-.02em"
      }
    }, "Request an invite"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        color: "rgba(255,255,255,.6)",
        marginTop: 8,
        marginBottom: 22
      }
    }, "Tell us who you are and what you make. We review every request by hand."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(AInput, {
      label: "Name",
      placeholder: "Renn Okabe"
    }), /*#__PURE__*/React.createElement(AInput, {
      label: "Email",
      placeholder: "you@studio.com"
    }), /*#__PURE__*/React.createElement(AInput, {
      label: "Discipline",
      icon: "tag",
      placeholder: "Director, photographer, composer\u2026"
    }), /*#__PURE__*/React.createElement("label", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 9
      }
    }, /*#__PURE__*/React.createElement(ALabel, {
      style: {
        color: "rgba(255,255,255,.5)"
      }
    }, "A few words"), /*#__PURE__*/React.createElement("textarea", {
      rows: "3",
      placeholder: "What are you building right now?",
      style: {
        background: "rgba(255,255,255,.06)",
        color: "#fff",
        border: "1px solid rgba(255,255,255,.14)",
        borderRadius: "var(--radius-md)",
        fontFamily: "var(--font-text)",
        fontSize: 15,
        padding: 14,
        outline: "none",
        resize: "none"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6
      }
    }, /*#__PURE__*/React.createElement(ABtn, {
      full: true,
      size: "lg",
      icon: "send",
      onClick: () => go("landing")
    }, "Send request"))));
  }

  /* ---------- PUBLIC PORTFOLIO (open web) ---------- */
  function Portfolio({
    go
  }) {
    const stats = [["48", "Works"], ["4", "Projects"], ["1.2k", "Followers"], ["312", "Following"]];
    const works = ["coral", "ember", "violet", "azure", "verdant", "coral", "ember", "azure"];
    const skills = ["Direction", "Oil", "Editing", "Color", "Curation"];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: "100%",
        background: "var(--bg-canvas)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 32px",
        background: "rgba(8,8,9,.7)",
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid var(--border-subtle)"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => go("landing"),
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 22,
        letterSpacing: "-.04em",
        color: "#fff",
        background: "none",
        border: "none",
        cursor: "pointer"
      }
    }, "arsyen"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: ".12em",
        textTransform: "uppercase",
        color: "var(--ink-3)"
      }
    }, "Public portfolio"), /*#__PURE__*/React.createElement(ABtn, {
      size: "md",
      onClick: () => go("request")
    }, "Request an invite"))), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 920,
        margin: "0 auto"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ars-mesh ars-mesh--azure",
      style: {
        height: 240,
        opacity: .85
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 24px 60px",
        marginTop: -56
      }
    }, /*#__PURE__*/React.createElement(AAvatar, {
      hue: "verdant",
      size: 112,
      ring: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 20,
        flexWrap: "wrap",
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 40,
        color: "var(--ink-0)",
        letterSpacing: "-.02em"
      }
    }, "Renn Okabe"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        letterSpacing: ".1em",
        textTransform: "uppercase",
        color: "var(--ink-3)",
        marginTop: 8
      }
    }, "Director \xB7 Oil & Light"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        color: "var(--ink-3)",
        marginTop: 10,
        fontSize: 15
      }
    }, /*#__PURE__*/React.createElement(A, {
      name: "mapPin",
      size: 15
    }), " Oslo, NO")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        marginTop: 10
      }
    }, /*#__PURE__*/React.createElement(ABtn, {
      icon: "message"
    }, "Message"), /*#__PURE__*/React.createElement(AIconBtn, {
      name: "share",
      label: "Share",
      size: "lg"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 17,
        color: "var(--ink-1)",
        marginTop: 16,
        maxWidth: 620,
        lineHeight: 1.5
      }
    }, "Night studies, slow work. Building small crews for short films and exhibitions. Commissions open."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        marginTop: 18,
        flexWrap: "wrap"
      }
    }, skills.map(s => /*#__PURE__*/React.createElement("span", {
      key: s,
      style: {
        fontSize: 14,
        color: "var(--ink-1)",
        background: "var(--surface-2)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-sm)",
        padding: "8px 15px"
      }
    }, s))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 36,
        marginTop: 30,
        padding: "22px 0",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)"
      }
    }, stats.map(([v, l]) => /*#__PURE__*/React.createElement("div", {
      key: l
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 24,
        color: "var(--ink-0)"
      }
    }, v), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: ".1em",
        textTransform: "uppercase",
        color: "var(--ink-3)",
        marginLeft: 8
      }
    }, l)))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 26
      }
    }, /*#__PURE__*/React.createElement(ALabel, null, "Portfolio")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 16,
        marginTop: 16
      }
    }, works.map((h, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: window.aMesh(h),
      style: {
        aspectRatio: "1",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-subtle)"
      }
    }))))));
  }
  function WebApp() {
    const [view, setView] = React.useState("landing");
    const URLS = {
      landing: "arsyen.com",
      login: "arsyen.com/login",
      request: "arsyen.com/request-invite",
      portfolio: "arsyen.com/renn-okabe"
    };
    const Body = {
      landing: Landing,
      login: Login,
      request: RequestInvite,
      portfolio: Portfolio
    }[view];
    return {
      Body,
      view,
      setView,
      url: URLS[view]
    };
  }
  Object.assign(window, {
    WebLanding: Landing,
    WebLogin: Login,
    WebRequest: RequestInvite,
    WebPortfolio: Portfolio,
    useWebApp: WebApp
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.ProgressMeter = __ds_scope.ProgressMeter;

__ds_ns.StatusPill = __ds_scope.StatusPill;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.FilterChip = __ds_scope.FilterChip;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Card = __ds_scope.Card;

})();
