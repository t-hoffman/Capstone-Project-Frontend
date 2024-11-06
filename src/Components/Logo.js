import React from "react";

export default ({ width = 30, height = 30 }) => (
  <img
    src="/xlogo.svg"
    id="x-logo"
    width={`${width}px`}
    height={`${height}px`}
  />
);
