import { useState } from 'react';
import { useCart } from '../../context/CartContext'; 
import ShippingForm from '../../components/checkout/ShippingForm/ShippingForm';
import PaymentStep from '../../components/checkout/PaymentForm/PaymentForm';
import OrderSuccess from '../../components/checkout/OrderSuccess/OrderSuccess';
import './Checkout.css';

const Checkout = () => {
  const { cart, clearCart } = useCart(); 
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', lastName: '', email: '', address: '', city: '', zip: '',
    cardNumber: '', expiry: '', cvc: ''
  });
  const [errors, setErrors] = useState({});

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  const finishOrder = () => {
    setStep(3);
    clearCart();    
  };

  if (cart.length === 0 && step !== 3) {
    window.location.href = '/';
    return null;
  }

  if (step === 3) return <OrderSuccess />;

  return (
    <div className="checkout-page">
      <div className="checkout-page__container">
        <main className="checkout-page__main">
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