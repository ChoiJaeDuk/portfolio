/**
 * 전체 레이아웃
 * ※ layout.js 는 반드시 서버 컴포넌트로 작성
 */

import '/styles/common.css';
import '/styles/layout.css';
import '/styles/skin.css';
import '/styles/animations.css';

import { ThemeProvider } from '@contexts/ThemeContext';
import Header from '@components/layout/Header';
import Container from '@components/layout/Container';
import Footer from '@components/layout/Footer';

import { getProfile } from '@/common/actions';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: '포트폴리오',
    template: '%s · 포트폴리오',
  },
  description: 'Next.js · React · Node.js 로 만든 개인 포트폴리오',
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#0a0b10' },
    { media: '(prefers-color-scheme: light)', color: '#f6f7fb' },
  ],
};

/**
 * 첫 페인트 전에 테마를 적용해 깜빡임(FOUC)을 막는다.
 */
const THEME_SCRIPT = `
(function () {
  try {
    var saved = localStorage.getItem('egic-theme');
    var theme = saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default async function RootLayout({ children }) {

  const profile = await getProfile();

  return (
    <html lang="ko" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>
          <Header name={profile.NAME_EN} initial={(profile.NAME_EN ?? 'P').charAt(0)} />
          <Container>{children}</Container>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );

}
