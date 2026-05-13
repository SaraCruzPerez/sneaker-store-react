import React from 'react';
import { render, screen } from '../../../test/test-utils.js'; 
import { describe, it, expect } from 'vitest';
import CartEmpty from './CartEmpty.js';

describe('CartEmpty Component', () => {

  it('mostrar título y texto de carrito vacío', () => {
    render(<CartEmpty />); 

    expect(screen.getByRole('heading', { level: 2, name: /your bag is empty!/i })).toBeInTheDocument();
    expect(
      screen.getByText(/it looks like you haven't added any sneakers to your bag yet/i)
    ).toBeInTheDocument();
  });

  it('que tenga el botón que redirija a la página de Collections', () => {
    render(<CartEmpty />);

    const shopLink = screen.getByRole('link', { name: /go to shop/i });
    
    expect(shopLink).toBeInTheDocument();
    expect(shopLink).toHaveAttribute('href', '/collections');
  });

  it('que tenga la clase CSS correcta para el contenedor principal', () => {
    render(<CartEmpty />);
    
    const containerDiv = screen.getByText(/your bag is empty!/i).closest('div');
    expect(containerDiv).toHaveClass('cart-empty');
  });
});