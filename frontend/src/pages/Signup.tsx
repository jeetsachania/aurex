import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../assets/svgs/logo";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  function validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  function validateConfirmEmail(email: string, confirmEmail: string): boolean {
    return email === confirmEmail;
  }

  function validatePassword(
    password: string,
    confirmPassword: string
  ): boolean {
    const passwordRegex = /^(?!.*\s)[A-Za-z0-9`!"£$%^&*()#_+=-]{1,}$/;

    if (!passwordRegex.test(password)) {
      console.error("Password not valid");
    }

    if (password === "" || confirmPassword === "") {
      console.error("Password cannot be empty");
      return false;
    }

    if (password === confirmPassword) {
      return true;
    }

    console.error("Passwords do not match");
    return false;
  }

  const handleRedirect = () => {
    navigate("/login");
  };

  const handleSignupSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(validateEmail(email));
    console.log(validateConfirmEmail(email, confirmEmail));
    console.log(validatePassword(password, confirmPassword));
  };

  return (
    <div className="container-fluid">
      <div className="container custom-form-container">
        <div className="card custom-form-card">
          <div className="card-body">
            <Logo className="logo" />
            <h2 className="card-title custom-form-card-title">Signup</h2>
            <form onSubmit={handleSignupSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <label
                    htmlFor="email"
                    className="form-label custom-form-label"
                  >
                    Email
                  </label>
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
                <div className="col-md-6">
                  <label
                    htmlFor="email"
                    className="form-label custom-form-label"
                  >
                    Confirm Email
                  </label>
                  <input
                    type="text"
                    className="form-control custom-form-input"
                    id="email"
                    placeholder="Confirm Email"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="username"
                  className="form-label custom-form-label"
                >
                  Username
                </label>
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
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label custom-form-label"
                    >
                      Password
                    </label>
                    <input
                      type="password"
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
                  <div className="mb-3">
                    <label
                      htmlFor="confirm-password"
                      className="form-label custom-form-label"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
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
                className="custom-button rounded-pill custom-form-button mt-3"
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
