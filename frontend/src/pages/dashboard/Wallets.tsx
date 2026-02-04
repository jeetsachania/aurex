import React from "react";

import { ToastContainer } from "react-toastify";
import { toastSuccess, toastError } from "../../components/ToastNotification";

import { fetchWithAuth } from "../../api/authFetch";
import { postWithAuth } from "../../api/authFetch";

import TransactionModal from "../../components/dashboard/TransactionModal";

interface WalletCardProps {
  currency: string;
  balance: string;
}

function WalletCard({ currency, balance }: WalletCardProps) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [type, setType] = React.useState<"deposit" | "withdraw">("deposit");

  const handleConfirm = async (amount: number) => {
    try {
      const response = await postWithAuth(
        `http://localhost:8000/wallets/${currency}/${type}`,
        { amount },
      );
      if (!response.ok) {
        toastError("Failed");
      } else {
        toastSuccess("Success");
      }
    } catch (err) {
      toastError("Error");
      throw err;
    }
  };

  return (
    <div className="col-4 col-md-3 col-lg-2 col-xl-2 col-xxl-2 col-xxxl-1 d-flex">
      <ToastContainer position="top-center" />
      <div className="card dashboard-card wallet-card w-100" tabIndex={0}>
        <div className="card-body d-flex flex-column justify-content-between">
          <h6 className="card-title">{currency}</h6>
          <h3 className="card-text">{balance}</h3>
          <div className="wallet-actions">
            <div className="wallet-icons">
              <button
                className="wallet-button"
                id="deposit"
                aria-label="Deposit"
                onClick={() => {
                  setType("deposit");
                  setModalOpen(true);
                }}
              >
                <i className="bi bi-plus"></i>
              </button>

              <button
                className="wallet-button"
                id="withdraw"
                aria-label="Withdraw"
                onClick={() => {
                  setType("withdraw");
                  setModalOpen(true);
                }}
              >
                <i className="bi bi-dash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <TransactionModal
        isOpen={modalOpen}
        type={type}
        currency={currency}
        balance={Number(balance)}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

const Wallets: React.FC = () => {
  const [wallets, setWallets] = React.useState<WalletCardProps[]>([]);
  const [error, setError] = React.useState(false);
  const showNoWallets = error || wallets.length === 0;

  React.useEffect(() => {
    fetchWithAuth("http://localhost:8000/wallets/list")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch wallets");
        return res.json();
      })
      .then((data) => setWallets(data))
      .catch(() => setError(true));
  }, []);

  return (
    <div>
      <h3 className="custom-header">Wallets</h3>

      <div className="row g-3 mb-3 align-items-stretch">
        {showNoWallets ? (
          <div className="col-12">
            <div className="card text-center p-4">
              <h5>No wallets</h5>
              <p className="text-muted">No Wallets</p>
            </div>
          </div>
        ) : (
          wallets.map((wallet) => (
            <WalletCard currency={wallet.currency} balance={wallet.balance} />
          ))
        )}
      </div>
    </div>
  );
};

export default Wallets;
