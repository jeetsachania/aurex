import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="pt-3 pb-3">
      <div className="container footer">
        <div className="row mb-4">
          <div className="col-md-3 mb-3">
            <h5 className="fw-bold">YourCompany</h5>
            <p className="small">
              We provide the best services to help you grow your business and
              stay ahead in your industry.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="social-icon fs-5">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="social-icon fs-5">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="social-icon fs-5">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="social-icon fs-5">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
          <div className="col-md-2 mb-3">
            <h6 className="fw-bold">Accounts</h6>
            <ul className="list-unstyled small footer-list">
              <li className="mb-1">
                <a href="#" className="text-decoration-none">
                  Sign In
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-decoration-none">
                  Register
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-decoration-none">
                  Orders
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-2 mb-3">
            <h6 className="fw-bold">Customer Support</h6>
            <ul className="list-unstyled small footer-list">
              <li className="mb-1">
                <a href="#" className="text-decoration-none">
                  Help Center
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-decoration-none">
                  Contact Us
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-decoration-none">
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-2 mb-3">
            <h6 className="fw-bold">Site Map</h6>
            <ul className="list-unstyled small footer-list">
              <li className="mb-1">
                <a href="#home" className="text-decoration-none">
                  Home
                </a>
              </li>
              <li className="mb-1">
                <a href="#features" className="text-decoration-none">
                  Features
                </a>
              </li>
              <li className="mb-1">
                <a href="#pricing" className="text-decoration-none">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#contact" className="text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3 mb-3">
            <h6 className="fw-bold">IMPORTANT INFORMATION</h6>
            <ul className="list-unstyled small footer-list">
              <li className="mb-1">
                <a href="#" className="text-decoration-none">
                  Terms & Conditions
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-decoration-none">
                  Privacy Policy
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-decoration-none">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center pt-3 small">
          <div className="mb-2 mb-md-0 text-center">
            &copy; 2025 Aurex. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
