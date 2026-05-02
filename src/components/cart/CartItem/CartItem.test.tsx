import { render, screen, fireEvent, cleanup } from '../../../test/test-utils.js'; 
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import CartItem from './CartItem.js'; 

describe('CartItem Component - Branch Coverage Boost', () => {
  const mockItem = {
    id: '1',
    name: 'Nike Air',
    brand: 'Nike',
    size: '39',
    quantity: 2,
    finalPrice: 100,
    images: { main: ['nike.jpg'] }
  };

  const mockOnRemove = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('debe retornar null si no hay item (Branch: !item)', () => {
    const { container } = render(<CartItem item={null as any} onRemove={mockOnRemove} />);
    expect(container.firstChild).toBeNull();
  });

  it('debe usar la imagen desde item.image si images.main no existe (Branch: item.image)', () => {
    const itemWithSimpleImage = {
      ...mockItem,
      images: null,
      image: 'simple-image.jpg'
    };
    const { container } = render(<CartItem item={itemWithSimpleImage as any} onRemove={mockOnRemove} />);
    
    const img = container.querySelector('.cart-item__img');
    expect(img).toHaveAttribute('src', 'simple-image.jpg');
  });

  it('debe usar la imagen desde item.img como último recurso (Branch: item.img)', () => {
    const itemWithImgField = {
      ...mockItem,
      images: undefined,
      image: undefined,
      img: 'last-resort.jpg'
    };
    const { container } = render(<CartItem item={itemWithImgField as any} onRemove={mockOnRemove} />);
    
    const img = container.querySelector('.cart-item__img');
    expect(img).toHaveAttribute('src', 'last-resort.jpg');
  });

  it('debe mostrar la información básica y calcular el precio total', () => {
    render(<CartItem item={mockItem as any} onRemove={mockOnRemove} />);

    expect(screen.getByText('Nike Air')).toBeInTheDocument();
    expect(screen.getByText('Nike')).toBeInTheDocument();
    expect(screen.getByText('$200.00')).toBeInTheDocument();
  });

  it('debe llamar a onRemove con los argumentos correctos', () => {
    render(<CartItem item={mockItem as any} onRemove={mockOnRemove} />);

    const deleteButton = screen.getByLabelText(/Remove Nike Air size 39/i);
    fireEvent.click(deleteButton);

    expect(mockOnRemove).toHaveBeenCalledWith('1', '39');
  });
});