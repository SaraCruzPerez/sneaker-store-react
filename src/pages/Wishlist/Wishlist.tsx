import React from "react";
import { useWishlist } from "../../context/WishlistContext.js";
import { Link } from "react-router-dom";
import WishlistItem from "../../components/wishlist/WishlistItem.js";
import "./Wishlist.css";
import type { Product } from "../../types/models.js";

const Wishlist: React.FC = () => {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <main className="wishlist">
      <div className="wishlist__container">
        {wishlist.length > 0 ? (
          <>
            <header className="wishlist__header">
              <h1 className="wishlist__title">
                Your <span className="wishlist__title--orange">Wishlist</span>
              </h1>
              <p className="wishlist__count-text" aria-live="polite">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
              </p>
            </header>

            <ul className="wishlist__list" role="list">
              {wishlist.map((product: Product) => (
                <li key={product.id} role="listitem">
                  <WishlistItem 
                    product={product} 
                    onRemove={toggleWishlist} 
                  />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="wishlist__empty" aria-live="polite">
            <h2 className="wishlist__empty-title">Your wishlist is empty</h2>
            <p className="wishlist__empty-text">
              Start adding the sneakers you love most to your personal list.
            </p>
            <Link to="/collections" className="wishlist__empty-btn">
              Explore Collection
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Wishlist;