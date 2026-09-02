/**
 * 공통 서버 액션
 *
 * 화면은 이 파일만 호출한다. (데이터가 시드에서 오는지 DB 에서 오는지 몰라도 된다)
 */
'use server';

import * as data from '@/common/data';

/** 프로필 조회 */
export async function getProfile() {
  return await data.selectProfile();
}

/** 프로젝트 목록 조회 */
export async function getProjectList(params) {
  return await data.selectProjectList(params);
}

/** 프로젝트 단건 조회 */
export async function getProject(slug) {
  return await data.selectProject(slug);
}

/** 프로젝트 카테고리 목록 조회 */
export async function getCategoryList() {
  return await data.selectCategoryList();
}

/** 기술 스택 조회 */
export async function getSkillGroupList() {
  return await data.selectSkillGroupList();
}

/** 경력 조회 */
export async function getExperienceList() {
  return await data.selectExperienceList();
}

/** 학력 / 자격 조회 */
export async function getEducationList() {
  return await data.selectEducationList();
}
