import React from "react";

import BaseModal from "./BaseModal";

type Currency = {
  id: number;
  code: string;
  name: string;
  symbol: string;
  decimals: number;
  is_active: boolean;
};

interface AddWalletModalProps {
  isOpen: boolean;
  currencies: Currency[];
  onClose: () => void;
  onConfirm: (currency: string) => void;
}

const AddWalletModal: React.FC<AddWalletModalProps> = ({
  isOpen,
  currencies,
  onClose,
  onConfirm,
}) => {
  const [selectedCurrency, setSelectedCurrency] = React.useState("");

  React.useEffect(() => {
    if (currencies.length > 0) {
      setSelectedCurrency(currencies[0].code);
    }
  }, [currencies]);

  return (
    <BaseModal
      isOpen={isOpen}
      title="Add Wallet"
      onClose={onClose}
      onConfirm={() => onConfirm(selectedCurrency)}
    >
      <select
        className="form-select form-select-sm mb-3"
        value={selectedCurrency}
        onChange={(e) => setSelectedCurrency(e.target.value)}
      >
        {currencies.length === 0 ? (
          <option value="empty">No commodities available</option>
        ) : (
          currencies.map((c) => (
            <option key={c.code} value={c.code}>
              {c.code}
            </option>
          ))
        )}
      </select>
    </BaseModal>
  );
};

export default AddWalletModal;
