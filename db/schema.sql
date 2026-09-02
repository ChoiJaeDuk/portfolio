-- ============================================================================
--  포트폴리오 스키마 (MariaDB / MySQL)
--
--  DB 를 연결하고 싶을 때만 실행하세요.
--    1) mysql -u root -p < db/schema.sql
--    2) .env.local 의 DATA_SOURCE 를 db 로 변경 + DB_* 값 입력
--    3) 서버 재시작
--
--  JSON 컬럼은 시드 파일(lib/seed/*.js)의 배열/객체와 형태가 같습니다.
-- ============================================================================

CREATE DATABASE IF NOT EXISTS portfolio
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE portfolio;

-- ----------------------------------------------------------------------------
-- 프로필 (1행만 사용)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS TBL_PORTFOLIO_PROFILE (
  PROFILE_ID     INT          NOT NULL PRIMARY KEY,
  NAME           VARCHAR(60)  NOT NULL,
  NAME_EN        VARCHAR(60)  NOT NULL,
  ROLE           VARCHAR(80)  NOT NULL,
  HEADLINE       VARCHAR(200) NOT NULL,
  SUMMARY        TEXT         NOT NULL,
  LOCATION       VARCHAR(120)     NULL,
  EMAIL          VARCHAR(120)     NULL,
  PHONE          VARCHAR(40)      NULL,
  AVAILABLE      TINYINT(1)   NOT NULL DEFAULT 1,
  AVAILABLE_TEXT VARCHAR(80)      NULL,
  RESUME_URL     VARCHAR(200)     NULL,
  SOCIALS        JSON             NULL,
  STATS          JSON             NULL,
  UPDT_DT        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 프로젝트
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS TBL_PORTFOLIO_PROJECT (
  PROJECT_ID  INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  SLUG        VARCHAR(80)  NOT NULL UNIQUE,
  TITLE       VARCHAR(120) NOT NULL,
  SUBTITLE    VARCHAR(200)     NULL,
  CATEGORY    VARCHAR(60)      NULL,
  PERIOD      VARCHAR(60)      NULL,
  ROLE        VARCHAR(120)     NULL,
  TEAM        VARCHAR(120)     NULL,
  SUMMARY     TEXT             NULL,
  HIGHLIGHTS  JSON             NULL,
  STACK       JSON             NULL,
  METRICS     JSON             NULL,
  LINKS       JSON             NULL,
  ACCENT      JSON             NULL,
  FEATURED    TINYINT(1)   NOT NULL DEFAULT 0,
  SORT_NO     INT          NOT NULL DEFAULT 0,
  USE_YN      CHAR(1)      NOT NULL DEFAULT 'Y',
  REG_DT      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX IDX_PROJECT_SORT (USE_YN, SORT_NO)
);

-- ----------------------------------------------------------------------------
-- 기술 스택
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS TBL_PORTFOLIO_SKILL_GROUP (
  GROUP_ID   INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  GROUP_NM   VARCHAR(60)  NOT NULL,
  GROUP_DESC VARCHAR(200)     NULL,
  SORT_NO    INT          NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS TBL_PORTFOLIO_SKILL (
  SKILL_ID    INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
  GROUP_ID    INT         NOT NULL,
  SKILL_NM    VARCHAR(60) NOT NULL,
  SKILL_LEVEL INT         NOT NULL DEFAULT 0,
  SORT_NO     INT         NOT NULL DEFAULT 0,
  CONSTRAINT FK_SKILL_GROUP FOREIGN KEY (GROUP_ID)
    REFERENCES TBL_PORTFOLIO_SKILL_GROUP (GROUP_ID) ON DELETE CASCADE
);

-- ----------------------------------------------------------------------------
-- 경력 / 학력
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS TBL_PORTFOLIO_EXPERIENCE (
  EXP_ID  INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  PERIOD  VARCHAR(60)  NOT NULL,
  COMPANY VARCHAR(120) NOT NULL,
  TITLE   VARCHAR(120)     NULL,
  DESCRIPTION TEXT         NULL,
  POINTS  JSON             NULL,
  TAGS    JSON             NULL,
  SORT_NO INT          NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS TBL_PORTFOLIO_EDUCATION (
  EDU_ID  INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  PERIOD  VARCHAR(60)  NOT NULL,
  NAME    VARCHAR(120) NOT NULL,
  DESCRIPTION VARCHAR(200) NULL,
  SORT_NO INT          NOT NULL DEFAULT 0
);

-- ----------------------------------------------------------------------------
-- 문의
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS TBL_PORTFOLIO_CONTACT (
  CONTACT_ID INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  NAME       VARCHAR(60)  NOT NULL,
  EMAIL      VARCHAR(120) NOT NULL,
  SUBJECT    VARCHAR(200)     NULL,
  MESSAGE    TEXT         NOT NULL,
  READ_YN    CHAR(1)      NOT NULL DEFAULT 'N',
  REG_DT     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX IDX_CONTACT_REG (REG_DT)
);

-- ============================================================================
--  초기 데이터 (lib/seed/*.js 와 동일한 내용)
-- ============================================================================

INSERT INTO TBL_PORTFOLIO_PROFILE
  (PROFILE_ID, NAME, NAME_EN, ROLE, HEADLINE, SUMMARY, LOCATION, EMAIL, PHONE,
   AVAILABLE, AVAILABLE_TEXT, RESUME_URL, SOCIALS, STATS)
VALUES
  (1, '홍길동', 'Gildong Hong', 'Full-Stack Developer',
   '데이터가 많은 화면을\n빠르고 단정하게 만듭니다.',
   '전력·제조 도메인의 대용량 데이터를 다루는 웹 시스템을 만들어 왔습니다. Next.js 와 Node.js 로 서버·클라이언트 경계를 정리하고, 수만 행의 그리드와 실시간 차트가 끊기지 않는 화면을 설계합니다.',
   '경기 성남, 대한민국', 'hello@example.com', '010-0000-0000',
   1, '신규 프로젝트 문의 가능', '/resume.pdf',
   '[{"LABEL":"GitHub","URL":"https://github.com/","HANDLE":"@gildong"},{"LABEL":"LinkedIn","URL":"https://linkedin.com/","HANDLE":"/in/gildong"},{"LABEL":"Blog","URL":"https://example.com/","HANDLE":"example.com"}]',
   '[{"LABEL":"실무 경력","VALUE":"8","UNIT":"년"},{"LABEL":"운영 중 서비스","VALUE":"12","UNIT":"개"},{"LABEL":"누적 커밋","VALUE":"9k","UNIT":"+"}]')
ON DUPLICATE KEY UPDATE NAME = VALUES(NAME);

INSERT INTO TBL_PORTFOLIO_PROJECT
  (SLUG, TITLE, SUBTITLE, CATEGORY, PERIOD, ROLE, TEAM, SUMMARY, HIGHLIGHTS, STACK, METRICS, LINKS, ACCENT, FEATURED, SORT_NO)
VALUES
  ('grid-analytics-console', '전력 계통 평가 콘솔', '실시간 제약량 모니터링 대시보드', 'Web Application',
   '2024.03 — 2025.06', 'Frontend Lead · Server Side', '6인 (개발 4 / 기획 1 / 디자인 1)',
   '15분 단위로 갱신되는 계통 데이터를 한 화면에서 비교·분석하는 운영자용 콘솔. 그리드 4만 행과 차트 12종이 동시에 떠 있어도 프레임이 떨어지지 않도록 렌더링 경로를 다시 설계했습니다.',
   '["서버 컴포넌트로 초기 데이터 선반영, LCP 2.4s → 0.8s","컬럼 가상화 + 서버 페이징으로 4만 행 스크롤 유지","스케줄러가 야간에 집계 테이블을 미리 만들어 조회 쿼리 90% 단축"]',
   '["Next.js","React","Node.js","MariaDB","Chart.js"]',
   '[{"LABEL":"조회 응답","VALUE":"-72%"},{"LABEL":"동시 접속","VALUE":"180"},{"LABEL":"운영 기간","VALUE":"15개월"}]',
   '[{"LABEL":"사례 소개","URL":"#"}]', '["#6366f1","#22d3ee"]', 1, 1),

  ('commerce-design-system', '커머스 디자인 시스템', '40여 종 공통 컴포넌트 라이브러리', 'Design System',
   '2021.05 — 2022.02', 'Frontend Developer', '4인',
   '서로 다른 세 개의 서비스가 같은 버튼을 세 번 만들고 있었습니다. 토큰 → 프리미티브 → 패턴 3계층으로 정리하고, 문서와 함께 배포해 신규 화면 작업 시간을 절반으로 줄였습니다.',
   '["CSS 변수 기반 테마 토큰, 다크 모드 무상 지원","접근성 체크리스트를 CI 에 포함해 회귀 방지","컴포넌트 문서 자동 생성으로 온보딩 시간 단축"]',
   '["React","Storybook","CSS","Rollup"]',
   '[{"LABEL":"컴포넌트","VALUE":"43종"},{"LABEL":"작업 시간","VALUE":"-48%"},{"LABEL":"사용 서비스","VALUE":"3개"}]',
   '[{"LABEL":"Storybook","URL":"#"}]', '["#f472b6","#f59e0b"]', 1, 2),

  ('batch-scheduler', '수집 · 배치 스케줄러', '외부 연계 데이터 자동 수집 파이프라인', 'Backend',
   '2023.09 — 2024.02', 'Backend Developer', '2인',
   '매일 아침 담당자가 손으로 받던 파일을 자동으로 수집·검증·적재합니다. 실패한 작업은 재시도 정책에 따라 복구하고, 복구되지 않으면 알림을 보냅니다.',
   '["node-cron 기반 잡 레지스트리, 잡 추가는 파일 하나로","멱등 적재로 중복 실행에도 데이터 무결성 유지","실패 알림과 재처리 화면을 함께 제공"]',
   '["Node.js","node-cron","SFTP","MariaDB"]',
   '[{"LABEL":"수동 업무","VALUE":"0건"},{"LABEL":"일 처리량","VALUE":"2.4M행"},{"LABEL":"성공률","VALUE":"99.8%"}]',
   '[]', '["#22c55e","#0ea5e9"]', 1, 3),

  ('booking-renewal', '예약 서비스 리뉴얼', '모바일 우선 예약 플로우 재설계', 'Web Application',
   '2020.06 — 2021.03', 'Frontend Developer', '5인',
   '4단계였던 예약 과정을 2단계로 줄이고, 이탈이 가장 많던 결제 직전 화면을 다시 설계했습니다.',
   '["단계별 이탈률 계측 후 폼 필드 절반 제거","낙관적 UI 로 체감 대기 시간 감소"]',
   '["React","Redux","Node.js"]',
   '[{"LABEL":"예약 전환","VALUE":"+31%"},{"LABEL":"이탈률","VALUE":"-19%"}]',
   '[]', '["#a855f7","#6366f1"]', 0, 4),

  ('internal-toolkit', '사내 운영 도구 모음', '반복 업무를 없애는 작은 도구들', 'Tooling',
   '2022.03 — 현재', 'Maintainer', '개인',
   '엑셀 변환기, 쿼리 스니펫 관리, 배포 체크리스트 등 팀이 매주 쓰는 도구를 한곳에 모았습니다.',
   '["요청 접수 후 평균 2일 내 배포하는 짧은 사이클","사용 로그를 보고 안 쓰는 기능은 과감히 제거"]',
   '["Next.js","Node.js","SQLite"]',
   '[{"LABEL":"월 사용자","VALUE":"60명"},{"LABEL":"도구","VALUE":"9개"}]',
   '[]', '["#f43f5e","#f97316"]', 0, 5),

  ('portfolio-site', '이 포트폴리오 사이트', 'DB 없이 시작해 DB 로 확장되는 구조', 'Web Site',
   '2026', '기획 · 디자인 · 개발', '개인',
   '지금 보고 계신 사이트입니다. 콘텐츠는 시드 파일에서 읽지만, 환경 변수 하나만 바꾸면 같은 코드가 MariaDB 에서 읽도록 설계했습니다.',
   '["data / actions 계층 분리로 데이터 소스 교체 지점을 한곳으로","서버 컴포넌트 기본, 상호작용이 필요한 곳만 클라이언트","CSS 변수 기반 라이트·다크 테마"]',
   '["Next.js","React","Node.js","CSS"]',
   '[{"LABEL":"외부 UI 라이브러리","VALUE":"0개"},{"LABEL":"테마","VALUE":"2종"}]',
   '[]', '["#14b8a6","#8b5cf6"]', 0, 6)
ON DUPLICATE KEY UPDATE TITLE = VALUES(TITLE);

INSERT INTO TBL_PORTFOLIO_SKILL_GROUP (GROUP_ID, GROUP_NM, GROUP_DESC, SORT_NO) VALUES
  (1, 'Frontend', '화면을 만들고, 느리지 않게 유지합니다.', 1),
  (2, 'Backend',  'API 와 배치, 그리고 그 사이의 트랜잭션.', 2),
  (3, 'Data',     '쿼리를 튜닝하는 쪽이 대개 더 빠릅니다.', 3),
  (4, 'Ops',      '배포하고 나서가 진짜 시작입니다.', 4)
ON DUPLICATE KEY UPDATE GROUP_NM = VALUES(GROUP_NM);

INSERT INTO TBL_PORTFOLIO_SKILL (GROUP_ID, SKILL_NM, SKILL_LEVEL, SORT_NO) VALUES
  (1, 'React', 92, 1), (1, 'Next.js', 90, 2), (1, 'JavaScript', 93, 3),
  (1, 'TypeScript', 78, 4), (1, 'CSS / 반응형', 85, 5), (1, 'AG Grid', 88, 6),
  (2, 'Node.js', 88, 1), (2, 'Server Actions', 85, 2), (2, 'REST API', 90, 3),
  (2, 'NextAuth', 80, 4), (2, 'node-cron', 75, 5),
  (3, 'MariaDB / MySQL', 87, 1), (3, 'Oracle', 72, 2), (3, 'SQL 튜닝', 80, 3), (3, 'Chart.js', 82, 4),
  (4, 'PM2', 82, 1), (4, 'Docker', 70, 2), (4, 'Git', 88, 3), (4, 'Linux', 75, 4);

INSERT INTO TBL_PORTFOLIO_EXPERIENCE (PERIOD, COMPANY, TITLE, DESCRIPTION, POINTS, TAGS, SORT_NO) VALUES
  ('2022.03 — 현재', '마스터스페이스', 'Full-Stack Developer',
   '전력 계통 평가 시스템의 프런트엔드와 서버 사이드를 함께 담당.',
   '["레거시 SPA 를 Next.js App Router 로 이관, 초기 로딩 3.1s → 0.9s","수만 행 그리드의 가상 스크롤·서버 페이징 설계","야간 배치 스케줄러 도입으로 수동 집계 업무 제거"]',
   '["Next.js","Node.js","MariaDB"]', 1),
  ('2019.01 — 2022.02', '스튜디오 라인', 'Frontend Developer',
   '커머스·예약 서비스의 화면 전반과 디자인 시스템 구축.',
   '["공통 컴포넌트 40여 종 정리, 신규 화면 작업 시간 절반으로 단축","접근성 개선(키보드 내비게이션·명도 대비) 전사 가이드 작성"]',
   '["React","CSS","Storybook"]', 2),
  ('2017.03 — 2018.12', '프리랜스', 'Web Developer',
   '중소 규모 홈페이지 및 관리자 도구 제작.',
   '["기획부터 배포까지 단독 진행한 프로젝트 15건"]',
   '["JavaScript","PHP","MySQL"]', 3);

INSERT INTO TBL_PORTFOLIO_EDUCATION (PERIOD, NAME, DESCRIPTION, SORT_NO) VALUES
  ('2013 — 2017', '○○대학교 컴퓨터공학과', '학사 졸업', 1),
  ('2021', '정보처리기사', '한국산업인력공단', 2);
