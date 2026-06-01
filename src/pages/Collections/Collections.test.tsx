import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Collections from "./Collections.js";
import { useProductSearch } from "../../features/Search/hooks/useProductSearch.js";
import type { Product } from "../../types/models.js";

vi.mock("../../features/Search/hooks/useProductSearch.js", () => ({
  useProductSearch: vi.fn(),
}));

vi.mock("../../components/product/ProductCard/ProductCard.js", () => ({
  default: ({ product }: { product: Product }) => (
    <div data-testid="mock-product-card">
      {product.name} - {product.sizes.join(",")}
    </div>
  ),
}));

describe("Collections Page", () => {
  it("renders correctly with products list when search is empty", () => {
    const mockProducts: Product[] = [
      { id: 1, brand: "URBAN", name: "Sneaker 1", description: "", price: 100, discount: 0, stock: 5, sizes: [39], images: { main: [], thumbs: [] } },
      { id: 2, brand: "SKY", name: "Sneaker 2", description: "", price: 120, discount: 0, stock: 2, sizes: [43], images: { main: [], thumbs: [] } },
    ];

    vi.mocked(useProductSearch).mockReturnValue({
      searchTerm: "",
      filteredProducts: mockProducts,
    });

    render(
      <MemoryRouter>
        <Collections />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /our collection/i })).toBeInTheDocument();
    expect(screen.getByText(/discover our latest drops/i)).toBeInTheDocument();

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(screen.getByText(/Sneaker 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Sneaker 2/i)).toBeInTheDocument();
  });

  it("shows search status message when a search term is present", () => {
    const mockProducts: Product[] = [
      { id: 1, brand: "URBAN", name: "Sneaker 1", description: "", price: 100, discount: 0, stock: 5, sizes: [39], images: { main: [], thumbs: [] } }
    ];

    vi.mocked(useProductSearch).mockReturnValue({
      searchTerm: "Urban",
      filteredProducts: mockProducts,
    });

    render(
      <MemoryRouter>
        <Collections />
      </MemoryRouter>
    );

    expect(screen.getByText(/showing/i)).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText(/model found for/i)).toBeInTheDocument();
    expect(screen.getByText(/"Urban"/i)).toBeInTheDocument();
  });

  it("renders empty state when no products match the search", () => {
    vi.mocked(useProductSearch).mockReturnValue({
      searchTerm: "Unobtainable",
      filteredProducts: [],
    });

    render(
      <MemoryRouter>
        <Collections />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /we couldn't find that drop/i })).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});