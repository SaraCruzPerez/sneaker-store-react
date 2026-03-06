import { Instagram, Twitter, Facebook, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from "../../../assets/icons/logo.svg"
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">        
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <img src={logo} alt="Sneakers Logo" className="footer__logo" />
          </Link>
          <p className="footer__description">
            Experience the best collection of premium sneakers with a touch of modern design and maximum comfort.
          </p>
          <div className="footer__socials">
            <a href="#" className="footer__social-link" aria-label="Instagram"><Instagram /></a>
            <a href="#" className="footer__social-link" aria-label="Twitter"><Twitter /></a>
            <a href="#" className="footer__social-link" aria-label="Facebook"><Facebook /></a>
            <a href="#" className="footer__social-link" aria-label="Github"><Github /></a>
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
            <li>support@sneakers.com</li>
            <li>+34 900 123 456</li>
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