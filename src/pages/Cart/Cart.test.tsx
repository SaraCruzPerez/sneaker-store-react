import { render, screen, cleanup, fireEvent } from "../../test/test-utils.js";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Cart from "./Cart.js";
import { useCart } from "../../context/CartContext.js";

vi.mock("../../context/CartContext.js", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../context/CartContext.js")>();
  return {
    ...actual,
    useCart: vi.fn(),
  };
});

describe("Cart Page Coverage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(cleanup);

  it("debe renderizar correctamente el carrito vacío", () => {
    (useCart as any).mockReturnValue({
      cart: [],
      removeFromCart: vi.fn(),
      getTotalPrice: () => 0,
    });

    render(<Cart />);
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.queryByText(/in your bag/i)).not.toBeInTheDocument();
  });

  it("debe renderizar el carrito lleno y el plural de items", () => {
    (useCart as any).mockReturnValue({
      cart: [
        { id: "1", name: "A", size: "40", quantity: 1, finalPrice: 10, images: { main: [""] } },
        { id: "2", name: "B", size: "41", quantity: 1, finalPrice: 20, images: { main: [""] } }
      ],
      removeFromCart: vi.fn(),
      getTotalPrice: () => 30,
    });

    render(<Cart />);
    expect(screen.getByText(/2 items in your bag/i)).toBeInTheDocument();
  });

  it("debe renderizar el singular 'item' cuando hay solo uno", () => {
    (useCart as any).mockReturnValue({
      cart: [{ id: "1", name: "A", size: "40", quantity: 1, finalPrice: 10, images: { main: [""] } }],
      removeFromCart: vi.fn(),
      getTotalPrice: () => 10,
    });

    render(<Cart />);
    expect(screen.getByText(/1 item in your bag/i)).toBeInTheDocument();
  });

  it("debe ejecutar la función de borrado con los argumentos correctos", () => {
    const mockRemove = vi.fn();
    (useCart as any).mockReturnValue({
      cart: [{ id: "sneaker-123", name: "Nike", size: "44", quantity: 1, finalPrice: 100, images: { main: [""] } }],
      removeFromCart: mockRemove,
      getTotalPrice: () => 100,
    });

    render(<Cart />);

    const removeBtn = screen.getByRole("button", { name: /remove/i });
    
    fireEvent.click(removeBtn);

    expect(mockRemove).toHaveBeenCalledWith("sneaker-123", "44");
  });
});