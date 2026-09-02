# Portfolio

Next.js(App Router) · React · Node.js 기반 개인 포트폴리오 사이트.
`C:\workspace\osca` 프로젝트와 동일한 구조 규칙을 따릅니다.

## 실행

```bash
npm install
npm run dev          # http://localhost:3333
```

```bash
npm run build && npm run start    # 운영 빌드
pm2 start ecosystem.config.cjs    # pm2 기동 (3333 포트)
```

## 폴더 구조

```
app/                      화면 (라우트)
  layout.js               전체 레이아웃 (테마 스크립트 · 폰트 · 헤더/푸터)
  page.js                 홈
  about/page.js           소개
  projects/page.js        프로젝트 목록 (?category= 필터)
  projects/[slug]/page.js 프로젝트 상세
  contact/                연락 (page.js + actions.js + components/)
  api/health/route.js     헬스 체크 API
common/
  actions.js              공통 서버 액션  ('use server')
  data.js                 공통 데이터 조회 ('server-only') ← 데이터 소스 교체 지점
  util.js                 공통 유틸
lib/
  db.js                   커넥션 풀 (DATA_SOURCE=db 일 때만 생성)
  seed/                   DB 없이 쓰는 콘텐츠 (profile / projects / skills / experience)
components/               공용 컴포넌트 (layout, ProjectCard, SkillGroup, Timeline …)
contexts/ThemeContext.js  다크·라이트 테마
hooks/useReveal.js        스크롤 등장 애니메이션
styles/                   common · layout · skin · animations
db/schema.sql             DB 연결 시 실행할 스키마 + 초기 데이터
```

화면(`page.js`)은 `common/actions.js` 만 호출합니다.
데이터가 시드 파일에서 오는지 DB 에서 오는지는 `common/data.js` 안에서만 결정됩니다.

## 내용 수정

| 바꿀 것 | 파일 |
| --- | --- |
| 이름 · 소개 · 연락처 · SNS | `lib/seed/profile.js` |
| 프로젝트 | `lib/seed/projects.js` |
| 기술 스택 | `lib/seed/skills.js` |
| 경력 · 학력 | `lib/seed/experience.js` |
| 색상 · 폰트 · 여백 | `styles/common.css` 상단 토큰 |

## DB 연결 (원할 때만)

기본값은 DB 없이 동작합니다. 연결하려면:

1. 스키마 생성

```bash
mysql -u root -p < db/schema.sql
```

2. `.env.local` 수정

```
DATA_SOURCE=db
DB_ADDRESS=127.0.0.1
DB_PORT=3306
DB_ID=portfolio
DB_PASSWORD=****
DB_NAME=portfolio
```

3. 서버 재시작. `GET /api/health` 의 `dataSource` 값으로 확인할 수 있습니다.

DB 조회가 실패하면 시드 데이터로 자동 폴백하므로 화면이 비지 않습니다.
문의 폼은 `DATA_SOURCE=db` 일 때만 `TBL_PORTFOLIO_CONTACT` 에 저장되고,
그 전에는 서버 콘솔에만 기록됩니다.

MySQL 이 아닌 다른 저장소(Oracle, PostgreSQL, 헤드리스 CMS 등)를 쓰고 싶다면
`lib/db.js` 의 드라이버와 `common/data.js` 의 쿼리만 바꾸면 됩니다.
