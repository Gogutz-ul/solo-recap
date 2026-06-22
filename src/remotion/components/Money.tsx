import React from "react";
import { interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../branding";

/** A single line-art "lei" banknote in SOLO style (no emoji — drawn SVG). */
export const Banknote: React.FC<{ size?: number; style?: React.CSSProperties }> = ({
  size = 90,
  style,
}) => (
  <svg
    width={size}
    height={size * 0.56}
    viewBox="0 0 100 56"
    fill="none"
    style={style}
  >
    <rect
      x="2"
      y="2"
      width="96"
      height="52"
      rx="6"
      fill={COLORS.yellow}
      stroke={COLORS.black}
      strokeWidth="4"
    />
    <circle cx="50" cy="28" r="12" fill="none" stroke={COLORS.black} strokeWidth="4" />
    <text
      x="50"
      y="34"
      textAnchor="middle"
      fontSize="14"
      fontWeight="700"
      fill={COLORS.black}
      fontFamily="Arial, sans-serif"
    >
      L
    </text>
    <circle cx="16" cy="28" r="3.5" fill={COLORS.black} />
    <circle cx="84" cy="28" r="3.5" fill={COLORS.black} />
  </svg>
);

type BurstProps = {
  /** when the burst starts (local frames) */
  delay?: number;
  count?: number;
  /** origin as % of container */
  originX?: number;
  originY?: number;
  spread?: number;
};

/** Continuous banknotes raining down across the whole scene — keeps the frame alive. */
export const MoneyRain: React.FC<{ count?: number; delay?: number }> = ({ count = 14, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const f = frame - delay;
  if (f < 0) return null;

  return (
    <>
      {new Array(count).fill(0).map((_, i) => {
        const seed = `rain-${i}`;
        const x = random(seed + "x") * width;
        const speed = (height + 400) / (fps * (2.4 + random(seed + "s") * 1.8));
        const start = random(seed + "o") * (height + 400);
        const y = ((f * speed + start) % (height + 400)) - 200;
        const sway = Math.sin((f + i * 30) / 18) * 36;
        const rot = (f * (1.5 + random(seed + "r") * 2)) % 360;
        const sz = 56 + random(seed + "z") * 46;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + sway,
              top: y,
              transform: `rotate(${rot}deg)`,
              opacity: 0.92,
            }}
          >
            <Banknote size={sz} />
          </div>
        );
      })}
    </>
  );
};

/** Banknotes flying up/out from an origin point. */
export const MoneyBurst: React.FC<BurstProps> = ({
  delay = 0,
  count = 14,
  originX = 50,
  originY = 55,
  spread = 520,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      {new Array(count).fill(0).map((_, i) => {
        const seed = `bill-${i}`;
        const angle = interpolate(random(seed + "a"), [0, 1], [-Math.PI, 0]); // upward fan
        const dist = spread * (0.4 + random(seed + "d") * 0.6);
        const localDelay = delay + random(seed + "t") * 8;
        const p = spring({
          frame: frame - localDelay,
          fps,
          config: { damping: 14, mass: 0.8 },
          durationInFrames: 40,
        });
        const gravity = interpolate(p, [0, 1], [0, 140]);
        const x = Math.cos(angle) * dist * p;
        const y = Math.sin(angle) * dist * p + gravity;
        const rot = interpolate(random(seed + "r"), [0, 1], [-220, 220]) * p;
        const opacity = interpolate(p, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);
        const sz = 60 + random(seed + "s") * 60;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${originX}%`,
              top: `${originY}%`,
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rot}deg)`,
              opacity,
            }}
          >
            <Banknote size={sz} />
          </div>
        );
      })}
    </>
  );
};
