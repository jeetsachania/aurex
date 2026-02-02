import React from "react";

import { fetchWithAuth } from "../../api/authFetch";

interface WalletCardProps {
  currency: string;
  balance: string;
}

function WalletCard({ currency, balance }: WalletCardProps) {
  return (
    <div className="col-3 col-lg-2 col-xl-2 col-xxl-2 col-xxxl-1 d-flex">
      <div className="card custom-card wallet-card w-100" tabIndex={0}>
        <div className="card-body d-flex flex-column justify-content-between">
          <h6 className="card-title">{currency}</h6>
          <h3 className="card-text">{balance}</h3>
          <div className="wallet-actions">
            <div className="wallet-icons">
              <button className="wallet-btn" id="deposit" aria-label="Deposit">
                <i className="bi bi-plus"></i>
              </button>
              <button className="wallet-btn" id="withdraw" aria-label="Withdraw">
                <i className="bi bi-dash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Wallets: React.FC = () => {
  const [wallets, setWallets] = React.useState<WalletCardProps[]>([]);

  React.useEffect(() => {
    fetchWithAuth("http://localhost:8000/wallets/list")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch wallets");
        return res.json();
      })
      .then((data) => setWallets(data));
  }, []);

  return (
    <div>
      <h3 className="custom-header">Wallets</h3>
      {/* <div className="wallet-button-container mb-3">
        <button
          type="submit"
          className="custom-button rounded-pill submit-button me-2"
        >
          Deposit
        </button>
        <button
          type="submit"
          className="custom-button rounded-pill submit-button me-2"
        >
          Withdraw
        </button>
        <button
          type="submit"
          className="custom-button rounded-pill submit-button"
        >
          Add Wallet
        </button>
      </div> */}
      <div className="row g-3 mb-3 align-items-stretch">
        {wallets.map((wallet) => (
          <WalletCard
            key={wallet.currency}
            currency={wallet.currency}
            balance={wallet.balance}
          />
        ))}
      </div>
    </div>
  );
};

export default Wallets;
