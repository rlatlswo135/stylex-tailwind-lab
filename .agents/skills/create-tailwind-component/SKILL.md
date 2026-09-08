---
name: create-tailwind-component
description: 이 실험실의 Tailwind CSS React 컴포넌트를 동일 디자인 계약에 맞춰 생성하거나 수정할 때 사용한다.
---

공통 요구는 docs/agent-experiment.md의 고정 프롬프트를 따른다. 대상은 src/tailwind/이다.

- 소스 스캐너가 읽을 수 있는 완성된 유틸리티 문자열을 사용한다. bg-${color} 같은 클래스 조각 보간을 하지 않는다.
- 상태는 완성된 클래스 맵으로 선택한다. 충돌 클래스의 문자열 순서로 override를 구현하지 않는다. 추가 병합 의존성 없이 배타적으로 선택한다.
- 반복 디자인 토큰은 CSS @theme에 정의하고 해당 유틸리티를 사용한다. v3의 tailwind.config.js를 기본값으로 만들지 않는다.
- 연속적인 런타임 값은 CSS 변수와 정적인 arbitrary-value 유틸리티로 연결한다. custom property에는 필요한 CSSProperties 타입을 지정한다.
- hover 및 responsive variant는 JSX에서 조합한다. 정확한 px 계약은 기본 spacing과 실제 rem 값을 확인한다.
- named export, arrow component, CardProps와 동일 DOM 계약을 유지한다.
- npm run typecheck와 npm run build 후 실제 computed style을 확인한다. className 오타는 TypeScript가 보장하지 않는다.

불확실한 문법은 https://tailwindcss.com/docs/detecting-classes-in-source-files 와 https://tailwindcss.com/docs/theme 에서 확인하고 조회 URL과 수정 사항을 기록한다.
