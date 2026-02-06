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
  if (!isOpen) return null;

  return (
    <div className="transaction-backdrop">
      <div className="card transaction-card">
        <h5>Add Wallet</h5>

        <ul className="list-group">
          {currencies.map((currency) => (
            <li
              key={currency.code}
              className="list-group-item list-group-item-action"
              onClick={() => onConfirm(currency.code)}
            >
              {currency.code}
            </li>
          ))}
        </ul>

        <button className="btn btn-secondary mt-3" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddWalletModal;
