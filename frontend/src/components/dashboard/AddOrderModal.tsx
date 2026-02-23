import React from "react";

import BaseModal from "./BaseModal";

type Asset = {
  symbol: string;
  name: string;
  asset_type: string;
  exchange: string;
  currency: string;
  active: boolean;
};

type NewOrder = {
  commodity: string;
  type: string;
  quantity: number;
  price: number;
};

interface AddOrderProps {
  isOpen: boolean;
  commodities: Asset[];
  onClose: () => void;
  onConfirm: (order: NewOrder) => void;
}

const AddOrderModal: React.FC<AddOrderProps> = ({
  isOpen,
  commodities,
  onClose,
  onConfirm,
}) => {
  const orderTypes = ["MARKET", "LIMIT", "STOP", "STOP LOSS"];
  const [quantity, setQuantity] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [selectedCommodity, setSelectedCommodity] = React.useState("");
  const [selectedOrderType, setSelectedOrderType] =
    React.useState<string>("MARKET");

  React.useEffect(() => {
    if (commodities.length > 0) {
      setSelectedCommodity(commodities[0].symbol);
    }
  }, [commodities]);

  const handleConfirm = () => {
    const parsedQuantity = Number(quantity);
    const parsedPrice = Number(price);

    if (
      Number.isNaN(parsedQuantity) ||
      Number.isNaN(parsedPrice) ||
      parsedQuantity <= 0 ||
      parsedPrice <= 0
    ) {
      setError("Quantity/Price Invalid");
      return;
    }

    onConfirm({
      commodity: selectedCommodity,
      type: selectedOrderType,
      quantity: parsedQuantity,
      price: parsedPrice,
    });

    resetForm();
  };

  const resetForm = () => {
    setQuantity("");
    setPrice("");
    setError(null);

    if (commodities.length > 0) {
      setSelectedCommodity(commodities[0].symbol);
    } else {
      setSelectedCommodity("");
    }
  };

  React.useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <BaseModal
      isOpen={isOpen}
      title="Add Order"
      onClose={onClose}
      onConfirm={handleConfirm}
      error={error}
    >
      <select
        className="form-select form-select-sm mb-3"
        value={selectedCommodity}
        onChange={(e) => setSelectedCommodity(e.target.value)}
      >
        {commodities.length === 0 ? (
          <option value="empty">No commodities available</option>
        ) : (
          commodities.map((c) => (
            <option key={c.symbol} value={c.symbol}>
              {c.symbol}
            </option>
          ))
        )}
      </select>
      <ul className="list-group order-modal">
        <li className="list-group-item d-flex justify-content-between">
          <span className="fw-semibold">OPEN</span>
          <span className="fw-semibold text-end">$125.40</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="fw-semibold">HIGH</span>
          <span className="fw-semibold text-end">$125.40</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="fw-semibold">LOW</span>
          <span className="fw-semibold text-end">$125.40</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="fw-semibold">CLOSE</span>
          <span className="fw-semibold text-end">1.2M</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="fw-semibold">VOLUME</span>
          <span className="fw-semibold text-end">$125.40</span>
        </li>
      </ul>
      <div className="custom-radio justify-content-between mt-3">
        {orderTypes.map((type) => (
          <label
            key={type}
            className={`rounded-pill button radio ${
              selectedOrderType === type ? "active" : ""
            }`}
          >
            <input
              type="radio"
              name="orderType"
              value={type}
              checked={selectedOrderType === type}
              onChange={() => setSelectedOrderType(type)}
            />
            {type}
          </label>
        ))}
      </div>
      <h3 className="card-text mt-3">QUANTITY</h3>
      <input
        type="text"
        inputMode="numeric"
        className="form-control form-input p-3"
        placeholder="0"
        value={quantity}
        autoFocus
        onChange={(e) => {
          setQuantity(e.target.value);
          setError(null);
        }}
      />
      <h3 className="card-text mt-3">PRICE</h3>
      <input
        type="text"
        inputMode="decimal"
        className="form-control form-input p-3 mb-3"
        placeholder="0.00"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
          setError(null);
        }}
      />
    </BaseModal>
  );
};

export default AddOrderModal;
