import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { apiBaseUrl } from "../config/apiConfig";
import Logo from "../assets/svgs/Logo";
import { validateEmail } from "../utils/Utils";
import { ToastContainer } from "react-toastify";
import { toastSuccess, toastError } from "../components/ToastNotification";

interface ResetCredentialProps {
  action: "username" | "password";
  label: string;
  apiUrl: string;
}

const ResetCredential: React.FC<ResetCredentialProps> = ({
  action,
  label,
  apiUrl,
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  let isValid = true;

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      toastError("Invalid email address");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const response = await axios.post(`${apiBaseUrl}/${apiUrl}`, { "email": email });
      toastSuccess("Reset request initiated");
      if (response.data == false) {
        // No account found with supplied email address
      }
      else {
        // Account exists, send reset email
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
            toastError(`Invalid ${label.toLowerCase()}`);
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

  const handleRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="container-fluid">
      <ToastContainer position="top-center" />
      <div className="form-container">
        <div className="card form-card">
          <div className="card-body">
            <Logo className="logo" />
            <h2 className="card-title form-card-title">{label}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <div className="input-group">
                  <div className="input-group-append">
                    <span className="input-group-text input-group-icon">
                      <i className={`bi ${action === "password" ? "bi-envelope-fill" : "bi-person-fill"}`}></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control form-input p-3"
                    id={action}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="rounded-pill button confirm w-100 mt-3"
              >
                Send Reset Link
              </button>
            </form>
            <hr className="solid"></hr>
            <button
              type="submit"
              className="rounded-pill button redirect w-100"
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

export default ResetCredential;
