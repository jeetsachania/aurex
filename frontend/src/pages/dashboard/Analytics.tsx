import React from "react";

const Analytics: React.FC = () => {
  return (
    <div className="col-sm-3 col-md-3 col-lg-2 d-flex">
      <div className="card shadow-sm h-100 w-100">
        <div className="card-body">
          <h6 className="text-muted">Users</h6>
          <h3 className="fw-semibold">1234</h3>
          <span className="badge bg-success">
            <i className="bi bi-arrow-up-right-circle me-1"></i>
            +10%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
