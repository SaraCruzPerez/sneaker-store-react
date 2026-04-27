import React from 'react';
import { Link } from 'react-router-dom';
import './CartEmpty.css';

const CartEmpty: React.FC = () => {
  return (
    <div className="cart-empty">
      <h2 className="cart-empty__title">Your bag is empty!</h2>
      <p className="cart-empty__text">
        It looks like you haven't added any sneakers to your bag yet.
      </p>
      <Link to="/collections" className="checkout-page__btn">
        Go to shop
      </Link>
    </div>
  );
};

export default CartEmpty;