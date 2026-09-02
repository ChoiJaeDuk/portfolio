/**
 * 기술 스택이 흐르는 띠
 *
 * 이음새 없이 반복되도록 목록을 두 번 렌더링한다.
 */
export default function Marquee({ items = [] }) {

  if (!items.length) return null;

  const loop = [...items, ...items];

  return (
    <div className="marquee">
      <div className="marquee__track">
        {loop.map((item, i) => (
          <span key={`${item}-${i}`}>{item}</span>
        ))}
      </div>
    </div>
  );

}
