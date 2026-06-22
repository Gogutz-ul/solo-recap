import { ACTIVITY_LABEL, COLORS, formatLei, getPersona } from "../remotion/branding";
import type { RecapData } from "../remotion/schema";

const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  if (typeof ctx.roundRect === "function") {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    return;
  }
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

/** Render the summary recap card to a PNG entirely in the browser (no server). */
export const buildSummaryImage = async (data: RecapData): Promise<Blob> => {
  const W = 1080;
  const H = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no canvas context");

  try {
    await (document.fonts ? document.fonts.ready : Promise.resolve());
  } catch {
    /* fonts best-effort */
  }

  // background
  ctx.fillStyle = COLORS.black;
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;
  ctx.textAlign = "center";

  // eyebrow
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "700 30px Inter, system-ui, sans-serif";
  if ("letterSpacing" in ctx) (ctx as unknown as { letterSpacing: string }).letterSpacing = "4px";
  ctx.fillText(`ASTA A FOST ${data.year}`, cx, 150);
  if ("letterSpacing" in ctx) (ctx as unknown as { letterSpacing: string }).letterSpacing = "0px";

  // headline
  ctx.fillStyle = COLORS.white;
  ctx.font = "800 78px Inter, system-ui, sans-serif";
  ctx.fillText("Împărtășește-ți", cx, 270);
  ctx.fillText("anul cu SOLO", cx, 360);

  // card
  const cardX = 90;
  const cardY = 450;
  const cardW = W - 180;
  const cardH = 640;
  roundRect(ctx, cardX, cardY, cardW, cardH, 40);
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.fill();
  roundRect(ctx, cardX, cardY, cardW, cardH, 40);
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 2;
  ctx.stroke();

  const net = data.moneyIn - data.moneyOut;
  const rows: Array<{ label: string; value: string; yellow?: boolean }> = [
    { label: "Activitate", value: ACTIVITY_LABEL[data.activity] },
    { label: "Venituri", value: formatLei(data.moneyIn), yellow: true },
    { label: "Cheltuieli", value: formatLei(data.moneyOut) },
    { label: "Profit", value: formatLei(net), yellow: true },
    { label: "Titlu", value: getPersona(data).title },
  ];

  const padX = 56;
  const rowH = cardH / rows.length;
  rows.forEach((row, i) => {
    const y = cardY + rowH * i + rowH / 2;
    ctx.textBaseline = "middle";
    ctx.font = "500 34px Inter, system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.textAlign = "left";
    ctx.fillText(row.label, cardX + padX, y);

    ctx.font = "800 36px Inter, system-ui, sans-serif";
    ctx.fillStyle = row.yellow ? COLORS.yellow : COLORS.white;
    ctx.textAlign = "right";
    ctx.fillText(row.value, cardX + cardW - padX, y);

    if (i < rows.length - 1) {
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cardX + padX, cardY + rowH * (i + 1));
      ctx.lineTo(cardX + cardW - padX, cardY + rowH * (i + 1));
      ctx.stroke();
    }
  });

  // SOLO wordmark
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = COLORS.white;
  ctx.font = "800 44px Inter, system-ui, sans-serif";
  if ("letterSpacing" in ctx) (ctx as unknown as { letterSpacing: string }).letterSpacing = "3px";
  ctx.fillText("SOLO", cx, H - 90);
  if ("letterSpacing" in ctx) (ctx as unknown as { letterSpacing: string }).letterSpacing = "0px";

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), "image/png");
  });
};
