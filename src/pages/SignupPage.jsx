

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './SignUpPage.css'

const API_URL = "http://localhost:5005";


function SignupPage(props) {
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
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
    axios.post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response?.data?.message;
        setErrorMessage(errorDescription);
      })
  };


  return (
    <div className="SignUp1">
    {/* Back Button */}
    <div className="SignupBackButton">
      <div className="G" />
      <Link to="/projects" className="FeatherChevronLeft">
        <div className="Vector"></div>
      </Link>
    </div>

    {/* Form Container */}
    <div className="SignupFormContainer">
      {/* Title */}
      <div className="SignupTextTitle">Sign up</div>

      {/* Subtitle */}
      <div className="SignupTextSubtitle">
        Sign up to create projects and tasks for your homey!
      </div>

      {/* Name Input */}
      <div className="SignupNameFormInputBox">
        <div className="Bg" />
        <div className="TextIcon">
          <div className="FeatherUser"></div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="SignupInput"
            value={name}
            onChange={handleName}
          />
        </div>
      </div>

      {/* Email Input */}
      <div className="SignupEmailFormInputBox">
        <div className="Bg" />
        <div className="TextIcon">
          <div className="FeatherMail"></div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="SignupInput"
            value={email}
            onChange={handleEmail}
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="SignupPasswordFormInputBox">
        <div className="Bg" />
        <div className="TextIcon">
          <div className="FeatherLock"></div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="SignupInput"
            value={password}
            onChange={handlePassword}
          />
        </div>
      </div>

      {/* Sign Up Button */}
      <button type="submit" className="SignupButton">
        Sign up
      </button>

      {/* Already have account? */}
      <div className="AlreadyHaveAccountGoHere">
        <span>Already have an account? </span>
        <Link to="/login" className="SignupLink">Go here</Link>
      </div>
    </div>
  </div>
);
}

export default SignupPage;
