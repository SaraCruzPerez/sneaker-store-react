import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, it, expect, afterEach } from "vitest";
import Register from "./Register";
import { useUser } from "../../context/UserContext";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: () => mockNavigate,
}));

vi.mock("../../context/UserContext.js", () => ({
  useUser: vi.fn(),
}));

describe("Register Fast Path", () => {
  const mockLogin = vi.fn();

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("debe cubrir el 100% de la lógica de validación y navegación", () => {
    vi.mocked(useUser).mockReturnValue({ login: mockLogin } as any);
    
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const submitBtn = screen.getByText(/LET'S GO!/i);
    const nameInp = screen.getByLabelText(/full name/i);
    const emailInp = screen.getByLabelText(/email address/i);

    fireEvent.click(submitBtn);
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();

    fireEvent.change(nameInp, { target: { value: 'S' } });
    expect(screen.queryByText(/please enter your full name/i)).toBeNull();

    fireEvent.change(emailInp, { target: { value: 'invalid' } });
    fireEvent.click(submitBtn);
    expect(screen.getByText(/valid email address/i)).toBeInTheDocument();

    fireEvent.change(nameInp, { target: { value: ' Sara ' } });
    fireEvent.change(emailInp, { target: { value: 'TEST@MAIL.COM' } });
    fireEvent.click(submitBtn);

    expect(mockLogin).toHaveBeenCalledWith({ name: "Sara", email: "test@mail.com" });
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("debe renderizar correctamente la estructura inicial", () => {
    vi.mocked(useUser).mockReturnValue({ login: mockLogin } as any);
    render(<MemoryRouter><Register /></MemoryRouter>);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
});