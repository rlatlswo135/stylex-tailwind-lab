import * as stylex from "@stylexjs/stylex";
import type { CardProps } from "../shared/types";

const styles = stylex.create({s
  card: {
    backgroundColor: "#fff",
    color: "#172b29",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#dce5e1",
    borderRadius: 16,
    padding: { default: 24, "@media not all and (min-width: 640px)": 16 },
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  selected: { borderColor: "#137c66", backgroundColor: "#effaf5" },
  compact: { padding: 12, gap: 8 },
  eyebrow: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 2,
    color: "#137c66",
  },
  title: { fontSize: 24, fontWeight: 700, lineHeight: 1.3 },
  description: { fontSize: 14, lineHeight: 1.6, color: "#5f716c" },
  track: {
    height: 6,
    backgroundColor: "#dce5e1",
    borderRadius: 99,
    overflow: "hidden",
  },
  fill: (progress: number) => ({
    width: `${progress}%`,
    height: "100%",
    backgroundColor: "#137c66",
  }),
  button: {
    backgroundColor: {
      default: "#172b29",
      ":hover": { default: null, "@media (hover: hover)": "#137c66" },
    },
    color: "#fff",
    padding: "10px 16px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    outlineOffset: 3,
  },
});

export const StudyCard = ({
  selected = false,
  progress = 64,
  compact = false,
}: CardProps) => (
  <article
    {...stylex.props(
      styles.card,
      selected && styles.selected,
      compact && styles.compact,
    )}
  >
    <span {...stylex.props(styles.eyebrow)}>FIELD NOTES / 001</span>
    <h3 {...stylex.props(styles.title)}>작은 스타일의 차이</h3>
    <p {...stylex.props(styles.description)}>
      같은 화면, 다른 표현. 코드를 읽고 직접 비교해 보세요.
    </p>
    <div {...stylex.props(styles.track)}>
      <div {...stylex.props(styles.fill(progress))} />
    </div>
    <button type="button" {...stylex.props(styles.button)}>
      노트 읽기 ↗
    </button>
  </article>
);
