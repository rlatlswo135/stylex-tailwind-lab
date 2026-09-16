import { useEffect, useState } from "react";
import { StudyCard as StylexCard } from "./stylex/study-card";
import { StudyCard as TailwindCard } from "./tailwind/study-card";
import { QuotaCard as StylexQuota } from "./stylex/quota-card";
import { QuotaCard as TailwindQuota } from "./tailwind/quota-card";
import sxSource from "./stylex/study-card.tsx?raw";
import twSource from "./tailwind/study-card.tsx?raw";
import sxQuota from "./stylex/quota-card.tsx?raw";
import twQuota from "./tailwind/quota-card.tsx?raw";
import sxTokens from "./stylex/tokens.stylex.ts?raw";
import twTokens from "./tailwind.css?raw";
import sxSkill from "../.agents/skills/create-stylex-component/SKILL.md?raw";
import twSkill from "../.agents/skills/create-tailwind-component/SKILL.md?raw";
import protocol from "../docs/agent-experiment.md?raw";
import type { ReactNode } from "react";

const tabs = [
  { id: "intro", label: "01 서론" },
  { id: "syntax", label: "02 같은 화면" },
  { id: "tradeoffs", label: "03 장점과 비용" },
  { id: "performance", label: "04 성능 실험" },
  { id: "agents", label: "05 에이전트 & 스킬" },
];
const readTab = () =>
  tabs.some((t) => t.id === location.hash.slice(1))
    ? location.hash.slice(1)
    : "intro";
const rows = [
  [
    "공통점",
    "빌드 시 정적 CSS 추출, 클래스 재사용",
    "빌드 시 정적 CSS 생성, 유틸리티 재사용",
  ],
  ["작성 위치", "TS 객체 + stylex.props", "JSX className + CSS @theme"],
  [
    "상태 / 합성",
    "props 인자 순서로 속성 우선순위 결정",
    "완성된 클래스 맵으로 배타적 변형 선택",
  ],
  [
    "런타임 값",
    "동적 스타일 함수 → CSS 변수",
    "정적 arbitrary utility + CSS 변수",
  ],
  [
    "타입과 오류",
    "스타일 API 타입 + 빌드 추출 제약",
    "props 타입은 가능, 클래스 오타는 tsc로 검출 불가",
  ],
  [
    "작성 비용",
    "스타일 이름과 선언이 늘어남",
    "상태가 많으면 className이 길어짐",
  ],
];
const Code = ({ source }: { source: string }) => (
  <pre className="source">
    <code>{source}</code>
  </pre>
);
const Panel = ({
  name,
  children,
  source,
}: {
  name: string;
  children: ReactNode;
  source: string;
}) => (
  <div className="panel">
    <div className="panel-head">
      <strong>{name}</strong>
      <span className="badge">동일 DOM · 동일 데이터</span>
    </div>
    <div className="stage">{children}</div>
    <details open>
      <summary>실제 컴포넌트 원문</summary>
      <Code source={source} />
    </details>
  </div>
);
const Sources = () => (
  <div className="links">
    <a
      href="https://stylexjs.com/docs/learn/styling-ui/defining-styles/"
      target="_blank"
      rel="noreferrer"
    >
      StyleX 선언과 제약 ↗
    </a>
    <a
      href="https://stylexjs.com/docs/learn/styling-ui/using-styles/"
      target="_blank"
      rel="noreferrer"
    >
      StyleX 합성 ↗
    </a>
    <a
      href="https://tailwindcss.com/docs/detecting-classes-in-source-files"
      target="_blank"
      rel="noreferrer"
    >
      Tailwind 소스 탐지 ↗
    </a>
    <a
      href="https://tailwindcss.com/docs/theme"
      target="_blank"
      rel="noreferrer"
    >
      Tailwind 토큰 ↗
    </a>
  </div>
);

export const App = () => {
  const [tab, setTab] = useState(readTab);
  const [selected, setSelected] = useState(false);
  const [compact, setCompact] = useState(false);
  const [progress, setProgress] = useState(64);
  const [scenario, setScenario] = useState("responsive");
  const [report, setReport] = useState<string>(
    "빌드 보고서는 npm run build 후 npm run preview에서 확인합니다.",
  );
  useEffect(() => {
    const handleHashChange = () => setTab(readTab());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  useEffect(() => {
    if (tab !== "performance") return;
    let cancelled = false;
    fetch("/build-report.json")
      .then((r) => {
        if (!r.ok) throw Error();
        return r.json();
      })
      .then((v) => {
        if (!cancelled) setReport(JSON.stringify(v, null, 2));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [tab]);
  const handleSelectedChange = () => setSelected(!selected);
  const handleCompactChange = () => setCompact(!compact);
  return (
    <div className="shell">
      <header className="masthead">
        <a className="brand" href="#intro">
          STYLE / LAB
        </a>
        <span className="edition">ENGINEERING FIELD NOTES — 2026.09</span>
        <span className="badge">INTERACTIVE COMPARISON</span>
      </header>
      <div className="hero">
        <div className="kicker">ONE VIEW. TWO WAYS TO STYLE.</div>
        <h1>StyleX × Tailwind CSS</h1>
        <p className="muted">
          같은 화면을 만드는 두 가지 방법.
          <br />
          작성 경험부터 빌드 결과까지, 추측 대신 코드를 놓고 비교합니다.
        </p>
      </div>
      <nav className="tabs">
        {tabs.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            className={tab === t.id ? "active" : undefined}
          >
            {t.label}
          </a>
        ))}
      </nav>
      <main className="section">
        {tab === "intro" && (
          <>
            <h2>표현은 달라도, CSS는 빌드에서 만들어집니다.</h2>
            <p className="muted">
              두 도구 모두 정적인 스타일은 미리 CSS로 생성합니다. StyleX에는
              스타일 합성과 동적 값을 연결하는 JS가 남을 수 있고, Tailwind도
              React의 조건 분기와 CSS 변수 갱신에는 JS를 사용합니다.
            </p>
            <div className="facts">
              <div className="fact">
                <strong>StyleX 0.19.0</strong>객체 선언 · 명시적 합성
              </div>
              <div className="fact">
                <strong>Tailwind 4.3.3</strong>유틸리티 · CSS 기반 토큰
              </div>
              <div className="fact">
                <strong>TypeScript 7.0.2</strong>동일한 React 19.2.8 환경
              </div>
            </div>
            <div className="panel">
              <table>
                <thead>
                  <tr>
                    <th>관찰할 것</th>
                    <th>StyleX</th>
                    <th>Tailwind CSS</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r[0]}>
                      {r.map((c, i) => (
                        <td key={i}>{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="note">
              읽는 순서: 기본 코드를 비교하고 → 상태와 입력값을 바꾸고 → 독립
              production 빌드를 측정하고 → 스킬 지시사항이 코드에 어떻게
              반영되는지 확인하세요.
            </div>
            <Sources />
          </>
        )}
        {(tab === "syntax" || tab === "tradeoffs" || tab === "agents") && (
          <>
            <div className="section-title">
              <h2>
                {tab === "syntax"
                  ? "동일한 카드, 서로 다른 소스"
                  : tab === "agents"
                    ? "같은 요청에 전용 스킬 적용하기"
                    : "장점과 비용을 함께 관찰하기"}
              </h2>
              <span className="badge">LIVE PREVIEW</span>
            </div>
            {tab === "tradeoffs" && (
              <>
                <div className="controls">
                  {[
                    ["responsive", "반응형 · hover"],
                    ["composition", "상태 · 합성"],
                    ["dynamic", "런타임 값"],
                  ].map(([id, label]) => (
                    <button
                      className={`control${scenario === id ? " active" : ""}`}
                      key={id}
                      onClick={() => setScenario(id)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="note">
                  {scenario === "responsive"
                    ? "뷰포트를 640px 아래로 줄이고 버튼에 마우스를 올리세요. Tailwind는 variant를 JSX에 바로 작성합니다. StyleX는 CSS 속성별 조건을 명시하므로 선언이 길어지는 대신 한 속성의 모든 상태를 모아 읽을 수 있습니다."
                    : scenario === "composition"
                      ? "선택 상태와 좁은 간격을 함께 적용해 보세요. StyleX는 뒤에 오는 스타일이 우선합니다. Tailwind는 p-6 p-3의 문자열 순서에 기대지 않고, spacing 맵에서 한 변형만 선택합니다. 이 배타적 맵이 추가 작성 비용입니다."
                      : "진행률을 바꾸세요. 양쪽 모두 CSS 변수를 갱신합니다. Tailwind의 w-${progress} 같은 보간은 추출되지 않습니다. StyleX도 create 내부의 임의 함수 호출은 허용되지 않으므로 동적 스타일 함수가 필요합니다."}
                </div>
              </>
            )}
            {tab !== "syntax" && (
              <div className="controls">
                <label>
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={handleSelectedChange}
                  />
                  선택 상태
                </label>
                {tab !== "agents" && (
                  <label>
                    <input
                      type="checkbox"
                      checked={compact}
                      onChange={handleCompactChange}
                    />
                    좁은 간격
                  </label>
                )}
                <label>
                  진행률 {progress}%
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                  />
                </label>
              </div>
            )}
            <div className="pair">
              {tab === "agents" ? (
                <>
                  <Panel name="StyleX / skill output" source={sxQuota}>
                    <StylexQuota selected={selected} progress={progress} />
                  </Panel>
                  <Panel name="Tailwind / skill output" source={twQuota}>
                    <TailwindQuota selected={selected} progress={progress} />
                  </Panel>
                </>
              ) : (
                <>
                  <Panel name="StyleX" source={sxSource}>
                    <StylexCard
                      selected={tab === "syntax" ? false : selected}
                      compact={tab === "syntax" ? false : compact}
                      progress={tab === "syntax" ? 64 : progress}
                    />
                  </Panel>
                  <Panel name="Tailwind CSS" source={twSource}>
                    <TailwindCard
                      selected={tab === "syntax" ? false : selected}
                      compact={tab === "syntax" ? false : compact}
                      progress={tab === "syntax" ? 64 : progress}
                    />
                  </Panel>
                </>
              )}
            </div>
            {tab === "tradeoffs" && (
              <div className="pair">
                <div className="note">
                  <strong>StyleX의 비용: 추출 가능한 코드만</strong>
                  <Code
                    source={
                      "// 실패 패턴 (실행하지 않는 설명용)\nstylex.create({ card: { ...sharedObject } })\n// 해결: stylex.props(base, override)\n// 토큰: *.stylex.ts + defineVars"
                    }
                  />
                </div>
                <div className="note">
                  <strong>Tailwind의 비용: 문자열은 타입이 아니다</strong>
                  <Code
                    source={
                      "// 실패 패턴 (실행하지 않는 설명용)\nclassName={`bg-${color}-500`}\n// 해결: 완성된 클래스 맵\n// 연속 값: w-[var(--progress)] + style"
                    }
                  />
                </div>
              </div>
            )}
            {tab === "agents" && (
              <>
                <div className="note">
                  실제 스킬을 읽고 생성한 같은 세션의 시연입니다. 어느
                  라이브러리를 모델이 더 잘 아는지에 대한 통계적 결과는
                  아닙니다. 토큰 수·독립 세션 성공률·RAG 효과는 아직 측정하지
                  않았습니다.
                </div>
                <div className="pair">
                  <details className="panel" open>
                    <summary>StyleX 스킬 전체</summary>
                    <Code source={sxSkill} />
                  </details>
                  <details className="panel" open>
                    <summary>Tailwind 스킬 전체</summary>
                    <Code source={twSkill} />
                  </details>
                  <details className="panel">
                    <summary>StyleX 토큰</summary>
                    <Code source={sxTokens} />
                  </details>
                  <details className="panel">
                    <summary>Tailwind 토큰 및 CSS 진입점</summary>
                    <Code source={twTokens} />
                  </details>
                </div>
                <details className="panel">
                  <summary>동일 프롬프트와 재현 가능한 평가 절차</summary>
                  <Code source={protocol} />
                </details>
              </>
            )}
            <Sources />
          </>
        )}
        {tab === "performance" && (
          <>
            <h2>같은 부하를, 독립된 빌드에서</h2>
            <p className="muted">
              각 엔트리는 자신의 카드 구현만 가져옵니다. 아래 링크를 하나씩 열어
              같은 카드 수로 측정하세요. 개발 서버 결과는 비교용으로 사용하지
              않습니다.
            </p>
            <div className="controls">
              <a
                className="control"
                href={
                  import.meta.env.DEV
                    ? "/bench-stylex.html"
                    : "/bench/stylex/bench-stylex.html"
                }
              >
                StyleX 실험 열기 ↗
              </a>
              <a
                className="control"
                href={
                  import.meta.env.DEV
                    ? "/bench-tailwind.html"
                    : "/bench/tailwind/bench-tailwind.html"
                }
              >
                Tailwind 실험 열기 ↗
              </a>
            </div>
            <div className="note">
              2회 워밍업 + 10회 마운트/업데이트. React 동기 commit 시간과 2 rAF
              경과 시간을 별도로 기록합니다. 2 rAF는 정확한 paint 시간이
              아닙니다. 동일 브라우저·화면 크기·전원 상태에서 다른 탭을 닫고
              실행 순서를 교차하세요. JS/CSS 크기는 공통 React·측정 UI를 포함한
              이 페이지 전체의 값입니다.
            </div>
            <details open className="panel">
              <summary>실제 빌드 시간과 raw / gzip 크기 (JSON)</summary>
              <Code source={report} />
            </details>
            <p className="muted">
              빌드 시간은 각 1회 관찰값입니다. OS 캐시와 실행 순서의 영향을
              받으므로 속도 순위로 해석하지 마세요. 자세한 조건은
              docs/benchmark.md를 확인하세요.
            </p>
          </>
        )}
      </main>
      <footer>
        LOCAL RESEARCH LAB · 공식 문서와 npm latest 확인: 2026-09-08 · 소스
        원문은 파일에서 직접 불러옵니다.
      </footer>
    </div>
  );
};
