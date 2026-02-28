import React from "react";

import { apiBaseUrl } from "../../config/apiConfig";
import { fetchWithAuth } from "../../api/authFetch";
import { postWithAuth } from "../../api/authFetch";
import { formatDateTime } from "../../utils/Utils";

import { toastSuccess, toastError } from "../../components/ToastNotification";
import AddOrderModal from "../../components/dashboard/AddOrderModal";

type Order = {
  asset_type: string;
  asset: string;
  order_type: string;
  quantity: number;
  price: number;
  order_status: string;
  created_at: Date;
  updated_at: Date;
};

type Asset = {
  symbol: string;
  name: string;
  asset_type: string;
  exchange: string;
  currency: string;
  active: boolean;
};

const AddOrder: React.FC<{ onOrderAdded: () => void }> = ({ onOrderAdded }) => {
  const [open, setOpen] = React.useState(false);
  const [assets, setAssets] = React.useState<Asset[]>([]);

  const fetchAssets = async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/api/assets`);
      if (!res.ok) {
        toastError("Failed to fetch assets");
        return;
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const loadCommodities = async () => {
    const fetchedAssets = await fetchAssets();
    setAssets(fetchedAssets);
  };

  React.useEffect(() => {
    loadCommodities();
  }, []);

  const handleAddOrder = async (order: {
    commodity: string;
    type: string;
    quantity: number;
    price: number;
  }) => {
    const payload = {
      asset_type: "STOCK",
      asset: order.commodity,
      quantity: order.quantity,
      price: order.price || 100,
    };

    try {
      const res = await postWithAuth(`${apiBaseUrl}/api/orders`, payload);
      if (!res.ok) {
        const errorData = await res.json();
        toastError(errorData.detail);
        return;
      }
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
        className="wallet-button mb-3"
        id="add"
        aria-label="Add"
        onClick={() => setOpen(true)}
      >
        <i className="bi bi-plus"></i>
      </button>

      <AddOrderModal
        isOpen={open}
        commodities={assets}
        onClose={() => setOpen(false)}
        onConfirm={handleAddOrder}
      />
    </>
  );
};

const Orders: React.FC = () => {
  const [orders, setOrders] = React.useState<Order[]>([]);
  
  const fetchOrders = async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/api/orders`);

      if (!res.ok) {
        toastError("Failed to fetch orders");
        return;
      }

      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const loadOrders = async () => {
    const fetchedAssets = await fetchOrders();
    setOrders(fetchedAssets);
  };

  React.useEffect(() => {
    loadOrders();
  }, []);

  const showNoOrders = orders.length === 0;

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
                          <th>ASSET</th>
                          <th>QUANTITY</th>
                          <th>PRICE</th>
                          <th>STATUS</th>
                          <th>DATE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr>
                            <td>{order.order_type}</td>
                            <td>{order.asset}</td>
                            <td>{order.quantity}</td>
                            <td>{order.price}</td>
                            <td>{order.order_status}</td>
                            <td>{formatDateTime(order.created_at)}</td>
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
