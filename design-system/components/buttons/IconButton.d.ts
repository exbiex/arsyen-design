import React from "react";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon node (SVG, glyph). */
  children: React.ReactNode;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** @default "default" */
  variant?: "default" | "ghost" | "accent";
  /** Tints the icon coral (e.g. active dock item). @default false */
  active?: boolean;
  /** Accessible label / tooltip. */
  label?: string;
  disabled?: boolean;
}

/**
 * Square rounded icon control used in the dock, panel headers and card actions.
 */
export function IconButton(props: IconButtonProps): JSX.Element;
