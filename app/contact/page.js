/**
 * 연락 화면
 */
import { getProfile } from '@/common/actions';

import ContactForm from './components/ContactForm';
import Reveal from '@components/Reveal';

export const metadata = {
  title: '연락',
  description: '프로젝트 문의 및 제안',
};

export default async function ContactPage() {

  const profile = await getProfile();

  return (
    <section className="section">
      <div className="wrap">

        <Reveal>
          <p className="mono section__label">Contact</p>
          <h1 className="display" style={{ maxWidth: '17ch' }}>
            무엇을 만들까요<span className="grad-text">?</span>
          </h1>
          <p className="lead" style={{ maxWidth: '52ch', marginTop: 20 }}>
            프로젝트 문의, 채용 제안, 협업 아이디어 모두 환영합니다.
            보통 하루 안에 회신드립니다.
          </p>
        </Reveal>

        <div className="contact-grid" style={{ marginTop: 56 }}>

          <Reveal delay={100}>
            <div className="card">
              <div className="card__body" style={{ padding: 28 }}>
                <ContactForm />
              </div>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="card">
              <div className="card__body" style={{ padding: 28 }}>
                <p className="mono">Direct</p>

                <ul className="info-list" style={{ marginTop: 12 }}>
                  <li>
                    <span>Email</span>
                    <a href={`mailto:${profile.EMAIL}`}>{profile.EMAIL}</a>
                  </li>
                  <li>
                    <span>Phone</span>
                    <a href={`tel:${profile.PHONE.replace(/-/g, '')}`}>{profile.PHONE}</a>
                  </li>
                  <li>
                    <span>Location</span>
                    <p>{profile.LOCATION}</p>
                  </li>
                  {(profile.SOCIALS ?? []).map((s) => (
                    <li key={s.LABEL}>
                      <span>{s.LABEL}</span>
                      <a href={s.URL} target="_blank" rel="noreferrer noopener">{s.HANDLE}</a>
                    </li>
                  ))}
                </ul>

                {profile.AVAILABLE && (
                  <p className="badge" style={{ marginTop: 24 }}>
                    <i className="dot" />
                    {profile.AVAILABLE_TEXT}
                  </p>
                )}
              </div>
            </div>
          </Reveal>

        </div>

      </div>
    </section>
  );

}
