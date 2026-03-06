import { Link } from "react-router-dom";
import "./CartSummary.css";

const CartSummary = ({ total }) => {
  return (
    <aside className="cart-summary">
      <h2 className="cart-summary__title">Order Summary</h2>
      
      <div className="cart-summary__details">
        <div className="cart-summary__row">
          <span>Subtotal</span>
          <span className="cart-summary__value">${total.toFixed(2)}</span>
        </div>
        <div className="cart-summary__row">
          <span>Shipping</span>
          <span className="cart-summary__value">Free</span>
        </div>
      </div>

      <div className="cart-summary__total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <Link to="/checkout" className="cart-summary__btn">
        Checkout Now
      </Link>

      <p className="cart-summary__note">
        Shipping & taxes calculated at checkout
      </p>
    </aside>
  );
};

export default CartSummary;