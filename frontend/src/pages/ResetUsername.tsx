import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Logo from "../assets/svgs/Logo";

import { validateEmail } from "../utils/Utils";

const ResetUsername: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      alert("email error")
    }
    try {
      const response = await axios.post("http://localhost:8000/users/exists", {
        email,
      });
      alert("Email Exists: " + response.data);
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

  const handleRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="container-fluid">
      <div className="container custom-form-container">
        <div className="card custom-form-card">
          <div className="card-body">
            <Logo className="logo" />
            <h2 className="card-title custom-form-card-title">Reset Username</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
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
              <button
                type="submit"
                className="custom-button rounded-pill custom-form-button mt-3"
              >
                Continue
              </button>
            </form>
            <hr className="solid"></hr>
            <button
              type="submit"
              className="custom-button rounded-pill custom-form-button"
              onClick={handleRedirect}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetUsername;
