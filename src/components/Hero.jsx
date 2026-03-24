'use client';

import { useState, useEffect, useCallback } from 'react';

export default function Hero({ data }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = data?.images || [];

  const goToSlide = useCallback(
    (idx) => setCurrentSlide(idx),
    []
  );

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length, currentSlide]);

  return (
    <section id="hero" className="hero">
      <div className="hero__slides">
        {images.map((src, idx) => (
          <div
            key={idx}
            className={`hero__slide ${idx === currentSlide ? 'active' : ''}`}
          >
            <img src={`/${src}`} alt={`Hero image ${idx + 1}`} />
          </div>
        ))}
      </div>
      <div className="hero__overlay" />
      <div className="hero__content container">
        <div className="hero__badge">{data?.badge}</div>
        <h1
          className="hero__title"
          dangerouslySetInnerHTML={{ __html: data?.title || '' }}
        />
        <div className="hero__cta">
          <a href="#posters" className="btn-white">
            {data?.cta_primary?.text || 'Explore Collection'}
          </a>
        </div>
      </div>
      <div className="hero__dots">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`hero__dot ${idx === currentSlide ? 'active' : ''}`}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => goToSlide(idx)}
          />
        ))}
      </div>
    </section>
  );
}
