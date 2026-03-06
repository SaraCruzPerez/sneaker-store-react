import { Link } from "react-router-dom";
import iconDelete from "../../assets/icons/icon-delete.svg";
import "./WishlistItem.css";

const WishlistItem = ({ product, onRemove }) => {
  return (
    <article className="wish-item">
      <div className="wish-item__product-lead">
        <Link to={`/product/${product.id}`} className="wish-item__img-link">
          <img src={product.images.main[0]} alt={product.name} className="wish-item__img" />
        </Link>
        <div className="wish-item__info">
          <span className="wish-item__brand">{product.brand}</span>
          <h2 className="wish-item__name">{product.name}</h2>
          <p className="wish-item__price-mobile">${product.price.toFixed(2)}</p>
        </div>
      </div>

      <div className="wish-item__status">
        <span className="status-badge">In Stock</span>
        <span className="shipping-info">Ready to ship</span>
      </div>

      <div className="wish-item__price-desktop">
        ${product.price.toFixed(2)}
      </div>

      <div className="wish-item__actions">
        <button className="wish-item__remove" onClick={() => onRemove(product)}>
          <img src={iconDelete} alt="Delete" />
        </button>
        <Link to={`/product/${product.id}`} className="wish-item__view-btn">
          View Product
        </Link>
      </div>
    </article>
  );
};

export default WishlistItem;