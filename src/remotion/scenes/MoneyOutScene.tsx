import React from "react";
import { AbsoluteFill } from "remotion";
import type { RecapData } from "../schema";
import { COLORS } from "../branding";
import { StoryBackground } from "../components/StoryBackground";
import { SceneText } from "../components/SceneText";
import { Counter } from "../components/Counter";
import { FloatingDocs } from "../components/Documents";

export const MoneyOutScene: React.FC<RecapData> = ({ moneyOut }) => {
  return (
    <StoryBackground bg={COLORS.white} accent={COLORS.neutralLighter}>
      {/* receipts & bills scattered around */}
      <AbsoluteFill>
        <FloatingDocs kinds={["receipt", "invoice", "receipt"]} count={7} delay={6} size={130} />
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <SceneText
          kicker="Cheltuieli"
          title="Ai cheltuit"
          amount={<Counter to={moneyOut} delay={10} duration={50} />}
          amountColor={COLORS.error}
          subtitle="Benzină, abonamente, un espresso ici-colo... s-au adunat frumușel."
        />
      </AbsoluteFill>
    </StoryBackground>
  );
};
