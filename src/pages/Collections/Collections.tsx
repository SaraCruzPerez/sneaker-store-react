import React from "react";
import { products } from "../../data/products.js";
import ProductCard from "../../components/product/ProductCard/ProductCard.js";
import "./Collections.css";
import type { Product } from "../../types/models.js";

const Collections: React.FC = () => {
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
          {products.map((item: Product) => (
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