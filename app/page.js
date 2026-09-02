/**
 * 홈 화면
 */
import Link from 'next/link';

import { getProfile, getProjectList, getSkillGroupList } from '@/common/actions';

import Hero from '@components/home/Hero';
import Marquee from '@components/home/Marquee';
import ProjectCard from '@components/ProjectCard';
import SkillGroup from '@components/SkillGroup';
import SectionHead from '@components/SectionHead';
import Reveal from '@components/Reveal';

export default async function HomePage() {

  const [profile, featured, skills] = await Promise.all([
    getProfile(),
    getProjectList({ featuredOnly: true }),
    getSkillGroupList(),
  ]);

  const marqueeItems = skills.flatMap((g) => g.ITEMS.map((i) => i.NAME));

  return (
    <>
      <Hero profile={profile} />

      <Marquee items={marqueeItems} />

      {/* 대표 프로젝트 */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            label="Selected Work"
            title="최근에 만든 것들"
            desc="문제와 제약, 그리고 어떻게 풀었는지를 함께 적어두었습니다."
            right={
              <Link href="/projects" data-skin="btn" data-color="2" data-size="s">
                전체 보기
              </Link>
            }
          />

          <div className="projects">
            {featured.map((project, i) => (
              <Reveal key={project.SLUG} delay={i * 90}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 기술 스택 */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            label="Stack"
            title="쓰는 도구들"
            desc="새 도구를 배우는 것보다, 팀이 이미 쓰는 도구를 잘 쓰는 쪽을 먼저 봅니다."
          />

          <div className="skills">
            {skills.map((group, i) => (
              <Reveal key={group.GROUP_NM} delay={i * 80}>
                <SkillGroup group={group} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--tight">
        <div className="wrap">
          <Reveal>
            <div className="cta">
              <p className="mono">Get in touch</p>
              <h2 className="title" style={{ marginTop: 10 }}>
                같이 만들 게 있으신가요?
              </h2>
              <p className="lead">
                프로젝트 문의, 채용 제안, 혹은 그냥 커피 한 잔.
                <br />
                {profile.EMAIL} 로 보내주셔도 좋습니다.
              </p>
              <Link href="/contact" data-skin="btn" data-size="l">메시지 보내기</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );

}
