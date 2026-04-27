import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../data/products.js";
import { useCart } from "../../context/CartContext.js";
import { useWishlist } from "../../context/WishlistContext.js"; 
import ProductGallery from "../../components/product/ProductGallery/ProductGallery.js";
import ProductInfo from "../../components/product/ProductInfo/ProductInfo.js";
import NotFound from "../NotFound/NotFound.js"; 
import "./Product.css";

import type { Product as ProductType } from "../../types/models.js";

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();  
  const { wishlist, toggleWishlist } = useWishlist(); 

  const product: ProductType | undefined = products.find(
    (item) => item.id === parseInt(id || "0")
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return <NotFound />;
  }

  const isFavorite: boolean = wishlist.some((item) => item.id === product.id);

  const handleWishlistToggle = (): void => {
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
            onAddToCart={addToCart as any} 
            isFavorite={isFavorite}
            onWishlistToggle={handleWishlistToggle} 
          />
        </div>
      </div>
    </main>
  );
};

export default Product;