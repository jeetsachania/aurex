import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { apiBaseUrl } from "../config/apiConfig";
import Logo from "../assets/svgs/Logo";
import { ToastContainer } from "react-toastify";
import { toastError } from "../components/ToastNotification";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${apiBaseUrl}/api/users/login`, {
        username,
        password,
      });
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      navigate("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.detail || "An unexpected error occurred";

        switch (status) {
          case 400:
            toastError("Invalid request");
            break;
          case 401:
            toastError("Invalid username or password");
            break;
          case 500:
            toastError("Server error - Please try again later");
            break;
          default:
            toastError(message);
        }
      } else {
        toastError("An unknown error occured");
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
      <ToastContainer position="top-center" />
      <div className="form-container">
        <div className="card form-card">
          <div className="card-body">
            <Logo additionalClassName="shimmer" redirectTo="/" />
            <h2 className="card-title form-card-title">Login</h2>
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
                    className="form-control form-input p-3"
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
                    className="form-control form-input p-3"
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
                  className="form-label"
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
                className="rounded-pill button confirm w-100 mt-3"
              >
                Login
              </button>
            </form>
            <hr className="solid"></hr>
            <button
              type="submit"
              className="rounded-pill button redirect w-100"
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
