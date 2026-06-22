import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND_FONT, COLORS } from "../branding";

type Props = {
  kicker?: string;
  title: React.ReactNode;
  amount?: React.ReactNode;
  subtitle?: React.ReactNode;
  color?: string;
  amountColor?: string;
  kickerBg?: string;
  kickerColor?: string;
  delay?: number;
  align?: "center" | "left";
};

const Reveal: React.FC<{ delay: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  delay,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 120 } });
  return (
    <div
      style={{
        opacity: interpolate(p, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(p, [0, 1], [28, 0])}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const PulseAmount: React.FC<{ color: string; children: React.ReactNode }> = ({ color, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pulse = 1 + Math.sin((frame / fps) * 4) * 0.025;
  return (
    <div style={{ fontSize: 120, fontWeight: 700, lineHeight: 1, color, transform: `scale(${pulse})` }}>
      {children}
    </div>
  );
};

/** Consistent story typography block: kicker → title → big amount → subtitle. */
export const SceneText: React.FC<Props> = ({
  kicker,
  title,
  amount,
  subtitle,
  color = COLORS.black,
  amountColor = COLORS.black,
  kickerBg = COLORS.black,
  kickerColor = COLORS.white,
  delay = 0,
  align = "center",
}) => {
  return (
    <div
      style={{
        fontFamily: BRAND_FONT,
        color,
        textAlign: align,
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        gap: 18,
        padding: "0 70px",
      }}
    >
      {kicker ? (
        <Reveal delay={delay}>
          <span
            style={{
              display: "inline-block",
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
              background: kickerBg,
              color: kickerColor,
              padding: "8px 22px",
              borderRadius: 9999,
            }}
          >
            {kicker}
          </span>
        </Reveal>
      ) : null}

      <Reveal delay={delay + 4}>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05 }}>{title}</div>
      </Reveal>

      {amount !== undefined ? (
        <Reveal delay={delay + 8}>
          <PulseAmount color={amountColor}>{amount}</PulseAmount>
        </Reveal>
      ) : null}

      {subtitle ? (
        <Reveal delay={delay + 12}>
          <div style={{ fontSize: 34, fontWeight: 500, color: COLORS.neutralDark, maxWidth: 820 }}>
            {subtitle}
          </div>
        </Reveal>
      ) : null}
    </div>
  );
};
