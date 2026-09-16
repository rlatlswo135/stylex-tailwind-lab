import type { CSSProperties } from "react";
import type { CardProps } from "../shared/types";

const surface = {
  default: "border-[#dce5e1] bg-white",
  selected: "border-[#137c66] bg-[#effaf5]",
};
const spacing = { default: "gap-4 p-6 max-[640px]:p-4", compact: "gap-2 p-3" };

export const StudyCard = ({
  selected = false,
  progress = 64,
  compact = false,
}: CardProps) => (
  <article
    className={`flex flex-col rounded-2xl border border-solid text-[#172b29] ${surface[selected ? "selected" : "default"]} ${spacing[compact ? "compact" : "default"]}`}
  >
    <span className="text-xs leading-[1.5] font-bold tracking-[2px] text-[#137c66]">
      FIELD NOTES / 001
    </span>
    <h3 className="text-2xl font-bold leading-[1.3]">작은 스타일의 차이</h3>
    <p className="text-sm leading-[1.6] text-[#5f716c]">
      같은 화면, 다른 표현. 코드를 읽고 직접 비교해 보세요.
    </p>
    <div className="h-1.5 overflow-hidden rounded-[99px] bg-[#dce5e1]">
      <div
        className="h-full w-[var(--progress)] bg-[#137c66]"
        style={{ "--progress": `${progress}%` } as CSSProperties}
      />
    </div>
    <button
      type="button"
      className="rounded-lg bg-[#172b29] px-4 py-2.5 text-sm leading-[1.5] font-semibold text-white outline-offset-3 hover:bg-[#137c66]"
    >
      노트 읽기 ↗
    </button>
  </article>
);
