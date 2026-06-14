import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Mono uppercase label rendered above the field. */
  label?: string;
  /** Leading icon node. */
  icon?: React.ReactNode;
  /** Helper text below the field. */
  hint?: string;
  /** Style for the input element. */
  style?: React.CSSProperties;
  /** Style for the wrapping label. */
  containerStyle?: React.CSSProperties;
}

/** Dark text field with mono label, optional leading icon, coral focus ring. */
export function Input(props: InputProps): JSX.Element;
