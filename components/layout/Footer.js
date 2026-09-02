/**
 * 푸터 레이아웃 컴포넌트
 */
import Link from 'next/link';
import { getProfile } from '@/common/actions';

export default async function Footer() {

  const profile = await getProfile();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <p style={{ fontWeight: 650, letterSpacing: '-0.02em' }}>{profile.NAME_EN}</p>
          <small>&copy; {year} {profile.NAME}. All Rights Reserved.</small>
        </div>

        <ul className="footer__links">
          <li><Link href="/about">소개</Link></li>
          <li><Link href="/projects">프로젝트</Link></li>
          <li><Link href="/contact">연락</Link></li>
          {(profile.SOCIALS ?? []).map((s) => (
            <li key={s.LABEL}>
              <a href={s.URL} target="_blank" rel="noreferrer noopener">{s.LABEL}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );

}
