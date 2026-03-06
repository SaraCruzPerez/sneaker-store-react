import { Link } from "react-router-dom"
import { Truck, ShieldCheck, CreditCard } from "lucide-react"
import "./Home.css"

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero__container">
          <h1 className="hero__title">INTO THE FUTURE</h1>
          <p className="hero__text">
            Experience the perfect blend of comfort and street style
          </p>
          <Link to="/collections" className="hero__btn">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="features__container">
          <div className="features__item">
            <div className="features__icon">
              <Truck size={32} strokeWidth={1.5} />
            </div>
            <h3 className="features__subtitle">Free Delivery</h3>
            <p className="features__info">On all orders over $100</p>
          </div>

          <div className="features__item">
            <div className="features__icon">
              <ShieldCheck size={32} strokeWidth={1.5} />
            </div>
            <h3 className="features__subtitle">Premium Quality</h3>
            <p className="features__info">Crafted with the best materials</p>
          </div>

          <div className="features__item">
            <div className="features__icon">
              <CreditCard size={32} strokeWidth={1.5} />
            </div>
            <h3 className="features__subtitle">Secure Payment</h3>
            <p className="features__info">100% safe checkout process</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;