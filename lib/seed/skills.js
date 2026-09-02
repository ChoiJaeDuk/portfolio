/**
 * 기술 스택 시드 데이터
 *
 * LEVEL 은 0~100 (막대 그래프 길이)
 */
export const SKILLS = [
  {
    GROUP_NM: 'Frontend',
    GROUP_DESC: '화면을 만들고, 느리지 않게 유지합니다.',
    ITEMS: [
      { NAME: 'React',        LEVEL: 92 },
      { NAME: 'Next.js',      LEVEL: 90 },
      { NAME: 'JavaScript',   LEVEL: 93 },
      { NAME: 'TypeScript',   LEVEL: 78 },
      { NAME: 'CSS / 반응형',  LEVEL: 85 },
      { NAME: 'AG Grid',      LEVEL: 88 },
    ],
  },
  {
    GROUP_NM: 'Backend',
    GROUP_DESC: 'API 와 배치, 그리고 그 사이의 트랜잭션.',
    ITEMS: [
      { NAME: 'Node.js',        LEVEL: 88 },
      { NAME: 'Server Actions', LEVEL: 85 },
      { NAME: 'REST API',       LEVEL: 90 },
      { NAME: 'NextAuth',       LEVEL: 80 },
      { NAME: 'node-cron',      LEVEL: 75 },
    ],
  },
  {
    GROUP_NM: 'Data',
    GROUP_DESC: '쿼리를 튜닝하는 쪽이 대개 더 빠릅니다.',
    ITEMS: [
      { NAME: 'MariaDB / MySQL', LEVEL: 87 },
      { NAME: 'Oracle',          LEVEL: 72 },
      { NAME: 'SQL 튜닝',         LEVEL: 80 },
      { NAME: 'Chart.js',        LEVEL: 82 },
    ],
  },
  {
    GROUP_NM: 'Ops',
    GROUP_DESC: '배포하고 나서가 진짜 시작입니다.',
    ITEMS: [
      { NAME: 'PM2',    LEVEL: 82 },
      { NAME: 'Docker', LEVEL: 70 },
      { NAME: 'Git',    LEVEL: 88 },
      { NAME: 'Linux',  LEVEL: 75 },
    ],
  },
];
