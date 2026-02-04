import React from "react";

const Home: React.FC = () => {
  return (
    <div className="home hero">
      <div className="hero-content">
        <h1>
          POWERFUL TRADING.<span className="line-break"></span> ZERO HASSLE.
        </h1>
        <button
          className="rounded-pill custom-button default"
          onClick={() => alert("Get Started Clicked!")}
        >
          OPEN YOUR ACCOUNT NOW
        </button>
        <p className="subtext">
          WHEN YOU INVEST, YOUR CAPITAL IS AT RISK.
        </p>
      </div>
    </div>
  );
};

export default Home;
