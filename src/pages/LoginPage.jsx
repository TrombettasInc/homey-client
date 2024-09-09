import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import styles from './LoginPage.module.css'; // Import your CSS
import logo from "../assets/logo.png"

const API_URL = "http://localhost:5005";

// InputField Component
function InputField({ icon, placeholder, type, value, onChange }) {
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputContent}>
        <img loading="lazy" src={icon} className={styles.inputIcon} alt="" />
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.input}
          required
        />
      </div>
    </div>
  );
}

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/projects');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const inputFields = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/3ba6409d26ad4fc977dc4efd1b7897da19e238cdd9c7bfc0807165d1d8c85bc3?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0",
      placeholder: "Email address",
      type: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/86345a51fd527fffc4e19c4b548594d1e5b56236570569d2947d3e2bfc540b43?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0",
      placeholder: "Password",
      type: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
  ];

  return (
    <main className={styles.loginContainer}>
      <img
        loading="lazy"
        src={logo}
        className={styles.logo}
        alt="Logo"
      />
      <br/>
      <Link to={'/projects'}><img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/57165382ff09f0d105cafacdf1ebdcf9537362d3e5530cac65e7c8e01f3aacca?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0" alt="Logo" className={styles.avatarIcon} /></Link>


      <form onSubmit={handleLoginSubmit} className={styles.formContainer}>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.subtitle}>
          Login to create and edit your amazing projects.
        </p>

        {inputFields.map((field, index) => (
          <InputField key={index} {...field} />
        ))}

        <button type="submit" className={styles.submitButton}>
          Log In
        </button>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        <p className={styles.signupLink}>
          Don't have an account? <Link to="/signup"><span>Sign Up</span></Link>
        </p>
      </form>
    </main>
  );
}

export default LoginPage;
