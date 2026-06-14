import React from "react";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  /** When set, renders a × that calls this. */
  onRemove?: () => void;
}

/** A quiet monospace label chip — board labels like `script`, `camera`. */
export function Tag(props: TagProps): JSX.Element;
