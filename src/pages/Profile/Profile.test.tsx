import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { vi, describe, it, expect, beforeEach } from "vitest";
import Profile from "./Profile.js";
import { useUser } from "../../context/UserContext.js";

vi.mock("../../context/UserContext", () => ({
  useUser: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("Profile Page", () => {
  const mockLogout = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as any).mockReturnValue(mockNavigate);
  });

  it("debe redirigir a /register si no hay un usuario logueado", () => {
    (useUser as any).mockReturnValue({
      user: null,
      logout: mockLogout,
    });

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );

    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });

  it("debe mostrar la información del usuario si está logueado", () => {
    const mockUser = {
      name: "Sara Cruz",
      email: "sara@example.com",
    };

    (useUser as any).mockReturnValue({
      user: mockUser,
      logout: mockLogout,
    });

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Sara Cruz/i)).toBeInTheDocument();
    expect(screen.getByText(/sara@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Sneakers Community Member/i)).toBeInTheDocument();
  });

  it("debe llamar a logout y navegar a la raíz al hacer clic en el botón", () => {
    const mockUser = { name: "Sara Cruz", email: "sara@example.com" };

    (useUser as any).mockReturnValue({
      user: mockUser,
      logout: mockLogout,
    });

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );

    const logoutBtn = screen.getByRole("button", { name: /log out/i });
    fireEvent.click(logoutBtn);

    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
