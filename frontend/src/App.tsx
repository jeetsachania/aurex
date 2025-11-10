import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Global.css";
import "./styles/Fonts.css";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/features" element={<Index scrollTo="features" />} />
        <Route path="/testimonials" element={<Index scrollTo="testimonials" />} />
        <Route path="/pricing" element={<Index scrollTo="pricing" />} />
        <Route path="/faq" element={<Index scrollTo="faq" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
