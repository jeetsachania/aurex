import React, { useState } from "react";
import DashboardNav from "../../components/DashboardNav";
import Home from "./Home";
import Trending from "./Trending";
import Support from "./Support";
import Settings from "./Settings";

import Logo from "../../assets/svgs/Logo";

const Dashboard: React.FC = () => {
  const [activePage, setActivePage] = useState<string>("home");

  const handleNavClick = (page: string) => {
    setActivePage(page);
  };

  return (
    <div>
      <nav className="navbar-dark bg-dark d-md-none px-3">
        <button
          className="btn btn-outline-none sandwich-icon"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
        >
          <i className="bi bi-list fs-1"></i>
        </button>
        <span className="navbar-brand ms-2">Aurex</span>
      </nav>
      <div
        className="offcanvas offcanvas-start d-md-none"
        tabIndex={-1}
        id="sidebarMenu"
        aria-labelledby="sidebarLabel"
      >
        <div className="offcanvas-header">
          <div className="logo-container ms-2">
            <Logo additionalClassName="static" onClick={undefined} />
          </div>
          <button
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-0">
          <div className="sidebar">
            <DashboardNav activePage={activePage} onNavClick={handleNavClick} />
          </div>
        </div>
      </div>
      <div className="container-fluid dashboard">
        <div className="row">
          <nav className="col-md-3 col-lg-2 col-xl-2 col-xxl-2 col-xxxl-1 d-none d-md-block sidebar">
            <div>
              <Logo additionalClassName="static" onClick={undefined} />
              <DashboardNav
                activePage={activePage}
                onNavClick={handleNavClick}
              />
            </div>
          </nav>
          <main className="col-md-9 col-lg-10 col-xl-10 col-xxl-10 col-xxxl-11 ms-sm-auto px-md-4 py-4 main-content">
            <div className="row">
              {activePage === "home" && <Home />}
              {activePage === "trending" && <Trending />}
              {activePage === "support" && <Support />}
              {activePage === "settings" && <Settings />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
