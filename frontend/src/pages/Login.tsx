import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Logo from "../assets/svgs/Logo";

import { validateInput, validatePassword } from "../utils/Utils";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const usernameError = formSubmitted && !validateInput(username);
  const passwordError = formSubmitted && !validatePassword(password);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormSubmitted(true);

    try {
      const response = await axios.post("http://localhost:8000/users/login", {
        username,
        password,
      });
      const { access_token } = response.data;
      localStorage.setItem("access_token", access_token);
      navigate("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.detail || "An unexpected error occurred";

        switch (status) {
          case 400:
            alert("Invalid request. Please check your input.");
            break;
          case 401:
            alert("Invalid username or password.");
            break;
          case 500:
            alert("Server error. Please try again later.");
            break;
          default:
            alert(message);
        }
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="container-fluid">
      <div className="container custom-form-container">
        <div className="card custom-form-card">
          <div className="card-body">
            <Logo additionalClassName="shimmer" redirectTo="/" />
            <h2 className="card-title custom-form-card-title">Login</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <div className="input-group">
                  <div className="input-group-append">
                    <span className="input-group-text input-group-icon">
                      <i className="bi bi-person-fill"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className={`form-control custom-form-input ${
                      usernameError ? "error" : ""
                    }`}
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className="input-group">
                  <div className="input-group-append">
                    <span
                      className="input-group-text input-group-icon"
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    >
                      {isPasswordVisible ? (
                        <i className="bi bi-eye-slash-fill"></i>
                      ) : (
                        <i className="bi bi-eye-fill"></i>
                      )}
                    </span>
                  </div>
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    className={`form-control custom-form-input ${
                      passwordError ? "error" : ""
                    }`}
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="form-label custom-form-label reminder"
                >
                  Forgot{" "}
                  <a className="text-link" href="/reset/username">
                    username
                  </a>{" "}
                  or{" "}
                  <a className="text-link" href="/reset/password">
                    password
                  </a>
                  ?
                </label>
              </div>
              <button
                type="submit"
                className="custom-button rounded-pill custom-form-button submit-button mt-3"
              >
                Login
              </button>
            </form>
            <hr className="solid"></hr>
            <button
              type="submit"
              className="custom-button rounded-pill custom-form-button"
              onClick={handleRedirect}
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
