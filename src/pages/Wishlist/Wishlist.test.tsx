import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, it, expect } from "vitest";
import Wishlist from "./Wishlist.js";
import { useWishlist } from "../../context/WishlistContext.js";

vi.mock("../../context/WishlistContext", () => ({
  useWishlist: vi.fn(),
}));

vi.mock("../../context/NotificationContext", () => ({
  useNotification: vi.fn(() => ({
    showNotification: vi.fn(),
  })),
}));

const mockProduct1 = {
  id: "1",
  name: "Sneaker One",
  brand: "Brand",
  price: 100,
  images: { main: ["img1.jpg"] },
  sizes: [40],
};

const mockProduct2 = {
  id: "2",
  name: "Sneaker Two",
  brand: "Brand",
  price: 200,
  images: { main: ["img2.jpg"] },
  sizes: [42],
};

describe("Wishlist Page", () => {
  it("debe mostrar el estado vacío cuando no hay productos", () => {
    (useWishlist as any).mockReturnValue({
      wishlist: [],
      toggleWishlist: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>,
    );

    expect(screen.getByText(/your wishlist is empty/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /explore collection/i }),
    ).toHaveAttribute("href", "/collections");
  });

  it('debe mostrar el plural "items" cuando hay más de un producto', () => {
    (useWishlist as any).mockReturnValue({
      wishlist: [mockProduct1, mockProduct2],
      toggleWishlist: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>,
    );

    expect(screen.getByText(/2 items saved/i)).toBeInTheDocument();
  });

  it('debe mostrar el singular "item" cuando hay exactamente un producto', () => {
    (useWishlist as any).mockReturnValue({
      wishlist: [mockProduct1],
      toggleWishlist: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>,
    );

    expect(screen.getByText(/1 item saved/i)).toBeInTheDocument();
  });

  it("debe renderizar la lista de productos correctamente", () => {
    (useWishlist as any).mockReturnValue({
      wishlist: [mockProduct1],
      toggleWishlist: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>,
    );

    expect(screen.getByText("Sneaker One")).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("debe llamar a toggleWishlist al eliminar un producto", () => {
    const mockToggle = vi.fn();
    (useWishlist as any).mockReturnValue({
      wishlist: [mockProduct1],
      toggleWishlist: mockToggle,
    });

    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>,
    );

    const removeBtn = screen.getByRole("button", { name: /remove|delete/i });
    fireEvent.click(removeBtn);

    expect(mockToggle).toHaveBeenCalledWith(mockProduct1);
  });
});
