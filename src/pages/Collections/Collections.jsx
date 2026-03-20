import { products } from "../../data/products";
import ProductCard from "../../components/product/ProductCard/ProductCard";
import "./Collections.css";

const Collections = () => {
  return (
    <main className="collections">
      <div className="collections__container">
        <h2 className="collections__title">
          Our <span className="collections__title-orange">Collection</span>
        </h2>
        
        <p className="collections__subtitle">
          Discover our latest drops and exclusive designs.
        </p>
        
        <div 
          className="collections__grid" 
          role="list" 
          aria-label="Product sneaker collection"
          >
          {products.map((item) => (
            <div key={item.id} role="listitem">
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Collections;