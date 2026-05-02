import { render, screen } from '../../test/test-utils.js';
import { describe, it, expect, vi } from 'vitest';
import CartButton from './CartButton.js';
import { useCart } from '../../context/CartContext.js';

vi.mock('../../context/CartContext.js', async (importOriginal) => {
  const actual = await (importOriginal() as Promise<any>);
  return {
    ...actual,
    useCart: vi.fn()
  };
});

describe('CartButton Component', () => {

  it('no debe mostrar el círculo del contador cuando el carrito está vacío', () => {
    (useCart as any).mockReturnValue({
      cart: []
    });

    render(<CartButton />);

    const countBadge = screen.queryByText(/[0-9]/);
    expect(countBadge).not.toBeInTheDocument();
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'View cart, bag is empty');
  });

  it('debe mostrar la suma total de cantidades', () => {
    const mockCart = [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 1 }
    ];

    (useCart as any).mockReturnValue({
      cart: mockCart
    });

    render(<CartButton />);

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('debe dirigir a la ruta /cart al hacer clic', () => {
    (useCart as any).mockReturnValue({
      cart: []
    });

    render(<CartButton />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/cart');
  });
});