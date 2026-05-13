import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext.js";
import userIcon from "../../assets/icons/icon-user.svg";
import "./UserButton.css";

const UserButton: React.FC = () => {
  const { isLoggedIn, user } = useUser();

  const destination = isLoggedIn ? "/profile" : "/register";
  
  const userName = user?.name?.trim();
  const ariaLabel = isLoggedIn 
    ? `Go to ${userName ? userName : 'your'} profile` 
    : "Register or login";

  return (
    <Link
      to={destination}
      className={`user__btn ${isLoggedIn ? "user__btn-logged" : ""}`}
      aria-label={ariaLabel}
    >
      <img
        src={userIcon}
        alt=""
        className="user__btn-icon"
        aria-hidden="true"
      />
    </Link>
  );
};

export default UserButton;