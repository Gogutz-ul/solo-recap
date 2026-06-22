import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { RecapData } from "../schema";
import { BRAND_FONT, character, COLORS, formatNumber } from "../branding";
import { Counter } from "../components/Counter";

const copyGrowth = (p: number) => {
  if (p >= 1) return `Cu ${formatNumber(p)}% peste anul trecut. În sus, ca racheta.`;
  if (p <= -1) return `Cu ${formatNumber(Math.abs(p))}% sub anul trecut. Se mai întâmplă — 2026 e al tău.`;
  return "Cam la fel ca anul trecut. Stabil ca o PFA cuminte.";
};

const Rise: React.FC<{ delay: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ delay, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 120 } });
  return <div style={{ opacity: interpolate(p, [0, 1], [0, 1]), transform: `translateY(${interpolate(p, [0, 1], [26, 0])}px)`, ...style }}>{children}</div>;
};

const BARS = [
  { x: 20, y: 95, h: 55 },
  { x: 76, y: 78, h: 72 },
  { x: 132, y: 58, h: 92 },
  { x: 188, y: 40, h: 110 },
  { x: 244, y: 20, h: 130 },
];

const GrowthChart: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dash = interpolate(frame, [start + 10, start + 52], [600, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dot = spring({ frame: frame - (start + 48), fps, config: { damping: 12, stiffness: 200 } });
  return (
    <svg viewBox="0 0 300 150" width={560} height={280} style={{ overflow: "visible" }} preserveAspectRatio="none">
      {BARS.map((b, i) => {
        const g = spring({ frame: frame - (start + i * 4), fps, config: { damping: 16 } });
        return (
          <rect
            key={i}
            x={b.x}
            y={b.y}
            width={34}
            height={b.h}
            fill="rgba(22,22,22,.10)"
            style={{ transformBox: "fill-box", transformOrigin: "bottom", transform: `scaleY(${interpolate(g, [0, 1], [0, 1])})` }}
          />
        );
      })}
      <path
        d="M37 110 L93 92 L149 70 L205 48 L261 24"
        fill="none"
        stroke={COLORS.success}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={600}
        strokeDashoffset={dash}
      />
      <circle cx={261} cy={24} r={7} fill={COLORS.success} style={{ opacity: interpolate(dot, [0, 1], [0, 1]), transformBox: "fill-box", transformOrigin: "center", transform: `scale(${interpolate(dot, [0, 1], [0, 1])})` }} />
    </svg>
  );
};

export const GrowthScene: React.FC<RecapData> = ({ moneyIn, prevIncome }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const growth = prevIncome > 0 ? ((moneyIn - prevIncome) / prevIncome) * 100 : 0;
  const positive = growth >= 0;
  const color = Math.abs(growth) < 1 ? COLORS.neutralDark : positive ? COLORS.success : COLORS.error;
  const sign = growth > 0 ? "+" : growth < 0 ? "−" : "";
  const floatY = Math.sin(frame / (fps * 0.7)) * 12;

  return (
    <AbsoluteFill style={{ background: COLORS.white, fontFamily: BRAND_FONT, color: COLORS.black, alignItems: "center", justifyContent: "center", padding: "0 60px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 18 }}>
        <Rise delay={4}>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", opacity: 0.6 }}>Față de anul trecut</div>
        </Rise>
        <Rise delay={10}>
          <div style={{ fontSize: 140, fontWeight: 900, letterSpacing: "-0.03em", color, lineHeight: 1 }}>
            {sign}
            <Counter to={Math.abs(growth)} delay={12} duration={50} plain />%
          </div>
        </Rise>
        <Rise delay={16} style={{ marginTop: 4 }}>
          <Img src={character(20)} style={{ width: 300, height: 300, objectFit: "contain", transform: `translateY(${floatY}px)` }} />
        </Rise>
        <Rise delay={22}>
          <GrowthChart start={28} />
        </Rise>
        <Rise delay={30}>
          <div style={{ fontSize: 34, fontWeight: 500, color: COLORS.neutralDark, maxWidth: 760, lineHeight: 1.4, marginTop: 8 }}>{copyGrowth(growth)}</div>
        </Rise>
      </div>
    </AbsoluteFill>
  );
};
