import express from "express";
import cors from "cors";
import path from "node:path";
import os from "node:os";
import { randomUUID } from "node:crypto";
import { readFile, unlink } from "node:fs/promises";
import { bundle } from "@remotion/bundler";
import { selectComposition, renderMedia, renderStill } from "@remotion/renderer";

const app = express();
app.use(cors());
app.use(express.json());

const ENTRY = path.resolve("src/remotion/index.ts");

// Bundle once, reuse across requests.
let bundlePromise = null;
const getBundle = () => {
  if (!bundlePromise) bundlePromise = bundle({ entryPoint: ENTRY });
  return bundlePromise;
};

const sanitize = (b) => {
  const num = (v) => Math.max(0, Math.round(Number(v) || 0));
  return {
    name: String(b?.name ?? "SOLOprenor").slice(0, 24) || "SOLOprenor",
    year: Number(b?.year) || 2025,
    activity: b?.activity === "it" ? "it" : "driver",
    moneyIn: num(b?.moneyIn),
    moneyOut: num(b?.moneyOut),
    taxes: num(b?.taxes),
    prevIncome: num(b?.prevIncome),
  };
};

app.post("/api/render", async (req, res) => {
  const out = path.join(os.tmpdir(), `solo-recap-${randomUUID()}.mp4`);
  try {
    const inputProps = sanitize(req.body);
    const serveUrl = await getBundle();
    const composition = await selectComposition({ serveUrl, id: "SoloRecap", inputProps });
    await renderMedia({
      composition,
      serveUrl,
      codec: "h264",
      outputLocation: out,
      inputProps,
      chromiumOptions: { gl: "angle" },
    });
    const buf = await readFile(out);
    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Disposition", `attachment; filename="recap-solo-${inputProps.year}.mp4"`);
    res.send(buf);
  } catch (e) {
    console.error(e);
    res.status(500).send(String(e?.message ?? e));
  } finally {
    unlink(out).catch(() => {});
  }
});

app.post("/api/image", async (req, res) => {
  const out = path.join(os.tmpdir(), `solo-recap-${randomUUID()}.png`);
  try {
    const inputProps = sanitize(req.body);
    const serveUrl = await getBundle();
    const composition = await selectComposition({ serveUrl, id: "SoloRecap", inputProps });
    await renderStill({
      composition,
      serveUrl,
      output: out,
      // last frame = the summary recap card
      frame: composition.durationInFrames - 1,
      inputProps,
      imageFormat: "png",
      chromiumOptions: { gl: "angle" },
    });
    const buf = await readFile(out);
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Content-Disposition", `attachment; filename="recap-solo-${inputProps.year}.png"`);
    res.send(buf);
  } catch (e) {
    console.error(e);
    res.status(500).send(String(e?.message ?? e));
  } finally {
    unlink(out).catch(() => {});
  }
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`SOLO recap render server → http://0.0.0.0:${PORT}`);
});
