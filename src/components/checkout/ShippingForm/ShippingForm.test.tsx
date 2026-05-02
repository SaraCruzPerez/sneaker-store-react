import React from 'react';
import { render, screen, fireEvent, cleanup } from '../../../test/test-utils.js';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ShippingForm from './ShippingForm.js';

describe('ShippingForm Full Coverage', () => {
  const emptyData = { name: '', lastName: '', email: '', address: '', city: '', zip: '' };
  const setFormData = vi.fn();
  const setErrors = vi.fn();
  const onNext = vi.fn();

  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('debe cubrir todas las ramas de handleChange', () => {
    const { rerender } = render(
      <ShippingForm 
        formData={emptyData} 
        setFormData={setFormData} 
        errors={{ name: 'Required' }} 
        setErrors={setErrors} 
        onNext={onNext} 
      />
    );

    const nameInput = screen.getByLabelText(/First Name/i);
    fireEvent.change(nameInput, { target: { name: 'name', value: 'S' } });
    expect(setErrors).toHaveBeenCalled();

    rerender(
      <ShippingForm 
        formData={emptyData} 
        setFormData={setFormData} 
        errors={{}} 
        setErrors={setErrors} 
        onNext={onNext} 
      />
    );
    fireEvent.change(nameInput, { target: { name: 'name', value: 'Sa' } });
  });

  it('debe cubrir todas las ramas de validacion y renderizado de errores', () => {
    const invalidData = { 
      name: ' ', 
      lastName: ' ', 
      email: 'bad-email', 
      address: ' ', 
      city: ' ', 
      zip: '12' 
    };
    
    const errorsState = {
      name: 'Required',
      lastName: 'Required',
      email: 'Invalid email',
      address: 'Address required',
      city: 'Required',
      zip: 'Required'
    };

    const { rerender } = render(
      <ShippingForm 
        formData={invalidData} 
        setFormData={setFormData} 
        errors={errorsState} 
        setErrors={setErrors} 
        onNext={onNext} 
      />
    );

    fireEvent.click(screen.getByRole('button'));
    
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.getByText('Address required')).toBeInTheDocument();
    expect(screen.getAllByText('Required')).toHaveLength(4);

    const emailInput = screen.getByLabelText(/Email Address/i);
    expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    expect(emailInput).toHaveAttribute('aria-describedby', 'email-error');

    rerender(
      <ShippingForm 
        formData={emptyData} 
        setFormData={setFormData} 
        errors={{}} 
        setErrors={setErrors} 
        onNext={onNext} 
      />
    );
    expect(emailInput).toHaveAttribute('aria-invalid', 'false');
    expect(emailInput).not.toHaveAttribute('aria-describedby');
  });

  it('debe cubrir la rama de exito de validate y handleSubmit', () => {
    const validData = {
      name: 'Sara',
      lastName: 'Cruz',
      email: 'sara@example.com',
      address: 'Calle 1',
      city: 'Madrid',
      zip: '28001'
    };

    render(
      <ShippingForm 
        formData={validData} 
        setFormData={setFormData} 
        errors={{}} 
        setErrors={setErrors} 
        onNext={onNext} 
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(onNext).toHaveBeenCalled();
  });

  it('debe validar especificamente el formato de email y zip', () => {
    const mixedData = { 
      ...emptyData, 
      name: 'A', 
      lastName: 'B', 
      email: 'test@test.', 
      address: 'C', 
      city: 'D', 
      zip: '123456' 
    };
    
    render(
      <ShippingForm 
        formData={mixedData} 
        setFormData={setFormData} 
        errors={{}} 
        setErrors={setErrors} 
        onNext={onNext} 
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(setErrors).toHaveBeenCalledWith(expect.objectContaining({
      email: "Invalid email",
      zip: "Required"
    }));
  });
});