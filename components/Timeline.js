/**
 * 경력 타임라인
 */
import Reveal from '@components/Reveal';

export default function Timeline({ items = [] }) {
  return (
    <div className="timeline">
      {items.map((item, i) => (
        <Reveal key={`${item.COMPANY}-${i}`} delay={i * 90} className="tl-item">
          <p className="tl-item__period">{item.PERIOD}</p>
          <h3>{item.COMPANY}</h3>
          <h4>{item.TITLE}</h4>
          <p>{item.DESC}</p>

          <ul className="bullets">
            {(item.POINTS ?? []).map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <div className="tags">
            {(item.TAGS ?? []).map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
