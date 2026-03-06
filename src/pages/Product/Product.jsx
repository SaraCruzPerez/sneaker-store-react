import { useParams } from "react-router-dom";
import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext"; 
import ProductGallery from "../../components/product/ProductGallery/ProductGallery";
import ProductInfo from "../../components/product/ProductInfo/ProductInfo";
import "./Product.css";

const Product = () => {
  const { id } = useParams();
  const { addToCart } = useCart();  
  const { wishlist, toggleWishlist } = useWishlist();  
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return <p>Product not found!</p>;
  }

  const isFavorite = wishlist.some((item) => item.id === product.id);

  const handleWishlistToggle = () => {
    toggleWishlist(product);
  };

  return (
    <main className="detail">
      <div className="detail__container">
        <div className="detail__gallery">
          <ProductGallery images={product.images.main} />
        </div>
        
        <div className="detail__info">
          <ProductInfo 
            product={product} 
            onAddToCart={addToCart} 
            isFavorite={isFavorite}
            onWishlistToggle={handleWishlistToggle} 
          />
        </div>
      </div>
    </main>
  );
};

export default Product;