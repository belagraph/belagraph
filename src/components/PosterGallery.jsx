'use client';

import { useState, useRef, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';

export default function PosterGallery({ data }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const trackRef = useRef(null);
  const categories = data?.categories || [];
  const items = data?.items || [];

  const filtered =
    activeCategory === 'All'
      ? items
      : items.filter((p) => p.category === activeCategory);

  const scroll = (dir) => {
    if (!trackRef.current) return;
    const amount = trackRef.current.clientWidth * 0.75;
    trackRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="posters" className="gallery-section">
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
          <div className="gallery__filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${cat === activeCategory ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
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
            {filtered.map((p) => (
              <div key={p.id} className="card">
                <div className="card__image-wrap">
                  <img
                    src={`/${p.image}`}
                    alt={p.title}
                    className="card__image"
                    loading="lazy"
                  />
                  <img
                    src={`/${p.hoverImage}`}
                    alt={`${p.title} hover`}
                    className="card__image card__image--hover"
                    loading="lazy"
                  />
                </div>
                <div className="card__info">
                  <h3 className="card__title">{p.title}</h3>
                  <p className="card__meta">
                    {p.category} · {p.year}
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
