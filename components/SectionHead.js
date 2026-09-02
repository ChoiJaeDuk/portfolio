/**
 * 섹션 제목 블록
 *
 * @param {string} label 상단 라벨
 * @param {string} title 제목
 * @param {string} desc  설명
 * @param {node}   right 우측 영역(버튼 등)
 */
export default function SectionHead({ label, title, desc, right }) {
  return (
    <div className="section__head">
      <div>
        {label && <p className="mono section__label">{label}</p>}
        <h2 className="title">{title}</h2>
        {desc && <p className="lead">{desc}</p>}
      </div>
      {right}
    </div>
  );
}
