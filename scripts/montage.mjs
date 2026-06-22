import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';

const CELL = 260;
const PAD = 14;
const LABEL = 26;
const COLS = 5;
const ids = Array.from({ length: 20 }, (_, i) => i + 1);
const ROWS = Math.ceil(ids.length / COLS);

const cellW = CELL + PAD * 2;
const cellH = CELL + PAD * 2 + LABEL;
const W = COLS * cellW;
const H = ROWS * cellH;

const composites = [];
for (let idx = 0; idx < ids.length; idx++) {
  const id = ids[idx];
  const svg = readFileSync(`public/characters/${id}-01.svg`, 'utf8');
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: CELL },
    background: 'white',
  }).render().asPng();

  const col = idx % COLS;
  const row = Math.floor(idx / COLS);
  const top = row * cellH + PAD;
  const left = col * cellW + PAD;
  composites.push({ input: png, top, left });

  const label = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${cellW}" height="${LABEL}"><rect width="100%" height="100%" fill="#FEDA00"/><text x="${cellW / 2}" y="18" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle" fill="black">${id}-01.svg</text></svg>`,
  );
  composites.push({ input: label, top: row * cellH + CELL + PAD * 2, left: col * cellW });
}

await sharp({
  create: { width: W, height: H, channels: 3, background: '#222' },
})
  .composite(composites)
  .png()
  .toFile('scripts/montage.png');

console.log('wrote scripts/montage.png', W, 'x', H);
