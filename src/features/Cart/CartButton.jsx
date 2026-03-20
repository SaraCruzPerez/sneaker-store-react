import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom"; 
import cartIcon from "../../assets/icons/icon-cart.svg";
import "./CartButton.css";

const CartButton = () => {
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartLabel = totalItems > 0 
    ? `View cart, ${totalItems} items in bag` 
    : "View cart, bag is empty";

  return (
    <Link to="/cart" className="cart" aria-label={cartLabel}>
      <img src={cartIcon} alt="" className="cart__icon" aria-hidden="true" />
      {totalItems > 0 && (
        <span className="cart__count" key={totalItems}>{totalItems}</span>
      )}
    </Link>
  );
};

export default CartButton;