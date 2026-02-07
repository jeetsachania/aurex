import React from "react";
import Wallets from "./Wallets";
import Orders from "./Orders";

interface KpiCardProps {
  title: string;
  value: string | number;
  delta?: string;
  positive?: boolean;
}

function KpiCard({ title, value, delta, positive }: KpiCardProps) {
  return (
    <div className="card dashboard-card">
      <div className="card-body d-flex flex-column justify-content-between">
        <h6 className="card-title">{title}</h6>
        <div>
          <h3 className="card-text">{value}</h3>
          {delta && (
            <span className={`badge ${positive ? "bg-success" : "bg-danger"}`}>
              <i
                className={`bi ${positive ? "bi-arrow-up-right" : "bi-arrow-down-right"} me-1`}
              />
              {delta}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

const Home: React.FC = () => {
  return (
    <div className="home container-fluid">
      <div className="container-fluid">
        <div className="row g-3 mb-3">
          <div className="col-6 col-md-3">
            <KpiCard
              title="Account Value"
              value="£12,345.67"
              delta="+10%"
              positive
            />
          </div>
          <div className="col-6 col-md-3">
            <KpiCard title="P / L" value="£1,234.56" delta="+4.2%" positive />
          </div>
          <div className="col-6 col-md-3">
            <KpiCard
              title="Available Cash"
              value="£3,210.00"
              delta="+10%"
              positive
            />
          </div>
          <div className="col-6 col-md-3">
            <KpiCard title="Open Positions" value="5" delta="3" positive />
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row g-3 mb-3 align-items-stretch">
          <div className="col-lg-6 d-flex">
            <div className="card dashboard-card w-100">
              <div className="card-body">
                <h6 className="card-title">Portfolio Performance</h6>
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-flex flex-column gap-3">
            <div className="card dashboard-card flex-fill">
              <div className="card-body">
                <h6 className="card-title">Trending Instruments</h6>
              </div>
            </div>
            <div className="card dashboard-card flex-fill">
              <div className="card-body">
                <h6 className="card-title">Currency Exchange</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <Wallets />
      </div>
      <div className="container-fluid">
        <Orders />
      </div>
    </div>
  );
};

export default Home;
