'use client';

import { useRef } from 'react';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

function PosterCard({ poster }) {
  const imageUrl = poster.imageUrl;
  const hoverUrl = poster.hoverUrl;
  const hasSlug = poster.slug && poster.slug !== poster.title?.toLowerCase().replace(/\s+/g, '-');

  const inner = (
    <>
      <div className="card__image-wrap">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={poster.title}
            className="card__image"
            loading="lazy"
          />
        )}
        {hoverUrl && (
          <img
            src={hoverUrl}
            alt={`${poster.title} hover`}
            className="card__image card__image--hover"
            loading="lazy"
          />
        )}
      </div>
      <div className="card__info">
        <h3 className="card__title">{poster.title}</h3>
        {(poster.startingPrice || poster.basePrice) ? (
          <p className="card__meta">
            From {(poster.startingPrice || poster.basePrice).toLocaleString()} ETB
          </p>
        ) : poster.year ? (
          <p className="card__meta">{poster.year}</p>
        ) : null}
      </div>
    </>
  );

  if (hasSlug) {
    return <Link href={`/posters/${poster.slug}`} className="card">{inner}</Link>;
  }
  return <div className="card">{inner}</div>;
}

function PosterSection({ title, items }) {
  const trackRef = useRef(null);

  const scroll = (dir) => {
    if (!trackRef.current) return;
    const amount = trackRef.current.clientWidth * 0.75;
    trackRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  if (!items || items.length === 0) return null;

  return (
    <section id="posters" className="gallery-section">
      <div className="container">
        <ScrollReveal className="gallery__header">
          <div className="gallery__header-text">
            <h2 className="heading-lg gallery__title">{title}</h2>
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
            {items.map((p) => (
              <PosterCard key={p._id} poster={p} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function PosterGallery({ topPicks, recentPosters }) {
  const hasTopPicks = topPicks && topPicks.length > 0;
  const hasRecent = recentPosters && recentPosters.length > 0;
  const recentTitle = hasTopPicks ? 'Recent Posters' : 'Posters';

  return (
    <>
      {hasTopPicks && (
        <PosterSection title="Top Picks" items={topPicks} />
      )}
      {hasRecent && (
        <PosterSection title={recentTitle} items={recentPosters} />
      )}
    </>
  );
}
