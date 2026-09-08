---
name: create-stylex-component
description: 이 실험실의 StyleX React 컴포넌트를 동일 디자인 계약에 맞춰 생성하거나 수정할 때 사용한다.
---

공통 요구는 docs/agent-experiment.md의 고정 프롬프트를 따른다. 대상은 src/stylex/이다.

- 모듈 최상위 stylex.create로 정적으로 추출 가능한 선언을 만든다. 일반 객체 spread나 임의 함수 호출을 스타일 정의에 넣지 않는다.
- 공유 토큰은 *.stylex.ts의 defineVars로 정의한다. 다른 일반 JS 모듈의 토큰 객체를 직접 가져와 쓰지 않는다.
- 상태 합성은 stylex.props(base, variant, override)로 처리한다. 뒤 인자의 속성이 우선한다.
- 연속적인 런타임 값은 객체 리터럴을 반환하는 동적 스타일 함수로 전달한다.
- hover와 미디어 조건은 해당 CSS 속성 아래에 default와 함께 둔다.
- named export, arrow component, CardProps와 동일 DOM 계약을 유지한다.
- npm run typecheck와 npm run build로 추출까지 확인한다. 타입 검사만으로 컴파일 제약 준수를 단정하지 않는다.

불확실한 API는 https://stylexjs.com/docs/learn/styling-ui/defining-styles/ 와 https://stylexjs.com/docs/learn/styling-ui/using-styles/ 에서 확인하고 조회 URL과 수정 사항을 기록한다.
