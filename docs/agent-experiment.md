# 에이전트 비교 프로토콜

## 고정 프롬프트

지정된 create-component 스킬을 읽고 StudyCard와 동일한 색상·radius·텍스트 스타일로 QuotaCard를 구현하라. 제목은 “이번 달 사용량”, 설명은 “프로젝트의 사용량을 한눈에 확인하세요.”, 라벨은 “WORKSPACE / PRO”이다. progress 0~100, selected boolean props를 지원한다. 기본 padding 24px, 640px 미만 16px, gap 16px, radius 16px이다. 진행 막대 높이는 6px이다. 버튼은 “사용량 보기 ↗”이며 hover 색은 #137c66이다. 양쪽 DOM과 콘텐츠는 같아야 한다. 라이브러리 외 스타일 도우미 의존성을 추가하지 않는다.

## 통제된 실험

라이브러리 각각에 대해 (A) 스킬 없이, (B) 지정 스킬 사용, (C) 지정 스킬 + 공식 문서 검색 허용 조건을 새 세션에서 반복한다. 모델·reasoning·프롬프트·파일 컨텍스트·도구 권한을 같게 한다. 실행 순서는 교차하고 조건마다 최소 3회 반복한다. 스킬 본문의 정보량도 교란 요인이다.

각 실행에서 첫 결과를 보존하고 빌드 성공, 시각 일치, 요구 충족, 수정 횟수, 문서 조회 URL/횟수, 실제 제공된 토큰/시간을 기록한다. 얻지 못한 값은 null로 둔다. 검색 없이 실패했다고 사전 학습량이 적다고 결론 내리지 않는다. 문서 조회는 RAG 시스템 구축과 동일하지 않다.

## 현재 저장소의 시연

동일 대화의 에이전트가 두 로컬 스킬을 순차적으로 읽고 quota-card.tsx를 생성한다. 이는 스킬 적용 예제이며 독립 A/B 실험이 아니다. 기본 study-card.tsx는 스킬 작성 이전 구현이다. 이를 무스킬 대조군으로 평가해서는 안 된다. 실제 원문 코드와 스킬 본문을 UI에서 나란히 확인한다.

## 기록 형식

```json
{"library":"stylex","condition":"skill","model":"record actual model","run":1,"buildPassed":null,"visualPassed":null,"fixes":null,"documentUrls":[],"tokens":null,"elapsedMs":null,"notes":"새 세션에서 실제 값 기록"}
```

평가 결론은 이 과제와 모델 설정에 한정한다. 현재 시연만으로 어느 라이브러리를 에이전트가 더 잘 아는지 순위를 매기지 않는다.
