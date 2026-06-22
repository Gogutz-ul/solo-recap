import { bundle } from "@remotion/bundler";
import { selectComposition, renderStill } from "@remotion/renderer";
import path from "node:path";
const serveUrl = await bundle({ entryPoint: path.resolve("src/remotion/index.ts") });
const base = { name:"Andrei", year:2025, activity:"driver", moneyIn:340000, moneyOut:45540, taxes:28600 };
const comp = await selectComposition({ serveUrl, id:"SoloRecap", inputProps: base });
await renderStill({ composition:comp, serveUrl, output:"scripts/shots/phone.png", frame:255, inputProps: base, chromiumOptions:{gl:"angle"} });
console.log("done");
