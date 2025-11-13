import React from "react";

const Features: React.FC = () => {
  return (
    <div className="container-fluid">
      <section className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="custom-header mb-4">Power At Your Fingertips</h2>
            <ul className="list-unstyled features-list">
              <li className="mb-3 d-flex align-items-start">
                <i className="bi bi-check me-2"></i>
                <span>Real-Time Market Data</span>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <i className="bi bi-check me-2"></i>
                <span>Secure Transactions</span>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <i className="bi bi-check me-2"></i>
                <span>Portfolio Analysis</span>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <i className="bi bi-check me-2"></i>
                <span>Custom Alerts</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
