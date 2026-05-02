import { render, screen, fireEvent } from '../../../test/test-utils.js';
import { describe, it, expect } from 'vitest';
import ProductGallery from './ProductGallery.js';

const mockImages = ['img1.jpg', 'img2.jpg', 'img3.jpg'];

describe('ProductGallery Component', () => {
  it('debe mostrar un mensaje si no hay imágenes o la prop es nula', () => {
    const { rerender } = render(<ProductGallery images={[]} />);
    expect(screen.getByText(/No images available/i)).toBeInTheDocument();

    rerender(<ProductGallery images={null as any} />);
    expect(screen.getByText(/No images available/i)).toBeInTheDocument();
  });

  it('debe cambiar a la siguiente imagen y volver al inicio (Loop Next)', () => {
    render(<ProductGallery images={mockImages} />);
    const nextBtn = screen.getByLabelText(/Next image/i);
    const slider = screen.getByRole('img', { name: /Product view 1/i }).parentElement;

    fireEvent.click(nextBtn); 
    fireEvent.click(nextBtn); 
    expect(slider).toHaveStyle('transform: translateX(-200%)');

    fireEvent.click(nextBtn); 
    expect(slider).toHaveStyle('transform: translateX(-0%)');
  });

  it('debe cambiar a la imagen anterior y saltar a la última (Loop Prev)', () => {
    render(<ProductGallery images={mockImages} />);
    const prevBtn = screen.getByLabelText(/Previous image/i);
    const slider = screen.getByRole('img', { name: /Product view 1/i }).parentElement;

    fireEvent.click(prevBtn);
    expect(slider).toHaveStyle('transform: translateX(-200%)');

    fireEvent.click(prevBtn); 
    expect(slider).toHaveStyle('transform: translateX(-100%)');
  });

  it('debe cambiar de imagen al hacer click en una miniatura o un punto (Dots/Thumbs)', () => {
    render(<ProductGallery images={mockImages} />);
    const slider = screen.getByRole('img', { name: /Product view 1/i }).parentElement;

    const thumb3 = screen.getByLabelText(/View product image 3/i);
    fireEvent.click(thumb3);
    expect(slider).toHaveStyle('transform: translateX(-200%)');

    const dot1 = screen.getByLabelText(/Go to image 1/i);
    fireEvent.click(dot1);
    expect(slider).toHaveStyle('transform: translateX(-0%)');
  });

  it('debe manejar gestos táctiles (Swipe Next y Prev)', () => {
    render(<ProductGallery images={mockImages} />);
    const mainContainer = screen.getByRole('img', { name: /Product view 1/i }).closest('.gallery__main')!;
    const slider = screen.getByRole('img', { name: /Product view 1/i }).parentElement;

    fireEvent.touchStart(mainContainer, { targetTouches: [{ clientX: 300 }] });
    fireEvent.touchEnd(mainContainer, { changedTouches: [{ clientX: 100 }] });
    expect(slider).toHaveStyle('transform: translateX(-100%)');

    fireEvent.touchStart(mainContainer, { targetTouches: [{ clientX: 100 }] });
    fireEvent.touchEnd(mainContainer, { changedTouches: [{ clientX: 300 }] });
    expect(slider).toHaveStyle('transform: translateX(-0%)');
  });

  it('no debe hacer nada si el swipe es muy corto o el evento es inválido', () => {
    render(<ProductGallery images={mockImages} />);
    const mainContainer = screen.getByRole('img', { name: /Product view 1/i }).closest('.gallery__main')!;
    const slider = screen.getByRole('img', { name: /Product view 1/i }).parentElement;

    fireEvent.touchStart(mainContainer, { targetTouches: [{ clientX: 100 }] });
    fireEvent.touchEnd(mainContainer, { changedTouches: [{ clientX: 90 }] });
    expect(slider).toHaveStyle('transform: translateX(-0%)');

    fireEvent.touchEnd(mainContainer, { changedTouches: [] });
    
    fireEvent.touchStart(mainContainer, { targetTouches: [] });
  });
});