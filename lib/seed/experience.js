/**
 * 경력 / 학력 시드 데이터
 */
export const EXPERIENCES = [
  {
    PERIOD: '2022.03 — 현재',
    COMPANY: '마스터스페이스',
    TITLE: 'Full-Stack Developer',
    DESC: '전력 계통 평가 시스템의 프런트엔드와 서버 사이드를 함께 담당.',
    POINTS: [
      '레거시 SPA 를 Next.js App Router 로 이관, 초기 로딩 3.1s → 0.9s',
      '수만 행 그리드의 가상 스크롤·서버 페이징 설계',
      '야간 배치 스케줄러 도입으로 수동 집계 업무 제거',
    ],
    TAGS: ['Next.js', 'Node.js', 'MariaDB'],
  },
  {
    PERIOD: '2019.01 — 2022.02',
    COMPANY: '스튜디오 라인',
    TITLE: 'Frontend Developer',
    DESC: '커머스·예약 서비스의 화면 전반과 디자인 시스템 구축.',
    POINTS: [
      '공통 컴포넌트 40여 종 정리, 신규 화면 작업 시간 절반으로 단축',
      '접근성 개선(키보드 내비게이션·명도 대비) 전사 가이드 작성',
    ],
    TAGS: ['React', 'CSS', 'Storybook'],
  },
  {
    PERIOD: '2017.03 — 2018.12',
    COMPANY: '프리랜스',
    TITLE: 'Web Developer',
    DESC: '중소 규모 홈페이지 및 관리자 도구 제작.',
    POINTS: [
      '기획부터 배포까지 단독 진행한 프로젝트 15건',
    ],
    TAGS: ['JavaScript', 'PHP', 'MySQL'],
  },
];

export const EDUCATIONS = [
  { PERIOD: '2013 — 2017', NAME: '○○대학교 컴퓨터공학과', DESC: '학사 졸업' },
  { PERIOD: '2021',        NAME: '정보처리기사',            DESC: '한국산업인력공단' },
];
