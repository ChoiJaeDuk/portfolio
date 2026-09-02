/**
 * 404 화면
 */
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap" style={{ textAlign: 'center', paddingTop: 60 }}>
        <p className="mono">404</p>
        <h1 className="display" style={{ margin: '16px 0 18px' }}>
          여기엔 <span className="grad-text">아무것도</span> 없어요
        </h1>
        <p className="lead" style={{ marginBottom: 32 }}>
          주소를 다시 확인해 주세요.
        </p>
        <Link href="/" data-skin="btn" data-size="l">홈으로</Link>
      </div>
    </section>
  );
}
