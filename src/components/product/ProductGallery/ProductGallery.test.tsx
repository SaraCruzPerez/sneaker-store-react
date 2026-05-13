import React from 'react';
import { render, screen, fireEvent, cleanup } from '../../../test/test-utils.js';
import { describe, it, expect, afterEach } from 'vitest';
import ProductGallery from './ProductGallery.js';

const mockImages = ['img1.jpg', 'img2.jpg', 'img3.jpg'];

describe('ProductGallery Component', () => {
  afterEach(cleanup);

  it('debe mostrar un mensaje si no hay imágenes o la prop es nula', () => {
    const { rerender } = render(<ProductGallery images={[]} />);
    expect(screen.getByText(/no images available/i)).toBeInTheDocument();

    rerender(<ProductGallery images={null as any} />);
    expect(screen.getByText(/no images available/i)).toBeInTheDocument();
  });

  it('debe cambiar a la siguiente imagen y volver al inicio', () => {
    render(<ProductGallery images={mockImages} />);
    const nextBtn = screen.getByLabelText(/next image/i);
    
    const firstImg = screen.getByAltText('Product view 1');
    const slider = firstImg.parentElement!; 

    fireEvent.click(nextBtn); 
    fireEvent.click(nextBtn); 
    expect(slider).toHaveStyle({ transform: 'translateX(-200%)' });

    fireEvent.click(nextBtn); 
    expect(slider).toHaveStyle({ transform: 'translateX(-0%)' });
  });

  it('debe cambiar a la imagen anterior y saltar a la última', () => {
    render(<ProductGallery images={mockImages} />);
    const prevBtn = screen.getByLabelText(/previous image/i);
    const slider = screen.getByAltText('Product view 1').parentElement!;

    fireEvent.click(prevBtn);
    expect(slider).toHaveStyle({ transform: 'translateX(-200%)' });

    fireEvent.click(prevBtn); 
    expect(slider).toHaveStyle({ transform: 'translateX(-100%)' });
  });

  it('debe cambiar de imagen al hacer click en una miniatura o un punto', () => {
    render(<ProductGallery images={mockImages} />);
    const slider = screen.getByAltText('Product view 1').parentElement!;

    const thumb3 = screen.getByLabelText(/view product image 3/i);
    fireEvent.click(thumb3);
    expect(slider).toHaveStyle({ transform: 'translateX(-200%)' });

    const dot1 = screen.getByLabelText(/go to image 1/i);
    fireEvent.click(dot1);
    expect(slider).toHaveStyle({ transform: 'translateX(-0%)' });
  });

  it('debe manejar gestos táctiles', () => {
    render(<ProductGallery images={mockImages} />);
    
    const mainImg = screen.getByAltText('Product view 1');
    const slider = mainImg.parentElement!;

    fireEvent.touchStart(mainImg, { targetTouches: [{ clientX: 300 }] });
    fireEvent.touchEnd(mainImg, { changedTouches: [{ clientX: 100 }] });
    expect(slider).toHaveStyle({ transform: 'translateX(-100%)' });

    fireEvent.touchStart(mainImg, { targetTouches: [{ clientX: 100 }] });
    fireEvent.touchEnd(mainImg, { changedTouches: [{ clientX: 300 }] });
    expect(slider).toHaveStyle({ transform: 'translateX(-0%)' });
  });

  it('no debe hacer nada si el swipe es muy corto o el evento es inválido', () => {
    render(<ProductGallery images={mockImages} />);
    const mainImg = screen.getByAltText('Product view 1');
    const slider = mainImg.parentElement!;

    fireEvent.touchStart(mainImg, { targetTouches: [{ clientX: 100 }] });
    fireEvent.touchEnd(mainImg, { changedTouches: [{ clientX: 90 }] });
    expect(slider).toHaveStyle({ transform: 'translateX(-0%)' });

    fireEvent.touchEnd(mainImg, { changedTouches: [] });
    fireEvent.touchStart(mainImg, { targetTouches: [] });
    
    expect(slider).toHaveStyle({ transform: 'translateX(-0%)' });
  });
});