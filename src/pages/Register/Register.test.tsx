import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, it, expect, beforeEach } from "vitest";
import Register from "./Register.js";
import { useUser } from "../../context/UserContext.js";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../context/UserContext", () => ({
  useUser: vi.fn(),
}));

describe("Register Page", () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useUser as any).mockReturnValue({
      login: mockLogin,
    });
  });

  it("debe renderizar el formulario correctamente", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /create account/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /let's go!/i }),
    ).toBeInTheDocument();
  });

  it("debe mostrar errores de validación si los campos están vacíos", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );

    const submitBtn = screen.getByRole("button", { name: /let's go!/i });
    fireEvent.click(submitBtn);

    expect(
      screen.getByText(/please enter your full name/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();

    expect(mockLogin).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("debe mostrar error si el formato del email es inválido", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const submitBtn = screen.getByRole("button", { name: /let's go!/i });

    fireEvent.change(nameInput, { target: { value: "Sara Cruz" } });
    fireEvent.change(emailInput, { target: { value: "email-no-valido" } });
    fireEvent.click(submitBtn);

    expect(
      screen.getByText(/please enter a valid email address/i),
    ).toBeInTheDocument();
  });

  it("debe llamar a login y navegar a la home si el formulario es válido", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const submitBtn = screen.getByRole("button", { name: /let's go!/i });

    fireEvent.change(nameInput, { target: { value: "Sara Cruz" } });
    fireEvent.change(emailInput, { target: { value: "sara@example.com" } });

    fireEvent.click(submitBtn);

    expect(mockLogin).toHaveBeenCalledWith({
      name: "Sara Cruz",
      email: "sara@example.com",
    });
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
