import { Instagram, Twitter, Facebook, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from "../../../assets/icons/logo.svg"
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">        
        <div className="footer__brand">
          <Link to="/" className="footer__logo" aria-label="Sneakers Home">
            <img src={logo} alt="" aria-hidden="true" className="footer__logo" />
          </Link>
          <p className="footer__description">
            Experience the best collection of premium sneakers with a touch of modern design and maximum comfort.
          </p>
          <div className="footer__socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Follow us on Instagram">
              <Instagram aria-hidden="true" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Follow us on Twitter">
              <Twitter />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Follow us on Facebook">
              <Facebook /></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Follow us on Github">
              <Github /></a>
          </div>
        </div>

        <div className="footer__links">
          <h3 className="footer__title">Navigation</h3>
          <ul className='footer__list'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/collections">Collections</Link></li>
            <li><Link to="/stores">Our Stores</Link></li>
          </ul>
        </div>

        <div className="footer__links">
          <h3 className="footer__title">Contact</h3>
          <ul className='footer__list'>
            <li><a href="mailto:support@sneakers.com" className="footer__link-contact">support@sneakers.com</a></li>
            <li><a href="tel:+34900123456" className="footer__link-contact">+34 900 123 456</a></li>
            <li>Madrid, Spain</li>
          </ul>
        </div>

      </div>

      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} SNEAKERS. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;