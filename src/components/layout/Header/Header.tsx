import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/icons/logo.svg";
import btnMenu from "../../../assets/icons/icon-menu.svg";
import Navbar from "../Navbar/Navbar.js";
import CartButton from "../../../features/Cart/CartButton.js";
import WishlistButton from "../../../features/Wishlist/WishlistButton.js";
import UserButton from "../../../features/User/UserButton.js";
import "./Header.css";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <Link to="/" className="header__logo" aria-label="Sneakers Home">
        <img className="logo" src={logo} alt="" aria-hidden="true" />
      </Link>

      <Navbar isOpen={isMenuOpen} onClose={toggleMenu} id="menu-navigation" />

      <div className="header__actions">
        <UserButton />
        <WishlistButton />
        <CartButton />

        <button
          type="button"
          className="header__menu-btn"
          aria-controls="menu-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
          onClick={toggleMenu}
        >
          <img src={btnMenu} alt="" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
};

export default Header;
