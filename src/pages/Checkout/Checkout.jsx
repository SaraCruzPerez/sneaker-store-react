import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext'; 
import { useNavigate } from 'react-router-dom';

import ShippingForm from '../../components/checkout/ShippingForm/ShippingForm';
import PaymentStep from '../../components/checkout/PaymentForm/PaymentForm';
import OrderSuccess from '../../components/checkout/OrderSuccess/OrderSuccess';
import './Checkout.css';

const Checkout = () => {
  const { cart, clearCart } = useCart(); 
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', lastName: '', email: '', address: '', city: '', zip: '',
    cardNumber: '', expiry: '', cvc: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cart.length === 0 && step !== 3) {
      navigate('/');
    }
  }, [cart, step, navigate]);

  const nextStep = () => {
    setStep(2);
    window.scrollTo(0, 0); 
  };
  
  const prevStep = () => {
    setStep(1);
    window.scrollTo(0, 0);
  };

  const finishOrder = () => {
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
              setFormData={setFormData} 
              errors={errors} 
              setErrors={setErrors}
              onNext={nextStep} 
            />
          ) : (
            <PaymentStep 
              formData={formData} 
              setFormData={setFormData} 
              errors={errors} 
              setErrors={setErrors}
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