import React from "react";

type CommonTextProps = {
  text: string;
  style?: React.CSSProperties;
  hasAnimation?: boolean;
};

export function CommonText({ text, style, hasAnimation }: CommonTextProps) {
  return (
    <h1
      className={`text-3xl flex justify-center items-center ${
        hasAnimation && "animate-slide-in-up"
      } mb-2`}
      style={style}
    >
      {text}
    </h1>
  );
}
