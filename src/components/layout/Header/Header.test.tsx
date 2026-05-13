import React from 'react';
import { render, screen, fireEvent, cleanup } from '../../../test/test-utils.js'; 
import { describe, it, expect, afterEach, vi } from 'vitest';
import Header from './Header.js';

vi.mock('../../../features/Cart/CartButton.js', () => ({
  default: () => <a href="/cart" aria-label="cart">Cart</a>
}));
vi.mock('../../../features/Wishlist/WishlistButton.js', () => ({
  default: () => <a href="/wishlist" aria-label="view wishlist">Wishlist</a>
}));
vi.mock('../../../features/User/UserButton.js', () => ({
  default: () => <button aria-label="user profile">User</button>
}));

describe('Header Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('debe renderizar el logo con el enlace a la home', () => {
    render(<Header />);
    const logoLink = screen.getByRole('link', { name: /sneakers home/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('debe abrir y cerrar el menú móvil al hacer clic en el botón', () => {
    render(<Header />);
    
    const menuBtn = screen.getByRole('button', { name: /open main menu/i });
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(menuBtn);
    expect(menuBtn).toHaveAttribute('aria-expanded', 'true');
    expect(menuBtn).toHaveAttribute('aria-label', 'Close main menu');

    fireEvent.click(menuBtn);
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
    expect(menuBtn).toHaveAttribute('aria-label', 'Open main menu');
  });

  it('debe contener los botones de acción (Wishlist y Cart)', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /view wishlist/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /cart/i })).toBeInTheDocument();
  });

  it('debe vincular el botón del menú con el ID de la navegación', () => {
    render(<Header />);
    const menuBtn = screen.getByRole('button', { name: /main menu/i });
    expect(menuBtn).toHaveAttribute('aria-controls', 'menu-navigation');
  });
});