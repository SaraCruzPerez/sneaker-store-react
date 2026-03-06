import { Link } from "react-router-dom";
import iconDelete from "../../../assets/icons/icon-delete.svg";
import "./CartItem.css";

const CartItem = ({ item, onRemove }) => {
  return (
    <article className="cart-item">
      <div className="cart-item__image">
        <Link to={`/product/${item.id}`}>
          <img src={item.images.main[0]} alt={item.name} className="cart-item__img" />
        </Link>
      </div>

      <div className="cart-item__info">
        <span className="cart-item__brand">{item.brand}</span>        
        <span className="cart-item__spec">Size: <strong>{item.size}</strong></span>
        <span className="cart-item__spec">Qty: <strong>{item.quantity}</strong></span>            
      </div>

      <div className="cart-item__group">
          <p className="cart-item__price">${(item.finalPrice * item.quantity).toFixed(2)}</p>
          <button className="cart-item__remove-btn" onClick={() => onRemove(item.id, item.size)}>
            <img src={iconDelete} alt="Remove" />
          </button>
      </div>
    </article>
  );
};

export default CartItem;