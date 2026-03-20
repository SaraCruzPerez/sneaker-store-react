import { useState } from "react";
import "./ProductInfo.css";
import heart from "../../../assets/icons/icon-heart.svg";
import heartFilled from "../../../assets/icons/icon-heart-complete.svg";
import { useNotification } from "../../../context/NotificationContext";

const ProductInfo = ({ product, onAddToCart, isFavorite, onWishlistToggle }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showError, setShowError] = useState(false);
  
  const { showNotification } = useNotification();

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowError(true);
      return;
    }
    onAddToCart(product, quantity, selectedSize);
    showNotification("Added", "add");
  };

  const handleToggleWishlist = () => {
    onWishlistToggle();
  };

  const hasDiscount = product.discount > 0;
  const finalPrice = hasDiscount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <section className="info">
      <header className="info__header">
        <span className="info__brand">{product.brand}</span>
        <h1 className="info__title">{product.name}</h1>
        <div className="info__price-container" aria-label="Price information">
          <span className="info__price-final">${finalPrice.toFixed(2)}</span>
          {hasDiscount && ( 
            <span className="info__price-old" aria-label="Original price">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </header>

      <p className="info__description">{product.description}</p>

      <div className="info__size-container">
        <p className="info__label" id="size-label">Select Size</p> 
        <div className="info__size-list" role="group" aria-labelledby="size-label">
          {product.sizes.map((size) => (
            <button 
              key={size}
              className={`info__size-btn ${selectedSize === size ? 'is-active' : ''}`}
              aria-pressed={selectedSize === size}
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
            <button 
              className="info__counter-btn" 
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="info__counter-value" aria-live="polite" aria-atomic="true">
              {quantity}
            </span>
            <button 
              className="info__counter-btn" 
              onClick={() => setQuantity(quantity + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button 
            type="button"
            className={`info__wishlist ${isFavorite ? 'is-active' : ''}`}
            onClick={handleToggleWishlist}
            aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={isFavorite}
          >
            <img src={isFavorite ? heartFilled : heart} alt="" aria-hidden="true" />
          </button>
        </div>

        <button className="info__add-btn" onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
    </section>
  );
};

export default ProductInfo;