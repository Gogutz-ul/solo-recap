import React from "react";
import { random, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../branding";

const PALETTE = [COLORS.yellow, COLORS.black, COLORS.neutralDark, COLORS.yellow];

/** Spinning confetti falling continuously — celebratory energy (no emoji). */
export const Confetti: React.FC<{ count?: number; delay?: number }> = ({
  count = 40,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const f = frame - delay;
  if (f < 0) return null;

  return (
    <>
      {new Array(count).fill(0).map((_, i) => {
        const seed = `c-${i}`;
        const x = random(seed + "x") * width;
        const speed = (height + 300) / (fps * (1.8 + random(seed + "s") * 1.6));
        const start = random(seed + "o") * (height + 300);
        const y = ((f * speed + start) % (height + 300)) - 150;
        const sway = Math.sin((f + i * 22) / 14) * 44;
        const rot = f * (3 + random(seed + "r") * 6);
        const w = 14 + random(seed + "w") * 16;
        const h = 8 + random(seed + "h") * 12;
        const color = PALETTE[i % PALETTE.length];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + sway,
              top: y,
              width: w,
              height: h,
              background: color,
              borderRadius: 3,
              transform: `rotate(${rot}deg)`,
            }}
          />
        );
      })}
    </>
  );
};
