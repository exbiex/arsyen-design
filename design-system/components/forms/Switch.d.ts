import React from "react";

export interface SwitchProps {
  /** @default false */
  checked?: boolean;
  /** Called with the next boolean. */
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

/** Pill toggle — coral track + white knob when on. */
export function Switch(props: SwitchProps): JSX.Element;
