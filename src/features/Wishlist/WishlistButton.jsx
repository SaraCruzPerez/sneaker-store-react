import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import heartIcon from "../../assets/icons/icon-heart.svg";
import "./WishlistButton.css";

const WishlistButton = () => {
  const { wishlist } = useWishlist();
  const wishlistCount = wishlist.length;

  return (
    <Link to="/wishlist" className="wishlist__button" aria-label="View wishlist">
      <img src={heartIcon} alt="" className="wishlist__icon" />
      {wishlistCount > 0 && (
        <span className="wishlist__count">{wishlistCount}</span>
      )}
    </Link>
  );
};

export default WishlistButton;