import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { RecapData } from "../schema";
import { BRAND_FONT, characterWhite, COLORS, formatLei } from "../branding";
import { Counter } from "../components/Counter";
import { CoinsUp, CoinPile } from "../components/Coins";

const copyProfit = (v: number) => {
  if (v <= 0) return "Anul ăsta a fost pe minus. Se mai întâmplă — important e că mergi mai departe.";
  if (v >= 150000) return `${formatLei(v)} profit. Stai liniștit și lasă SOLO să se ocupe de hârtii.`;
  return `${formatLei(v)} rămași în buzunar. Nu-i rău deloc.`;
};

const Rise: React.FC<{ delay: number; children: React.ReactNode }> = ({ delay, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 120 } });
  return (
    <div style={{ opacity: interpolate(p, [0, 1], [0, 1]), transform: `translateY(${interpolate(p, [0, 1], [26, 0])}px)` }}>
      {children}
    </div>
  );
};

export const NetResultScene: React.FC<RecapData> = ({ moneyIn, moneyOut }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const net = moneyIn - moneyOut;
  const positive = net >= 0;

  // gentle "relax" float for the character
  const floatY = Math.sin(frame / (fps * 0.7)) * 14;
  // pulsing glow behind the number
  const glow = 1 + Math.sin((frame / fps) * 3) * 0.12;
  const pop = spring({ frame: frame - 14, fps, config: { damping: 12, stiffness: 140 } });

  return (
    <AbsoluteFill style={{ background: COLORS.black, overflow: "hidden", fontFamily: BRAND_FONT, color: COLORS.white }}>
      {/* rising coins backdrop */}
      <AbsoluteFill>
        <CoinsUp count={positive ? 18 : 8} />
      </AbsoluteFill>

      {/* character (with flowers + stars built in), relaxed float */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 250 }}>
        <Img
          src={characterWhite(20)}
          style={{
            width: 560,
            height: 560,
            objectFit: "contain",
            transform: `translateY(${floatY}px) scale(${interpolate(pop, [0, 1], [0.7, 1])})`,
            opacity: interpolate(pop, [0, 1], [0, 1]),
          }}
        />
      </AbsoluteFill>

      {/* headline */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 860, textAlign: "center", padding: "860px 60px 0" }}>
        <Rise delay={18}>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", opacity: 0.6 }}>
            Profit (ce-ți rămâne)
          </div>
        </Rise>
        <div style={{ position: "relative", marginTop: 14 }}>
          {/* glow */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 720,
              height: 360,
              transform: `translate(-50%,-50%) scale(${glow})`,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${positive ? "rgba(254,218,0,.30)" : "rgba(180,35,24,.28)"}, transparent 64%)`,
              filter: "blur(8px)",
            }}
          />
          <Rise delay={24}>
            <div style={{ fontSize: 132, fontWeight: 900, letterSpacing: "-0.03em", color: positive ? COLORS.yellow : COLORS.error, lineHeight: 1, whiteSpace: "nowrap" }}>
              <Counter to={Math.abs(net)} delay={20} duration={60} plain />
              <span style={{ fontSize: 52, opacity: 0.7 }}> lei</span>
            </div>
          </Rise>
        </div>
        <Rise delay={32}>
          <div style={{ fontSize: 34, fontWeight: 500, opacity: 0.82, marginTop: 26, maxWidth: 760, lineHeight: 1.4 }}>
            {copyProfit(net)}
          </div>
        </Rise>
      </AbsoluteFill>

      {/* coin pile */}
      {positive ? (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 150 }}>
          <CoinPile delay={40} />
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
