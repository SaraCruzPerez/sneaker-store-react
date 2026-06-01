import { useSearchParams } from "react-router-dom";
import { products } from "../../../data/products.js";
import type { Product } from "../../../types/models.js";

interface UseProductSearchReturn {
  searchTerm: string;
  filteredProducts: Product[];
}

export const useProductSearch = (): UseProductSearchReturn => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const filteredProducts = products.filter((item: Product) => {
    const matchesName = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = item.brand?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    
    return matchesName || matchesBrand;
  });

  return {
    searchTerm,
    filteredProducts,
  };
};