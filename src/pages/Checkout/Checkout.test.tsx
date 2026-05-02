import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import Checkout from "./Checkout.js";
import { useCart } from "../../context/CartContext.js";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock("../../context/CartContext", () => ({
  useCart: vi.fn(),
}));

window.scrollTo = vi.fn();

describe("Checkout Page Full Coverage", () => {
  const mockClearCart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useCart as any).mockReturnValue({
      cart: [{ id: 1, name: "Product", price: 10 }],
      clearCart: mockClearCart,
    });
  });

  afterEach(() => {
    cleanup();
  });

  const fillShippingForm = () => {
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "Sara" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Cruz" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "sara@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/shipping address/i), {
      target: { value: "Calle Falsa 123" },
    });
    fireEvent.change(screen.getByLabelText(/city/i), {
      target: { value: "Madrid" },
    });
    fireEvent.change(screen.getByLabelText(/zip code/i), {
      target: { value: "28001" },
    });
  };

  it('debe redirigir a "/" si el carrito está vacío', () => {
    (useCart as any).mockReturnValue({
      cart: [],
      clearCart: mockClearCart,
    });

    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>,
    );

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("debe permitir volver al paso anterior (Cubre líneas 38-39)", async () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>,
    );

    fillShippingForm();
    fireEvent.click(
      screen.getByRole("button", { name: /continue to payment/i }),
    );

    const backBtn = await screen.findByRole("button", { name: /back|return/i });

    fireEvent.click(backBtn);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("debe avanzar al paso de pago al completar el envío correctamente", async () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>,
    );

    fillShippingForm();
    const nextBtn = screen.getByRole("button", {
      name: /continue to payment/i,
    });
    fireEvent.click(nextBtn);

    await waitFor(() => {
      expect(screen.getByText(/payment/i)).toBeInTheDocument();
    });
  });

  it("debe limpiar el carrito y mostrar éxito al finalizar la orden", async () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>,
    );

    fillShippingForm();
    fireEvent.click(
      screen.getByRole("button", { name: /continue to payment/i }),
    );

    const cardInput = await screen.findByLabelText(/card number/i);
    fireEvent.change(cardInput, { target: { value: "1234567812345678" } });
    fireEvent.change(screen.getByLabelText(/expiry/i), {
      target: { value: "12/25" },
    });
    fireEvent.change(screen.getByLabelText(/cvc/i), {
      target: { value: "123" },
    });

    const finishBtn = screen.getByRole("button", {
      name: /confirm and pay|pay|finish/i,
    });
    fireEvent.click(finishBtn);

    await waitFor(() => {
      expect(mockClearCart).toHaveBeenCalled();
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    });
  });
});
