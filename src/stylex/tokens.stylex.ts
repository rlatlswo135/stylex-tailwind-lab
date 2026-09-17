import * as stylex from "@stylexjs/stylex";

export const tokens = stylex.defineVars({
  ink: "#172b29",
  accent: "#137c66",
  line: "#dce5e1",
  muted: "#5f716c",
});

export const radius = stylex.defineVars({
  small: 8,
  medium: 16,
  large: 24,
})

export const fontSize = stylex.defineConsts({
  small: 12,
  medium: 14,
  large: 16,
  xlarge: 24,
})