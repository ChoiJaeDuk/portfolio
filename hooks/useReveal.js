/**
 * 스크롤 등장 애니메이션 훅
 *
 * 요소가 뷰포트에 들어오면 .in 클래스를 붙이고 관찰을 해제한다.
 */
'use client';

import { useEffect, useRef } from 'react';

export function useReveal(options = {}) {

  const ref = useRef(null);

  useEffect(() => {

    const el = ref.current;
    if (!el) return;

    // IntersectionObserver 미지원 환경에서는 즉시 노출
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('in');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px', ...options }
    );

    observer.observe(el);

    // 안전장치 : 어떤 이유로든 관찰이 동작하지 않아도 내용이 가려지지 않도록 한다.
    const fallback = setTimeout(() => el.classList.add('in'), 1500);

    return () => {
      clearTimeout(fallback);
      observer.disconnect();
    };

  }, [options]);

  return ref;

}
