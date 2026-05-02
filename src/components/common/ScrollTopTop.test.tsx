import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route, Link } from 'react-router-dom';
import ScrollToTop from './ScrollToTop.js';

describe('ScrollToTop Component', () => {
  
  beforeEach(() => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  it('debe llamar a window.scrollTo(0, 0) cuando cambia la ruta', () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo');

    render(
      <MemoryRouter initialEntries={['/']}>
        <ScrollToTop />
        <nav>
          <Link to="/new-page">Go to New Page</Link>
        </nav>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/new-page" element={<div>New Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);

    const link = screen.getByText(/Go to New Page/i);
    fireEvent.click(link);
 
    expect(scrollToSpy).toHaveBeenCalledTimes(2);
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 0);
  });

  it('no debe renderizar nada en el DOM', () => {
    const { container } = render(
      <MemoryRouter>
        <ScrollToTop />
      </MemoryRouter>
    );

    expect(container.firstChild).toBeNull();
  });
});