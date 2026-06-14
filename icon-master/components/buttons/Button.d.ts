import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "primary" */
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Leading icon node (e.g. an SVG). */
  icon?: React.ReactNode;
  /** Trailing icon node. */
  iconRight?: React.ReactNode;
  /** Render the coral halo on the primary variant. @default true */
  glow?: boolean;
  /** Stretch to container width. @default false */
  fullWidth?: boolean;
  disabled?: boolean;
}

/**
 * The Arsyen call-to-action. Primary is coral-red with a glow; secondary,
 * ghost, outline and danger cover quieter actions.
 *
 * @startingPoint section="Buttons" subtitle="Coral CTA + quieter variants" viewport="700x140"
 */
export function Button(props: ButtonProps): JSX.Element;
