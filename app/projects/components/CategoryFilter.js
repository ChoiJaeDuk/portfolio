/**
 * 프로젝트 카테고리 필터
 *
 * 링크 기반이라 뒤로가기 / 공유가 그대로 동작한다.
 */
import Link from 'next/link';
import { cx } from '@/common/util';

export default function CategoryFilter({ categories = [], current = 'all' }) {
  return (
    <div className="tags" style={{ gap: 10, margin: '36px 0 40px' }}>
      {categories.map((category) => (
        <Link
          key={category}
          href={category === 'all' ? '/projects' : `/projects?category=${encodeURIComponent(category)}`}
          className={cx('chip', category === current && 'on')}
          scroll={false}
        >
          {category === 'all' ? '전체' : category}
        </Link>
      ))}
    </div>
  );
}
