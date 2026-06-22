import React from "react";
import { Composition } from "remotion";
import { RecapComposition } from "./RecapComposition";
import { COMPOSITION_ID, TOTAL_FRAMES, VIDEO } from "./config";
import { DEFAULT_RECAP, recapSchema } from "./schema";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id={COMPOSITION_ID}
      component={RecapComposition}
      durationInFrames={TOTAL_FRAMES}
      fps={VIDEO.fps}
      width={VIDEO.width}
      height={VIDEO.height}
      schema={recapSchema}
      defaultProps={DEFAULT_RECAP}
    />
  );
};
