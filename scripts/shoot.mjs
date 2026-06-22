import { bundle } from "@remotion/bundler";
import { selectComposition, renderStill } from "@remotion/renderer";
import path from "node:path";
import { mkdirSync } from "node:fs";

mkdirSync("scripts/shots", { recursive: true });

const entry = path.resolve("src/remotion/index.ts");
console.log("bundling...");
const serveUrl = await bundle({ entryPoint: entry });
console.log("bundled.");

const base = {
  name: "Andrei",
  year: 2025,
  activity: "driver",
  moneyIn: 340000,
  moneyOut: 45540,
  taxes: 28600,
};

async function shoot(frame, props, name) {
  const composition = await selectComposition({ serveUrl, id: "SoloRecap", inputProps: props });
  await renderStill({
    composition,
    serveUrl,
    output: `scripts/shots/${name}.png`,
    frame,
    inputProps: props,
    chromiumOptions: { gl: "angle" },
  });
  console.log("shot", name, "@", frame);
}

const shots = [
  [30, "intro"],
  [120, "driver-setup"],
  [156, "driver-zoom"],
  [200, "driver-money"],
  [288, "out"],
  [397, "net"],
  [496, "taxes"],
  [600, "persona"],
  [700, "outro"],
];
for (const [f, n] of shots) await shoot(f, base, n);
await shoot(120, { ...base, activity: "it" }, "it-setup");
await shoot(200, { ...base, activity: "it" }, "it-money");
console.log("done");
