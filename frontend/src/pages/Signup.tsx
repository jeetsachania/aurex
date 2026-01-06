import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";

import Logo from "../assets/svgs/Logo";
import { toastSuccess, toastError } from "../components/ToastNotification";

import {
  validateEmail,
  validateUsername,
  validatePassword,
} from "../utils/Utils";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  let isValid = true;
  const toastOptions = {
    autoClose: 5000,
  };

  function emailsMatch(email: string, confirmEmail: string): boolean {
    return email === confirmEmail;
  }

  const handlFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      toastError("Invalid email", toastOptions);
      isValid = false;
    }

    if (!validateUsername(username)) {
      toastError("Username must be longer than 8 characters", toastOptions);
      isValid = false;
    }

    if (!emailsMatch(email, confirmEmail)) {
      toastError("Email addresses do not match", toastOptions);
      isValid = false;
    }

    if (!validatePassword(password)) {
      toastError("Password must be longer than 8 characters", toastOptions);
      isValid = false;
    }

    if (!(password === confirmPassword)) {
      toastError("Passwords do not match", toastOptions);
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/users/register",
        {
          email,
          firstname,
          lastname,
          username,
          password,
        }
      );
      if (response.status == 201) {
        toastSuccess("Registration Successfull");
        setTimeout(() => {
          navigate("/login");
        }, 3500);
      }
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
    navigate("/login");
  };

  return (
    <div className="container-fluid">
      <ToastContainer position="top-center" />
      <div className="container custom-form-container">
        <div className="card custom-form-card">
          <div className="card-body">
            <Logo additionalClassName="shimmer" redirectTo="/" />
            <h2 className="card-title custom-form-card-title">Signup</h2>
            <form onSubmit={handlFormSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="input-group">
                    <div className="input-group-append">
                      <span className="input-group-text input-group-icon">
                        <i className="bi bi-person-fill"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control custom-form-input"
                      id="firstname"
                      placeholder="First Name"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="input-group">
                    <div className="input-group-append">
                      <span className="input-group-text input-group-icon">
                        <i className="bi bi-person-fill"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control custom-form-input"
                      id="lastname"
                      placeholder="Last Name"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="input-group">
                    <div className="input-group-append">
                      <span className="input-group-text input-group-icon">
                        <i className="bi bi-envelope-fill"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control custom-form-input"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="input-group">
                    <div className="input-group-append">
                      <span className="input-group-text input-group-icon">
                        <i className="bi bi-envelope-fill"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control custom-form-input"
                      id="confirm-email"
                      placeholder="Confirm Email"
                      value={confirmEmail}
                      onChange={(e) => setConfirmEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="input-group">
                  <div className="input-group-append">
                    <span className="input-group-text input-group-icon">
                      <i className="bi bi-person-fill"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control custom-form-input"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
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
                      className="form-control custom-form-input"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
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
                      className="form-control custom-form-input"
                      id="confirm-password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="custom-button rounded-pill custom-form-button submit-button mt-3"
              >
                Signup
              </button>
            </form>
            <hr className="solid"></hr>
            <button
              type="submit"
              className="custom-button rounded-pill custom-form-button"
              onClick={handleRedirect}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
