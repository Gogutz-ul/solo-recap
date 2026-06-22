import { bundle } from "@remotion/bundler";
import { selectComposition, renderStill } from "@remotion/renderer";
import path from "node:path";
const serveUrl = await bundle({ entryPoint: path.resolve("src/remotion/index.ts") });
const base = { name:"Andrei", year:2025, activity:"driver", moneyIn:340000, moneyOut:45540, taxes:28600, prevIncome:250000 };
const comp = await selectComposition({ serveUrl, id:"SoloRecap", inputProps: base });
console.log("total frames:", comp.durationInFrames);
// growth scene: starts after taxes. compute: 90,280,120,185,110 -> with transitions
await renderStill({ composition:comp, serveUrl, output:"scripts/shots/growth.png", frame:800, inputProps: base, chromiumOptions:{gl:"angle"} });
console.log("done");
