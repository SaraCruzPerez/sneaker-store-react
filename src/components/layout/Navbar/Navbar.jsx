import { Link } from "react-router-dom"
import btnCloseMenu from "../../../assets/icons/icon-close.svg"
import "./Navbar.css"

const Navbar = ({ isOpen, onClose }) => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "Stores", path: "/stores" }
  ];

  return (
    <>      
      {isOpen && (
        <div 
          className="nav__overlay" 
          onClick={onClose}
          aria-hidden="true"
        ></div>
      )}

      <nav 
        className={`nav__container ${isOpen ? "is-open" : ""}`} 
        id="menu-navigation"
        aria-label="Main navigation" 
      >
        <button
          className="nav__close"
          aria-label="Close menu"
          onClick={onClose}
        >
          <img src={btnCloseMenu} alt="" aria-hidden="true" />
        </button>

        <ul className="nav__list">
          {navLinks.map((link) => (
            <li key={link.name} className="nav__item">
              <Link 
                to={link.path} 
                onClick={onClose} 
                className="nav__link"
                >                  
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default Navbar;