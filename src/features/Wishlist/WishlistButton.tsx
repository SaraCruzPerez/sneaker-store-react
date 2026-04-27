import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext.js";
import heartIcon from "../../assets/icons/icon-heart.svg";
import "./WishlistButton.css";

const WishlistButton: React.FC = () => {
  const { wishlist } = useWishlist();
  
  const wishlistCount = wishlist.length;

  const wishlistLabel =
    wishlistCount > 0
      ? `View wishlist, ${wishlistCount} items saved`
      : "View wishlist, no items saved";

  return (
    <Link
      to="/wishlist"
      className="wishlist__button"
      aria-label={wishlistLabel}
    >
      <img
        src={heartIcon}
        alt=""
        className="wishlist__icon"
        aria-hidden="true"
      />
      {wishlistCount > 0 && (
        <span className="wishlist__count" key={wishlistCount}>
          {wishlistCount}
        </span>
      )}
    </Link>
  );
};

export default WishlistButton;