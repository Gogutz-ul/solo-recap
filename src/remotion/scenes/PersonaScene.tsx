import React from "react";
import { AbsoluteFill } from "remotion";
import type { RecapData } from "../schema";
import { COLORS, getPersona } from "../branding";
import { StoryBackground } from "../components/StoryBackground";
import { SceneText } from "../components/SceneText";
import { Sunburst } from "../components/Sunburst";

export const PersonaScene: React.FC<RecapData> = (data) => {
  const persona = getPersona(data);

  return (
    <StoryBackground bg={COLORS.black} accent={COLORS.neutralDark}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Sunburst size={1300} delay={8} color="rgba(254,218,0,0.10)" speed={0.25} />
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <SceneText
          kicker="Personajul tău din 2025"
          kickerBg={COLORS.yellow}
          kickerColor={COLORS.black}
          title={<span style={{ color: COLORS.yellow }}>{persona.title}</span>}
          subtitle={<span style={{ color: COLORS.white }}>{persona.subtitle}</span>}
          color={COLORS.white}
        />
      </AbsoluteFill>
    </StoryBackground>
  );
};
