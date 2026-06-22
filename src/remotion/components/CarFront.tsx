import React from "react";
import { Img, useCurrentFrame } from "remotion";
import { COLORS } from "../branding";

/**
 * Front view of the car with the driver's face visible through the windshield —
 * a close-up "driving inside the car" shot. Gentle bob conveys motion.
 */
export const CarFront: React.FC<{ characterSrc: string; width?: number }> = ({
  characterSrc,
  width = 720,
}) => {
  const frame = useCurrentFrame();
  const H = width * 1.05;
  const bob = Math.sin(frame / 4) * 5;
  const steer = Math.sin(frame / 22) * 4;

  const wheelRot = frame * 26;
  const wheelSize = width * 0.22;

  return (
    <div style={{ position: "relative", width, height: H, transform: `translateY(${bob}px)` }}>
      {/* spinning wheels peeking at the bottom corners */}
      {[width * 0.05, width * 0.73].map((lx, k) => (
        <div
          key={k}
          style={{
            position: "absolute",
            bottom: 0,
            left: lx,
            width: wheelSize,
            height: wheelSize,
            borderRadius: "50%",
            background: COLORS.black,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: wheelSize * 0.4, height: wheelSize * 0.4, borderRadius: "50%", background: COLORS.white, position: "relative", transform: `rotate(${wheelRot}deg)` }}>
            {[0, 45, 90, 135].map((a) => (
              <div key={a} style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: 3, background: COLORS.black, transform: `translateY(-50%) rotate(${a}deg)` }} />
            ))}
          </div>
        </div>
      ))}

      {/* roof */}
      <div style={{ position: "absolute", top: H * 0.03, left: "50%", transform: "translateX(-50%)", width: width * 0.66, height: H * 0.16, background: COLORS.yellow, border: `9px solid ${COLORS.black}`, borderRadius: "40px 40px 0 0" }} />

      {/* car body / front */}
      <div style={{ position: "absolute", top: H * 0.14, left: width * 0.06, width: width * 0.88, height: H * 0.78, background: COLORS.yellow, border: `10px solid ${COLORS.black}`, borderRadius: 60 }}>
        {/* headlights */}
        <div style={{ position: "absolute", top: "52%", left: "8%", width: "20%", height: "12%", background: COLORS.white, border: `7px solid ${COLORS.black}`, borderRadius: 18 }} />
        <div style={{ position: "absolute", top: "52%", right: "8%", width: "20%", height: "12%", background: COLORS.white, border: `7px solid ${COLORS.black}`, borderRadius: 18 }} />
        {/* grille / bumper */}
        <div style={{ position: "absolute", bottom: "12%", left: "50%", transform: "translateX(-50%)", width: "46%", height: "9%", background: COLORS.black, borderRadius: 14 }} />
        <div style={{ position: "absolute", bottom: "2%", left: "10%", width: "80%", height: "7%", background: COLORS.neutralLighter, border: `5px solid ${COLORS.black}`, borderRadius: 12 }} />
      </div>

      {/* side mirrors */}
      <div style={{ position: "absolute", top: H * 0.34, left: width * 0.0, width: width * 0.09, height: H * 0.06, background: COLORS.yellow, border: `7px solid ${COLORS.black}`, borderRadius: 10 }} />
      <div style={{ position: "absolute", top: H * 0.34, right: width * 0.0, width: width * 0.09, height: H * 0.06, background: COLORS.yellow, border: `7px solid ${COLORS.black}`, borderRadius: 10 }} />

      {/* windshield with the driver's face */}
      <div
        style={{
          position: "absolute",
          top: H * 0.17,
          left: "50%",
          transform: `translateX(-50%) translateX(${steer}px)`,
          width: width * 0.6,
          height: H * 0.34,
          background: COLORS.white,
          border: `9px solid ${COLORS.black}`,
          borderRadius: 40,
          overflow: "hidden",
        }}
      >
        <Img
          src={characterSrc}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 12%",
            transform: "scale(1.5)",
          }}
        />
        {/* glass glare */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "55%", height: "100%", background: "linear-gradient(120deg, rgba(255,255,255,0.45), rgba(255,255,255,0) 70%)" }} />
      </div>

      {/* rearview mirror */}
      <div style={{ position: "absolute", top: H * 0.2, left: "50%", transform: "translateX(-50%)", width: width * 0.16, height: H * 0.035, background: COLORS.black, borderRadius: 10 }} />
    </div>
  );
};
