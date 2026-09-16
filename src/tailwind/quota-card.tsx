import type { CSSProperties } from "react";
import type { CardProps } from "../shared/types";

const surfaces = {
  default: "border-line bg-white",
  selected: "border-accent bg-[#effaf5]",
};
export const QuotaCard = ({ progress = 64, selected = false }: CardProps) => (
  <article
    className={`flex flex-col gap-4 rounded-2xl border border-solid p-6 text-ink max-[640px]:p-4 ${surfaces[selected ? "selected" : "default"]}`}
  >
    <span className="text-xs leading-[1.5] font-bold tracking-[2px] text-accent">
      WORKSPACE / PRO
    </span>
    <h3 className="text-2xl font-bold leading-[1.3]">이번 달 사용량</h3>
    <p className="text-sm leading-[1.6] text-muted">
      프로젝트의 사용량을 한눈에 확인하세요.
    </p>
    <div className="h-1.5 overflow-hidden rounded-[99px] bg-line">
      <div
        className="h-full w-[var(--progress)] bg-accent"
        style={{ "--progress": `${progress}%` } as CSSProperties}
      />
    </div>
    <button
      type="button"
      className="rounded-lg bg-ink px-4 py-2.5 text-sm leading-[1.5] font-semibold text-white outline-offset-3 hover:bg-accent"
    >
      사용량 보기 ↗
    </button>
  </article>
);
