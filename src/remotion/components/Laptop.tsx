import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../branding";

const LINES = [
  { indent: 0, width: 62, color: COLORS.black },
  { indent: 14, width: 40, color: COLORS.neutralDark },
  { indent: 14, width: 54, color: COLORS.yellow },
  { indent: 28, width: 34, color: COLORS.neutralDark },
  { indent: 14, width: 48, color: COLORS.black },
  { indent: 0, width: 30, color: COLORS.black },
];

/** A SOLO-style laptop with code "typing in" line by line. */
export const Laptop: React.FC<{ width?: number; typeDelay?: number }> = ({
  width = 460,
  typeDelay = 6,
}) => {
  const frame = useCurrentFrame();
  const screenH = width * 0.62;

  return (
    <div style={{ width, display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* screen */}
      <div
        style={{
          width,
          height: screenH,
          background: COLORS.white,
          border: `10px solid ${COLORS.black}`,
          borderRadius: 16,
          padding: 22,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          boxSizing: "border-box",
        }}
      >
        {LINES.map((line, i) => {
          const appear = interpolate(
            frame,
            [i * typeDelay, i * typeDelay + 6],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          return (
            <div
              key={i}
              style={{
                marginLeft: line.indent,
                width: `${line.width * appear}%`,
                height: 12,
                borderRadius: 6,
                background: line.color,
              }}
            />
          );
        })}
      </div>
      {/* base / keyboard */}
      <div
        style={{
          width: width * 1.18,
          height: 22,
          background: COLORS.neutralLighter,
          border: `8px solid ${COLORS.black}`,
          borderRadius: "6px 6px 14px 14px",
          marginTop: -2,
        }}
      />
    </div>
  );
};
