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
      setError("Enter a valid amount");
      return;
    }

    if (type === "withdraw" && numericAmount > balance) {
      setError("Insufficient balance");
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
          className="form-control custom-form-input"
          placeholder="0.00"
          value={amount}
          autoFocus
          onChange={(e) => {
            setAmount(validateNumericInput(e.target.value));
            setError(null);
          }}
        />

        <h3 className="card-text text-muted mt-2">
          Balance: {currency} {balance}
        </h3>

        {error && <h3 className="card-text error mt-2">{error}</h3>}

        <div className="d-flex justify-content-start gap-2">
          <button
            type="submit"
            className="rounded-pill custom-button modal-button confirm"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            type="submit"
            className="rounded-pill custom-button modal-button cancel"
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
