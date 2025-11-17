import React from "react";
import { useNavigate } from "react-router-dom";

interface DashboardNavProps {
  activePage: string;
  onNavClick: (page: string) => void;
}

const DashboardNav: React.FC<DashboardNavProps> = ({
  activePage,
  onNavClick,
}) => {
  const navigate = useNavigate();
  const logout = () => {
    alert("logout")
    localStorage.removeItem("access_token");
    navigate("/login")
  }
  return (
    <div>
      <a
        href="#"
        className={activePage === "home" ? "active" : ""}
        onClick={() => onNavClick("home")}
      >
        <i className="bi bi-house-fill"></i>
        Home
      </a>
      <a
        href="#"
        className={activePage === "trending" ? "active" : ""}
        onClick={() => onNavClick("trending")}
      >
        <i className="bi bi-graph-up-arrow"></i>
        Trending
      </a>
      <hr className="solid"></hr>
      <a
        href="#"
        className={activePage === "orders" ? "active" : ""}
        onClick={() => onNavClick("orders")}
      >
        <i className="bi bi-book-fill"></i>
        Orders
      </a>
      <a
        href="#"
        className={activePage === "analytics" ? "active" : ""}
        onClick={() => onNavClick("analytics")}
      >
        <i className="bi bi-activity"></i>
        Analytics
      </a>
      <a
        href="#"
        className={activePage === "wallets" ? "active" : ""}
        onClick={() => onNavClick("wallets")}
      >
        <i className="bi bi-wallet-fill"></i>
        Wallets
      </a>
      <hr className="solid"></hr>
      <a
        href="#"
        className={activePage === "support" ? "active" : ""}
        onClick={() => onNavClick("support")}
      >
        <i className="bi bi-question-circle-fill"></i>
        Support
      </a>
      <a
        href="#"
        className={activePage === "settings" ? "active" : ""}
        onClick={() => onNavClick("settings")}
      >
        <i className="bi bi-gear-fill"></i>
        Settings
      </a>
      <hr className="solid"></hr>
      <a href="#" onClick={logout}>
        <i className="bi bi-box-arrow-left"></i>
        Log Out
      </a>
    </div>
  );
};

export default DashboardNav;
