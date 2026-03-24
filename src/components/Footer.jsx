import SocialIcons from './SocialIcons';

export default function Footer({ data, social }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <div className="footer__logo">
              <img
                src="/belagraph-logo.svg"
                alt="Belagraph"
                className="footer__logo-img"
              />
            </div>
            <p className="footer__tagline">{data?.tagline}</p>
          </div>
          <SocialIcons
            social={social}
            className="footer__socials"
            linkClass="footer__social-link"
          />
        </div>
        <div className="footer__bottom">
          <p className="footer__copyright">{data?.copyright}</p>
          <p className="footer__credit">
            <a href="https://t.me/graceindesign" target="_blank" rel="noopener noreferrer">
              Developer Contact
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
