import React from "react";
import { render, screen } from "../../test/test-utils.js";
import { describe, it, expect, vi } from "vitest";
import Collections from "./Collections.js";

vi.mock("../../data/products.js", () => ({
  products: [
    {
      id: "1",
      name: "Test Sneaker 1",
      brand: "Brand A",
      price: 100,
      images: { main: ["img1.jpg"], thumbnails: ["t1.jpg"] },
      description: "Desc 1",
      category: "running",
      sizes: [38, 39, 40, 41],
    },
    {
      id: "2",
      name: "Test Sneaker 2",
      brand: "Brand B",
      price: 200,
      images: { main: ["img2.jpg"], thumbnails: ["t2.jpg"] },
      description: "Desc 2",
      category: "casual",
      sizes: [42, 43, 44],
    },
  ],
}));

describe("Collections Page", () => {
  it("debe renderizar el título y el subtítulo correctamente", () => {
    render(<Collections />);

    const mainTitle = screen.getByRole("heading", { name: /our collection/i });
    expect(mainTitle).toBeInTheDocument();

    expect(screen.getByText(/discover our latest drops/i)).toBeInTheDocument();
  });

  it("debe renderizar la lista de productos con sus nombres", () => {
    render(<Collections />);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);

    expect(screen.getByText("Test Sneaker 1")).toBeInTheDocument();
    expect(screen.getByText("Test Sneaker 2")).toBeInTheDocument();
  });

  it("debe mostrar las tallas disponibles para los productos", () => {
    render(<Collections />);

    expect(screen.getByText("39")).toBeInTheDocument();
    expect(screen.getByText("43")).toBeInTheDocument();
  });
});
