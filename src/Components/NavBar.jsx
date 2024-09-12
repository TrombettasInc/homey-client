
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import styles from './Navbar.module.css'

function Navbar() {
  // Subscribe to the AuthContext to access the authentication state
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  // State to toggle mobile menu visibility
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleHamburgerClick = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      {/* Hamburger icon on the left */}
      <button className="hamburger" onClick={handleHamburgerClick}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/df815ec07b8c69a75a37f8b1d1fd22c58ef7d75971751f3b7bf6cc90c735e56f?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0"
          className={styles.menuicon}
          alt="menu Icon"
        />
      </button>

      {/* Logo in the center */}
      <div className="logo">homey</div>

      {/* Mobile menu, shown when hamburger is clicked */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul className="nav-links-mobile">
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/about">Sobre</Link></li>

            {isLoggedIn ? (
              <>
                <li><Link to="/projects">Projects</Link></li>
                <li><button onClick={logOutUser}>Logout</button></li>
                <li><span>{user && user.name}</span></li>
              </>
            ) : (
              <>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

