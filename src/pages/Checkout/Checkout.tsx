import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext.js'; 
import { useNavigate } from 'react-router-dom';

import ShippingForm from '../../components/checkout/ShippingForm/ShippingForm.js';
import PaymentStep from '../../components/checkout/PaymentForm/PaymentForm.js';
import OrderSuccess from '../../components/checkout/OrderSuccess/OrderSuccess.js';
import './Checkout.css';

import type { ShippingData, PaymentData, ShippingErrors, PaymentErrors } from '../../types/models.js';

interface CheckoutFormData extends ShippingData, PaymentData {}

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart(); 
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '', lastName: '', email: '', address: '', city: '', zip: '',
    cardNumber: '', expiry: '', cvc: ''
  });
  
  const [errors, setErrors] = useState<ShippingErrors | PaymentErrors>({});

  useEffect(() => {
    if (cart.length === 0 && step !== 3) {
      navigate('/');
    }
  }, [cart, step, navigate]);

  const nextStep = (): void => {
    setStep(2);
    window.scrollTo(0, 0); 
  };
  
  const prevStep = (): void => {
    setStep(1);
    window.scrollTo(0, 0);
  };

  const finishOrder = (): void => {
    clearCart(); 
    setStep(3);  
    window.scrollTo(0, 0);
  }; 

  if (step === 3) return <OrderSuccess />;

  return (
    <div className="checkout-page">
      <div className="checkout-page__container">
        <main className="checkout-page__main" id="checkout-content">
          {step === 1 ? (
            <ShippingForm 
              formData={formData} 
              setFormData={setFormData as any} 
              errors={errors as ShippingErrors} 
              setErrors={setErrors as any}
              onNext={nextStep} 
            />
          ) : (
            <PaymentStep 
              formData={formData} 
              setFormData={setFormData as any} 
              errors={errors as PaymentErrors} 
              setErrors={setErrors as any}
              onNext={finishOrder} 
              onBack={prevStep}
            />
          )}
        </main> 
      </div>
    </div>
  );
};

export default Checkout;