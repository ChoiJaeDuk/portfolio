/**
 * 프로젝트 시드 데이터
 *
 * SLUG      : 상세 페이지 URL (/projects/[slug])
 * FEATURED  : 홈 화면 노출 여부
 * ACCENT    : 카드 썸네일 그라디언트 (CSS 색상 2개)
 */
export const PROJECTS = [
  {
    ID: 1,
    SLUG: 'grid-analytics-console',
    TITLE: '전력 계통 평가 콘솔',
    SUBTITLE: '실시간 제약량 모니터링 대시보드',
    CATEGORY: 'Web Application',
    PERIOD: '2024.03 — 2025.06',
    ROLE: 'Frontend Lead · Server Side',
    TEAM: '6인 (개발 4 / 기획 1 / 디자인 1)',
    SUMMARY:
      '15분 단위로 갱신되는 계통 데이터를 한 화면에서 비교·분석하는 운영자용 콘솔. ' +
      '그리드 4만 행과 차트 12종이 동시에 떠 있어도 프레임이 떨어지지 않도록 렌더링 경로를 다시 설계했습니다.',
    HIGHLIGHTS: [
      '서버 컴포넌트로 초기 데이터 선반영, LCP 2.4s → 0.8s',
      '컬럼 가상화 + 서버 페이징으로 4만 행 스크롤 유지',
      '스케줄러가 야간에 집계 테이블을 미리 만들어 조회 쿼리 90% 단축',
    ],
    STACK: ['Next.js', 'React', 'Node.js', 'MariaDB', 'Chart.js'],
    METRICS: [
      { LABEL: '조회 응답', VALUE: '-72%' },
      { LABEL: '동시 접속', VALUE: '180' },
      { LABEL: '운영 기간', VALUE: '15개월' },
    ],
    LINKS: [
      { LABEL: '사례 소개', URL: '#' },
    ],
    ACCENT: ['#6366f1', '#22d3ee'],
    FEATURED: true,
    SORT_NO: 1,
  },
  {
    ID: 2,
    SLUG: 'commerce-design-system',
    TITLE: '커머스 디자인 시스템',
    SUBTITLE: '40여 종 공통 컴포넌트 라이브러리',
    CATEGORY: 'Design System',
    PERIOD: '2021.05 — 2022.02',
    ROLE: 'Frontend Developer',
    TEAM: '4인',
    SUMMARY:
      '서로 다른 세 개의 서비스가 같은 버튼을 세 번 만들고 있었습니다. ' +
      '토큰 → 프리미티브 → 패턴 3계층으로 정리하고, 문서와 함께 배포해 신규 화면 작업 시간을 절반으로 줄였습니다.',
    HIGHLIGHTS: [
      'CSS 변수 기반 테마 토큰, 다크 모드 무상 지원',
      '접근성 체크리스트를 CI 에 포함해 회귀 방지',
      '컴포넌트 문서 자동 생성으로 온보딩 시간 단축',
    ],
    STACK: ['React', 'Storybook', 'CSS', 'Rollup'],
    METRICS: [
      { LABEL: '컴포넌트', VALUE: '43종' },
      { LABEL: '작업 시간', VALUE: '-48%' },
      { LABEL: '사용 서비스', VALUE: '3개' },
    ],
    LINKS: [
      { LABEL: 'Storybook', URL: '#' },
    ],
    ACCENT: ['#f472b6', '#f59e0b'],
    FEATURED: true,
    SORT_NO: 2,
  },
  {
    ID: 3,
    SLUG: 'batch-scheduler',
    TITLE: '수집 · 배치 스케줄러',
    SUBTITLE: '외부 연계 데이터 자동 수집 파이프라인',
    CATEGORY: 'Backend',
    PERIOD: '2023.09 — 2024.02',
    ROLE: 'Backend Developer',
    TEAM: '2인',
    SUMMARY:
      '매일 아침 담당자가 손으로 받던 파일을 자동으로 수집·검증·적재합니다. ' +
      '실패한 작업은 재시도 정책에 따라 복구하고, 복구되지 않으면 알림을 보냅니다.',
    HIGHLIGHTS: [
      'node-cron 기반 잡 레지스트리, 잡 추가는 파일 하나로',
      '멱등 적재로 중복 실행에도 데이터 무결성 유지',
      '실패 알림과 재처리 화면을 함께 제공',
    ],
    STACK: ['Node.js', 'node-cron', 'SFTP', 'MariaDB'],
    METRICS: [
      { LABEL: '수동 업무', VALUE: '0건' },
      { LABEL: '일 처리량', VALUE: '2.4M행' },
      { LABEL: '성공률', VALUE: '99.8%' },
    ],
    LINKS: [],
    ACCENT: ['#22c55e', '#0ea5e9'],
    FEATURED: true,
    SORT_NO: 3,
  },
  {
    ID: 4,
    SLUG: 'booking-renewal',
    TITLE: '예약 서비스 리뉴얼',
    SUBTITLE: '모바일 우선 예약 플로우 재설계',
    CATEGORY: 'Web Application',
    PERIOD: '2020.06 — 2021.03',
    ROLE: 'Frontend Developer',
    TEAM: '5인',
    SUMMARY:
      '4단계였던 예약 과정을 2단계로 줄이고, 이탈이 가장 많던 결제 직전 화면을 다시 설계했습니다.',
    HIGHLIGHTS: [
      '단계별 이탈률 계측 후 폼 필드 절반 제거',
      '낙관적 UI 로 체감 대기 시간 감소',
    ],
    STACK: ['React', 'Redux', 'Node.js'],
    METRICS: [
      { LABEL: '예약 전환', VALUE: '+31%' },
      { LABEL: '이탈률', VALUE: '-19%' },
    ],
    LINKS: [],
    ACCENT: ['#a855f7', '#6366f1'],
    FEATURED: false,
    SORT_NO: 4,
  },
  {
    ID: 5,
    SLUG: 'internal-toolkit',
    TITLE: '사내 운영 도구 모음',
    SUBTITLE: '반복 업무를 없애는 작은 도구들',
    CATEGORY: 'Tooling',
    PERIOD: '2022.03 — 현재',
    ROLE: 'Maintainer',
    TEAM: '개인',
    SUMMARY:
      '엑셀 변환기, 쿼리 스니펫 관리, 배포 체크리스트 등 팀이 매주 쓰는 도구를 한곳에 모았습니다.',
    HIGHLIGHTS: [
      '요청 접수 후 평균 2일 내 배포하는 짧은 사이클',
      '사용 로그를 보고 안 쓰는 기능은 과감히 제거',
    ],
    STACK: ['Next.js', 'Node.js', 'SQLite'],
    METRICS: [
      { LABEL: '월 사용자', VALUE: '60명' },
      { LABEL: '도구', VALUE: '9개' },
    ],
    LINKS: [],
    ACCENT: ['#f43f5e', '#f97316'],
    FEATURED: false,
    SORT_NO: 5,
  },
  {
    ID: 6,
    SLUG: 'portfolio-site',
    TITLE: '이 포트폴리오 사이트',
    SUBTITLE: 'DB 없이 시작해 DB 로 확장되는 구조',
    CATEGORY: 'Web Site',
    PERIOD: '2026',
    ROLE: '기획 · 디자인 · 개발',
    TEAM: '개인',
    SUMMARY:
      '지금 보고 계신 사이트입니다. 콘텐츠는 시드 파일에서 읽지만, ' +
      '환경 변수 하나만 바꾸면 같은 코드가 MariaDB 에서 읽도록 설계했습니다.',
    HIGHLIGHTS: [
      'data / actions 계층 분리로 데이터 소스 교체 지점을 한곳으로',
      '서버 컴포넌트 기본, 상호작용이 필요한 곳만 클라이언트',
      'CSS 변수 기반 라이트·다크 테마',
    ],
    STACK: ['Next.js', 'React', 'Node.js', 'CSS'],
    METRICS: [
      { LABEL: '외부 UI 라이브러리', VALUE: '0개' },
      { LABEL: '테마', VALUE: '2종' },
    ],
    LINKS: [],
    ACCENT: ['#14b8a6', '#8b5cf6'],
    FEATURED: false,
    SORT_NO: 6,
  },
];
