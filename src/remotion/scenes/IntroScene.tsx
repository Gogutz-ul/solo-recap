import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { RecapData } from "../schema";
import { BRAND_FONT, COLORS, SOLO_LOGO_URL } from "../branding";
import { StoryBackground } from "../components/StoryBackground";
import { Sunburst } from "../components/Sunburst";

export const IntroScene: React.FC<RecapData> = ({ name, year }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoP = spring({ frame, fps, config: { damping: 16 } });
  const yearP = spring({ frame: frame - 14, fps, config: { damping: 12, stiffness: 140 } });

  return (
    <StoryBackground bg={COLORS.yellow} accent={COLORS.black}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Sunburst size={1300} delay={10} color="rgba(22,22,22,0.06)" speed={0.3} />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          fontFamily: BRAND_FONT,
          color: COLORS.black,
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 70px",
        }}
      >
        <Img
          src={SOLO_LOGO_URL}
          style={{
            height: 96,
            objectFit: "contain",
            opacity: interpolate(logoP, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(logoP, [0, 1], [-40, 0])}px)`,
          }}
        />
        <div style={{ fontSize: 50, fontWeight: 600, marginTop: 70 }}>Recapul tău</div>
        <div
          style={{
            fontSize: 320,
            fontWeight: 700,
            lineHeight: 1,
            transform: `scale(${interpolate(yearP, [0, 1], [0.4, 1])})`,
            opacity: interpolate(yearP, [0, 1], [0, 1]),
          }}
        >
          {year}
        </div>
        <div style={{ fontSize: 54, fontWeight: 700, marginTop: 30 }}>
          Hai să-l vedem, {name}!
        </div>
      </AbsoluteFill>
    </StoryBackground>
  );
};
