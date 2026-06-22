import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { formatLei, formatNumber } from "../branding";

type Props = {
  to: number;
  delay?: number;
  duration?: number;
  /** show just the number (no " lei" suffix) */
  plain?: boolean;
  style?: React.CSSProperties;
};

export const Counter: React.FC<Props> = ({ to, delay = 0, duration = 45, plain = false, style }) => {
  const frame = useCurrentFrame();
  const value = interpolate(frame, [delay, delay + duration], [0, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return <span style={style}>{plain ? formatNumber(value) : formatLei(value)}</span>;
};
