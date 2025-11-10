import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";

const AppNavbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.body.classList.toggle("dark-mode", newTheme);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  return (
    <Navbar className="custom-navbar" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/#home">
          MyApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/#home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/#features">
              Features
            </Nav.Link>
            <Nav.Link as={Link} to="/#testimonials">
              Testimonials
            </Nav.Link>
            <Nav.Link as={Link} to="/#pricing">
              Pricing
            </Nav.Link>
            <Nav.Link as={Link} to="/#faq">
              FAQ
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              Signup
            </Nav.Link>
            <Nav.Link onClick={toggleTheme}>
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
