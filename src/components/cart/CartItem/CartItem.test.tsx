import React from 'react';
import { render, screen, userEvent } from '../../../test/test-utils'; 
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CartItem from './CartItem'; 
import type { CartItem as CartItemType } from "../../../types/models";

describe('CartItem Component', () => {
  const mockItem: CartItemType = {
    id: 1,
    name: 'Nike Air',
    brand: 'Nike',
    size: '39',
    quantity: 2,
    price: 120, 
    discount: 0, 
    finalPrice: 100,
    image: 'nike.jpg',
    images: { main: ['nike.jpg'], thumbs: ['nike.jpg'] },
    stock: 10,
    sizes: ['39', '40'],
    description: 'Test description'
  };

  const mockOnRemove = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe retornar null si no hay producto', () => {
    const { container } = render(<CartItem item={null as any} onRemove={mockOnRemove} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('debe usar la imagen principal desde el objeto images', () => {
    render(<CartItem item={mockItem} onRemove={mockOnRemove} />);
    const img = screen.getByAltText('Nike Air');
    expect(img).toHaveAttribute('src', 'nike.jpg');
  });

  it('debe usar item.image si images.main no existe', () => {
    const itemWithSimpleImage = {
      ...mockItem,
      images: { main: [] } 
    };
    render(<CartItem item={itemWithSimpleImage as any} onRemove={mockOnRemove} />);
    
    const img = screen.getByAltText('Nike Air');
    expect(img).toHaveAttribute('src', 'nike.jpg');
  });

  it('debe usar item.img como último recurso', () => {
    const itemWithImgField = {
      ...mockItem,
      images: undefined,
      image: undefined,
      img: 'last-resort.jpg'
    };
    render(<CartItem item={itemWithImgField as any} onRemove={mockOnRemove} />);
    
    const img = screen.getByAltText('Nike Air');
    expect(img).toHaveAttribute('src', 'last-resort.jpg');
  });

  it('debe mostrar la información básica y el precio total calculado', () => {
    render(<CartItem item={mockItem} onRemove={mockOnRemove} />);

    expect(screen.getByText('Nike Air')).toBeInTheDocument();
    expect(screen.getByText('Nike')).toBeInTheDocument();
    expect(screen.getByText('Size:')).toBeInTheDocument();
    expect(screen.getByText('39')).toBeInTheDocument();
    expect(screen.getByText('$200.00')).toBeInTheDocument();
  });

  it('debe llamar a onRemove con los argumentos correctos al hacer clic', async () => {
    const user = userEvent.setup(); 
    render(<CartItem item={mockItem} onRemove={mockOnRemove} />);

    const deleteButton = screen.getByLabelText(/Remove Nike Air size 39/i);
    await user.click(deleteButton);

    expect(mockOnRemove).toHaveBeenCalledWith(1, '39');
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });

  it('debe tener un enlace correcto a la página del producto', () => {
    render(<CartItem item={mockItem} onRemove={mockOnRemove} />);
    const link = screen.getByRole('link', { name: /view nike air/i });
    expect(link).toHaveAttribute('href', '/product/1');
  });
});