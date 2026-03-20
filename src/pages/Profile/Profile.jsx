import { useUser } from "../../context/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  if (!user) return null;

  return (
    <main className="profile" id="main-content">
      <div className="profile__container">
        <section className="profile__card">
          <header className="profile__header">
            <div className="profile__avatar" aria-hidden="true">
              {user.name?.charAt(0).toUpperCase()}
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

          <footer className="profile__actions">
            <button 
              className="profile__logout-btn" 
              onClick={handleLogout}
              aria-label="Log out from your account"
            >
              Logout Account
            </button>
          </footer>
        </section>
      </div>
    </main>
  );
};

export default Profile;