import { render, screen, fireEvent } from '../../../test/test-utils.js';
import { describe, it, expect, vi } from 'vitest';
import OrderSuccess from './OrderSuccess.js';
import * as router from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('OrderSuccess Component', () => {
  it('debe renderizar el mensaje de éxito correctamente', () => {
    render(<OrderSuccess />);

    expect(screen.getByRole('heading', { name: /Order Confirmed/i })).toBeInTheDocument();    
    expect(screen.getByText(/Thank you for your purchase/i)).toBeInTheDocument();
  });

  it('debe navegar a la página de colecciones al pulsar el botón', () => {
    const navigateMock = vi.fn();
    vi.mocked(router.useNavigate).mockReturnValue(navigateMock);

    render(<OrderSuccess />);

    const button = screen.getByRole('button', { name: /Continue Shopping/i });
    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalledWith('/collections');
  });

  it('debe tener los atributos de accesibilidad correctos', () => {
    render(<OrderSuccess />);
    
    const container = screen.getByRole('main');
    expect(container).toHaveAttribute('aria-live', 'polite');
  });
});