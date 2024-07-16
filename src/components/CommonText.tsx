import React from "react";

type CommonTextProps = {
  text: string;
  style?: React.CSSProperties;
};

export function CommonText({ text, style }: CommonTextProps) {
  return (
    <h1
      className="text-3xl flex justify-center items-center animate-fade-in mb-2"
      style={style}
    >
      {text}
    </h1>
  );
}
