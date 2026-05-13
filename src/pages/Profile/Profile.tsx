import React, { useEffect, useCallback } from "react";
import { useUser } from "../../context/UserContext.js";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile: React.FC = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user, navigate]);

  const handleLogout = useCallback((): void => {
    logout();
    navigate("/"); 
  }, [logout, navigate]);

  if (!user) return null;

  return (
    <main className="profile" id="main-content">
      <div className="profile__container">
        <article className="profile__card">
          <header className="profile__header">
            <div className="profile__avatar" aria-hidden="true">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
            
            <div className="profile__info">
              <h1 className="profile__title">
                Hello, <span className="text-orange">{user.name}</span>!
              </h1>
              <p className="profile__email">{user.email}</p>
              <p className="profile__badge">
                Sneakers Community Member
              </p>
            </div>
          </header>          

          <div className="profile__actions">
            <button 
              type="button"
              className="profile__logout-btn" 
              onClick={handleLogout}
              aria-label="Log out from your account"
            >
              Logout Account
            </button>
          </div>
        </article>
      </div>
    </main>
  );
};

export default Profile;