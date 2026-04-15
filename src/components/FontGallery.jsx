'use client';

import { useRef } from 'react';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

export default function FontGallery({ fonts }) {
  const trackRef = useRef(null);
  const items = fonts || [];

  const scroll = (dir) => {
    if (!trackRef.current) return;
    const amount = trackRef.current.clientWidth * 0.75;
    trackRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  if (items.length === 0) return null;

  return (
    <section id="fonts" className="gallery-section gallery-section--dark">
      <div className="container">
        <ScrollReveal className="gallery__header">
          <div className="gallery__header-text">
            <h2 className="heading-lg gallery__title">Fonts</h2>
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
              <Link
                key={f._id}
                href={`/fonts/${f.slug}`}
                className="card"
              >
                <div className="card__image-wrap">
                  {f.imageUrl && (
                    <img
                      src={f.imageUrl}
                      alt={f.title}
                      className="card__image"
                      loading="lazy"
                    />
                  )}
                  {f.hoverUrl && (
                    <img
                      src={f.hoverUrl}
                      alt={`${f.title} hover`}
                      className="card__image card__image--hover"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="card__info">
                  <h3 className="card__title">{f.title}</h3>
                  {f.style && (
                    <p className="card__meta">{f.style}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
