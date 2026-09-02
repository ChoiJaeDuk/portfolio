/**
 * 테마(다크/라이트) 컨텍스트
 *
 * 실제 적용은 <html data-theme="...">, 저장은 localStorage.
 * 첫 페인트 전 깜빡임 방지 스크립트는 app/layout.js 에 있다.
 */
'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} });

export const STORAGE_KEY = 'portfolio-theme';

export function ThemeProvider({ children }) {

  const [theme, setTheme] = useState('dark');

  // 최초 마운트 시 html 에 이미 적용된 값을 읽어온다.
  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(current);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // 프라이빗 모드 등에서 저장 실패해도 동작에는 영향 없음
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );

}

export function useTheme() {
  return useContext(ThemeContext);
}
