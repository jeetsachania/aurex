import React from "react";

const Orders: React.FC = () => {
  return (
    <main className="col-md-9 col-lg-10 col-xl-10 col-xxl-10 col-xxxl-11 ms-sm-auto px-md-4 py-4 main-content">
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
    </main>
  );
};

export default Orders;
