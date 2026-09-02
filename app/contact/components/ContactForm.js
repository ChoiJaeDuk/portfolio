/**
 * 문의 폼
 */
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { submitContact } from '../actions';
import { cx } from '@/common/util';

const INITIAL = { ok: null, message: '' };

/**
 * 전송 버튼 (전송 중 상태를 스스로 안다)
 */
function SubmitButton() {

  const { pending } = useFormStatus();

  return (
    <button type="submit" data-skin="btn" data-size="l" disabled={pending}>
      {pending ? '보내는 중…' : '메시지 보내기'}
      {!pending && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      )}
    </button>
  );

}

export default function ContactForm() {

  const [state, formAction] = useActionState(submitContact, INITIAL);

  return (
    <form action={formAction} className="form">

      <div className="form__row">
        <div className="field">
          <label htmlFor="NAME">이름</label>
          <input id="NAME" name="NAME" type="text" placeholder="홍길동" required />
        </div>
        <div className="field">
          <label htmlFor="EMAIL">이메일</label>
          <input id="EMAIL" name="EMAIL" type="email" placeholder="you@example.com" required />
        </div>
      </div>

      <div className="field">
        <label htmlFor="SUBJECT">제목</label>
        <input id="SUBJECT" name="SUBJECT" type="text" placeholder="프로젝트 문의" />
      </div>

      <div className="field">
        <label htmlFor="MESSAGE">내용</label>
        <textarea id="MESSAGE" name="MESSAGE" placeholder="어떤 일인지 편하게 적어주세요." required />
      </div>

      {/* 허니팟 : 사람에게는 보이지 않는다 */}
      <input
        type="text"
        name="COMPANY"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />

      {state.message && (
        <p className={cx('form__msg', state.ok ? 'ok' : 'err')} role="status">
          {state.message}
        </p>
      )}

      <div>
        <SubmitButton />
      </div>

    </form>
  );

}
