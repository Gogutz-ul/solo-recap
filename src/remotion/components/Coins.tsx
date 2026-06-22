import React from "react";
import { interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../branding";

/** A SOLO coin — circle with an "S" swirl (matches the SOLO Wrapped reference). */
export const Coin: React.FC<{ size?: number; color?: string }> = ({ size = 30, color = COLORS.yellow }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.6}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.2c1.6-1.4 4-1 4 .9 0 2-3.2 1.6-3.2 3.6 0 1.9 2.7 2.1 4.2.8" strokeLinecap="round" />
  </svg>
);

/** Coins drifting upward across the screen (looping) — celebratory money backdrop. */
export const CoinsUp: React.FC<{ count?: number; delay?: number }> = ({ count = 16, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const f = frame - delay;
  if (f < 0) return null;
  return (
    <>
      {new Array(count).fill(0).map((_, i) => {
        const seed = `coin-${i}`;
        const x = random(seed + "x") * width;
        const speed = (height + 300) / (fps * (3 + random(seed + "s") * 2.4));
        const start = random(seed + "o") * (height + 300);
        const y = height + 60 - ((f * speed + start) % (height + 300));
        const sway = Math.sin((f + i * 26) / 22) * 30;
        const rot = f * (1.2 + random(seed + "r") * 2.4);
        const sz = 34 + random(seed + "z") * 30;
        const white = random(seed + "c") < 0.45;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + sway,
              top: y,
              transform: `rotate(${rot}deg)`,
              opacity: interpolate(y, [-40, 60, height - 40, height + 60], [0, 0.95, 0.95, 0]),
            }}
          >
            <Coin size={sz} color={white ? "rgba(255,255,255,.85)" : COLORS.yellow} />
          </div>
        );
      })}
    </>
  );
};

/** A small pile of coins popping in one after another (bottom-center). */
export const CoinPile: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const coins = [
    { x: -48, y: 0 },
    { x: 6, y: 0 },
    { x: -20, y: -26 },
    { x: -64, y: -24 },
    { x: 36, y: -30 },
    { x: -16, y: -56 },
  ];
  return (
    <div style={{ position: "relative", width: 120, height: 90 }}>
      {coins.map((c, i) => {
        const p = spring({ frame: frame - delay - i * 5, fps, config: { damping: 12, stiffness: 200 } });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 50 + c.x,
              bottom: c.y,
              opacity: interpolate(p, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(p, [0, 1], [-30, 0])}px) scale(${interpolate(p, [0, 1], [0.5, 1])})`,
            }}
          >
            <Coin size={44} />
          </div>
        );
      })}
    </div>
  );
};
