import React from "react";

export interface FilterChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** Solid coral when true. @default false */
  selected?: boolean;
  /** Optional leading icon. */
  icon?: React.ReactNode;
}

/** Selectable filter pill — coral when active, dark glass otherwise. */
export function FilterChip(props: FilterChipProps): JSX.Element;
