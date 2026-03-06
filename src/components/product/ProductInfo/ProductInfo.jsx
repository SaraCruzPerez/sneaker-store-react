import { useState } from "react";
import "./ProductInfo.css";
import heart from "../../../assets/icons/icon-heart.svg";
import heartFilled from "../../../assets/icons/icon-heart-complete.svg";

const ProductInfo = ({ product, onAddToCart, isFavorite, onWishlistToggle }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showError, setShowError] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowError(true);
      return;
    }
    onAddToCart(product, quantity, selectedSize);
  };

  return (
    <section className="info">
      <header className="info__header">
        <span className="info__brand">{product.brand}</span>
        <h1 className="info__title">{product.name}</h1>
      </header>

      <p className="info__description">{product.description}</p>

      <div className="info__size-container">
        <p className="info__label">Select Size</p>
        <div className="info__size-list">
          {product.sizes.map((size) => (
            <button 
              key={size}
              className={`info__size-btn ${selectedSize === size ? 'is-active' : ''}`}
              onClick={() => { setSelectedSize(size); setShowError(false); }}
            >
              {size}
            </button>
          ))}
        </div>
        {showError && <p className="info__error">Please select a size</p>}
      </div>

      <div className="info__actions">
        <div className="info__interactive-group">
          <div className="info__counter">
            <button className="info__counter-btn" onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
            <span className="info__counter-value">{quantity}</span>
            <button className="info__counter-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          <button 
            type="button"
            className={`info__wishlist ${isFavorite ? 'is-active' : ''}`}
            onClick={onWishlistToggle}
            aria-label="Add to wishlist"
          >
            <img src={isFavorite ? heartFilled : heart} alt="" />
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