import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "neutral" */
  tone?: "neutral" | "accent" | "done" | "outline";
  children: React.ReactNode;
}

/** Small mono marker — match %, counts, metadata (e.g. `96% MATCH`). */
export function Badge(props: BadgeProps): JSX.Element;
