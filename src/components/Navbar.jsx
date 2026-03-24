'use client';

import { useState, useEffect } from 'react';
import SocialIcons from './SocialIcons';

export default function Navbar({ links, social }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu__header">
          <span className="mobile-menu__logo">
            <img
              src="/belagraph-logo.svg"
              alt="Belagraph"
              style={{ height: 36, filter: 'invert(0)' }}
            />
          </span>
          <button
            className="mobile-menu__close"
            onClick={() => setMenuOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <nav className="mobile-menu__nav">
          {links.map((l) => (
            <a
              key={l.url}
              href={l.url}
              className="mobile-menu__link"
              onClick={() => setMenuOpen(false)}
            >
              {l.text}
            </a>
          ))}
        </nav>
      </div>

      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a href="#" className="navbar__logo">
            <img
              src="/belagraph-logo.svg"
              alt="Belagraph"
              className="navbar__logo-img"
            />
          </a>
          <div className="navbar__center">
            {links.map((l) => (
              <a key={l.url} href={l.url} className="nav-link">
                {l.text}
              </a>
            ))}
          </div>
          <div className="navbar__right">
            <SocialIcons
              social={social}
              className="social-links-desktop"
              linkClass="social-link"
            />
            <button
              className="menu-toggle"
              onClick={() => setMenuOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
