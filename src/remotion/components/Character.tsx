import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  src: string;
  /** target width in px (height auto, square art) */
  size?: number;
  delay?: number;
  /** subtle idle float */
  float?: boolean;
  /** energetic hop + wiggle */
  celebrate?: boolean;
  flip?: boolean;
  style?: React.CSSProperties;
};

export const Character: React.FC<Props> = ({
  src,
  size = 620,
  delay = 0,
  float = true,
  celebrate = false,
  flip = false,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 130 } });
  const scale = interpolate(enter, [0, 1], [0.6, 1]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);

  const t = (frame - delay) / fps;
  const hop = celebrate ? Math.abs(Math.sin(t * Math.PI * 1.6)) * -34 : 0;
  const floatY = float && !celebrate ? Math.sin(t * 2) * 10 : 0;
  const wiggle = celebrate ? Math.sin(t * Math.PI * 1.6) * 3 : 0;

  return (
    <Img
      src={src}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        transform: `translateY(${floatY + hop}px) rotate(${wiggle}deg) scale(${scale}) scaleX(${flip ? -1 : 1})`,
        opacity,
        ...style,
      }}
    />
  );
};
