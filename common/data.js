/**
 * 공통 데이터 조회
 *
 * ─────────────────────────────────────────────────────────────
 * 이 파일이 "데이터 소스 교체 지점" 입니다.
 *
 *  - DATA_SOURCE=seed (기본) : lib/seed/*.js 의 로컬 데이터를 반환
 *  - DATA_SOURCE=db          : 아래 SQL 을 MariaDB 에서 실행
 *
 * 화면(page.js)과 서버 액션(actions.js)은 어느 쪽인지 알 필요가 없습니다.
 * DB 조회가 실패하면 시드 데이터로 폴백하므로 화면이 비지 않습니다.
 * ─────────────────────────────────────────────────────────────
 */
import 'server-only';

import { SQL, isDbEnabled, query, execute } from '@/lib/db';
import { parseJson } from '@/common/util';

import { PROFILE } from '@/lib/seed/profile';
import { PROJECTS } from '@/lib/seed/projects';
import { SKILLS } from '@/lib/seed/skills';
import { EXPERIENCES, EDUCATIONS } from '@/lib/seed/experience';

/**
 * 프로필 조회
 *
 * @returns {Promise<object>}
 */
export async function selectProfile() {

  if (!isDbEnabled()) return PROFILE;

  try {
    const sql = SQL`
      SELECT *
      FROM TBL_PORTFOLIO_PROFILE
      WHERE PROFILE_ID = 1
    `;
    const rows = await query(sql);
    const row = rows?.[0];

    if (!row) return PROFILE;

    return {
      ...row,
      SOCIALS: parseJson(row.SOCIALS),
      STATS: parseJson(row.STATS),
      AVAILABLE: Boolean(row.AVAILABLE),
    };
  } catch (error) {
    console.error('Failed to fetch selectProfile :', error);
    return PROFILE;
  }

}

/**
 * DB 프로젝트 행을 화면에서 쓰는 형태로 변환
 *
 * @param {object} row
 * @returns {object}
 */
function toProject(row) {
  return {
    ...row,
    HIGHLIGHTS: parseJson(row.HIGHLIGHTS),
    STACK: parseJson(row.STACK),
    METRICS: parseJson(row.METRICS),
    LINKS: parseJson(row.LINKS),
    ACCENT: parseJson(row.ACCENT, ['#6366f1', '#22d3ee']),
    FEATURED: Boolean(row.FEATURED),
  };
}

/**
 * 프로젝트 목록 조회
 *
 * @param {object} params
 * @param {string} [params.category] 카테고리 필터 ('all' 이면 전체)
 * @param {boolean} [params.featuredOnly] 대표 프로젝트만
 * @returns {Promise<Array>}
 */
export async function selectProjectList(params = {}) {

  const { category = 'all', featuredOnly = false } = params;

  const filterSeed = () =>
    PROJECTS
      .filter((p) => (featuredOnly ? p.FEATURED : true))
      .filter((p) => (category === 'all' ? true : p.CATEGORY === category))
      .sort((a, b) => a.SORT_NO - b.SORT_NO);

  if (!isDbEnabled()) return filterSeed();

  try {
    const sql = SQL`
      SELECT *
      FROM TBL_PORTFOLIO_PROJECT
      WHERE USE_YN = 'Y'
    `;

    if (featuredOnly) sql.append(SQL` AND FEATURED = 1`);
    if (category !== 'all') sql.append(SQL` AND CATEGORY = ${category}`);

    sql.append(SQL` ORDER BY SORT_NO`);

    const rows = await query(sql);
    return rows.map(toProject);
  } catch (error) {
    console.error('Failed to fetch selectProjectList :', error);
    return filterSeed();
  }

}

/**
 * 프로젝트 단건 조회
 *
 * @param {string} slug
 * @returns {Promise<object|null>}
 */
export async function selectProject(slug) {

  const fromSeed = () => PROJECTS.find((p) => p.SLUG === slug) ?? null;

  if (!isDbEnabled()) return fromSeed();

  try {
    const sql = SQL`
      SELECT *
      FROM TBL_PORTFOLIO_PROJECT
      WHERE SLUG = ${slug} AND USE_YN = 'Y'
    `;
    const rows = await query(sql);
    return rows?.[0] ? toProject(rows[0]) : fromSeed();
  } catch (error) {
    console.error('Failed to fetch selectProject :', error);
    return fromSeed();
  }

}

/**
 * 프로젝트 카테고리 목록 조회
 *
 * @returns {Promise<Array<string>>}
 */
export async function selectCategoryList() {
  const list = await selectProjectList();
  return ['all', ...Array.from(new Set(list.map((p) => p.CATEGORY)))];
}

/**
 * 기술 스택 그룹 조회
 *
 * @returns {Promise<Array>}
 */
export async function selectSkillGroupList() {

  if (!isDbEnabled()) return SKILLS;

  try {
    const sql = SQL`
      SELECT
        G.GROUP_ID,
        G.GROUP_NM,
        G.GROUP_DESC,
        S.SKILL_NM AS NAME,
        S.SKILL_LEVEL AS LEVEL
      FROM TBL_PORTFOLIO_SKILL_GROUP G
        LEFT JOIN TBL_PORTFOLIO_SKILL S ON G.GROUP_ID = S.GROUP_ID
      ORDER BY G.SORT_NO, S.SORT_NO
    `;
    const rows = await query(sql);

    const map = new Map();

    for (const row of rows) {
      if (!map.has(row.GROUP_ID)) {
        map.set(row.GROUP_ID, {
          GROUP_NM: row.GROUP_NM,
          GROUP_DESC: row.GROUP_DESC,
          ITEMS: [],
        });
      }
      if (row.NAME) {
        map.get(row.GROUP_ID).ITEMS.push({ NAME: row.NAME, LEVEL: Number(row.LEVEL) });
      }
    }

    const groups = Array.from(map.values());
    return groups.length ? groups : SKILLS;
  } catch (error) {
    console.error('Failed to fetch selectSkillGroupList :', error);
    return SKILLS;
  }

}

/**
 * 경력 목록 조회
 *
 * @returns {Promise<Array>}
 */
export async function selectExperienceList() {

  if (!isDbEnabled()) return EXPERIENCES;

  try {
    const sql = SQL`
      SELECT *
      FROM TBL_PORTFOLIO_EXPERIENCE
      ORDER BY SORT_NO
    `;
    const rows = await query(sql);
    // DESC 는 SQL 예약어라 컬럼명이 DESCRIPTION 이다. 화면 쪽 키에 맞춰준다.
    return rows.map((row) => ({
      ...row,
      DESC: row.DESCRIPTION,
      POINTS: parseJson(row.POINTS),
      TAGS: parseJson(row.TAGS),
    }));
  } catch (error) {
    console.error('Failed to fetch selectExperienceList :', error);
    return EXPERIENCES;
  }

}

/**
 * 학력 / 자격 목록 조회
 *
 * @returns {Promise<Array>}
 */
export async function selectEducationList() {

  if (!isDbEnabled()) return EDUCATIONS;

  try {
    const sql = SQL`
      SELECT *
      FROM TBL_PORTFOLIO_EDUCATION
      ORDER BY SORT_NO
    `;
    const rows = await query(sql);
    return rows.map((row) => ({ ...row, DESC: row.DESCRIPTION }));
  } catch (error) {
    console.error('Failed to fetch selectEducationList :', error);
    return EDUCATIONS;
  }

}

/**
 * 문의 등록
 *
 * DB 를 쓰지 않을 때는 서버 콘솔에만 남긴다.
 *
 * @param {object} params { NAME, EMAIL, SUBJECT, MESSAGE }
 * @returns {Promise<{stored: boolean}>}
 */
export async function insertContactMessage(params) {

  const { NAME, EMAIL, SUBJECT, MESSAGE } = params;

  if (!isDbEnabled()) {
    console.log('[contact] 새 문의(저장 안 함) :', { NAME, EMAIL, SUBJECT });
    return { stored: false };
  }

  const sql = SQL`
    INSERT INTO TBL_PORTFOLIO_CONTACT ( NAME, EMAIL, SUBJECT, MESSAGE )
    VALUES ( ${NAME}, ${EMAIL}, ${SUBJECT}, ${MESSAGE} )
  `;
  await execute(sql);

  return { stored: true };

}
