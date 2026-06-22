import sharp from "sharp";
import { readdirSync } from "node:fs";

const files = readdirSync("scripts/shots").filter((f) => f.endsWith(".png")).sort();
const order = [
  "intro.png",
  "driver-setup.png",
  "driver-money.png",
  "it-setup.png",
  "it-money.png",
  "out.png",
  "net.png",
  "taxes.png",
  "persona.png",
  "outro.png",
].filter((f) => files.includes(f));

const CELL_W = 240;
const CELL_H = 427;
const LABEL = 26;
const COLS = 5;
const ROWS = Math.ceil(order.length / COLS);
const cellW = CELL_W + 16;
const cellH = CELL_H + LABEL + 16;

const composites = [];
for (let i = 0; i < order.length; i++) {
  const buf = await sharp(`scripts/shots/${order[i]}`).resize(CELL_W, CELL_H, { fit: "contain", background: "#888" }).png().toBuffer();
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  composites.push({ input: buf, left: col * cellW + 8, top: row * cellH + 8 });
  const label = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${cellW}" height="${LABEL}"><rect width="100%" height="100%" fill="#161616"/><text x="${cellW / 2}" y="18" font-family="Arial" font-size="15" font-weight="bold" text-anchor="middle" fill="#FEDA00">${order[i].replace(".png", "")}</text></svg>`);
  composites.push({ input: label, left: col * cellW, top: row * cellH + CELL_H + 12 });
}

await sharp({ create: { width: COLS * cellW, height: ROWS * cellH, channels: 3, background: "#444" } })
  .composite(composites)
  .png()
  .toFile("scripts/shots-montage.png");
console.log("wrote scripts/shots-montage.png");
