
import { Link } from "react-router-dom";
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context";  
import styles from './Navbar.module.css'

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { 
    isLoggedIn,
    user,
    logOutUser
} = useContext(AuthContext);   

  
  //  Update the rendering logic to display different content 
  //  depending on whether the user is logged in or not
  return (
    <>
    <nav>
      
      <header className={styles.header}>
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/df815ec07b8c69a75a37f8b1d1fd22c58ef7d75971751f3b7bf6cc90c735e56f?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0"
                    className={styles.menuicon}
                    alt="menu Icon"
                />
                <h1>homey</h1>
            </header>

    
      {isLoggedIn && (
        <>
          <Link to="/projects">
            <button>Projects</button>
          </Link>        
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </>
      )}
    </nav>

    <Link to = '/create'>Create Project</Link>
    </>
  );
}

export default Navbar;

