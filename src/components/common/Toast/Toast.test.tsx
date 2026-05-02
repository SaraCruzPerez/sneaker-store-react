import { render, screen } from '../../../test/test-utils.js';
import { describe, it, expect } from 'vitest';
import Toast from './Toast.js';

describe('Toast Component', () => {
  it('debe renderizar el mensaje correctamente', () => {
    const message = 'Product added to cart';
    render(<Toast message={message} action="add" />);

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('debe mostrar el símbolo "+" y la clase correcta para la acción "add"', () => {
    const { container } = render(<Toast message="Test" action="add" />);
    
    expect(screen.getByText('+')).toBeInTheDocument();
    
    const toastDiv = container.querySelector('.toast');
    expect(toastDiv).toHaveClass('toast--add');
  });

  it('debe mostrar el símbolo "−" y la clase correcta para la acción "remove"', () => {
    const { container } = render(<Toast message="Test" action="remove" />);
    
    expect(screen.getByText('−')).toBeInTheDocument();
    
    const toastDiv = container.querySelector('.toast');
    expect(toastDiv).toHaveClass('toast--remove');
  });

  it('debe tener los atributos de accesibilidad para ser anunciado por lectores de pantalla', () => {
    render(<Toast message="Notification" />);
    
    const toastElement = screen.getByRole('status');
    expect(toastElement).toHaveAttribute('aria-live', 'polite');
  });

  it('debe usar "add" como acción por defecto si no se proporciona una', () => {
    const { container } = render(<Toast message="Default action" />);
    
    const toastDiv = container.querySelector('.toast');
    expect(toastDiv).toHaveClass('toast--add');
    expect(screen.getByText('+')).toBeInTheDocument();
  });
});