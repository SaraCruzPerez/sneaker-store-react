import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../../context/WishlistContext.js";
import { useCart } from "../../../context/CartContext.js";
import { useNotification } from "../../../context/NotificationContext.js";
import type { Product } from "../../../types/models.js";

import heartOutline from "../../../assets/icons/icon-heart.svg";
import heartFilled from "../../../assets/icons/icon-heart-complete.svg";
import iconAdd from "../../../assets/icons/icon-cart.svg";
import iconAddSelect from "../../../assets/icons/icon-cart-select.svg";

import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showNotification } = useNotification();
  const { addToCart } = useCart();

  const [showSizeSelector, setShowSizeSelector] = useState<boolean>(false);
  const [isHoveredWish, setIsHoveredWish] = useState<boolean>(false);

  const firstSizeRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLElement>(null);

  const favorite = isInWishlist(product.id);
  const hasDiscount = product.discount > 0;
  const finalPrice = hasDiscount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowSizeSelector(false);
      }
    };

    if (showSizeSelector) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSizeSelector]);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (favorite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
      showNotification("Saved to wishlist", "add");
    }
    setIsHoveredWish(false);
  };

  const handleToggleSelector = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const nextState = !showSizeSelector;
    setShowSizeSelector(nextState);

    if (nextState) {
      setTimeout(() => {
        firstSizeRef.current?.focus();
      }, 400);
    }
  };

  const handleSelectSize = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(
      {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        discount: product.discount,
        image: product.images.main[0] || "",
      },
      1,
      size
    );

    setShowSizeSelector(false);
    showNotification("Added to cart", "add");
  };

  return (
    <article className="product" ref={cardRef}>
      <Link
        to={`/product/${product.id}`}
        className="product__link"
        aria-label={`View ${product.name}`}
      >
        <div className="product__image-zone">
          {hasDiscount && (
            <span className="product__badge">-{product.discount}%</span>
          )}

          <img
            src={product.images.main[0]}
            alt=""
            aria-hidden="true"
            className="product__img"
          />

          <div
            className={`product__overlay ${showSizeSelector ? "is-active" : ""}`}
            aria-hidden={!showSizeSelector}
          >
            <p className="product__overlay-title">Select Size</p>
            <div className="product__sizes">
              {product.sizes.map((size, index) => (
                <button
                  key={size}
                  type="button"
                  ref={index === 0 ? firstSizeRef : null}
                  onClick={(e) => handleSelectSize(e, String(size))}
                  className="product__size-option"
                  aria-label={`Select size ${size}`}
                  tabIndex={showSizeSelector ? 0 : -1}
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
            {hasDiscount && (
              <span className="product__price-old">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>

      <footer className="product__footer">
        <button
          type="button"
          className={`product__btn product__btn-cart ${showSizeSelector ? "is-active" : ""}`}
          onClick={handleToggleSelector}
          aria-expanded={showSizeSelector}
          aria-label={showSizeSelector ? "Close size selector" : "Add to cart"}
        >
          <img
            src={showSizeSelector ? iconAddSelect : iconAdd}
            alt=""
            aria-hidden="true"
            className="product__icon"
          />
          <span className="product__btn-text">Add to Cart</span>
        </button>

        <button
          type="button"
          className={`product__btn product__btn-wish ${favorite ? "is-fav" : ""}`}
          onClick={handleFavorite}
          onMouseEnter={() => setIsHoveredWish(true)}
          onMouseLeave={() => setIsHoveredWish(false)}
          aria-label={favorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <img
            src={favorite || isHoveredWish ? heartFilled : heartOutline}
            alt=""
            aria-hidden="true"
            className="product__icon"
          />
        </button>
      </footer>
    </article>
  );
};

export default ProductCard;