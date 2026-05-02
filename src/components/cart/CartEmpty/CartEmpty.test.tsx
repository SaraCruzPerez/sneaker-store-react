import { render, screen } from '../../../test/test-utils.js'; 
import { describe, it, expect } from 'vitest';
import CartEmpty from './CartEmpty.js';

describe('CartEmpty Component', () => {

  it('debe mostrar el título y el texto de carrito vacío correctamente', () => {
    render(<CartEmpty />); 

    expect(screen.getByText(/Your bag is empty!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/It looks like you haven't added any sneakers to your bag yet/i)
    ).toBeInTheDocument();
  });

  it('debe contener un botón (Link) que redirija a la página de colecciones', () => {
    render(<CartEmpty />);

    const shopLink = screen.getByRole('link', { name: /Go to shop/i });
    
    expect(shopLink).toBeInTheDocument();
    expect(shopLink).toHaveAttribute('href', '/collections');
  });

  it('debe tener la clase CSS correcta para el estilo', () => {
    const { container } = render(<CartEmpty />);
    
    expect(container.firstChild).toHaveClass('cart-empty');
  });
});