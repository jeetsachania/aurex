import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../assets/svgs/logo";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLoginSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Logging in with", { username, password });
  };

  const handleRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="container-fluid">
      <div className="container custom-form-container">
        <div className="card custom-form-card">
          <div className="card-body">
            <Logo className="logo" />
            <h2 className="card-title custom-form-card-title">Login</h2>
            <form onSubmit={handleLoginSubmit}>
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
                  placeholder="Email or username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
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
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="form-label custom-form-label reminder"
                >
                  Forgot{" "}
                  <a className="text-link" href="/signup">
                    username
                  </a>{" "}
                  or{" "}
                  <a className="text-link" href="/signup">
                    password
                  </a>
                  ?
                </label>
              </div>
              <button
                type="submit"
                className="custom-button rounded-pill custom-form-button mt-3"
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
