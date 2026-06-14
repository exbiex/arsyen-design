import React from "react";

export interface ProgressMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0–100. @default 0 */
  value?: number;
  /** Show the trailing mono % readout. @default true */
  showValue?: boolean;
  /** Track width. @default "100%" */
  width?: number | string;
}

/** Thin track + knob + mono % — the project-card progress indicator. */
export function ProgressMeter(props: ProgressMeterProps): JSX.Element;
