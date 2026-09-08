# 측정 방법과 해석

`npm run build`는 비교 앱, StyleX 단독 페이지, Tailwind 단독 페이지를 빌드한다. 독립 페이지는 서로의 모듈을 import하지 않는다. Tailwind benchmark 스캔 대상도 study-card 한 파일로 제한한다. 코드 원문·스킬 텍스트는 벤치마크 번들에 없다. 공통 reset을 사용하고 Tailwind Preflight는 제외한다. React Compiler와 StrictMode는 양쪽 모두 사용하지 않는다.

`npm run preview` 후 성능 탭의 링크를 하나씩 열고 같은 개수로 측정한다. 2회 워밍업을 버리고 마운트/업데이트 각각 10개 샘플을 수집한다. 업데이트는 동일 key를 유지하며 selected와 progress를 바꾼다. 마운트 전 이전 tree를 제거한다. 2 rAF가 지난 뒤 다음 작업을 시작한다. 전체 DOM은 생성하지만 화면 밖 카드의 실제 페인팅 양은 브라우저가 결정한다.

- commitMs: flushSync 직전부터 반환까지. React와 DOM 변경 비용을 포함하며 브라우저 layout/paint 전체 비용이 아니다.
- twoFramesMs: 같은 시작점에서 두 번째 requestAnimationFrame까지. 프레임 스케줄링과 refresh rate 영향을 포함한다. 정확한 GPU·paint 시간으로 해석하지 않는다.
- median / p95: 표본 중앙값과 nearest-rank p95. 표본 10개의 p95는 사실상 최댓값이므로 신뢰구간으로 오해하지 않는다.
- hiddenDuringRun: 탭이 숨겨진 경우 valid=false. 개발 모드도 valid=false.
- build-report.json: 각 파일 raw/gzip 크기와 각각 한 번의 build API 경과 시간. 플러그인 로드와 프로세스 시작 전체 시간은 아니다. 따뜻한 프로세스·캐시·순서 영향이 있다.

StyleX → Tailwind → Tailwind → StyleX 순서로 각 여러 번 실행하고 JSON 원본을 보존한다. 브라우저 버전·viewport·DPR·장치·전원·CPU throttling·확장 프로그램 조건을 기록한다. 이 작은 카드 벤치마크로 대규모 서비스 전체 성능, 로딩 속도, 메모리나 LCP의 우열을 결론 내릴 수 없다. 여기서는 네트워크나 heap 측정을 제공하지 않는다.
