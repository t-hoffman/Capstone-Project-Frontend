import React from "react";

export default function Logo({ width = 30, height = 30 }) {
  return (
    <img
      src="/xlogo.svg"
      id="x-logo"
      width={`${width}px`}
      height={`${height}px`}
    />
  );
}
