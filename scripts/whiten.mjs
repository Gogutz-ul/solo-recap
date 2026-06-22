import { readFileSync, writeFileSync, readdirSync } from "node:fs";
const dir = "public/characters";
for (const file of readdirSync(dir).filter(f => /^\d+-01\.svg$/.test(f))) {
  let svg = readFileSync(`${dir}/${file}`, "utf8");
  svg = svg
    .replace(/fill="black"/gi, 'fill="#FFFFFF"')
    .replace(/fill="#000000"/gi, 'fill="#FFFFFF"')
    .replace(/fill="#000"/gi, 'fill="#FFFFFF"')
    .replace(/fill="#161616"/gi, 'fill="#FFFFFF"');
  const out = file.replace("-01.svg", "-white.svg");
  writeFileSync(`${dir}/${out}`, svg);
}
console.log("generated white variants");
