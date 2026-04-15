'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PosterDetail({ poster, imageUrl, hoverUrl }) {
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [showHover, setShowHover] = useState(false);

  const sizes = poster.sizes || [];
  const frames = poster.frameOptions || [];

  const sizePrice = sizes[selectedSize]?.price || 0;
  const framePrice = frames[selectedFrame]?.price || 0;
  const totalPrice = sizePrice + framePrice;
  const hasPrice = sizePrice > 0 || poster.basePrice > 0;

  return (
    <div className="poster-detail">
      <div className="poster-detail__nav container">
        <Link href="/#posters" className="poster-detail__back">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </Link>
      </div>

      <div className="poster-detail__content container">
        <div
          className="poster-detail__image-wrap"
          onMouseEnter={() => setShowHover(true)}
          onMouseLeave={() => setShowHover(false)}
        >
          {imageUrl && (
            <img
              src={imageUrl}
              alt={poster.title}
              className={`poster-detail__image ${showHover && hoverUrl ? 'hidden' : ''}`}
            />
          )}
          {hoverUrl && (
            <img
              src={hoverUrl}
              alt={`${poster.title} alternate`}
              className={`poster-detail__image poster-detail__image--hover ${showHover ? 'visible' : ''}`}
            />
          )}
        </div>

        <div className="poster-detail__info">
          <h1 className="poster-detail__title">{poster.title}</h1>

          {hasPrice && (
            <div className="poster-detail__price-block">
              <p className="poster-detail__price">
                {(totalPrice || poster.basePrice || 0).toLocaleString()} ETB
              </p>
              {sizePrice > 0 && framePrice > 0 && (
                <p className="poster-detail__price-breakdown">
                  {sizes[selectedSize]?.label} ({sizePrice.toLocaleString()})
                  {' + '}
                  {frames[selectedFrame]?.name} (+{framePrice.toLocaleString()})
                </p>
              )}
            </div>
          )}

          {sizes.length > 0 && (
            <div className="poster-detail__option-group">
              <p className="poster-detail__option-label">Size</p>
              <div className="poster-detail__options">
                {sizes.map((s, i) => (
                  <button
                    key={i}
                    className={`poster-detail__option-btn ${i === selectedSize ? 'active' : ''}`}
                    onClick={() => setSelectedSize(i)}
                  >
                    <span className="poster-detail__option-main">{s.label}</span>
                    <span className="poster-detail__option-sub">
                      {s.dimensions}
                      {s.price > 0 && ` — ${s.price.toLocaleString()} ETB`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {frames.length > 0 && (
            <div className="poster-detail__option-group">
              <p className="poster-detail__option-label">Frame</p>
              <div className="poster-detail__options">
                {frames.map((f, i) => (
                  <button
                    key={i}
                    className={`poster-detail__option-btn ${i === selectedFrame ? 'active' : ''}`}
                    onClick={() => setSelectedFrame(i)}
                  >
                    <span className="poster-detail__option-main">{f.name}</span>
                    {f.price > 0 && (
                      <span className="poster-detail__option-sub">
                        +{f.price.toLocaleString()} ETB
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {poster.description && (
            <div className="poster-detail__section">
              <h3 className="poster-detail__section-title">Description</h3>
              <p className="poster-detail__section-text">{poster.description}</p>
            </div>
          )}

          {poster.printAndFrameDetails && (
            <div className="poster-detail__section">
              <h3 className="poster-detail__section-title">Print & Frame Details</h3>
              <p className="poster-detail__section-text">{poster.printAndFrameDetails}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
