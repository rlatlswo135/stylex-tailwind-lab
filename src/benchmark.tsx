import { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import type { ComponentType } from "react";
import type { CardProps } from "./shared/types";
import { summarize } from "./shared/stats.mjs";

type Sample = {
  iteration: number;
  phase: "mount" | "update";
  commitMs: number;
  twoFramesMs: number;
};
const frames = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  );
const counts = [100, 500, 1000, 2000];
export const Benchmark = ({
  library,
  Card,
}: {
  library: string;
  Card: ComponentType<CardProps>;
}) => {
  const container = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(500);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState("측정 대기");
  const handleRun = async () => {
    if (!container.current || running) return;
    setRunning(true);
    setResult("2회 워밍업 + 10회 측정 중… 이 탭을 계속 활성화해 주세요.");
    const root = createRoot(container.current);
    const samples: Sample[] = [];
    let hidden = document.hidden;
    const handleVisibilityChange = () => {
      if (document.hidden) hidden = true;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    try {
      for (let iteration = -2; iteration < 10; iteration++) {
        flushSync(() => root.render(null));
        await frames();
        for (const phase of ["mount", "update"] as const) {
          const start = performance.now();
          flushSync(() =>
            root.render(
              <>
                {Array.from({ length: count }, (_, i) => (
                  <Card
                    key={i}
                    compact
                    selected={phase === "update"}
                    progress={phase === "update" ? (i * 7) % 101 : 64}
                  />
                ))}
              </>,
            ),
          );
          const commitMs = performance.now() - start;
          await frames();
          if (iteration >= 0)
            samples.push({
              iteration,
              phase,
              commitMs,
              twoFramesMs: performance.now() - start,
            });
        }
      }
      const summary = Object.fromEntries(
        ["mount", "update"].map((phase) => [
          phase,
          {
            commitMs: summarize(
              samples.filter((s) => s.phase === phase).map((s) => s.commitMs),
            ),
            twoFramesMs: summarize(
              samples
                .filter((s) => s.phase === phase)
                .map((s) => s.twoFramesMs),
            ),
          },
        ]),
      );
      setResult(
        JSON.stringify(
          {
            library,
            production: import.meta.env.PROD,
            valid: !hidden && import.meta.env.PROD,
            hiddenDuringRun: hidden,
            count,
            warmup: 2,
            repetitions: 10,
            timestamp: new Date().toISOString(),
            environment: {
              userAgent: navigator.userAgent,
              viewport: [innerWidth, innerHeight],
              devicePixelRatio,
              hardwareConcurrency: navigator.hardwareConcurrency,
            },
            summary,
            samples,
          },
          null,
          2,
        ),
      );
    } catch (error) {
      setResult(`측정 실패: ${String(error)}`);
    } finally {
      root.unmount();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      setRunning(false);
    }
  };
  const handleExport = () => {
    const url = URL.createObjectURL(
      new Blob([result], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `${library}-${count}-${Date.now()}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <main className="bench-shell">
      <div className="kicker">ISOLATED PRODUCTION BENCHMARK</div>
      <h1>{library} / render lab</h1>
      <p>
        동일한 카드의 마운트와 상태·진행률 업데이트. commit은 React 동기
        작업이며 2 rAF는 paint 완료의 정확한 측정이 아닙니다.
      </p>
      <div className="status">
        {import.meta.env.PROD
          ? "Production build · 측정 가능"
          : "개발 모드 · 결과 비교 금지. npm run build 후 npm run preview를 사용하세요."}
      </div>
      <div className="controls">
        <label>
          카드 수
          <select
            value={count}
            disabled={running}
            onChange={(e) => setCount(Number(e.target.value))}
          >
            {counts.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>
        <button className="control" onClick={handleRun} disabled={running}>
          측정 시작
        </button>
        <button
          className="control"
          onClick={handleExport}
          disabled={running || !result.startsWith("{")}
        >
          JSON 내보내기
        </button>
      </div>
      <details open>
        <summary aria-live="polite">
          {running ? "측정 중" : "측정 결과"}
        </summary>
        <pre className="source">{result}</pre>
      </details>
      <div ref={container} className="bench-grid" />
    </main>
  );
};
