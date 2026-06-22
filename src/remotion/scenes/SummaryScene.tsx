import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { RecapData } from "../schema";
import { ACTIVITY_LABEL, BRAND_FONT, COLORS, formatLei, getPersona } from "../branding";
import { CoinsUp } from "../components/Coins";

const Rise: React.FC<{ delay: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ delay, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 120 } });
  return <div style={{ opacity: interpolate(p, [0, 1], [0, 1]), transform: `translateY(${interpolate(p, [0, 1], [28, 0])}px)`, ...style }}>{children}</div>;
};

export const SummaryScene: React.FC<RecapData> = (data) => {
  const { name, year, activity, moneyIn, moneyOut } = data;
  void name;
  const net = moneyIn - moneyOut;
  const title = getPersona(data).title;

  const rows: Array<{ label: string; value: string; yellow?: boolean }> = [
    { label: "Activitate", value: ACTIVITY_LABEL[activity] },
    { label: "Venituri", value: formatLei(moneyIn), yellow: true },
    { label: "Cheltuieli", value: formatLei(moneyOut) },
    { label: "Profit", value: formatLei(net), yellow: true },
    { label: "Titlu", value: title },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.black, fontFamily: BRAND_FONT, color: COLORS.white, alignItems: "center", justifyContent: "flex-start", paddingTop: 230 }}>
      <AbsoluteFill>
        <CoinsUp count={14} />
      </AbsoluteFill>

      <div style={{ width: "100%", maxWidth: 820, padding: "0 70px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <Rise delay={2}>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", opacity: 0.6 }}>
            Asta a fost {year}
          </div>
        </Rise>
        <Rise delay={8} style={{ marginTop: 14 }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.08 }}>
            Împărtășește-ți
            <br />
            anul cu SOLO
          </div>
        </Rise>

        <Rise delay={16} style={{ width: "100%", marginTop: 50 }}>
          <div style={{ width: "100%", background: "rgba(255,255,255,.06)", border: `1px solid rgba(255,255,255,.12)`, borderRadius: 28, padding: "20px 36px" }}>
            {rows.map((r, i) => (
              <div
                key={r.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "20px 0",
                  borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,.10)" : "none",
                }}
              >
                <span style={{ fontSize: 30, fontWeight: 500, opacity: 0.7 }}>{r.label}</span>
                <b style={{ fontSize: 32, fontWeight: 800, color: r.yellow ? COLORS.yellow : COLORS.white }}>{r.value}</b>
              </div>
            ))}
          </div>
        </Rise>
      </div>
    </AbsoluteFill>
  );
};
