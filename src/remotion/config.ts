import type React from "react";
import type { RecapData } from "./schema";
import { IntroScene } from "./scenes/IntroScene";
import { ActivityScene } from "./scenes/ActivityScene";
import { MoneyOutScene } from "./scenes/MoneyOutScene";
import { NetResultScene } from "./scenes/NetResultScene";
import { TaxesScene } from "./scenes/TaxesScene";
import { GrowthScene } from "./scenes/GrowthScene";
import { PersonaScene } from "./scenes/PersonaScene";
import { SummaryScene } from "./scenes/SummaryScene";

export const VIDEO = { fps: 30, width: 1080, height: 1920 } as const;
export const COMPOSITION_ID = "SoloRecap";

export type SceneComponent = React.FC<RecapData>;

export type SceneDef = {
  id: string;
  label: string;
  durationInFrames: number;
  Component: SceneComponent;
};

export const SCENES: SceneDef[] = [
  { id: "intro", label: "Intro", durationInFrames: 140, Component: IntroScene },
  { id: "activity", label: "Activitate", durationInFrames: 320, Component: ActivityScene },
  { id: "out", label: "Cheltuieli", durationInFrames: 195, Component: MoneyOutScene },
  { id: "net", label: "Profit", durationInFrames: 235, Component: NetResultScene },
  { id: "taxes", label: "Taxe", durationInFrames: 190, Component: TaxesScene },
  { id: "growth", label: "Creștere", durationInFrames: 220, Component: GrowthScene },
  { id: "persona", label: "Personaj", durationInFrames: 190, Component: PersonaScene },
  { id: "summary", label: "Sumar", durationInFrames: 220, Component: SummaryScene },
];

/** Cross-scene transition overlap (frames). Scenes overlap by this much. */
export const TRANSITION = 16;

const sumDurations = SCENES.reduce((sum, s) => sum + s.durationInFrames, 0);

/** Total timeline = sum of durations minus the overlap consumed by each transition. */
export const TOTAL_FRAMES = sumDurations - (SCENES.length - 1) * TRANSITION;

/**
 * Start frame of each scene on the transitioned timeline — shared by the player for
 * skip + progress. Scene i begins `i` transitions earlier than its naive prefix sum.
 */
export const SCENE_STARTS = SCENES.reduce<number[]>((acc, _scene, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + SCENES[i - 1].durationInFrames - TRANSITION);
  return acc;
}, []);
