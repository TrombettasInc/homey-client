import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import './Navbar.css';

function Navbar() {
  // Subscribe to the AuthContext to access the authentication state
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  // State to toggle mobile menu visibility
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleHamburgerClick = () => {
    setMobileMenuOpen(true);
  };

  const handleCloseClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
       <nav className="navbar">
        {!isMobileMenuOpen && ( // Hide the hamburger when the menu is open
          <button className="hamburger" onClick={handleHamburgerClick}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/df815ec07b8c69a75a37f8b1d1fd22c58ef7d75971751f3b7bf6cc90c735e56f?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0"
              className="menuicon"
              alt="menu Icon"
            />
          </button>
        )}
        <div className="logo">homey</div>
      </nav>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <button className="close-button" onClick={handleCloseClick}>
            <img src="/close.png" alt="close menu" />
          </button>
          <ul className="nav-links-mobile">
            {!isLoggedIn ? (
              <>
                <li><Link to="/login" onClick={handleCloseClick}>log in</Link></li>
                <li><Link to="/signup" onClick={handleCloseClick}>sign up</Link></li>
              </>
            ) : (
              <>
                <li><span className="active-user">{user && user.name}</span></li>
                <li><Link to="/projects" onClick={handleCloseClick}>projects</Link></li>
                <li><Link to="/create" onClick={handleCloseClick}>create</Link></li>
                <li><button onClick={() => { logOutUser(); handleCloseClick(); }}>logout</button></li>
              </>
            )}
          </ul>

          <div className="footer">
            <div className="footer-text">
              <span>trombettasInc.</span> <a href="https://github.com/TrombettasInc/homey-client" target="_blank" rel="noopener noreferrer">Repo</a>
            </div>
            <div className="social-links">
              <a>
                <img src="/footer.png" alt="footer links" />
              </a>
            </div>
          </div>
        </div>
      )
      }
    </>
  );
}

export default Navbar;
