import React, { createContext, useState, useContext, useEffect, type ReactNode } from "react";
import type { Product } from "../types/models.js";

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string | number) => void;
  isInWishlist: (productId: string | number) => boolean;
  toggleWishlist: (product: Product) => void; 
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product: Product) => setWishlist(prev => [...prev, product]);
  const removeFromWishlist = (id: string | number) => setWishlist(prev => prev.filter(i => i.id !== id));
  const isInWishlist = (id: string | number) => wishlist.some(i => i.id === id);
  const toggleWishlist = (p: Product) => isInWishlist(p.id) ? removeFromWishlist(p.id) : addToWishlist(p);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
};