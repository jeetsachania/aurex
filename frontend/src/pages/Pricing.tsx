import React, { useState } from "react";

interface Feature {
  icon: string;
  text: string;
  limited?: boolean;
}

interface Benefit {
  icon: string;
  text: string;
  limited?: boolean;
}

interface Plan {
  title: string;
  priceMonthly: string;
  priceAnually: string;
  features: Feature[];
  benefits: Benefit[];
}

const plans: Plan[] = [
  {
    title: "Standard",
    priceMonthly: "£7.99",
    priceAnually: "£79.99",
    features: [
      { icon: "bi-person-fill", text: "General Investment Account" },
      { icon: "bi-piggy-bank-fill", text: "Stocks & Shares ISA" },
      { icon: "bi-pie-chart-fill", text: "Basic Charting & Indicators" },
      {
        icon: "bi-bar-chart-fill",
        text: "Real-Time Market Data Access",
        limited: true,
      },
    ],
    benefits: [
      { icon: "bi-currency-exchange", text: "Commission-free investing" },
      { icon: "bi-currency-pound", text: "FX fee of 0.99% on non-GBP trades" },
      { icon: "bi-percent", text: "1% AER on up to £1000 uninvested cash" },
    ],
  },
  {
    title: "Pro",
    priceMonthly: "£14.99",
    priceAnually: "£149.99",
    features: [
      { icon: "bi-star-fill", text: "Unlimited Standard Tier Features" },
      { icon: "bi-pie-chart-fill", text: "Advanced Charting & Indicators" },
      {
        icon: "bi-exclamation-circle-fill",
        text: "Watchlists & Real-Time Alerts",
        limited: true,
      },
      {
        icon: "bi-file-text-fill",
        text: "Research Report Access",
        limited: true,
      },
    ],
    benefits: [
      { icon: "bi-currency-exchange", text: "Commission-free investing" },
      { icon: "bi-currency-pound", text: "FX fee of 0.69% on non-GBP trades" },
      { icon: "bi-percent", text: "3% AER on up to £2000 uninvested cash" },
    ],
  },
  {
    title: "Elite",
    priceMonthly: "£29.99",
    priceAnually: "£299.99",
    features: [
      { icon: "bi-rocket-takeoff-fill", text: "Unlimited Pro Tier Features" },
      { icon: "bi-calendar-fill", text: "Scheduled Trades" },
      { icon: "bi-file-text-fill", text: "Extensive Research Report Access" },
      { icon: "bi-person-vcard-fill", text: "Dedicated Account Manager" },
    ],
    benefits: [
      { icon: "bi-currency-exchange", text: "Commission-free investing" },
      { icon: "bi-currency-pound", text: "FX fee of 0.39% on non-GBP trades" },
      { icon: "bi-percent", text: "5% AER on up to £3000 uninvested cash" },
    ],
  },
];

const Pricing: React.FC = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  const togglePricingPeriod = () => {
    setIsMonthly(!isMonthly);
  };

  return (
    <div className="container-fluid">
      <section className="container my-5">
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="custom-header mb-4">Wealth On Your Terms</h2>
            <ul className="list-unstyled custom-list m-0">
              <li className="mb-3 d-flex align-items-start">
                <span>
                  Choose a plan that suits you and your needs and let Aurex take
                  care of the rest.
                </span>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <i className="bi bi-calendar-fill me-2"></i>
                <span>Flexible Subscription Periods</span>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <i className="bi bi-incognito me-2"></i>
                <span>No Hidden Fees</span>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <i className="bi bi-key-fill me-2"></i>
                <span>Secure Encryption</span>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <i className="bi bi-clock-fill me-2"></i>
                <span>24/7 Support</span>
              </li>
            </ul>
            <button
              className="custom-button rounded-pill me-2"
              onClick={togglePricingPeriod}
            >
              {isMonthly ? "MONTHLY" : "ANUALLY"}
            </button>
          </div>
        </div>

        <div className="row">
          {plans.map((plan) => (
            <div key={plan.title} className="col-md-4 mb-4">
              <div className="card custom-card hover d-flex flex-column h-100">
                <div className="card-body pb-2 flex-grow-1">
                  <h5 className="card-title">{plan.title}</h5>
                  <p className="card-text">
                    {isMonthly ? plan.priceMonthly : plan.priceAnually}
                    <span className="card-subtext">
                      {isMonthly ? "/BILLED MONTHLY" : "/BILLED ANUALLY"}
                    </span>
                  </p>
                </div>
                <ul className="list-group list-group-flush custom-top-border flex-grow-1">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="list-group-item custom-list-group-item"
                    >
                      <i className={`bi ${feature.icon} me-2`}></i>
                      {feature.text}
                      {feature.limited && (
                        <strong className="limited-feature">*</strong>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="p-3 border-top">
                  <h6 className="custom-header mb-2">
                    <i className="bi bi-trophy-fill me-2"></i>
                    Additional Benefits
                  </h6>
                  <ul className="list-unstyled mb-0">
                    {plan.benefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="list-group-item custom-list-group-item"
                      >
                        <i className="bi bi-check-lg me-2 text-success"></i>
                        {benefit.text}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer border-0 bg-transparent pt-0 pb-3">
                  <button className="custom-button rounded-pill me-2">
                    SELECT
                  </button>
                  <button className="custom-button rounded-pill">DEMO</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mb-4">
          <div className="col-12">
            <ul className="list-unstyled features-list">
              <li className="d-flex align-items-start">
                <span className="subtext">
                  <strong className="limited-feature">*</strong> LIMITED FEATURE
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
