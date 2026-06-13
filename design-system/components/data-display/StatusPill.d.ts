import React from "react";

export interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Semantic color. @default "planning" */
  tone?: "planning" | "medium" | "high" | "urgent" | "low" | "review" | "done";
  /** Show the leading dot. @default true */
  dot?: boolean;
  /** Drop the tinted pill background (dot + text only). @default false */
  solid?: boolean;
  children: React.ReactNode;
}

/** Colored dot + mono label for project status & ticket priority. */
export function StatusPill(props: StatusPillProps): JSX.Element;
