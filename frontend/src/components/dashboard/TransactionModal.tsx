import React from "react";

import { validateNumericInput } from "../../utils/Utils";

type TransactionType = "deposit" | "withdraw";

interface TransactionModalProps {
  isOpen: boolean;
  type: TransactionType;
  currency: string;
  balance: number;
  onClose: () => void;
  onConfirm: (amount: number) => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  type,
  currency,
  balance,
  onClose,
  onConfirm,
}) => {
  const [amount, setAmount] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!isOpen) {
      setError(null);
      setAmount("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError("Invalid Amount");
      return;
    }

    if (type === "withdraw" && numericAmount > balance) {
      setError("Insufficient Balance");
      return;
    }

    onConfirm(numericAmount);
    onClose();
  };

  const handleCancel = () => {
    setError(null);
    setAmount("");
    onClose();
  };

  return (
    <div className="transaction-backdrop">
      <div className="card transaction-card">
        <h6 className="card-title">
          {type === "deposit" ? "Deposit" : "Withdraw"} {currency}
        </h6>
        <input
          type="text"
          inputMode="decimal"
          className="form-control form-input p-3"
          placeholder="0.00"
          value={amount}
          autoFocus
          onChange={(e) => {
            setAmount(validateNumericInput(e.target.value));
            setError(null);
          }}
        />

        <h3 className="card-text mt-3 mb-3">
          BALANCE: {currency} {balance}
        </h3>

        {error && <h3 className="card-text danger mb-3">{error}</h3>}

        <div className="d-flex justify-content-start gap-3">
          <button
            type="submit"
            className="rounded-pill button confirm w-50"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            type="submit"
            className="rounded-pill button cancel w-50"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
