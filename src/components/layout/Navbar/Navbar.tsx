import React from "react";
import { NavLink } from "react-router-dom"; 
import btnCloseMenu from "../../../assets/icons/icon-close.svg";
import "./Navbar.css";

interface NavbarProps {
  isOpen: boolean;        
  onClose: () => void;    
  id?: string;            
}

interface NavLinkItem {
  name: string;
  path: string;
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, onClose, id }) => {
  const navLinks: NavLinkItem[] = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "Stores", path: "/stores" }
  ];

  return (
    <>      
      {isOpen && (
        <div className="nav__overlay" onClick={onClose} aria-hidden="true"></div>
      )}

      <nav 
        className={`nav__container ${isOpen ? "is-open" : ""}`} 
        id={id || "menu-navigation"}
        aria-label="Main navigation" 
      >
        <button
          type="button"
          className="nav__close"
          aria-label="Close menu"
          onClick={onClose}
        >
          <img src={btnCloseMenu} alt="" aria-hidden="true" />
        </button>

        <ul className="nav__list">
          {navLinks.map((link) => (
            <li key={link.name} className="nav__item">
              <NavLink 
                to={link.path} 
                onClick={onClose} 
                className="nav__link"
                end={link.path === "/"} 
              >                  
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;