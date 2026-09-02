/**
 * 기술 스택 그룹 카드
 */
export default function SkillGroup({ group }) {
  return (
    <div className="card skill-group">
      <div className="card__body">
        <h3>{group.GROUP_NM}</h3>
        <p>{group.GROUP_DESC}</p>

        {(group.ITEMS ?? []).map((item, i) => (
          <div key={item.NAME} className="skill-row">
            <div className="skill-row__top">
              <span>{item.NAME}</span>
              <em>{item.LEVEL}</em>
            </div>
            <div className="bar">
              <i style={{ width: `${item.LEVEL}%`, animationDelay: `${i * 70}ms` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
