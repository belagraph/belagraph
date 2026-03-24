'use client';

import { useRef } from 'react';
import ScrollReveal from './ScrollReveal';

export default function FontGallery({ data }) {
  const trackRef = useRef(null);
  const items = data?.items || [];

  const scroll = (dir) => {
    if (!trackRef.current) return;
    const amount = trackRef.current.clientWidth * 0.75;
    trackRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="fonts" className="gallery-section gallery-section--dark">
      <div className="container">
        <ScrollReveal className="gallery__header">
          <div className="gallery__header-text">
            <h2 className="heading-lg gallery__title">
              {data?.title}
              <span className="accent" style={{ color: 'var(--color-accent)' }}>
                .
              </span>
            </h2>
            <p className="body-text">{data?.description}</p>
          </div>
        </ScrollReveal>
        <ScrollReveal className="gallery__viewport">
          <button
            className="gallery__scroll-btn gallery__scroll-btn--left"
            onClick={() => scroll('left')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className="gallery__scroll-btn gallery__scroll-btn--right"
            onClick={() => scroll('right')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          <div ref={trackRef} className="gallery__track">
            {items.map((f) => (
              <div key={f.id} className="card">
                <div className="card__image-wrap">
                  <img
                    src={`/${f.image}`}
                    alt={f.title}
                    className="card__image"
                    loading="lazy"
                  />
                  <img
                    src={`/${f.hoverImage}`}
                    alt={`${f.title} hover`}
                    className="card__image card__image--hover"
                    loading="lazy"
                  />
                </div>
                <div className="card__info">
                  <h3 className="card__title">{f.title}</h3>
                  <p className="card__meta">
                    {f.style} · {f.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
