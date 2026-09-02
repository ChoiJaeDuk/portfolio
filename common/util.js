/**
 * 공통 유틸
 */

/**
 * 조건부 클래스명 조합
 *
 * @param  {...any} args 문자열 또는 falsy 값
 * @returns {string}
 */
export function cx(...args) {
  return args.filter(Boolean).join(' ');
}

/**
 * DB 의 JSON 컬럼(문자열)을 안전하게 파싱한다.
 * 이미 객체/배열이면 그대로 돌려준다.
 *
 * @param {any} value
 * @param {any} fallback 파싱 실패 시 반환값
 * @returns {any}
 */
export function parseJson(value, fallback = []) {
  if (value == null) return fallback;
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

/**
 * 문자열을 지정 길이로 자른다.
 *
 * @param {string} text
 * @param {number} max
 * @returns {string}
 */
export function truncate(text, max = 120) {
  if (!text) return '';
  return text.length > max ? `${text.slice(0, max)}…` : text;
}
