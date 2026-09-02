/**
 * 본문 컨테이너 레이아웃 컴포넌트
 */
export default function Container({ children }) {
  return (
    <main className="container page-enter">
      {children}
    </main>
  );
}
