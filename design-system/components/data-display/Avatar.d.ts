import React from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image URL. When absent, a gradient-mesh fill is shown. */
  src?: string;
  alt?: string;
  /** Pixel diameter. @default 40 */
  size?: number;
  /** Mesh hue used as fallback fill. @default "coral" */
  mesh?: "coral" | "ember" | "violet" | "azure" | "verdant";
  /** Coral ring + glow — marks "you" / active. @default false */
  ring?: boolean;
  /** Green online presence dot. @default false */
  presence?: boolean;
  /** Optional initials drawn over the mesh. */
  initials?: string;
}

/** Circular avatar with gradient-mesh fallback, optional coral ring & presence dot. */
export function Avatar(props: AvatarProps): JSX.Element;
