import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  return (
    <main className="profile">
      <div className="profile__container">
        <div className="profile__card">
          <header className="profile__header">
            <div className="profile__avatar">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <h1 className="profile__title">Hello, {user?.name}!</h1>
            <p className="profile__subtitle">You are part of the Sneakers community</p>
          </header>

          <footer className="profile__actions">
            <button className="profile__btn" onClick={handleLogout}>
              Logout
            </button>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default Profile;