import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CartProvider, useCart } from './CartContext.js';

const TestComponent = () => {
  const { cart, addToCart, removeFromCart, clearCart, getTotalPrice } = useCart();
  return (
    <div>
      <div data-testid="cart-count">{cart.length}</div>
      <div data-testid="total-price">{getTotalPrice()}</div>
      <button onClick={() => addToCart({ id: 1, name: 'Prod', price: 100, discount: 10, brand: 'B', image: 'i' }, 1, 'M')}>
        Add Discounted
      </button>
      <button onClick={() => addToCart({ id: 2, name: 'Normal', price: 50, discount: 0, brand: 'B', image: 'i' }, 1, 'L')}>
        Add No Discount
      </button>
      <button onClick={() => addToCart(null as any, 1, '')}>
        Add Invalid
      </button>
      <button onClick={() => removeFromCart(1, 'M')}>Remove Item</button>
      <button onClick={() => clearCart()}>Clear</button>
    </div>
  );
};

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('debe inicializar con localStorage vacío', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    expect(screen.getByTestId('cart-count').textContent).toBe('0');
  });

  it('debe cargar datos válidos de localStorage', () => {
    const initialCart = [{ id: 1, price: 100, discount: 0, finalPrice: 100, quantity: 2, size: 'M', name: 'A', brand: 'B', image: 'i' }];
    localStorage.setItem('cart', JSON.stringify(initialCart));
    
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    expect(screen.getByTestId('cart-count').textContent).toBe('1');
  });

  it('debe manejar errores de parsing en localStorage', () => {
    localStorage.setItem('cart', 'invalid-json');
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('cart-count').textContent).toBe('0');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('debe gestionar guards de producto o talla nulos', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    act(() => {
      screen.getByText('Add Invalid').click();
    });
    expect(screen.getByTestId('cart-count').textContent).toBe('0');
  });

  it('debe calcular precios con y sin descuento', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    act(() => {
      screen.getByText('Add Discounted').click(); 
      screen.getByText('Add No Discount').click(); 
    });

    expect(screen.getByTestId('total-price').textContent).toBe('140');
  });

  it('debe acumular cantidad si el producto y talla ya existen', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText('Add Discounted').click();
      screen.getByText('Add Discounted').click();
    });

    expect(screen.getByTestId('cart-count').textContent).toBe('1');
    expect(screen.getByTestId('total-price').textContent).toBe('180');
  });

  it('debe eliminar un producto específico por ID y talla', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText('Add Discounted').click();
      screen.getByText('Add No Discount').click();
    });
    expect(screen.getByTestId('cart-count').textContent).toBe('2');

    act(() => {
      screen.getByText('Remove Item').click();
    });
    expect(screen.getByTestId('cart-count').textContent).toBe('1');
    expect(screen.getByTestId('total-price').textContent).toBe('50');
  });

  it('debe limpiar el carrito', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText('Add Discounted').click();
      screen.getByText('Clear').click();
    });
    expect(screen.getByTestId('cart-count').textContent).toBe('0');
  });

  it('debe lanzar error fuera del provider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestComponent />)).toThrow("useCart must be used within a CartProvider");
    consoleSpy.mockRestore();
  });
});