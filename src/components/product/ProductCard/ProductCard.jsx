import { useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../../context/WishlistContext";
import { useCart } from "../../../context/CartContext";

import heartOutline from "../../../assets/icons/icon-heart.svg";
import heartFilled from "../../../assets/icons/icon-heart-complete.svg";
import iconAdd from "../../../assets/icons/icon-cart.svg";
import iconAddSelect from "../../../assets/icons/icon-cart-select.svg";

import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { toggleWishlist, isFavorite } = useWishlist();
  const { addToCart } = useCart();
  
  const [showSizeSelector, setShowSizeSelector] = useState(false);
  const [isHoveredCart, setIsHoveredCart] = useState(false);
  const [isHoveredWish, setIsHoveredWish] = useState(false);

  const favorite = isFavorite(product.id);
  const hasDiscount = product.discount > 0;
  const finalPrice = hasDiscount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    setIsHoveredWish(false);
  };

  const handleToggleSelector = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (showSizeSelector) {
      setIsHoveredCart(false);
    }
    setShowSizeSelector(!showSizeSelector);
  };

  const handleSelectSize = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, size);
    setShowSizeSelector(false);
  };

  return (
    <article className="product">
      <Link to={`/product/${product.id}`} className="product__link">
        <div className="product__image-zone">
          {hasDiscount && <span className="product__badge">-{product.discount}%</span>}
          
          <img 
            src={product.images.main[0]} 
            alt={product.name} 
            className="product__img" 
          />

          <div className={`product__overlay ${showSizeSelector ? "is-active" : ""}`}>
            <p className="product__overlay-title">Select Size</p>
            <div className="product__sizes">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => handleSelectSize(e, size)}
                  className="product__size-option"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="product__info">
          <header className="product__header">
            <span className="product__brand">{product.brand}</span>
            <h2 className="product__name">{product.name}</h2>
          </header>

          <div className="product__price-container">
              <span className="product__price">${finalPrice.toFixed(2)}</span>
              {hasDiscount && <span className="product__price-old">${product.price.toFixed(2)}</span>}
          </div>

          <footer className="product__footer">
            <button 
              className={`product__btn product__btn-cart ${showSizeSelector ? "is-active" : ""}`}
              onClick={handleToggleSelector}
              onMouseEnter={() => setIsHoveredCart(true)}
              onMouseLeave={() => setIsHoveredCart(false)}
              aria-label="Add to cart"
            >
              <img 
                src={showSizeSelector ? iconAddSelect : (isHoveredCart ? iconAddSelect : iconAdd)} 
                alt="" 
                className="product__icon"
              />
              <span className="product__btn-text">Add to Cart</span>
            </button>
            
            <button
              className={`product__btn product__btn-wish ${favorite ? "is-fav" : ""}`}
              onClick={handleFavorite}
              onMouseEnter={() => setIsHoveredWish(true)}
              onMouseLeave={() => setIsHoveredWish(false)}
              aria-label="Wishlist"
            >
              <img 
                src={favorite ? heartFilled : (isHoveredWish ? heartFilled : heartOutline)} 
                alt="" 
                className="product__icon" 
              />
            </button>
          </footer>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;