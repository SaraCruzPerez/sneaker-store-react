import React from "react";
import { useCart } from "../../context/CartContext.js";
import CartItem from "../../components/cart/CartItem/CartItem.js";
import CartSummary from "../../components/cart/CartSummary/CartSummary.js";
import CartEmpty from "../../components/cart/CartEmpty/CartEmpty.js";
import "./Cart.css";

const Cart: React.FC = () => {
  const { cart, removeFromCart, getTotalPrice } = useCart();
  const total: number = getTotalPrice();

  return (
    <main className="cart-page">
      <div className="cart-page__container">
        {cart.length === 0 ? (
          <div className="cart-page__empty-wrapper" aria-live="polite">
            <CartEmpty />
          </div>
        ) : (
          <div className="cart-page__content">
             <header className="cart-page__header">
                <h1 className="cart-page__title">
                  Your <span className="text-orange">Bag</span>
                </h1>
                <p className="wishlist__count-text" aria-live="polite">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'} in your bag
                </p>
             </header>

             <div className="cart-page__grid">
                <section className="cart-page__items" aria-label="Products in your bag">
                   {cart.map((item) => (                      
                      <CartItem 
                        key={`${item.id}-${item.size}`} 
                        item={item} 
                        onRemove={removeFromCart} 
                      />
                   ))}
                </section>

                <aside className="cart-page__summary-container" aria-label="Order summary">
                  <CartSummary total={total} />
                </aside>
             </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;