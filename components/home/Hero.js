/**
 * 홈 히어로 영역
 */
import Link from 'next/link';
import Reveal from '@components/Reveal';

/** 히어로 우측 코드 카드에 표시할 정적 스니펫 */
const CODE_SNIPPET = [
  '<span class="c-cmt">// 데이터 소스는 이 한 곳에서 결정된다</span>',
  '<span class="c-key">export async function</span> <span class="c-fn">selectProjectList</span>() {',
  '',
  '  <span class="c-key">if</span> (!<span class="c-fn">isDbEnabled</span>()) <span class="c-key">return</span> PROJECTS;',
  '',
  '  <span class="c-key">const</span> sql = SQL`',
  '    <span class="c-str">SELECT * FROM TBL_PORTFOLIO_PROJECT</span>',
  '    <span class="c-str">WHERE USE_YN = \'Y\' ORDER BY SORT_NO</span>',
  '  `;',
  '',
  '  <span class="c-key">return</span> (<span class="c-key">await</span> <span class="c-fn">query</span>(sql)).<span class="c-fn">map</span>(toProject);',
  '',
  '}',
].join('\n');

export default function Hero({ profile }) {
  return (
    <section className="hero">
      <div className="wrap hero__grid">

        <div>
          <Reveal>
            {profile.AVAILABLE ? (
              <span className="badge"><i className="dot" />{profile.AVAILABLE_TEXT}</span>
            ) : (
              <span className="badge">{profile.ROLE}</span>
            )}
          </Reveal>

          <Reveal delay={80}>
            <h1 className="display">
              {profile.HEADLINE.split('\n').map((line, i) => (
                <span key={i} style={{ display: 'block' }}>
                  {i === 1 ? <span className="grad-text">{line}</span> : line}
                </span>
              ))}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="lead" style={{ maxWidth: '52ch' }}>{profile.SUMMARY}</p>
          </Reveal>

          <Reveal delay={240}>
            <div className="hero__actions">
              <Link href="/projects" data-skin="btn" data-size="l">
                프로젝트 보기
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link href="/contact" data-skin="btn" data-color="2" data-size="l">연락하기</Link>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="hero__stats">
              {(profile.STATS ?? []).map((s) => (
                <div key={s.LABEL}>
                  <b>{s.VALUE}<span style={{ fontSize: '0.6em', marginLeft: 2 }}>{s.UNIT}</span></b>
                  <span>{s.LABEL}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="code-card">
            <div className="code-card__bar">
              <i /><i /><i />
              <span>common/data.js</span>
            </div>
            <pre dangerouslySetInnerHTML={{ __html: CODE_SNIPPET }} />
          </div>
        </Reveal>

      </div>
    </section>
  );
}
