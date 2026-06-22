import React from "react";
import { interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../branding";

/** A line-art invoice (SOLO style). */
export const Invoice: React.FC<{ size?: number }> = ({ size = 130 }) => (
  <svg width={size} height={size * 1.28} viewBox="0 0 100 128" fill="none">
    <rect x="4" y="4" width="92" height="120" rx="8" fill={COLORS.white} stroke={COLORS.black} strokeWidth="5" />
    <rect x="4" y="4" width="92" height="26" rx="8" fill={COLORS.yellow} stroke={COLORS.black} strokeWidth="5" />
    <rect x="16" y="13" width="40" height="8" rx="4" fill={COLORS.black} />
    {[44, 58, 72].map((y) => (
      <rect key={y} x="16" y={y} width="68" height="6" rx="3" fill={COLORS.neutralLighter} />
    ))}
    <rect x="16" y="98" width="34" height="10" rx="5" fill={COLORS.black} />
    <rect x="58" y="96" width="26" height="14" rx="4" fill={COLORS.yellow} stroke={COLORS.black} strokeWidth="4" />
  </svg>
);

/** A line-art receipt with a torn zig-zag bottom. */
export const Receipt: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <svg width={size} height={size * 1.6} viewBox="0 0 60 96" fill="none">
    <path
      d="M6 6 Q6 3 9 3 L51 3 Q54 3 54 6 L54 84 L48 90 L42 84 L36 90 L30 84 L24 90 L18 84 L12 90 L6 84 Z"
      fill={COLORS.white}
      stroke={COLORS.black}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {[16, 26, 36].map((y) => (
      <rect key={y} x="13" y={y} width="34" height="4" rx="2" fill={COLORS.neutralLighter} />
    ))}
    <rect x="13" y="54" width="22" height="7" rx="3" fill={COLORS.black} />
    <rect x="39" y="54" width="8" height="7" rx="3" fill={COLORS.yellow} stroke={COLORS.black} strokeWidth="2.5" />
  </svg>
);

/** A line-art official/stamped document (for taxes). */
export const Stamp: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 100 120" fill="none">
    <rect x="4" y="4" width="92" height="112" rx="8" fill={COLORS.white} stroke={COLORS.black} strokeWidth="5" />
    {[20, 32, 44].map((y) => (
      <rect key={y} x="16" y={y} width="68" height="6" rx="3" fill={COLORS.neutralLighter} />
    ))}
    <circle cx="68" cy="84" r="22" fill="none" stroke={COLORS.yellow} strokeWidth="6" />
    <circle cx="68" cy="84" r="13" fill="none" stroke={COLORS.yellow} strokeWidth="4" />
    <rect x="16" y="78" width="30" height="6" rx="3" fill={COLORS.black} />
  </svg>
);

type DocKind = "invoice" | "receipt" | "stamp";
const DOC: Record<DocKind, React.FC<{ size?: number }>> = { invoice: Invoice, receipt: Receipt, stamp: Stamp };

// Scatter positions around the edges, keeping the center clear for the headline.
const SLOTS = [
  { x: 12, y: 16 },
  { x: 86, y: 14 },
  { x: 8, y: 50 },
  { x: 90, y: 52 },
  { x: 18, y: 82 },
  { x: 82, y: 84 },
  { x: 50, y: 90 },
  { x: 70, y: 30 },
];

/** Themed documents drifting + rotating around the page edges (secondary to the centered text). */
export const FloatingDocs: React.FC<{ kinds: DocKind[]; count?: number; delay?: number; size?: number }> = ({
  kinds,
  count = 7,
  delay = 0,
  size = 120,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      {SLOTS.slice(0, count).map((slot, i) => {
        const seed = `doc-${i}`;
        const Comp = DOC[kinds[i % kinds.length]];
        const enter = spring({ frame: frame - delay - i * 4, fps, config: { damping: 13 } });
        const drift = Math.sin((frame + i * 40) / 26) * 22;
        const driftX = Math.cos((frame + i * 30) / 32) * 16;
        const rot = (random(seed) - 0.5) * 40 + Math.sin((frame + i * 50) / 30) * 6;
        const s = 0.8 + random(seed + "s") * 0.5;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${slot.x}%`,
              top: `${slot.y}%`,
              transform: `translate(-50%,-50%) translate(${driftX}px, ${drift}px) rotate(${rot}deg) scale(${
                s * interpolate(enter, [0, 1], [0, 1])
              })`,
              opacity: interpolate(enter, [0, 1], [0, 1]),
            }}
          >
            <Comp size={size} />
          </div>
        );
      })}
    </>
  );
};
