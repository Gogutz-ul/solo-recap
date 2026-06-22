import React from "react";
import { COLORS } from "../branding";

/** A phone mockup whose screen renders `children` (SOLO-style). */
export const Phone: React.FC<{ width?: number; children?: React.ReactNode }> = ({
  width = 380,
  children,
}) => {
  const height = width * 2.02;
  const pad = width * 0.05;
  return (
    <div
      style={{
        width,
        height,
        background: COLORS.black,
        borderRadius: width * 0.16,
        padding: pad,
        boxShadow: "0 24px 60px rgba(22,22,22,0.28)",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: COLORS.white,
          borderRadius: width * 0.12,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* notch */}
        <div
          style={{
            position: "absolute",
            top: width * 0.04,
            left: "50%",
            transform: "translateX(-50%)",
            width: width * 0.34,
            height: width * 0.07,
            background: COLORS.black,
            borderRadius: 9999,
          }}
        />
        {children}
      </div>
    </div>
  );
};
