import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import Profile from "./Profile";
import { useUser } from "../../context/UserContext";

vi.mock("../../context/UserContext", () => ({
  useUser: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("Profile Page Full Coverage", () => {
  const mockLogout = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    cleanup();
  });

  it("debe redirigir a /register si no hay un usuario logueado", () => {
    vi.mocked(useUser).mockReturnValue({
      user: null,
      logout: mockLogout,
      login: vi.fn(),
      isLoggedIn: false,
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
      id: "1",
      name: "Sara Cruz",
      email: "sara@example.com",
    };

    vi.mocked(useUser).mockReturnValue({
      user: mockUser,
      logout: mockLogout,
      login: vi.fn(),
      isLoggedIn: true,
    });

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /Sara Cruz/i })).toBeInTheDocument();
    expect(screen.getByText("S")).toBeInTheDocument();
  });

  it("debe mostrar 'U' como inicial si el nombre del usuario no existe", () => {
    const mockUserNoName = {
      id: "2",
      name: "", 
      email: "anon@example.com",
    };

    vi.mocked(useUser).mockReturnValue({
      user: mockUserNoName,
      logout: mockLogout,
      login: vi.fn(),
      isLoggedIn: true,
    });

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );

    expect(screen.getByText("U")).toBeInTheDocument();
  });

  it("debe llamar a logout y navegar a la raíz al hacer clic en el botón", () => {
    const mockUser = { id: "1", name: "Sara Cruz", email: "sara@example.com" };

    vi.mocked(useUser).mockReturnValue({
      user: mockUser,
      logout: mockLogout,
      login: vi.fn(),
      isLoggedIn: true,
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