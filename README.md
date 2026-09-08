# StyleX × Tailwind CSS Lab

블로그용 인터랙티브 비교 저장소. [프로젝트 목표](PROJECT_GOALS.md)를 먼저 작성하고 구현했다.

## 실행

Node.js 24 LTS 권장. 설치 시 npm latest 안정 버전을 확인하여 package.json과 package-lock.json에 고정했다.

```sh
npm ci
npm run dev
```

개발 화면: http://127.0.0.1:5173

성능 비교는 production에서 실행한다.

```sh
npm run build
npm run preview
```

http://127.0.0.1:4173 → 성능 실험 탭에서 독립 페이지로 이동한다.

## 어디에서 무엇을 비교하나

| 탭 | 실험 | 코드 |
|---|---|---|
| 서론 | 공통점·차이·버전·공식 출처 | src/app.tsx |
| 같은 화면 | 동일 카드 + 파일에서 직접 가져온 원문 | src/{stylex,tailwind}/study-card.tsx |
| 장점과 비용 | responsive/hover, selected/compact 합성, progress 동적 값 | 같은 카드의 상태를 실제로 변경 |
| 성능 실험 | 독립 번들, raw/gzip, mount/update, 원시 JSON | src/benchmark.tsx, scripts/build-bench.mjs |
| 에이전트 & 스킬 | 같은 요청에 전용 스킬 적용 + 토큰 + 생성 소스 | src/{stylex,tailwind}/quota-card.tsx, .agents/skills/ |

추가 라우터·상태관리·클래스 병합 라이브러리는 없다. hash 링크와 React state를 사용한다. 카드 내부 버튼은 hover/focus 비교를 위한 표본이며 업무 기능이나 페이지 이동은 없다.

## 공정성

- 양쪽 DOM·텍스트·값을 맞춘다. Tailwind Preflight를 제외하고 공통 reset을 CSS base layer에 둔다.
- Tailwind font-size 유틸리티의 기본 행간 차이를 명시적으로 맞춘다. breakpoint는 양쪽 모두 640px 미만이다.
- 실제 제약을 설명하는 잘못된 코드는 실행 코드와 분리해서 화면에 표시한다.
- React Compiler와 StrictMode는 양쪽 모두 사용하지 않는다. 컴파일러 최적화 영향을 별도 변수로 추가하지 않았다.
- 비교 앱에는 두 라이브러리와 원문이 모두 들어가므로 해당 앱의 번들 크기를 라이브러리 성능 비교에 사용하지 않는다.
- benchmark는 라이브러리별 독립 엔트리 및 CSS 스캔 범위를 사용한다. 자세한 한계는 [benchmark.md](docs/benchmark.md)에 있다.
- [에이전트 실험](docs/agent-experiment.md)은 실제 스킬 적용 시연과 독립 세션 실험 절차를 구분한다. 현재 시연만으로 모델의 라이브러리 지식이나 RAG 효과 순위를 주장하지 않는다.

## 검증

```sh
npm run typecheck
npm test
npm run build
```

빌드 보고서: `dist/build-report.json`. 런타임 결과는 각 측정 화면의 JSON 내보내기를 이용한다. 생성된 dist와 node_modules는 Git에서 제외한다.

## 공식 자료

- [StyleX 정적 추출 제약과 동적 스타일](https://stylexjs.com/docs/learn/styling-ui/defining-styles/)
- [StyleX 스타일 합성](https://stylexjs.com/docs/learn/styling-ui/using-styles/)
- [StyleX Vite 통합](https://www.npmjs.com/package/@stylexjs/unplugin)
- [Tailwind Vite 통합](https://tailwindcss.com/docs/installation/using-vite)
- [Tailwind 소스 탐지](https://tailwindcss.com/docs/detecting-classes-in-source-files)
- [Tailwind 테마 변수](https://tailwindcss.com/docs/theme)

Git은 로컬에서 초기화했다. 원격 저장소 연결이나 배포는 하지 않았다.
