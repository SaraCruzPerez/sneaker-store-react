import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, it, expect, afterEach } from "vitest";
import Wishlist from "./Wishlist";
import { useWishlist } from "../../context/WishlistContext";
import type { Product } from "../../types/models";

vi.mock("../../context/WishlistContext", () => ({
  useWishlist: vi.fn(),
}));

const mockProduct1: Product = {
  id: 1,
  name: "Sneaker One",
  brand: "Brand",
  price: 100,
  discount: 0,
  description: "A great sneaker",
  stock: 10,
  images: { 
    main: ["img1.jpg"], 
    thumbs: ["t1.jpg"] 
  },
  sizes: [40],
};

describe("Wishlist Page Full Coverage", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("mostrar el mensaje cuando está vacía", () => {
    vi.mocked(useWishlist).mockReturnValue({
      wishlist: [],
      toggleWishlist: vi.fn(),
      addToWishlist: vi.fn(),
      removeFromWishlist: vi.fn(),
      isInWishlist: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>
    );

    expect(screen.getByText(/Your wishlist is empty/i)).toBeInTheDocument();
    expect(screen.getByText(/Start adding the sneakers/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Explore Collection/i })).toHaveAttribute("href", "/collections");
  });

  it("mostrar '1 item' en singular cuando solo hay un producto", () => {
    vi.mocked(useWishlist).mockReturnValue({
      wishlist: [mockProduct1],
      toggleWishlist: vi.fn(),
      addToWishlist: vi.fn(),
      removeFromWishlist: vi.fn(),
      isInWishlist: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>
    );

    expect(screen.getByText(/1 item saved/i)).toBeInTheDocument();
  });

  it("mostrar items en plural cuando hay más de un producto", () => {
    const mockProduct2 = { ...mockProduct1, id: 2, name: "Sneaker Two" };
    vi.mocked(useWishlist).mockReturnValue({
      wishlist: [mockProduct1, mockProduct2],
      toggleWishlist: vi.fn(),
      addToWishlist: vi.fn(),
      removeFromWishlist: vi.fn(),
      isInWishlist: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>
    );

    expect(screen.getByText(/2 items saved/i)).toBeInTheDocument();
  });

  it("renderizar la lista y llamar a toggleWishlist al eliminar", () => {
    const mockToggle = vi.fn();
    vi.mocked(useWishlist).mockReturnValue({
      wishlist: [mockProduct1],
      toggleWishlist: mockToggle,
      addToWishlist: vi.fn(),
      removeFromWishlist: vi.fn(),
      isInWishlist: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>
    );

    expect(screen.getByText("Sneaker One")).toBeInTheDocument();
    
    const removeBtn = screen.getByRole("button"); 
    fireEvent.click(removeBtn);

    expect(mockToggle).toHaveBeenCalledWith(mockProduct1);
  });
});