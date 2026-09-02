/**
 * 데이터베이스 접속
 *
 * 기본값(DATA_SOURCE=seed)에서는 커넥션 풀을 만들지 않는다.
 * .env.local 의 DATA_SOURCE 를 db 로 바꾸는 순간부터 아래 풀이 사용된다.
 */
import 'server-only';

export { default as SQL } from 'sql-template-strings';

/**
 * DB 사용 여부
 * @returns {boolean} DATA_SOURCE=db 이면 true
 */
export function isDbEnabled() {
  return String(process.env.DATA_SOURCE ?? 'seed').toLowerCase() === 'db';
}

/**
 * 싱글턴 커넥션 풀
 *
 * 개발 모드의 HMR 로 모듈이 여러 번 평가되어도
 * 풀이 중복 생성되지 않도록 global 에 보관한다.
 */
async function getPool() {

  if (!isDbEnabled()) {
    throw new Error('DATA_SOURCE 가 db 가 아닙니다. .env.local 을 확인하세요.');
  }

  if (!global.__portfolio_pool__) {

    const { default: mariadb } = await import('mariadb');

    global.__portfolio_pool__ = mariadb.createPool({
      host: process.env.DB_ADDRESS,
      port: Number(process.env.DB_PORT ?? 3306),
      user: process.env.DB_ID,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      connectionLimit: 10,
      acquireTimeout: 10_000,
      idleTimeout: 60_000,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10_000,
    });

  }

  return global.__portfolio_pool__;

}

/**
 * 조회 공통 함수
 *
 * @param {object} sql sql-template-strings 로 만든 쿼리
 * @returns {Promise<Array>} 조회 결과
 */
export async function query(sql) {
  const pool = await getPool();
  return pool.query(sql);
}

/**
 * 등록/수정/삭제 공통 함수
 *
 * @param {object} sql sql-template-strings 로 만든 쿼리
 * @returns {Promise<object>} 실행 결과
 */
export async function execute(sql) {
  const pool = await getPool();
  return pool.query(sql);
}
