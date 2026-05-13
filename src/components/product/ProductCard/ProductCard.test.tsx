import React from 'react';
import { render, screen, fireEvent, cleanup, waitFor } from '../../../test/test-utils.js';
import { describe, it, expect, vi, afterEach } from 'vitest';
import ProductCard from './ProductCard.js';
import type { Product } from '../../../types/models.js';

const mockProduct: Product = {
  id: 1,
  name: 'Sneaker Pro',
  brand: 'Nike',
  description: 'Test description',
  price: 100,
  discount: 20,
  stock: 10,
  sizes: [40, 41],
  images: { 
    main: ['image1.jpg'], 
    thumbs: ['thumb1.jpg'] 
  }
};

describe('ProductCard Coverage', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('debe ejecutar el foco en la primera talla tras abrir el selector', async () => {
    render(<ProductCard product={mockProduct} />);
    const cartBtn = screen.getByLabelText(/add to cart/i);
    fireEvent.click(cartBtn);

    const firstSizeBtn = screen.getByRole('button', { name: /select size 40/i });
    await waitFor(() => {
      expect(firstSizeBtn).toHaveFocus();
    });
  });

  it('debe gestionar correctamente la adición y eliminación de favoritos', () => {
    render(<ProductCard product={mockProduct} />);
    const wishBtn = screen.getByLabelText(/add to wishlist/i);
    
    fireEvent.click(wishBtn); 
    expect(screen.getByLabelText(/remove from wishlist/i)).toBeInTheDocument();

    fireEvent.click(wishBtn); 
    expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument();
  });

  it('debe cerrar el selector al elegir una talla y manejar fallback de imagen', () => {
  
    const productNoImg = { ...mockProduct, images: { main: [], thumbs: [] } };
    render(<ProductCard product={productNoImg} />);
    
    fireEvent.click(screen.getByLabelText(/add to cart/i));
    const sizeBtn = screen.getByRole('button', { name: /select size 40/i });
    fireEvent.click(sizeBtn);

    const overlay = screen.getByText(/select size/i).closest('.product__overlay');
    expect(overlay).not.toHaveClass('is-active');
  });

  it('debe cerrar al hacer click fuera y NO cerrar al hacer click dentro', () => {
    render(<ProductCard product={mockProduct} />);
    const cartBtn = screen.getByLabelText(/add to cart/i);
    fireEvent.click(cartBtn);
    
    const overlay = screen.getByText(/select size/i).closest('.product__overlay');
    expect(overlay).toHaveClass('is-active');

    fireEvent.mouseDown(overlay!);
    expect(overlay).toHaveClass('is-active'); 

    fireEvent.mouseDown(document.body);
    expect(overlay).not.toHaveClass('is-active'); 
  });

  it('debe gestionar el hover del botón de wishlist', () => {
    render(<ProductCard product={mockProduct} />);
    const wishBtn = screen.getByLabelText(/add to wishlist/i);
    const icon = wishBtn.querySelector('img');
    const initialSrc = icon?.getAttribute('src');

    fireEvent.mouseEnter(wishBtn);
    expect(icon?.getAttribute('src')).not.toBe(initialSrc);

    fireEvent.mouseLeave(wishBtn);
    expect(icon?.getAttribute('src')).toBe(initialSrc);
  });

  it('debe renderizar correctamente sin descuento', () => {
    const noDiscount = { ...mockProduct, discount: 0 };
    const { container } = render(<ProductCard product={noDiscount} />);
    
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
    expect(container.querySelector('.product__price-old')).toBeNull();
  });

  it('debe limpiar los event listeners al desmontar', () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    const { unmount } = render(<ProductCard product={mockProduct} />);
    
    fireEvent.click(screen.getByLabelText(/add to cart/i));
    unmount();
    
    expect(removeSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
  });
});