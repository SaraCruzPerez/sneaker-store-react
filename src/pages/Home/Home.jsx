import { Link } from "react-router-dom"
import { Truck, ShieldCheck, CreditCard } from "lucide-react"
import "./Home.css"

const Home = () => {
  return (
    <div className="home">
      <section className="hero" aria-label="Introduction">
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

      <section className="features" aria-label="Our services">
        <div className="features__container">
          <ul className="features__list" role="list">
            <li className="features__item">
              <div className="features__icon" aria-hidden="true">
                <Truck size={32} strokeWidth={1.5} />
              </div>
              <h3 className="features__subtitle">Free Delivery</h3>
              <p className="features__info">On all orders over $100</p>
            </li>

            <li className="features__item">
              <div className="features__icon" aria-hidden="true">
                <ShieldCheck size={32} strokeWidth={1.5} />
              </div>
              <h3 className="features__subtitle">Premium Quality</h3>
              <p className="features__info">Crafted with the best materials</p>
            </li>

            <li className="features__item">
              <div className="features__icon" aria-hidden="true">
                <CreditCard size={32} strokeWidth={1.5} />
              </div>
              <h3 className="features__subtitle">Secure Payment</h3>
              <p className="features__info">100% safe checkout process</p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;