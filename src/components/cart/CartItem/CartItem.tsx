import React from "react";
import { Link } from "react-router-dom";
import { useNotification } from "../../../context/NotificationContext.js";
import iconDelete from "../../../assets/icons/icon-delete.svg";
import "./CartItem.css";
import type { CartItem as CartItemType } from "../../../types/models.js";

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string | number, size: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const { showNotification } = useNotification();

  const handleRemove = (): void => {
    onRemove(item.id, item.size);
  };

  if (!item) return null;

  const productImage = item.images?.main?.[0] || (item as any).image || (item as any).img;

  return (
    <article className="cart-item">
      <div className="cart-item__image">
        <Link to={`/product/${item.id}`} aria-label={`View ${item.name}`}>
          <img 
            src={productImage} 
            alt="" 
            aria-hidden="true" 
            className="cart-item__img" 
          />
        </Link>
      </div>

      <div className="cart-item__info">
        <span className="cart-item__brand">{item.brand}</span>        
        <p className="cart-item__name">{item.name}</p>
        <span className="cart-item__spec">Size: <strong>{item.size}</strong></span>
        <span className="cart-item__spec">Qty: <strong>{item.quantity}</strong></span>            
      </div>

      <div className="cart-item__group">
          <p className="cart-item__price">${(item.finalPrice * item.quantity).toFixed(2)}</p>
          <button 
              type="button"
              className="cart-item__remove-btn" 
              onClick={handleRemove}
              aria-label={`Remove ${item.name} size ${item.size} from cart`}
              >
            <img src={iconDelete} alt="" aria-hidden="true" />
          </button>
      </div>
    </article>
  );
};

export default CartItem;