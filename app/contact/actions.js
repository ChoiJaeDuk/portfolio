/**
 * 문의 서버 액션
 */
'use server';

import { insertContactMessage } from '@/common/data';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * 문의 등록
 *
 * useActionState 와 함께 쓰이므로 (이전 상태, FormData) 를 받는다.
 *
 * @param {object} prevState
 * @param {FormData} formData
 * @returns {Promise<{ok: boolean, message: string, field?: string}>}
 */
export async function submitContact(prevState, formData) {

  const NAME = String(formData.get('NAME') ?? '').trim();
  const EMAIL = String(formData.get('EMAIL') ?? '').trim();
  const SUBJECT = String(formData.get('SUBJECT') ?? '').trim();
  const MESSAGE = String(formData.get('MESSAGE') ?? '').trim();

  // 봇 방지용 허니팟(사람 눈에는 보이지 않는 입력란)
  if (String(formData.get('COMPANY') ?? '')) {
    return { ok: true, message: '메시지를 보냈습니다.' };
  }

  if (NAME.length < 2) {
    return { ok: false, message: '이름을 2자 이상 입력해 주세요.', field: 'NAME' };
  }

  if (!EMAIL_RE.test(EMAIL)) {
    return { ok: false, message: '이메일 형식을 확인해 주세요.', field: 'EMAIL' };
  }

  if (MESSAGE.length < 10) {
    return { ok: false, message: '내용을 10자 이상 입력해 주세요.', field: 'MESSAGE' };
  }

  try {

    const { stored } = await insertContactMessage({ NAME, EMAIL, SUBJECT, MESSAGE });

    return {
      ok: true,
      message: stored
        ? '메시지가 정상적으로 접수되었습니다. 빠르게 회신드릴게요.'
        : '메시지를 받았습니다. (현재 저장소가 연결되어 있지 않아 서버 로그에만 남습니다)',
    };

  } catch (error) {
    console.error('Failed to submitContact :', error);
    return { ok: false, message: '전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' };
  }

}
