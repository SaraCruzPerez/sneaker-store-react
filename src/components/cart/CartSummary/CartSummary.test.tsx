import React from 'react';
import { render, screen } from '../../../test/test-utils.js'; 
import { describe, it, expect } from 'vitest';
import CartSummary from './CartSummary.js';

describe('CartSummary Component', () => {
  const mockTotal = 150.5; 

  it('debe mostrar el título de la sección correctamente', () => {
    render(<CartSummary total={mockTotal} />);
    expect(screen.getByRole('heading', { level: 2, name: /order summary/i })).toBeInTheDocument();
  });

  it('debe mostrar el subtotal y el total formateados con dos decimales', () => {
    render(<CartSummary total={mockTotal} />);

    const formattedPrice = '$150.50';
    const prices = screen.getAllByText(formattedPrice);
    expect(prices).toHaveLength(2);
  });

  it('debe mostrar que el envío es gratuito', () => {
    render(<CartSummary total={mockTotal} />);
    expect(screen.getByText(/free/i)).toBeInTheDocument();
  });

  it('debe contener un enlace que dirija a la página de checkout', () => {
    render(<CartSummary total={mockTotal} />);
    
    const checkoutLink = screen.getByRole('link', { name: /checkout now/i });
    expect(checkoutLink).toBeInTheDocument();
    expect(checkoutLink).toHaveAttribute('href', '/checkout');
  });

  it('debe redondear y formatear correctamente los decimales cuando el total cambia', () => {
    const { rerender } = render(<CartSummary total={100} />);
    expect(screen.getAllByText('$100.00')).toHaveLength(2);

    rerender(<CartSummary total={200.758} />);
    expect(screen.getAllByText('$200.76')).toHaveLength(2);
  });

  it('debe tener atributos de accesibilidad en el precio total', () => {
    render(<CartSummary total={mockTotal} />);
    const totalPrice = screen.getByText('$150.50', { selector: '.cart-summary__total span' });
    expect(totalPrice).toHaveAttribute('aria-live', 'polite');
  });
});