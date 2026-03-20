import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../../../assets/icons/logo.svg"
import btnMenu from "../../../assets/icons/icon-menu.svg"
import Navbar from "../Navbar/Navbar"
import CartButton from "../../../features/Cart/CartButton"
import WishlistButton from "../../../features/Wishlist/WishlistButton"
import UserButton from "../../../features/User/UserButton"
import "./Header.css"

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
        
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
    )
}

export default Header;