import { bundle } from "@remotion/bundler";
import { selectComposition, renderStill } from "@remotion/renderer";
import path from "node:path";
const serveUrl = await bundle({ entryPoint: path.resolve("src/remotion/index.ts") });
for (const [inc,tag] of [[340000,"a"],[1250000,"big"]]) {
  const base = { name:"Andrei", year:2025, activity:"driver", moneyIn:inc, moneyOut:45540, taxes:28600 };
  const composition = await selectComposition({ serveUrl, id:"SoloRecap", inputProps: base });
  await renderStill({ composition, serveUrl, output:`scripts/shots/phone-${tag}.png`, frame:238, inputProps: base, chromiumOptions:{gl:"angle"} });
  console.log("shot",tag);
}
