import { useWishlist } from "../../context/WishlistContext";
import { Link } from "react-router-dom";
import WishlistItem from "../../components/wishlist/WishlistItem";
import "./Wishlist.css";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <main className="wishlist">
      <div className="wishlist__container">
        <header className="wishlist__header">
          <h1 className="wishlist__title">
            Your <span className="wishlist__title--orange">Wishlist</span>
          </h1>
          <p className="wishlist__count-text">{wishlist.length} items saved</p>
        </header>

        {wishlist.length > 0 ? (
          <div className="wishlist__list">
            {wishlist.map((product) => (
              <WishlistItem 
                key={product.id} 
                product={product} 
                onRemove={toggleWishlist} 
              />
            ))}
          </div>
        ) : (
          <div className="wishlist__empty">
            <div className="wishlist__empty-icon"></div>
            <p className="wishlist__empty-text">Your wishlist is empty. Start adding some sneakers!</p>
            <Link to="/collections" className="wishlist__empty-btn">
              Go to Shop
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Wishlist;