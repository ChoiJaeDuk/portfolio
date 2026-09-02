/**
 * 프로필 시드 데이터
 *
 * ※ 이 파일의 값만 바꾸면 사이트 전체 문구가 바뀝니다.
 */
export const PROFILE = {
  NAME: '홍길동',
  NAME_EN: 'Gildong Hong',
  ROLE: 'Full-Stack Developer',
  HEADLINE: '데이터가 많은 화면을\n빠르고 단정하게 만듭니다.',
  SUMMARY:
    '전력·제조 도메인의 대용량 데이터를 다루는 웹 시스템을 만들어 왔습니다. ' +
    'Next.js 와 Node.js 로 서버·클라이언트 경계를 정리하고, ' +
    '수만 행의 그리드와 실시간 차트가 끊기지 않는 화면을 설계합니다.',
  LOCATION: '경기 성남, 대한민국',
  EMAIL: 'hello@example.com',
  PHONE: '010-0000-0000',
  AVAILABLE: true,
  AVAILABLE_TEXT: '신규 프로젝트 문의 가능',
  RESUME_URL: '/resume.pdf',
  SOCIALS: [
    { LABEL: 'GitHub',   URL: 'https://github.com/',   HANDLE: '@gildong' },
    { LABEL: 'LinkedIn', URL: 'https://linkedin.com/', HANDLE: '/in/gildong' },
    { LABEL: 'Blog',     URL: 'https://example.com/',  HANDLE: 'example.com' },
  ],
  STATS: [
    { LABEL: '실무 경력',      VALUE: '8',  UNIT: '년' },
    { LABEL: '운영 중 서비스', VALUE: '12', UNIT: '개' },
    { LABEL: '누적 커밋',      VALUE: '9k', UNIT: '+' },
  ],
};
