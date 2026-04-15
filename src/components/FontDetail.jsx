'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FontDetail({ font, imageUrl, hoverUrl, specimenUrl }) {
  const [showHover, setShowHover] = useState(false);

  return (
    <div className="poster-detail">
      <div className="poster-detail__nav container">
        <Link href="/#fonts" className="poster-detail__back">
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
              alt={font.title}
              className={`poster-detail__image ${showHover && hoverUrl ? 'hidden' : ''}`}
            />
          )}
          {hoverUrl && (
            <img
              src={hoverUrl}
              alt={`${font.title} alternate`}
              className={`poster-detail__image poster-detail__image--hover ${showHover ? 'visible' : ''}`}
            />
          )}
        </div>

        <div className="poster-detail__info">
          <h1 className="poster-detail__title">{font.title}</h1>

          {font.style && (
            <p className="poster-detail__price">{font.style}</p>
          )}

          {font.description && (
            <div className="poster-detail__section">
              <h3 className="poster-detail__section-title">About this Typeface</h3>
              <p className="poster-detail__section-text">{font.description}</p>
            </div>
          )}

          {specimenUrl && (
            <div className="poster-detail__section">
              <h3 className="poster-detail__section-title">Type Specimen</h3>
              <img
                src={specimenUrl}
                alt={`${font.title} specimen`}
                style={{ width: '100%', borderRadius: 8, marginTop: 12 }}
              />
            </div>
          )}

          {font.downloadUrl && (
            <div className="poster-detail__section">
              <a
                href={font.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Download / Purchase
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
