import React from "react";
import { Img, useCurrentFrame } from "remotion";
import { COLORS } from "../branding";

/**
 * Side-view SOLO rideshare car — white line-art on a dark night scene, with a
 * yellow roof sign, glowing headlight, spinning spoked wheels, and a lit cabin
 * window showing the driver. Matches the SOLO Wrapped reference styling.
 */
export const Car: React.FC<{ characterSrc: string; width?: number }> = ({ characterSrc, width = 760 }) => {
  const frame = useCurrentFrame();
  const s = width / 340;
  const carH = 150 * s;
  const rot = frame * 42;
  const bob = Math.sin(frame / 4) * 4;

  return (
    <div style={{ position: "relative", width, height: carH, transform: `translateY(${bob}px)` }}>
      <svg
        viewBox="0 0 340 150"
        width={width}
        height={carH}
        fill="none"
        stroke={COLORS.white}
        strokeWidth={4.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ overflow: "visible", display: "block" }}
      >
        {/* body */}
        <path d="M14 104 C14 92 22 86 34 84 L74 82 C92 60 110 50 142 49 L210 49 C236 49 252 60 268 80 L300 86 C318 90 326 96 326 108 L326 116 C326 121 322 124 317 124 L24 124 C18 124 14 120 14 114 Z" fill={COLORS.black} />
        {/* roof / windows */}
        <path d="M86 82 C100 64 114 57 140 56 L168 56 L168 82 Z" fill={COLORS.black} />
        <path d="M178 56 L206 56 C228 57 242 66 256 81 L178 82 Z" fill={COLORS.black} />
        <line x1="173" y1="56" x2="173" y2="82" />
        {/* rideshare roof sign */}
        <rect x="150" y="34" width="44" height="18" rx="4" fill={COLORS.yellow} stroke={COLORS.yellow} />
        <path d="M168 38 l-6 9 h6 l-2 7 8 -10 h-6 z" fill={COLORS.black} stroke="none" />
        {/* headlight glow */}
        <circle cx="316" cy="100" r="4" fill={COLORS.yellow} stroke="none" />
        {/* door handle */}
        <line x1="120" y1="100" x2="138" y2="100" />
        {/* wheel wells */}
        <path d="M70 124 a30 30 0 0 1 60 0" />
        <path d="M222 124 a30 30 0 0 1 60 0" />
        {/* wheels (spinning) */}
        <g transform={`rotate(${rot} 100 124)`}>
          <circle cx="100" cy="124" r="22" fill={COLORS.black} />
          <circle cx="100" cy="124" r="7" />
          <line x1="100" y1="105" x2="100" y2="143" />
          <line x1="81" y1="124" x2="119" y2="124" />
          <line x1="87" y1="111" x2="113" y2="137" />
          <line x1="87" y1="137" x2="113" y2="111" />
        </g>
        <g transform={`rotate(${rot} 252 124)`}>
          <circle cx="252" cy="124" r="22" fill={COLORS.black} />
          <circle cx="252" cy="124" r="7" />
          <line x1="252" y1="105" x2="252" y2="143" />
          <line x1="233" y1="124" x2="271" y2="124" />
          <line x1="239" y1="111" x2="265" y2="137" />
          <line x1="239" y1="137" x2="265" y2="111" />
        </g>
      </svg>

      {/* lit cabin window with the driver */}
      <div
        style={{
          position: "absolute",
          left: 96 * s,
          top: 6 * s,
          width: 120 * s,
          height: 96 * s,
          overflow: "hidden",
          borderRadius: "50% 50% 44% 44%",
          background: COLORS.white,
        }}
      >
        <Img
          src={characterSrc}
          style={{ position: "absolute", width: 300 * s, height: 300 * s, left: -86 * s, top: -30 * s, objectFit: "contain" }}
        />
      </div>
    </div>
  );
};
