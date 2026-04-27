import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound: React.FC = () => {
  return (
    <main className="error" aria-live="polite">
      <div className="error__container">
        <span className="error__code" aria-hidden="true">404</span>
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