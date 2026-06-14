import React from "react";

export interface TabItem {
  value: string;
  label: React.ReactNode;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Strings or {value,label}. */
  tabs: Array<string | TabItem>;
  value?: string;
  onChange?: (value: string) => void;
}

/** Pill tab group — light active fill, muted rest (Board / Action Plans / Files). */
export function Tabs(props: TabsProps): JSX.Element;
