import React from "react";
import { AbsoluteFill } from "remotion";
import type { RecapData } from "../schema";
import { COLORS } from "../branding";
import { StoryBackground } from "../components/StoryBackground";
import { SceneText } from "../components/SceneText";
import { Counter } from "../components/Counter";
import { FloatingDocs } from "../components/Documents";

export const TaxesScene: React.FC<RecapData> = ({ taxes }) => {
  return (
    <StoryBackground bg={COLORS.neutralLightest} accent={COLORS.yellow}>
      {/* official / stamped documents scattered around */}
      <AbsoluteFill>
        <FloatingDocs kinds={["stamp", "invoice", "stamp"]} count={7} delay={6} size={130} />
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <SceneText
          kicker="Taxe & contribuții"
          title="Către stat au plecat"
          amount={<Counter to={taxes} delay={10} duration={50} />}
          amountColor={COLORS.black}
          subtitle="SOLO le-a calculat și depus la timp. Tu doar ai dat din cap aprobator."
        />
      </AbsoluteFill>
    </StoryBackground>
  );
};
