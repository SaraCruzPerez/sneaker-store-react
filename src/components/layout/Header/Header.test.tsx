import React from 'react';
import { render, screen, fireEvent } from '../../../test/test-utils.js'; 
import { describe, it, expect } from 'vitest';
import Header from './Header.js';

describe('Header Component', () => {
  it('debe renderizar el logo con el enlace a la home', () => {
    render(<Header />);
    
    const logoLink = screen.getByLabelText(/Sneakers Home/i);
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('debe abrir y cerrar el menú móvil al hacer clic en el botón', () => {
    render(<Header />);
    
    const menuBtn = screen.getByLabelText(/Open main menu/i);
    
    fireEvent.click(menuBtn);
    expect(menuBtn).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(menuBtn);
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('debe contener los botones de navegación', () => {
    render(<Header />);
    
    expect(screen.getByRole('link', { name: /view wishlist/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /cart/i })).toBeInTheDocument();
  });
});