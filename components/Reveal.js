/**
 * 스크롤 등장 래퍼
 *
 * @param {number} delay 등장 지연(ms)
 */
'use client';

import { useReveal } from '@hooks/useReveal';
import { cx } from '@/common/util';

export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {

  const ref = useReveal();

  return (
    <Tag ref={ref} className={cx('reveal', className)} style={{ '--delay': `${delay}ms` }}>
      {children}
    </Tag>
  );

}
