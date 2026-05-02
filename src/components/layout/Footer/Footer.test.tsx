import { render, screen } from '../../../test/test-utils.js';
import { describe, it, expect } from 'vitest';
import Footer from './Footer.js';

describe('Footer Component', () => {
  it('debe mostrar el año actual correctamente', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });

  it('debe contener enlaces de navegación correctos', () => {
    render(<Footer />);
    
    const homeLink = screen.getByRole('link', { name: /^home$/i }); 
    const collectionsLink = screen.getByRole('link', { name: /collections/i });

    expect(homeLink).toHaveAttribute('href', '/');
    expect(collectionsLink).toHaveAttribute('href', '/collections');
  });

  it('debe tener enlaces a redes sociales con los atributos de seguridad', () => {
    render(<Footer />);
    
    const instagramLink = screen.getByLabelText(/follow us on instagram/i);
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com');
    expect(instagramLink).toHaveAttribute('target', '_blank');
    expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('debe mostrar la información de contacto correctamente', () => {
    render(<Footer />);
    
    expect(screen.getByText('support@sneakers.com')).toBeInTheDocument();
    expect(screen.getByText('+34 900 123 456')).toBeInTheDocument();
  });

  it('el logo debe ser un link a la home con un label accesible', () => {
    render(<Footer />);
    
    const logoLink = screen.getByLabelText(/sneakers home/i);
    expect(logoLink).toHaveAttribute('href', '/');
  });
});