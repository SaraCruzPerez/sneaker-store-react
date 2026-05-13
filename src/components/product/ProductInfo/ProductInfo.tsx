import React, { useState } from "react";
import "./ProductInfo.css";
import heart from "../../../assets/icons/icon-heart.svg";
import heartFilled from "../../../assets/icons/icon-heart-complete.svg";
import { useNotification } from "../../../context/NotificationContext.js";
import type { Product } from "../../../types/models.js";

interface ProductInfoProps {
  product: Product;
  onAddToCart: (product: any, quantity: number, size: string | number) => void;
  isFavorite: boolean;
  onWishlistToggle: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  onAddToCart,
  isFavorite,
  onWishlistToggle,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [showError, setShowError] = useState<boolean>(false);

  // Optimizamos: solo extraemos la función si existe el contexto
  const notificationContext = useNotification();

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowError(true);
      return;
    }
    onAddToCart(product, quantity, selectedSize);
    notificationContext?.showNotification("Added to cart", "add");
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onWishlistToggle();
    if (!isFavorite) {
      notificationContext?.showNotification("Added to wishlist", "add");
    }
  };

  const finalPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  return (
    <section className="info">
      <header className="info__header">
        <span className="info__brand">{product.brand}</span>
        <h1 className="info__title">{product.name}</h1>
        <div className="info__price-container">
          <span className="info__price-final">${finalPrice.toFixed(2)}</span>
          {product.discount > 0 && (
            <span className="info__price-old">${product.price.toFixed(2)}</span>
          )}
        </div>
      </header>

      <p className="info__description">{product.description}</p>

      <div className="info__size-container">
        <p className="info__label">Select Size</p>
        <div className="info__size-list">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              className={`info__size-btn ${selectedSize === size ? "is-active" : ""}`}
              onClick={() => { setSelectedSize(size); setShowError(false); }}
            >
              {size}
            </button>
          ))}
        </div>
        {showError && <p className="info__error" role="alert">Please select a size</p>}
      </div>

      <div className="info__actions">
        <div className="info__interactive-group">
          <div className="info__counter">
            <button type="button" className="info__counter-btn" onClick={() => quantity > 1 && setQuantity(quantity - 1)} aria-label="Decrease quantity">-</button>
            <span className="info__counter-value">{quantity}</span>
            <button type="button" className="info__counter-btn" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button>
          </div>
          <button type="button" className={`info__wishlist ${isFavorite ? "is-fav" : ""}`} onClick={handleToggleWishlist} aria-label="Wishlist">
            <img src={isFavorite ? heartFilled : heart} alt="" />
          </button>
        </div>
        <button type="button" className="info__add-btn" onClick={handleAddToCart}>Add to cart</button>
      </div>
    </section>
  );
};

export default ProductInfo;