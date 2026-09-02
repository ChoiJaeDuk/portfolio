/**
 * 헤더 레이아웃 컴포넌트
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ThemeToggle from '@components/ThemeToggle';
import { cx } from '@/common/util';

const NAV = [
  { LABEL: '홈',        HREF: '/' },
  { LABEL: '소개',      HREF: '/about' },
  { LABEL: '프로젝트',  HREF: '/projects' },
  { LABEL: '연락',      HREF: '/contact' },
];

export default function Header({ name = 'Portfolio', initial = 'P' }) {

  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // 스크롤 여부에 따라 헤더 배경 처리
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 페이지 이동 시 모바일 메뉴 닫기
  useEffect(() => { setIsOpen(false); }, [pathname]);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <header className={cx('header', scrolled && 'scrolled')}>
        <div className="header__inner">

          <Link href="/" className="logo">
            <span className="logo__mark">{initial}</span>
            <span>{name}</span>
          </Link>

          <nav className="gnb">
            <ul>
              {NAV.map((item) => (
                <li key={item.HREF}>
                  <Link href={item.HREF} className={cx(isActive(item.HREF) && 'active')}>
                    {item.LABEL}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__util">
            <ThemeToggle />
            <button
              type="button"
              className="icon-btn nav-toggle"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="메뉴 열기"
              aria-expanded={isOpen}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {isOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>

        </div>
      </header>

      {isOpen && (
        <nav className="mobile-nav">
          {NAV.map((item) => (
            <Link key={item.HREF} href={item.HREF} className={cx(isActive(item.HREF) && 'active')}>
              {item.LABEL}
            </Link>
          ))}
        </nav>
      )}
    </>
  );

}
