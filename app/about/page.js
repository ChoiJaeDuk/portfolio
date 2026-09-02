/**
 * 소개 화면
 */
import Link from 'next/link';

import {
  getProfile,
  getSkillGroupList,
  getExperienceList,
  getEducationList,
} from '@/common/actions';

import SectionHead from '@components/SectionHead';
import SkillGroup from '@components/SkillGroup';
import Timeline from '@components/Timeline';
import Reveal from '@components/Reveal';

export const metadata = {
  title: '소개',
  description: '경력, 기술 스택, 일하는 방식',
};

export default async function AboutPage() {

  const [profile, skills, experiences, educations] = await Promise.all([
    getProfile(),
    getSkillGroupList(),
    getExperienceList(),
    getEducationList(),
  ]);

  return (
    <>
      {/* 인트로 */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <p className="mono section__label">About</p>
            <h1 className="display" style={{ maxWidth: '18ch' }}>
              {profile.NAME}, <span className="grad-text">{profile.ROLE}</span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="lead" style={{ maxWidth: '62ch', marginTop: 26 }}>
              {profile.SUMMARY}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="tags" style={{ marginTop: 28 }}>
              <span className="tag">{profile.LOCATION}</span>
              <span className="tag">{profile.EMAIL}</span>
              {(profile.SOCIALS ?? []).map((s) => (
                <a key={s.LABEL} className="tag" href={s.URL} target="_blank" rel="noreferrer noopener">
                  {s.LABEL} {s.HANDLE}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 일하는 방식 */}
      <section className="section section--tight">
        <div className="wrap">
          <SectionHead label="Principles" title="일하는 방식" />

          <div className="skills">
            {[
              {
                T: '재는 것부터',
                D: '느리다는 말 대신 숫자를 먼저 봅니다. 무엇이 몇 ms 인지 알면 고칠 곳이 정해집니다.',
              },
              {
                T: '경계를 얇게',
                D: '서버에서 할 일과 브라우저에서 할 일을 나눕니다. 경계가 분명하면 나중에 바꾸기 쉽습니다.',
              },
              {
                T: '남이 읽을 코드',
                D: '6개월 뒤의 나를 포함해, 다음 사람이 읽을 것을 전제로 씁니다. 주석은 왜를 남깁니다.',
              },
            ].map((item, i) => (
              <Reveal key={item.T} delay={i * 90}>
                <div className="card">
                  <div className="card__body">
                    <p className="mono">0{i + 1}</p>
                    <h3 style={{ margin: '10px 0 8px', fontSize: '1.1rem', fontWeight: 650 }}>{item.T}</h3>
                    <p className="muted" style={{ fontSize: '0.94rem' }}>{item.D}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 경력 */}
      <section className="section">
        <div className="wrap">
          <SectionHead label="Career" title="경력" />
          <Timeline items={experiences} />
        </div>
      </section>

      {/* 기술 스택 */}
      <section className="section">
        <div className="wrap">
          <SectionHead label="Skills" title="기술 스택" />
          <div className="skills">
            {skills.map((group, i) => (
              <Reveal key={group.GROUP_NM} delay={i * 80}>
                <SkillGroup group={group} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 학력 / 자격 */}
      <section className="section section--tight">
        <div className="wrap">
          <SectionHead label="Education" title="학력 · 자격" />

          <div className="card">
            <div className="card__body">
              <ul className="info-list">
                {educations.map((edu) => (
                  <li key={edu.NAME}>
                    <span>{edu.PERIOD}</span>
                    <strong style={{ fontWeight: 600 }}>{edu.NAME}</strong>
                    <span style={{ letterSpacing: 0, textTransform: 'none', fontFamily: 'inherit', fontSize: '0.88rem' }}>
                      {edu.DESC}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginTop: 32 }}>
            <Link href="/contact" data-skin="btn" data-size="l">연락하기</Link>
          </div>
        </div>
      </section>
    </>
  );

}
