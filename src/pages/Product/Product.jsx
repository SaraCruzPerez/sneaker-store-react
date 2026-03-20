import { useEffect } from "react";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return <NotFound />;
  }

  const isFavorite = wishlist.some((item) => item.id === product.id);

  const handleWishlistToggle = () => {
    toggleWishlist(product);
  };

  return (
    <main className="detail">
      <div className="detail__container">
        <div className="detail__gallery" aria-label="Product Images">
          <ProductGallery images={product.images.main} />
        </div>
        
        <div className="detail__info" aria-label="Product Details">
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