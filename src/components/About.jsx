'use client';

import ScrollReveal from './ScrollReveal';

export default function About({ data }) {
  const imageSrc = data?.image
    ? data.image.startsWith('http')
      ? data.image
      : `/${data.image}`
    : null;

  return (
    <section id="about" className="about">
      <div className="container">
        {imageSrc && (
          <ScrollReveal className="about__image-wrap">
            <img src={imageSrc} alt={data?.name || 'Abel Daniel'} />
          </ScrollReveal>
        )}
        <ScrollReveal className="about__content">
          {data?.badge && (
            <p className="heading-sm about__badge">{data.badge}</p>
          )}
          <h2 className="heading-lg about__name">{data?.name}</h2>
          {data?.description_1 && (
            <p className="body-text about__bio">{data.description_1}</p>
          )}
          {data?.description_2 && (
            <p className="body-text about__bio">{data.description_2}</p>
          )}
          {data?.cta_text && (
            <div className="about__cta">
              <a
                href="/Abel-Daniel-Portfolio-2016.pdf"
                className="btn-primary"
                download
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>{data.cta_text}</span>
              </a>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
