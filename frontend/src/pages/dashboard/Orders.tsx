import React from "react";

import { fetchWithAuth } from "../../api/authFetch";
import { postWithAuth } from "../../api/authFetch";

import { toastSuccess, toastError } from "../../components/ToastNotification";
import AddOrderModal from "../../components/dashboard/AddOrderModal";
import TransactionModal from "../../components/dashboard/TransactionModal";

type Order = {
  asset_type: string;
  asset: string;
  quantity: string;
  price: number;
};

type Commodity = {
  commodity: string;
  price: number;
};

const AddOrder: React.FC<{ onOrderAdded: () => void }> = ({ onOrderAdded }) => {
  const [open, setOpen] = React.useState(false);
  const [commodities, setCommodities] = React.useState<Commodity[]>([]);
  const testCommodities = [
    {
      commodity: "AAPL",
      price: "100.00",
    },
    {
      commodity: "GOOGL",
      price: "100.00",
    },
    {
      commodity: "NFLX",
      price: "100.00",
    },
    {
      commodity: "AMZN",
      price: "100.00",
    },
    {
      commodity: "MSFT",
      price: "100.00",
    },
  ];

  const loadCommodities = () => {
    setCommodities(testCommodities);
  };

  React.useEffect(loadCommodities, []);

  const handleAddOrder = async (modalOrder: {
    type: string;
    order: string;
    commodity: string;
    quantity: string;
    price?: number;
  }) => {
    const payload = {
      asset_type: "STOCK",
      asset: modalOrder.commodity,
      quantity: parseInt(modalOrder.quantity),
      price: modalOrder.price || 100,
    };

    console.log("Payload to send:", payload);

    try {
      const res = await postWithAuth("http://localhost:8000/orders", payload);

      if (!res.ok) {
        toastError("Failed to add order");
        return;
      }

      const data = await res.json();
      console.log("Order created:", data);

      toastSuccess("Order added");
      setOpen(false);
      onOrderAdded();
    } catch (err) {
      console.error(err);
      toastError("Error adding order");
    }
  };

  return (
    <>
      <button
        className="wallet-button"
        id="add"
        aria-label="Add"
        onClick={() => setOpen(true)}
      >
        <i className="bi bi-plus"></i>
      </button>

      <AddOrderModal
        isOpen={open}
        commodities={commodities}
        onClose={() => setOpen(false)}
        onConfirm={handleAddOrder}
      />
    </>
  );
};

const Orders: React.FC = () => {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [error, setError] = React.useState(false);
  const testOrders = [
    {
      type: "BUY",
      order: "Market",
      commodity: "AAPL",
      quantity: "10",
    },
  ];

  const loadOrders = () => {
    setOrders(testOrders);
  };

  React.useEffect(loadOrders, []);

  const showNoOrders = error || orders.length === 0;

  return (
    <div>
      <h3 className="custom-header">Orders</h3>
      <AddOrder onOrderAdded={loadOrders} />
      <div className="row g-3 mb-3 align-items-stretch">
        {showNoOrders ? (
          <div className="col-12">
            <div className="card text-center p-4">
              <h5>No Orders</h5>
            </div>
          </div>
        ) : (
          <div className="row g-3">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-md-12">
                  <div className="table-responsive rounded-table">
                    <table className="table table-striped align-middle mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th>TYPE</th>
                          <th>ORDER</th>
                          <th>COMMODITY</th>
                          <th>QUANTITY</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr>
                            <td>{order.type}</td>
                            <td>{order.order}</td>
                            <td>{order.commodity}</td>
                            <td>{order.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
