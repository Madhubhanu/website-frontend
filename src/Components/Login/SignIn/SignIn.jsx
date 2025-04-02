/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Navigate } from "../../Libraries/Libraries";
import "../Login.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
const SignInForm = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [gotoHome, setgottoHome] = useState(false);
  if (gotoHome) {
    return <Navigate to="/home" />;
  }
  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const { email, password } = state;
    const storedUsers = JSON.parse(localStorage.getItem("signUps")) || [];
    const user = storedUsers.find(
      (user) =>
        user.email === email && user.password === password && user.requestStatus
    );
    if (user) {
      setgottoHome(true);
      setState({
        email: "",
        password: "",
      });
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid credentials or account not approved.");
    }
  };
  const setCookie = (name, value) => {
    document.cookie = `${name}=${value};path=/`;
    document.cookie;
  };

  return (
    <div className="form-container sign-in-container">
      <h1 className="welcome">Welcome to GenepowerX</h1>
      <div className="form_log">
        <div>
        <GoogleLogin
  onSuccess={(credentialResponse) => {
    const decodedToken = jwtDecode(credentialResponse.credential);
    const email = decodedToken.email;

    if (email && (email.endsWith("@genepowerx.com") || email.endsWith("@khdreamlife.com"))) {
      setCookie("accessToken", credentialResponse.credential);
      setCookie("email", email);
      setgottoHome(true);
    } else {
      alert("Please use your company email (@genepowerx.com or @khdreamlife.com).");
    }
  }}
  onError={() => {
    alert("Login Failed. Please try again.");
  }}
/>

        </div>
      </div>
    </div>
  );
};

export default SignInForm;
