import React from 'react';
import "../styles/Footer.css"
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer className="footer" role="contentinfo" itemScope itemType="http://schema.org/WPFooter">
        <div className="footer__social" role="navigation" aria-labelledby="social-heading">
          <h3 id="social-heading" className="sr-only">Follow us on social media</h3>
          <a href="#" aria-label="Facebook">
            <i className="fa-brands fa-facebook"></i>
            <span className="sr-only">Facebook</span>
          </a>
          <a href="#" aria-label="Twitter">
            <i className="fa-brands fa-x-twitter"></i>
            <span className="sr-only">Twitter</span>
          </a>
          <a href="#" aria-label="Mastodon">
            <i className="fa-brands fa-mastodon"></i>
            <span className="sr-only">Mastodon</span>
          </a>
          <a href="#" aria-label="Instagram">
            <i className="fa-brands fa-instagram"></i>
            <span className="sr-only">Instagram</span>
          </a>
        </div>
        <hr className="footer__break" />
        <ul className="footer__links" role="navigation" aria-labelledby="footer-links-heading">
          <h3 id="footer-links-heading" className="sr-only">Footer Links</h3>
          <li><a href="#">Site Home</a></li>
          <li><a href="#">Playground</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Sitemap</a></li>
          <li><a href="#">Contents</a></li>
        </ul>
        <p className="footer__copyright">
          ©️ {2024} SDavidPrince. Demo of a footer. Some Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default Footer;