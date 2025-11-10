import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Home from "./Home";
import Features from "./Features";
import Testimonials from "./Testimonials";
import Pricing from "./Pricing";
import Faq from "./FAQ";

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
      <section className="default-container" id="home">
        <Home />
      </section>
      <section className="default-container" id="features">
        <Features />
      </section>
      <section className="default-container" id="testimonials">
        <Testimonials />
      </section>
      <section className="default-container" id="pricing">
        <Pricing />
      </section>
      <section className="default-container" id="faq">
        <Faq />
      </section>
    </div>
  );
};

export default Index;
