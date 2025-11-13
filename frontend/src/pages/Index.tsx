import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import AppNavbar from "../components/Navbar";
import Home from "./Home";
import Features from "./Features";
import Pricing from "./Pricing";
import Faq from "./Faq";
import Footer from "../components/Footer";

interface HomeProps {
  scrollTo?: string;
}

const Index: React.FC<HomeProps> = ({ scrollTo }) => {
  const location = useLocation();

  useEffect(() => {
    const hash = scrollTo || window.location.hash.replace("#", "");
    const section = document.getElementById(hash);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollTo, location.hash]);

  return (
    <div className="container-fluid">
      <AppNavbar />
      <section className="default-container" id="home">
        <Home />
      </section>
      <section className="default-container" id="features">
        <Features />
      </section>
      <section className="default-container" id="pricing">
        <Pricing />
      </section>
      <section className="default-container" id="faq">
        <Faq />
      </section>
      <Footer />
    </div>
  );
};

export default Index;
