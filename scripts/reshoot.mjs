import { bundle } from "@remotion/bundler";
import { selectComposition, renderStill } from "@remotion/renderer";
import path from "node:path";
const serveUrl = await bundle({ entryPoint: path.resolve("src/remotion/index.ts") });
const base = { name:"Andrei", year:2025, activity:"driver", moneyIn:340000, moneyOut:45540, taxes:28600 };
for (const [f,n] of [[560,"taxes"],[700,"persona"]]) {
  const composition = await selectComposition({ serveUrl, id:"SoloRecap", inputProps: base });
  await renderStill({ composition, serveUrl, output:`scripts/shots/${n}.png`, frame:f, inputProps: base, chromiumOptions:{gl:"angle"} });
  console.log("shot", n);
}
