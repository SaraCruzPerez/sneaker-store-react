import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom"; 
import cartIcon from "../../assets/icons/icon-cart.svg";
import "./CartButton.css";

const CartButton = () => {
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Link to="/cart" className="cart" aria-label="View cart">
      <img src={cartIcon} alt="" className="cart__icon" />
      {totalItems > 0 && (
        <span className="cart__count" key={totalItems}>{totalItems}</span>
      )}
    </Link>
  );
};

export default CartButton;