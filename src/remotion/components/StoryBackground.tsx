import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS } from "../branding";

type Props = {
  bg?: string;
  /** decorative dot color */
  accent?: string;
  children?: React.ReactNode;
};

/** Full-bleed branded background with subtle drifting dots (no emoji). */
export const StoryBackground: React.FC<Props> = ({
  bg = COLORS.white,
  accent = COLORS.yellow,
  children,
}) => {
  const frame = useCurrentFrame();
  const dots = [
    { x: 12, y: 16, s: 26 },
    { x: 84, y: 12, s: 40 },
    { x: 78, y: 82, s: 30 },
    { x: 16, y: 86, s: 44 },
    { x: 50, y: 8, s: 18 },
  ];

  return (
    <AbsoluteFill style={{ background: bg, overflow: "hidden" }}>
      {dots.map((d, i) => {
        const drift = Math.sin(frame / 30 + i) * 14;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: d.s,
              height: d.s,
              borderRadius: "50%",
              background: accent,
              opacity: 0.5,
              transform: `translateY(${drift}px)`,
            }}
          />
        );
      })}
      {children}
    </AbsoluteFill>
  );
};
