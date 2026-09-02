/**
 * 프로젝트 상세 화면
 */
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getProject, getProjectList } from '@/common/actions';
import Reveal from '@components/Reveal';

/**
 * 상세 페이지 메타데이터
 */
export async function generateMetadata({ params }) {

  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return { title: '프로젝트를 찾을 수 없습니다' };

  return {
    title: project.TITLE,
    description: project.SUMMARY,
  };

}

export default async function ProjectDetailPage({ params }) {

  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const [c1, c2] = project.ACCENT ?? ['#6366f1', '#22d3ee'];

  // 같은 카테고리의 다른 프로젝트 2건
  const all = await getProjectList();
  const related = all.filter((p) => p.SLUG !== project.SLUG).slice(0, 2);

  return (
    <section className="section">
      <div className="wrap">

        <Link href="/projects" data-skin="btn" data-color="ghost" data-size="s">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          프로젝트 목록
        </Link>

        {/* 헤더 */}
        <div className="pdetail__hero" style={{ '--c1': c1, '--c2': c2, marginTop: 20 }}>
          <p className="mono">{project.CATEGORY}</p>
          <h1 className="display" style={{ margin: '14px 0 12px', fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
            {project.TITLE}
          </h1>
          <p className="lead" style={{ maxWidth: '58ch' }}>{project.SUBTITLE}</p>

          <dl className="pdetail__meta">
            <div>
              <dt>기간</dt>
              <dd>{project.PERIOD}</dd>
            </div>
            <div>
              <dt>역할</dt>
              <dd>{project.ROLE}</dd>
            </div>
            <div>
              <dt>구성</dt>
              <dd>{project.TEAM}</dd>
            </div>
            <div>
              <dt>스택</dt>
              <dd>{(project.STACK ?? []).join(', ')}</dd>
            </div>
          </dl>
        </div>

        {/* 본문 */}
        <div className="pdetail__grid">

          <div>
            <Reveal>
              <p className="mono section__label">Overview</p>
              <p className="lead">{project.SUMMARY}</p>
            </Reveal>

            <Reveal delay={100}>
              <p className="mono section__label" style={{ marginTop: 44 }}>Highlights</p>
              <ul className="bullets">
                {(project.HIGHLIGHTS ?? []).map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </Reveal>

            {(project.LINKS ?? []).length > 0 && (
              <Reveal delay={160}>
                <div className="tags" style={{ marginTop: 32 }}>
                  {project.LINKS.map((link) => (
                    <a
                      key={link.LABEL}
                      href={link.URL}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-skin="btn"
                      data-color="2"
                      data-size="s"
                    >
                      {link.LABEL}
                    </a>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          <aside>
            <Reveal delay={80}>
              <p className="mono section__label">Result</p>
              <div className="metrics" style={{ marginTop: 8 }}>
                {(project.METRICS ?? []).map((metric) => (
                  <div key={metric.LABEL} className="metric">
                    <b>{metric.VALUE}</b>
                    <span>{metric.LABEL}</span>
                  </div>
                ))}
              </div>

              <p className="mono section__label" style={{ marginTop: 40 }}>Stack</p>
              <div className="tags">
                {(project.STACK ?? []).map((s) => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </Reveal>
          </aside>

        </div>

        {/* 다른 프로젝트 */}
        {related.length > 0 && (
          <div style={{ marginTop: 88, paddingTop: 40, borderTop: '1px solid var(--line)' }}>
            <p className="mono section__label">Next</p>
            <div className="projects" style={{ marginTop: 20 }}>
              {related.map((p) => (
                <Link key={p.SLUG} href={`/projects/${p.SLUG}`} className="card">
                  <div className="card__body">
                    <p className="mono">{p.CATEGORY}</p>
                    <h3 style={{ margin: '10px 0 6px', fontSize: '1.1rem', fontWeight: 650 }}>{p.TITLE}</h3>
                    <p className="muted" style={{ fontSize: '0.92rem' }}>{p.SUBTITLE}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );

}
