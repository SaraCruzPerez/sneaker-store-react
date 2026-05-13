import React from "react";
import { render, screen, cleanup } from "../../test/test-utils.js";
import { describe, it, expect, vi, afterEach } from "vitest";
import Collections from "./Collections.js";

vi.mock("../../data/products.js", () => ({
  products: [
    { id: 1, name: "Sneaker 1", sizes: [39], images: { main: [] } },
    { id: 2, name: "Sneaker 2", sizes: [43], images: { main: [] } },
  ],
}));

vi.mock("../../components/product/ProductCard/ProductCard.js", () => ({
  default: ({ product }: { product: any }) => (
    <div data-testid="mock-product-card">
      {product.name} - {product.sizes.join(',')}
    </div>
  ),
}));

describe("Collections Page Optimized", () => {
  afterEach(cleanup);

  it("cubrir en un solo ciclo de renderizado", () => {
    render(<Collections />);

    expect(screen.getByRole("heading", { name: /our collection/i })).toBeInTheDocument();
    expect(screen.getByText(/discover our latest drops/i)).toBeInTheDocument();

    // 2. Grid y Lista
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);

    expect(screen.getByText(/Sneaker 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Sneaker 2/i)).toBeInTheDocument();
    expect(screen.getByText(/39/i)).toBeInTheDocument();
    expect(screen.getByText(/43/i)).toBeInTheDocument();
  });
});