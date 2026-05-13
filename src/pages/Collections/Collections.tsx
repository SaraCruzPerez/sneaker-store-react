import React from "react";
import { products } from "../../data/products.js";
import ProductCard from "../../components/product/ProductCard/ProductCard.js";
import "./Collections.css";
import type { Product } from "../../types/models.js";

const Collections: React.FC = () => {
  return (
    <main className="collections">
      <div className="collections__container">
        <h1 className="collections__title">
          Our <span className="collections__title-orange">Collection</span>
        </h1>
        
        <p className="collections__subtitle">
          Discover our latest drops and exclusive designs.
        </p>
        
        <ul className="collections__grid" role="list">
          {products.map((item: Product) => (
            <li key={item.id} role="listitem">
              <ProductCard product={item} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Collections;