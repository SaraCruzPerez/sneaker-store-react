import { useWishlist } from "../../context/WishlistContext";
import { Link } from "react-router-dom";
import WishlistItem from "../../components/wishlist/WishlistItem";
import "./Wishlist.css";

const Wishlist = () => {
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

            <div className="wishlist__list" role="list">
              {wishlist.map((product) => (
                <WishlistItem 
                  key={product.id} 
                  product={product} 
                  onRemove={toggleWishlist} 
                />
              ))}
            </div>
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