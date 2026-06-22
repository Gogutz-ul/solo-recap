import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  size?: number;
  color?: string;
  rays?: number;
  delay?: number;
  speed?: number;
  opacity?: number;
};

/** Rotating sunburst rays — energetic backdrop behind big numbers / reveals. */
export const Sunburst: React.FC<Props> = ({
  size = 1100,
  color = "rgba(22,22,22,0.06)",
  rays = 16,
  delay = 0,
  speed = 0.25,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - delay, fps, config: { damping: 18 } });
  const rot = frame * speed;

  return (
    <svg
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      style={{
        transform: `rotate(${rot}deg) scale(${interpolate(pop, [0, 1], [0.6, 1])})`,
        opacity: opacity * interpolate(pop, [0, 1], [0, 1]),
      }}
    >
      {new Array(rays).fill(0).map((_, i) => {
        const a = (i / rays) * 360;
        return (
          <path
            key={i}
            d="M0 0 L6 -60 L-6 -60 Z"
            fill={color}
            transform={`rotate(${a})`}
          />
        );
      })}
    </svg>
  );
};
