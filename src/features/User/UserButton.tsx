import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext.js";
import userIcon from "../../assets/icons/icon-user.svg";
import "./UserButton.css";

const UserButton: React.FC = () => {
  const { isLoggedIn, user } = useUser();

  return (
    <Link
      to={isLoggedIn ? "/profile" : "/register"}
      className={`user__btn ${isLoggedIn ? "user__btn-logged" : ""}`}
      aria-label={isLoggedIn ? `Go to ${user?.name || 'your'} profile` : "Register or login"}
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
