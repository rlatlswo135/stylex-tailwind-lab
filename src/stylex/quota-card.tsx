import * as stylex from "@stylexjs/stylex";
import { tokens } from "./tokens.stylex";
import type { CardProps } from "../shared/types";

const styles = stylex.create({
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: { default: 24, "@media not all and (min-width: 640px)": 16 },
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tokens.line,
    backgroundColor: "#fff",
    color: tokens.ink,
  },
  selected: { borderColor: tokens.accent, backgroundColor: "#effaf5" },
  label: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 2,
    color: tokens.accent,
  },
  title: { fontSize: 24, fontWeight: 700, lineHeight: 1.3 },
  description: { fontSize: 14, lineHeight: 1.6, color: tokens.muted },
  track: {
    height: 6,
    borderRadius: 99,
    overflow: "hidden",
    backgroundColor: tokens.line,
  },
  fill: (progress: number) => ({
    height: "100%",
    width: `${progress}%`,
    backgroundColor: tokens.accent,
  }),
  button: {
    padding: "10px 16px",
    borderRadius: 8,
    backgroundColor: {
      default: tokens.ink,
      ":hover": { default: null, "@media (hover: hover)": tokens.accent },
    },
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
    outlineOffset: 3,
  },
});
export const QuotaCard = ({ progress = 64, selected = false }: CardProps) => (
  <article {...stylex.props(styles.card, selected && styles.selected)}>
    <span {...stylex.props(styles.label)}>WORKSPACE / PRO</span>
    <h3 {...stylex.props(styles.title)}>이번 달 사용량</h3>
    <p {...stylex.props(styles.description)}>
      프로젝트의 사용량을 한눈에 확인하세요.
    </p>
    <div {...stylex.props(styles.track)}>
      <div {...stylex.props(styles.fill(progress))} />
    </div>
    <button type="button" {...stylex.props(styles.button)}>
      사용량 보기 ↗
    </button>
  </article>
);
