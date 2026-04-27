import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSuccess.css';
import checkIcon from '../../../assets/icons/icon-check.svg';

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="checkout-success" role="main" aria-live="polite">
      <div className="checkout-success__container">
        <div className="checkout-success__icon">
          <img src={checkIcon} alt="" aria-hidden="true" />
        </div>
        
        <h2 className="checkout-success__title">
          Order <span className="text-orange">Confirmed</span>
        </h2>
        
        <p className="checkout-success__text">
          Thank you for your purchase! Your order has been processed successfully
        </p>

        <button 
          type="button" 
          className="checkout-page__btn" 
          onClick={() => navigate('/collections')}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;