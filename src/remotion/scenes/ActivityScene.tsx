import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { RecapData } from "../schema";
import { BRAND_FONT, CHARACTERS, COLORS } from "../branding";
import { StoryBackground } from "../components/StoryBackground";
import { Laptop } from "../components/Laptop";
import { Car } from "../components/Car";
import { Counter } from "../components/Counter";
import { SceneText } from "../components/SceneText";
import { FloatingDocs } from "../components/Documents";

const MONEY_AT = 100; // IT branch money reveal

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const SpeedLines: React.FC<{ y: number; band: number; color?: string; speed?: number; opacity?: number }> = ({
  y,
  band,
  color = COLORS.black,
  speed = 60,
  opacity = 0.35,
}) => {
  const frame = useCurrentFrame();
  return (
    <>
      {new Array(10).fill(0).map((_, i) => {
        const len = 80 + random(`sl${i}`) * 180;
        const top = y + random(`y${i}`) * band;
        const x = 1200 - ((frame * speed + random(`o${i}`) * 1700) % 1900);
        return (
          <div key={i} style={{ position: "absolute", top, left: x, width: len, height: 6, borderRadius: 4, background: color, opacity }} />
        );
      })}
    </>
  );
};

// ---------- IT branch helpers ----------
const SetupHeadline: React.FC<{ line1: string; line2: string; fadeAt: number }> = ({ line1, line2, fadeAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inP = spring({ frame, fps, config: { damping: 16, stiffness: 130 } });
  const opacity = interpolate(frame, [0, 8, fadeAt - 10, fadeAt], [0, 1, 1, 0], clamp);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 150 }}>
      <div style={{ fontFamily: BRAND_FONT, textAlign: "center", opacity, transform: `translateY(${interpolate(inP, [0, 1], [-40, 0])}px)` }}>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: COLORS.neutralDark }}>{line1}</div>
        <div style={{ fontSize: 86, fontWeight: 800, textTransform: "uppercase", color: COLORS.black }}>{line2}</div>
      </div>
    </AbsoluteFill>
  );
};

const MoneyReveal: React.FC<{ moneyIn: number }> = ({ moneyIn }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - MONEY_AT, fps, config: { damping: 18, stiffness: 120 } });
  return (
    <AbsoluteFill style={{ opacity: interpolate(p, [0, 1], [0, 1]) }}>
      <AbsoluteFill>
        <FloatingDocs kinds={["invoice", "receipt", "invoice"]} count={7} delay={MONEY_AT} size={130} />
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <SceneText
          kicker="Venituri"
          title="Și ai încasat"
          amount={<Counter to={moneyIn} delay={MONEY_AT + 4} duration={55} />}
          amountColor={COLORS.success}
          subtitle="Fiecare factură a contat. Frumos!"
          delay={MONEY_AT}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const FloatingCode: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const tokens = ["</>", "{ }", "()", "=>", ";", "[ ]", "0x1", "fn"];
  return (
    <AbsoluteFill style={{ opacity }}>
      {tokens.map((t, i) => {
        const x = 8 + ((i * 12.5) % 84);
        const y = ((frame * (0.4 + (i % 3) * 0.2) + i * 130) % 1500) - 100;
        return (
          <div key={i} style={{ position: "absolute", left: `${x}%`, top: y, fontFamily: "monospace", fontSize: 40, fontWeight: 700, color: COLORS.neutralLighter }}>
            {t}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const DevActivity: React.FC<{ moneyIn: number }> = ({ moneyIn }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const laptopIn = spring({ frame, fps, config: { damping: 12, stiffness: 120 } });
  const zoom = interpolate(frame, [MONEY_AT - 34, MONEY_AT - 2], [1, 1.22], clamp);
  const worldOpacity = interpolate(frame, [MONEY_AT - 6, MONEY_AT + 10], [1, 0], clamp);
  return (
    <StoryBackground bg={COLORS.neutralLightest} accent={COLORS.yellow}>
      <FloatingCode opacity={worldOpacity} />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 72%", opacity: worldOpacity }}>
        <AbsoluteFill style={{ justifyContent: "flex-end" }}>
          <div style={{ height: 340, background: COLORS.black }} />
        </AbsoluteFill>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 300 }}>
          <div style={{ transform: `translateY(${interpolate(laptopIn, [0, 1], [400, 0])}px)` }}>
            <Laptop width={560} />
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
      <SetupHeadline line1="În 2025 ai scris" line2="cod, cod, cod" fadeAt={MONEY_AT} />
      <MoneyReveal moneyIn={moneyIn} />
    </StoryBackground>
  );
};

// ---------- Driver branch (cinematic night drive) ----------
const D = { riseAt: 56, zoom0: 88, zoom1: 134, lit: 114, fares: 118 };
const FARES = [
  { l: "Centru", a: 42 },
  { l: "Aeroport", a: 58 },
  { l: "Pipera", a: 31 },
  { l: "Gară", a: 75 },
  { l: "Herăstrău", a: 49 },
];

const ParallaxCity: React.FC<{ speed: number; bottom: number; opacity: number; stroke: string }> = ({ speed, bottom, opacity, stroke }) => {
  const frame = useCurrentFrame();
  const shift = (frame * speed) % 800;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom, height: 320, opacity, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: -shift, width: "200%", height: "100%" }}>
        <svg width="100%" height="320" viewBox="0 0 1600 320" fill="none" stroke={stroke} strokeWidth={4} preserveAspectRatio="none">
          {[0, 1].map((rep) =>
            [40, 150, 250, 360, 470, 560, 690].map((x, i) => {
              const h = 120 + ((i * 37) % 170);
              return <rect key={`${rep}-${i}`} x={rep * 800 + x} y={320 - h} width={70 + ((i * 11) % 40)} height={h} rx={6} />;
            }),
          )}
        </svg>
      </div>
    </div>
  );
};

const PhoneScreen: React.FC<{ moneyIn: number }> = ({ moneyIn }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lit = interpolate(frame, [D.lit - 8, D.lit + 4], [0, 1], clamp);
  const W = 300;
  return (
    <div style={{ width: W, background: "#0c0c0c", border: `3px solid ${COLORS.white}`, borderRadius: 30, padding: "12px 10px 14px" }}>
      <div
        style={{
          height: 430,
          borderRadius: 20,
          overflow: "hidden",
          position: "relative",
          background: lit > 0.5 ? "#1d1d12" : "#161616",
          boxShadow: lit > 0.5 ? `inset 0 0 0 2px ${COLORS.yellow}, 0 0 40px rgba(254,218,0,.35)` : "inset 0 0 0 1px rgba(255,255,255,.15)",
          fontFamily: BRAND_FONT,
          color: COLORS.white,
        }}
      >
        {/* head */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 16px 12px", borderBottom: "1px solid rgba(255,255,255,.12)" }}>
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>SOLO</span>
          <span style={{ fontSize: 14, opacity: 0.55, marginLeft: "auto" }}>2025</span>
        </div>
        {/* total */}
        <div style={{ textAlign: "center", padding: "18px 8px 6px", opacity: lit }}>
          <div style={{ fontSize: 14, opacity: 0.65, letterSpacing: 1.4, textTransform: "uppercase" }}>Total încasat</div>
          <div style={{ fontSize: 40, fontWeight: 900, color: COLORS.yellow, lineHeight: 1.15, whiteSpace: "nowrap" }}>
            <Counter to={moneyIn} delay={D.fares} duration={80} plain />
            <span style={{ fontSize: 18 }}> lei</span>
          </div>
        </div>
        {/* feed */}
        <div style={{ padding: "4px 16px" }}>
          {FARES.map((f, i) => {
            const at = D.fares + 6 + i * 11;
            const p = spring({ frame: frame - at, fps, config: { damping: 16, stiffness: 200 } });
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: 17,
                  padding: "11px 0",
                  borderBottom: "1px solid rgba(255,255,255,.08)",
                  opacity: interpolate(p, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(p, [0, 1], [16, 0])}px)`,
                }}
              >
                <span style={{ opacity: 0.85 }}>Cursă · {f.l}</span>
                <b style={{ color: COLORS.yellow, fontWeight: 800 }}>+{f.a} lei</b>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const DriverActivity: React.FC<{ moneyIn: number }> = ({ moneyIn }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const roadShift = (frame * 26) % 148;

  const phoneP = spring({ frame: frame - D.riseAt, fps, config: { damping: 16, stiffness: 120 } });
  const slideY = interpolate(phoneP, [0, 1], [460, 0]);
  const phoneRot = interpolate(phoneP, [0, 1], [-8, 0]);
  const phoneOpacity = interpolate(frame, [D.riseAt - 2, D.riseAt + 8], [0, 1], clamp);
  const camScale = interpolate(frame, [D.zoom0, D.zoom1], [1, 2.25], { easing: Easing.bezier(0.6, 0, 0.2, 1), ...clamp });
  const labelOpacity = interpolate(frame, [0, 8, 74, 86], [0, 1, 1, 0], clamp);

  return (
    <AbsoluteFill style={{ background: COLORS.black, overflow: "hidden" }}>
      {/* parallax city (behind, not zoomed) */}
      <ParallaxCity speed={2} bottom={620} opacity={0.35} stroke="rgba(255,255,255,.4)" />
      <ParallaxCity speed={5} bottom={560} opacity={0.8} stroke="rgba(255,255,255,.7)" />

      {/* camera (zooms into the phone) */}
      <AbsoluteFill style={{ transform: `scale(${camScale})`, transformOrigin: "50% 41%" }}>
        {/* road + dashes */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 540, height: 5, background: "rgba(255,255,255,.45)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 510, height: 6, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: -roadShift, width: "200%", height: "100%", background: "repeating-linear-gradient(90deg, rgba(255,255,255,.7) 0 56px, transparent 56px 112px)" }} />
        </div>

        {/* speed lines */}
        <SpeedLines y={760} band={260} color="rgba(255,255,255,.5)" speed={90} opacity={0.7} />

        {/* exhaust puffs */}
        <div style={{ position: "absolute", left: "50%", marginLeft: -430, bottom: 560 }}>
          {[0, 1, 2].map((i) => {
            const t = (frame / 28 + i * 0.33) % 1;
            return <div key={i} style={{ position: "absolute", left: -t * 70, bottom: t * 40, width: 18 + t * 50, height: 18 + t * 50, borderRadius: "50%", background: "rgba(255,255,255,.5)", opacity: interpolate(t, [0, 0.2, 1], [0, 0.5, 0]) }} />;
          })}
        </div>

        {/* car (side view, white line-art) */}
        <div style={{ position: "absolute", left: "50%", bottom: 470, transform: "translateX(-50%)" }}>
          <Car characterSrc={CHARACTERS.driverHero} width={780} />
        </div>

        {/* phone rises onto the scene at the zoom origin */}
        <div
          style={{
            position: "absolute",
            top: "41%",
            left: "50%",
            transform: `translate(-50%, -50%) translateY(${slideY}px) rotate(${phoneRot}deg)`,
            opacity: phoneOpacity,
          }}
        >
          <PhoneScreen moneyIn={moneyIn} />
        </div>
      </AbsoluteFill>

      {/* label (outside the camera) */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 150, opacity: labelOpacity }}>
        <div style={{ fontFamily: BRAND_FONT, textAlign: "center", color: COLORS.white }}>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", opacity: 0.6 }}>În 2025 ai fost</div>
          <div style={{ fontSize: 84, fontWeight: 800, textTransform: "uppercase" }}>mereu pe drum</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const ActivityScene: React.FC<RecapData> = ({ activity, moneyIn }) => {
  return activity === "driver" ? (
    <DriverActivity moneyIn={moneyIn} />
  ) : (
    <DevActivity moneyIn={moneyIn} />
  );
};
