import { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/header.css";
import DarkModeToggle from "./DarkModeToggle";
import { useSearch } from "../context/SearchContext";
import SearchForm from "./SearchForm";
import { FaUserCircle } from "react-icons/fa";
import ConfirmModal from "./ConfirmModal";

const Header: FunctionComponent = () => {
  const [menuBurger, setMenuBurger] = useState<boolean>(false);
  const { isAuthenticated, isBusiness, logout, profileImage } = useAuth();
  //logout confirm
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  //search
  const { query, setQuery } = useSearch();
  //search

  const toggleMenu = () => {
    setMenuBurger(!menuBurger);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setMenuBurger(false);
    setShowLogoutConfirm(false);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <>
      {showLogoutConfirm && (
        <ConfirmModal
          message="Are you sure you want to logout?"
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}
      <header className="header">
        <div className="container">
          <div className="nav-body">
            <Link to="/" className="logo">
              <span className="logo-full logo">bCard</span>
              <span className="logo-short logo">BC</span>
            </Link>
            <button className="menu-button" onClick={toggleMenu} aria-label="Toggle menu">
              <i className={menuBurger ? "fa-regular fa-circle-xmark" : "fas fa-bars"}></i>
            </button>

            <nav className={`menu ${menuBurger ? "menu-open" : ""}`}>
              <ul className="menu-list">
                <li className="menu-item">
                  <Link to="/about" className="menu-link" onClick={() => setMenuBurger(false)}>About</Link>
                </li>
                {isAuthenticated && (
                  <li className="menu-item">
                    <Link to="/fav-cards" className="menu-link" onClick={() => setMenuBurger(false)}>Favorite Cards</Link>
                  </li>
                )}
                {isBusiness && (
                  <>
                    <li className="menu-item">
                      <Link to="/my-cards" className="menu-link" onClick={() => setMenuBurger(false)}>My Cards</Link>
                    </li>
                  </>
                )}

                {menuBurger && (
                  <li className="menu-item search-item">
                    <SearchForm value={query} onChange={setQuery}
                      onSubmit={() => setMenuBurger(false)}
                    />
                  </li>
                )}
              </ul>
            </nav>

            {isAuthenticated && (
              <div className="profile-body">
                <Link to="/profile" className="profile-icon" title="My Profile">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="profile-avatar"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <FaUserCircle size={40} />
                  )}
                </Link>
              </div>
            )}

            <div className="search-body">
              <SearchForm value={query} onChange={setQuery} onSubmit={() => setMenuBurger(false)} />
            </div>

            <DarkModeToggle />

            <div className="auth-buttons">
              {isAuthenticated ? (
                <button className="logout-btn" onClick={handleLogoutClick}>
                  <div className="logout-btn_sign">
                    <svg viewBox="0 0 512 512">
                      <path
                        d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                      ></path>
                    </svg>
                  </div>
                  <div className="logout-btn_text">Logout</div>
                </button>

              ) : (
                <>
                  <Link to="/login" className="btn-login underline">LOGIN</Link>
                  <Link to="/register" className="btn-register underline">SIGN UP</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;