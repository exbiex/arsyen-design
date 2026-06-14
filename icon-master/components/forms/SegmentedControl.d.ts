import React from "react";

export interface SegmentOption {
  value: string;
  label: React.ReactNode;
}

export interface SegmentedControlProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Options as strings or {value,label}. */
  options: Array<string | SegmentOption>;
  /** Currently selected value. */
  value?: string;
  onChange?: (value: string) => void;
  /** Row-of-pills style (coral text + border on dark) vs enclosed track. @default false */
  chips?: boolean;
}

/** Pill segmented control — enclosed track, or a `chips` row (ticket fields). */
export function SegmentedControl(props: SegmentedControlProps): JSX.Element;
