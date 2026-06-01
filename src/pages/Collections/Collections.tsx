import React from "react";
import { useProductSearch } from "../../features/Search/hooks/useProductSearch.js";
import { products } from "../../data/products.js";
import ProductCard from "../../components/product/ProductCard/ProductCard.js";
import "./Collections.css";
import type { Product } from "../../types/models.js";

const Collections: React.FC = () => {
  const { searchTerm, filteredProducts } = useProductSearch();
  const hasResults = filteredProducts.length > 0;

  return (
    <main className="collections">
      <div className="collections__container">
        <h1 className="collections__title">
          Our <span className="collections__title-orange">Collection</span>
        </h1>
        
        <p className="collections__subtitle">
          Discover our latest drops and exclusive designs.
        </p>
        
        {searchTerm && (
          <p className="collections__search-status">
            Showing <span>{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'model' : 'models'} found for "{searchTerm}"
          </p>
        )}
        
        {!hasResults ? (
          <div className="collections__empty-state">
            <h2 className="collections__empty-title">We couldn't find that drop.</h2>
            <p className="collections__empty-suggestions">
              Try exploring keywords like <span>Sky</span>,<span>Terra</span> or <span>Urban</span>.
            </p>
          </div>
        ) : (
          <ul className="collections__grid" role="list">
            {filteredProducts.map((item: Product) => (
              <li key={item.id} role="listitem">
                <ProductCard product={item} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default Collections;