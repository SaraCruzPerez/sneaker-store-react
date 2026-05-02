import { render, screen } from "../../test/test-utils.js";
import { describe, it, expect, vi } from "vitest";
import Cart from "./Cart.js";
import { useCart } from "../../context/CartContext.js";

vi.mock("../../context/CartContext.js", async (importOriginal) => {
  const actual = await (importOriginal() as Promise<any>);
  return {
    ...actual,
    useCart: vi.fn(),
  };
});

describe("Cart Page Component", () => {
  it("debe mostrar el componente CartEmpty cuando el carrito está vacío", () => {
    (useCart as any).mockReturnValue({
      cart: [],
      removeFromCart: vi.fn(),
      getTotalPrice: () => 0,
    });

    render(<Cart />);

    expect(screen.getByRole("main")).toHaveClass("cart-page");
    expect(screen.queryByText(/items in your bag/i)).not.toBeInTheDocument();
  });

  it("debe mostrar la lista de productos y el total correcto cuando hay items", () => {
    const mockCartItems = [
      {
        id: "1",
        name: "Nike Air",
        brand: "Nike",
        size: "42",
        quantity: 1,
        finalPrice: 100,
        images: { main: ["img.jpg"] },
      },
      {
        id: "2",
        name: "Adidas Runner",
        brand: "Adidas",
        size: "40",
        quantity: 1,
        finalPrice: 50,
        images: { main: ["img2.jpg"] },
      },
    ];

    (useCart as any).mockReturnValue({
      cart: mockCartItems,
      removeFromCart: vi.fn(),
      getTotalPrice: () => 150,
    });

    render(<Cart />);

    expect(screen.getByText(/2 items in your bag/i)).toBeInTheDocument();
    expect(screen.getByText("Nike Air")).toBeInTheDocument();
    expect(screen.getByText("Adidas Runner")).toBeInTheDocument();
    expect(screen.getByLabelText(/Order summary/i)).toBeInTheDocument();
  });

  it('debe mostrar "1 item" en singular cuando solo hay un producto', () => {
    (useCart as any).mockReturnValue({
      cart: [
        {
          id: "1",
          name: "Nike Air",
          brand: "Nike",
          size: "42",
          quantity: 1,
          finalPrice: 100,
        },
      ],
      removeFromCart: vi.fn(),
      getTotalPrice: () => 100,
    });

    render(<Cart />);

    expect(screen.getByText(/1 item in your bag/i)).toBeInTheDocument();
  });
});
