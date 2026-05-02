import { render, screen, fireEvent } from '../../../test/test-utils.js';
import { describe, it, expect, vi } from 'vitest';
import ProductInfo from './ProductInfo.js';

const mockProduct = {
  id: '1',
  name: 'Running Shoes',
  brand: 'Adidas',
  price: 120,
  discount: 10, 
  description: 'Comfy shoes',
  sizes: [40, 41, 42],
  images: { main: ['img.jpg'] }
};

describe('ProductInfo Component', () => {
  const mockOnAddToCart = vi.fn();
  const mockOnWishlistToggle = vi.fn();

  it('debe mostrar la información del producto y el precio calculado', () => {
    render(
      <ProductInfo 
        product={mockProduct as any}
        onAddToCart={mockOnAddToCart}
        isFavorite={false}
        onWishlistToggle={mockOnWishlistToggle}
      />
    );

    expect(screen.getByText('Adidas')).toBeInTheDocument();
    expect(screen.getByText('Running Shoes')).toBeInTheDocument();
    expect(screen.getByText('$108.00')).toBeInTheDocument();
    expect(screen.getByText('$120.00')).toBeInTheDocument();
  });

  it('debe mostrar un error si se intenta añadir al carrito sin elegir talla', () => {
    render(
      <ProductInfo 
        product={mockProduct as any}
        onAddToCart={mockOnAddToCart}
        isFavorite={false}
        onWishlistToggle={mockOnWishlistToggle}
      />
    );

    const addBtn = screen.getByText(/Add to cart/i);
    fireEvent.click(addBtn);

    expect(screen.getByText(/Please select a size/i)).toBeInTheDocument();
    expect(mockOnAddToCart).not.toHaveBeenCalled();
  });

  it('debe incrementar y decrementar la cantidad correctamente', () => {
    render(
      <ProductInfo 
        product={mockProduct as any}
        onAddToCart={mockOnAddToCart}
        isFavorite={false}
        onWishlistToggle={mockOnWishlistToggle}
      />
    );

    const plusBtn = screen.getByLabelText(/Increase quantity/i);
    const minusBtn = screen.getByLabelText(/Decrease quantity/i);
    const quantityValue = screen.getByText('1');

    fireEvent.click(plusBtn);
    expect(screen.getByText('2')).toBeInTheDocument();

    fireEvent.click(minusBtn);
    expect(screen.getByText('1')).toBeInTheDocument();

    fireEvent.click(minusBtn);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('debe llamar a onAddToCart con la talla y cantidad seleccionadas', () => {
    render(
      <ProductInfo 
        product={mockProduct as any}
        onAddToCart={mockOnAddToCart}
        isFavorite={false}
        onWishlistToggle={mockOnWishlistToggle}
      />
    );

    const sizeBtn = screen.getByText('42');
    fireEvent.click(sizeBtn);

    const plusBtn = screen.getByLabelText(/Increase quantity/i);
    fireEvent.click(plusBtn);

    const addBtn = screen.getByText(/Add to cart/i);
    fireEvent.click(addBtn);

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct, 2, '42');
  });

  it('debe llamar a onWishlistToggle al pulsar el corazón', () => {
    render(
      <ProductInfo 
        product={mockProduct as any}
        onAddToCart={mockOnAddToCart}
        isFavorite={false}
        onWishlistToggle={mockOnWishlistToggle}
      />
    );

    const wishBtn = screen.getByLabelText(/Add to wishlist/i);
    fireEvent.click(wishBtn);

    expect(mockOnWishlistToggle).toHaveBeenCalledTimes(1);
  });
});