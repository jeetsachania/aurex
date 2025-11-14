import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import "./styles/Global.css";
import "./styles/Typography.css";

import "./styles/components/Navbar.css";
import "./styles/components/Footer.css";
import "./styles/components/Form.css";
import "./styles/components/Button.css";
import "./styles/components/Card.css";
import "./styles/components/List.css";

import "./styles/pages/Home.css";
import "./styles/pages/Pricing.css";
import "./styles/pages/Login.css";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reset from "./pages/Reset";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/features" element={<Index scrollTo="features" />} />
        <Route path="/pricing" element={<Index scrollTo="pricing" />} />
        <Route path="/faq" element={<Index scrollTo="faq" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </Router>
  );
};

export default App;
