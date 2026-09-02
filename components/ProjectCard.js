/**
 * 프로젝트 카드
 *
 * @param {object} project common/data.js 의 프로젝트 객체
 */
import Link from 'next/link';

export default function ProjectCard({ project }) {

  const [c1, c2] = project.ACCENT ?? ['#6366f1', '#22d3ee'];

  return (
    <Link
      href={`/projects/${project.SLUG}`}
      className="card pcard"
      style={{ '--c1': c1, '--c2': c2 }}
    >
      <div className="pcard__cover">
        <b>{project.CATEGORY}</b>
        <em>{project.PERIOD}</em>
      </div>

      <div className="pcard__body">
        <h3>{project.TITLE}</h3>
        <p>{project.SUMMARY}</p>

        <div className="tags">
          {(project.STACK ?? []).slice(0, 4).map((s) => (
            <span key={s} className="tag">{s}</span>
          ))}
        </div>

        <div className="pcard__foot">
          <span>{project.ROLE}</span>
          <span className="go">
            자세히
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );

}
