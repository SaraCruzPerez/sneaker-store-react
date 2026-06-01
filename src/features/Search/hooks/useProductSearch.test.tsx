import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useProductSearch } from "./useProductSearch.js";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import type { Product } from "../../../types/models.js";

vi.mock("../../../data/products.js", () => {
  const mockProducts: Product[] = [
    { 
      id: 1, 
      brand: "Nike", 
      name: "Air Jordan Retro", 
      description: "Mock description 1",
      price: 200,
      discount: 0,
      stock: 5,
      sizes: [42], 
      images: { main: ["img1.png"], thumbs: ["thumb1.png"] } 
    },
    { 
      id: 2, 
      brand: "Adidas", 
      name: "Forum Low", 
      description: "Mock description 2",
      price: 150,
      discount: 0,
      stock: 3,
      sizes: [43], 
      images: { main: ["img2.png"], thumbs: ["thumb2.png"] } 
    },
    { 
      id: 3, 
      brand: "Nike", 
      name: "Terra Kiger", 
      description: "Mock description 3",
      price: 180,
      discount: 0,
      stock: 0,
      sizes: [41], 
      images: { main: ["img3.png"], thumbs: ["thumb3.png"] } 
    },
  ];
  return { products: mockProducts };
});

describe("useProductSearch Custom Hook", () => {
  it("should return all products when search param is empty", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter initialEntries={["/collections"]}>
        {children}
      </MemoryRouter>
    );

    const { result } = renderHook(() => useProductSearch(), { wrapper });

    expect(result.current.searchTerm).toBe("");
    expect(result.current.filteredProducts).toHaveLength(3);
  });

  it("should filter products by name correctly", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter initialEntries={["/collections?search=Jordan"]}>
        {children}
      </MemoryRouter>
    );

    const { result } = renderHook(() => useProductSearch(), { wrapper });

    expect(result.current.searchTerm).toBe("Jordan");
    expect(result.current.filteredProducts).toHaveLength(1);
    
    const firstProduct = result.current.filteredProducts[0] as unknown as Product;
    expect(firstProduct.name).toBe("Air Jordan Retro");
  });

  it("should filter products by brand correctly", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter initialEntries={["/collections?search=Adidas"]}>
        {children}
      </MemoryRouter>
    );

    const { result } = renderHook(() => useProductSearch(), { wrapper });

    expect(result.current.filteredProducts).toHaveLength(1);
    
    const firstProduct = result.current.filteredProducts[0] as unknown as Product;
    expect(firstProduct.brand).toBe("Adidas");
  });

  it("should be case insensitive", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter initialEntries={["/collections?search=tErRa"]}>
        {children}
      </MemoryRouter>
    );

    const { result } = renderHook(() => useProductSearch(), { wrapper });

    expect(result.current.filteredProducts).toHaveLength(1);
    
    const firstProduct = result.current.filteredProducts[0] as unknown as Product;
    expect(firstProduct.name).toBe("Terra Kiger");
  });

  it("should return empty array when no matches are found", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter initialEntries={["/collections?search=NonExistent"]}>
        {children}
      </MemoryRouter>
    );

    const { result } = renderHook(() => useProductSearch(), { wrapper });

    expect(result.current.filteredProducts).toHaveLength(0);
  });
});