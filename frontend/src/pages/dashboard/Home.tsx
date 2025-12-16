import React from "react";

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="row">
        <div className="col-md-3">
          <div className="card custom-card d-flex flex-column h-100">
            <div className="card-body">
              <h6 className="card-title">Portfolio Value</h6>
              <h3 className="card-text">£1234.56</h3>
              <span className="badge bg-success">
                <i className="bi bi-arrow-up-right-circle me-1"></i>
                +10%
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card custom-card d-flex flex-column h-100">
            <div className="card-body">
              <h6 className="card-title">P/L</h6>
              <h3 className="card-text">£1234.56</h3>
              <span className="badge bg-success">
                <i className="bi bi-arrow-up-right-circle me-1"></i>
                +10%
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>Commodity</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>GOOGL</td>
              <td>125.00</td>
              <td>10</td>
              <td>13/02/2025</td>
              <td>Unfulfilled</td>
            </tr>
          </tbody>
        </table>
      </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
