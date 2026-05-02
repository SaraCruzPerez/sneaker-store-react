import { render, screen } from '../../../test/test-utils.js'; 
import { describe, it, expect } from 'vitest';
import CartSummary from './CartSummary.js';

describe('CartSummary Component', () => {
  const mockTotal = 150.5; 

  it('debe mostrar el subtotal y el total formateados con dos decimales', () => {
    render(<CartSummary total={mockTotal} />);

    const formattedPrice = '$150.50';
    const prices = screen.getAllByText(formattedPrice);
    expect(prices).toHaveLength(2);
  });

  it('debe mostrar que el envío es gratuito', () => {
    render(<CartSummary total={mockTotal} />);
    expect(screen.getByText(/Free/i)).toBeInTheDocument();
  });

  it('debe contener un enlace que dirija a la página de checkout', () => {
    render(<CartSummary total={mockTotal} />);
    
    const checkoutLink = screen.getByRole('link', { name: /Checkout Now/i });
    expect(checkoutLink).toBeInTheDocument();
    expect(checkoutLink).toHaveAttribute('href', '/checkout');
  });

  it('debe actualizarse correctamente si el total cambia', () => {
    const { rerender } = render(<CartSummary total={100} />);
    expect(screen.getAllByText('$100.00')).toHaveLength(2);

    rerender(<CartSummary total={200.758} />);
    
    expect(screen.getAllByText('$200.76')).toHaveLength(2);
  });
});