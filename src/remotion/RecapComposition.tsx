import React from "react";
import { AbsoluteFill, Audio, interpolate, staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SCENES, TRANSITION } from "./config";
import { COLORS } from "./branding";
import type { RecapData } from "./schema";

// POC ONLY — background track is trimmed to start at the chorus.
// (Replace public/music.mp3 with a licensed/royalty-free track before publishing.)
const CHORUS_START_SEC = 48;

export const RecapComposition: React.FC<RecapData> = (data) => {
  const { durationInFrames, fps } = useVideoConfig();
  const fadeFrames = Math.round(fps * 0.6);

  return (
    <AbsoluteFill style={{ background: COLORS.white }}>
      {/* background music, starting at the chorus */}
      <Audio
        src={staticFile("music.mp3")}
        trimBefore={Math.round(CHORUS_START_SEC * fps)}
        volume={(f) =>
          interpolate(
            f,
            [0, fadeFrames, durationInFrames - fadeFrames * 2, durationInFrames],
            [0, 0.32, 0.32, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          )
        }
      />

      <TransitionSeries>
        {SCENES.flatMap((scene, i) => {
          const seq = (
            <TransitionSeries.Sequence key={scene.id} durationInFrames={scene.durationInFrames}>
              <scene.Component {...data} />
            </TransitionSeries.Sequence>
          );
          if (i === 0) return [seq];
          return [
            <TransitionSeries.Transition
              key={`t-${scene.id}`}
              timing={linearTiming({ durationInFrames: TRANSITION })}
              presentation={fade()}
            />,
            seq,
          ];
        })}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
