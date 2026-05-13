import React from 'react';
import { render, screen, cleanup } from '../../../test/test-utils.js';
import { describe, it, expect, vi, afterEach } from 'vitest';
import Footer from './Footer.js';

vi.mock('lucide-react', () => ({
  Instagram: () => <div data-testid="icon" />,
  Twitter: () => <div data-testid="icon" />,
  Facebook: () => <div data-testid="icon" />,
  Github: () => <div data-testid="icon" />,
}));

describe('Footer Component Fast Path', () => {
  afterEach(cleanup);

  it('cumplir cobertura en un único ciclo de renderizado', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();

    const logoLink = screen.getByRole('link', { name: /sneakers home/i });
    expect(logoLink).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /^home$/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /collections/i })).toHaveAttribute('href', '/collections');

    const insta = screen.getByLabelText(/follow us on instagram/i);
    expect(insta).toHaveAttribute('target', '_blank');
    expect(insta).toHaveAttribute('rel', 'noopener noreferrer');

    expect(screen.getByText(/support@sneakers.com/i).closest('a')).toHaveAttribute('href', 'mailto:support@sneakers.com');
    expect(screen.getByText(/madrid, spain/i)).toBeInTheDocument();
  });
});