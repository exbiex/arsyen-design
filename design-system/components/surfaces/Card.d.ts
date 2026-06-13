import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** "card" surface or larger "panel". @default "card" */
  as?: "card" | "panel";
  /** Hover lift + border brighten. @default false */
  interactive?: boolean;
  /** Coral glow (selected / emphasised). @default false */
  glow?: boolean;
  /** Override padding. */
  padding?: number | string;
}

/**
 * The base Arsyen surface — `card` for content tiles, `panel` for the
 * floating OS panels.
 *
 * @startingPoint section="Surfaces" subtitle="Card & floating panel surface" viewport="700x200"
 */
export function Card(props: CardProps): JSX.Element;
