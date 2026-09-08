# 구현 검증 기록 — 2026-09-08

## 실행한 검증

- TypeScript 검사 및 비교 앱·StyleX benchmark·Tailwind benchmark production 빌드 성공.
- 통계 함수 테스트 2개: 중앙값, nearest-rank p95, 빈 배열, 홀수 표본, 입력 보존.
- Chrome 152에서 비교 앱 탭 이동, 소스 표시, 독립 benchmark 링크 확인.
- 기본 카드의 각 DOM 노드에 대해 padding, gap, backgroundColor, color, borderRadius, borderWidth, fontSize, fontWeight, lineHeight, height, width의 computed style 비교: 일치.
- 스킬 산출물인 사용량 카드의 같은 속성 비교: 일치.
- 640px에서 양쪽 padding 24px, 390px에서 16px 확인. 모바일 selected + compact는 padding 12px, gap 8px, 동일 배경색.
- StyleX와 Tailwind 각각 500개 카드로 2회 워밍업 후 mount/update 10회씩 완료. production=true, 결과 JSON 및 내보내기 버튼 활성화 확인. 이 실행은 기능 smoke test이며 자동화·시스템 부하가 포함되어 성능 순위를 제시하지 않는다.
- 개발 서버에서 양쪽 카드의 CSS 추출·적용 확인.

## 확인 과정에서 수정한 차이

1. Tailwind text-xs/text-sm의 기본 행간 때문에 카드가 3px 짧았다. Tailwind 코드에 leading-[1.5]를 명시해 맞췄다.
2. 공통 reset과 안내 UI 스타일은 base layer로 가져와 라이브러리 스타일을 덮지 않게 했다.
3. StyleX의 width < 640px 조건이 변환 과정에서 width <= 639.99px가 되어 Chrome 경계 판정이 달랐다. not all and (min-width: 640px) 조건으로 바꿔 Tailwind 조건과 일치시켰다.
4. hover 가능 장치 조건을 StyleX에도 적용해 Tailwind hover variant와 맞췄다.

## 에이전트/스킬의 실제 수행 범위

- skill-creator로 로컬 스킬 2개를 작성하고, 두 파일을 읽은 다음 동일 프롬프트의 quota-card 산출물을 만들었다.
- StyleX는 defineVars 토큰 모듈, 명시적 props 합성과 동적 함수로 구현했다.
- Tailwind는 @theme 토큰, 완성된 클래스 맵과 CSS 변수 유틸리티로 구현했다.
- 조회한 공식 문서: README의 StyleX 선언/합성, Tailwind 탐지/테마 및 설치 링크.
- 독립 새 세션 반복 실험, 무스킬 대조군, 토큰 계측은 수행하지 않았다. 모델 사전 지식의 우열과 RAG 효과는 미평가다.

전체 브라우저 매트릭스, 스크린샷 픽셀 회귀 테스트, 실제 서비스 Core Web Vitals 측정은 이 검증에 포함하지 않는다.
