import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <main className="error">
      <div className="error__container">
        <h1 className="error__code">404</h1>
        <h2 className="error__title">Oops! You're off-track.</h2>
        <p className="error__text">
          The page you are looking for doesn't exist or has been moved. 
          Don't worry, even the best steps can go the wrong way.
        </p>
        <Link to="/collections" className="error__btn">
          Back to Collection
        </Link>
      </div>
    </main>
  );
};

export default NotFound;