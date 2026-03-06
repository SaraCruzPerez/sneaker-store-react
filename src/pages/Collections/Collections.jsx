import { products } from "../../data/products";
import ProductCard from "../../components/product/ProductCard/ProductCard";
import "./Collections.css";

const Collections = () => {
  return (
    <section className="collections">
      <div className="collections__container">
        <h2 className="collections__title">
          Our <span className="collections__title-orange">Collection</span>
        </h2>
        
        <p className="collections__subtitle">
          Discover our latest drops and exclusive designs.
        </p>
        
        <div className="collections__grid">
          {products.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;