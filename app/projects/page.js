/**
 * 프로젝트 목록 화면
 *
 * 카테고리 필터는 쿼리스트링(?category=)으로 처리해
 * 서버에서 걸러진 결과만 내려보낸다. (클라이언트 JS 불필요)
 */
import { getProjectList, getCategoryList } from '@/common/actions';

import ProjectCard from '@components/ProjectCard';
import CategoryFilter from './components/CategoryFilter';
import Reveal from '@components/Reveal';

export const metadata = {
  title: '프로젝트',
  description: '지금까지 만든 것들',
};

export default async function ProjectsPage({ searchParams }) {

  const { category = 'all' } = (await searchParams) ?? {};

  const [categories, projects] = await Promise.all([
    getCategoryList(),
    getProjectList({ category }),
  ]);

  return (
    <section className="section">
      <div className="wrap">

        <Reveal>
          <p className="mono section__label">Work</p>
          <h1 className="display" style={{ maxWidth: '16ch' }}>
            만든 것들<span className="grad-text">.</span>
          </h1>
          <p className="lead" style={{ maxWidth: '54ch', marginTop: 20 }}>
            총 {projects.length}개의 프로젝트. 각 상세 페이지에 맡은 역할과 결과를 정리했습니다.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <CategoryFilter categories={categories} current={category} />
        </Reveal>

        {projects.length === 0 ? (
          <div className="empty">해당 카테고리의 프로젝트가 없습니다.</div>
        ) : (
          <div className="projects">
            {projects.map((project, i) => (
              <Reveal key={project.SLUG} delay={i * 70}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        )}

      </div>
    </section>
  );

}
