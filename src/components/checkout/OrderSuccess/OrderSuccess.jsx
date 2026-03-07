import './OrderSuccess.css'
import checkIcon from '../../../assets/icons/icon-check.svg'

const OrderSuccess = () => {

  return (
    <div className="checkout-success">
      <div className="checkout-success__card">
        <div className="checkout-success__icon">
          <img src={checkIcon} alt="" />
        </div>
        
        <h2 className="checkout-success__title">Order <span className="text-orange">Confirmed</span></h2>
        
        <p className="checkout-success__text">
          Thank you for your purchase! Your order has been processed successfully
        </p>

        <button 
          className="checkout-page__btn" 
          onClick={() => window.location.href = '/collections'}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
