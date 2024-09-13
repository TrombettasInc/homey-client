import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './SignUpPage.module.css'



// InputField Component
const InputField = ({ icon, placeholder, type, value, onChange }) => {
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputContent}>
        <img loading="lazy" src={icon} alt="" className={styles.inputIcon} />
        <input
          type={type}
          placeholder={placeholder}
          className={styles.input}
          aria-label={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

// SignupPage Component
const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };

    axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response?.data?.message;
        setErrorMessage(errorDescription);
      });
  };

  const inputFields = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/3ba6409d26ad4fc977dc4efd1b7897da19e238cdd9c7bfc0807165d1d8c85bc3?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0", placeholder: "Name", type: "text", value: name, onChange: handleName },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d122d5e555f59c374b30085089c8ed6142aeb76b3f65257ea0211e199c1e2aab?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0", placeholder: "Email address", type: "email", value: email, onChange: handleEmail },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/86345a51fd527fffc4e19c4b548594d1e5b56236570569d2947d3e2bfc540b43?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0", placeholder: "Password", type: "password", value: password, onChange: handlePassword },
  ];

  return (
    <main className={styles.signUp}>
     
      
      <form className={styles.formContainer} onSubmit={handleSignupSubmit}>
        <h1 className={styles.title}>sign up</h1>
        <p className={styles.subtitle}>
          sign up to create projects and tasks for your homey!
        </p>
        {inputFields.map((field, index) => (
          <InputField key={index} {...field} />
        ))}
        <button type="submit" className={styles.signupButton}>
          Sign up
        </button>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <p className={styles.loginLink}>
          Already have an account? <Link to={'/login'}><span>go here</span></Link>
        </p>
      </form>
    </main>
  );
};

export default SignupPage;
