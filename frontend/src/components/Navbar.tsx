import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";

const AppNavbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
    document.body.classList.add("theme-ready");
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.body.classList.toggle("dark-mode", newTheme);
    document.body.classList.add("theme-transition");
  };

  useEffect(() => {
    document.body.classList.toggle("light-mode", isDarkMode);
  }, [isDarkMode]);

  const handleNavClick = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector(hash);
    setExpanded(false);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/" + hash);
      setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <Navbar
      className="custom-navbar"
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/#home" onClick={handleNavClick("#home")}>
          MyApp
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/#home"
              onClick={handleNavClick("#home")}
              className="mx-2"
            >
              HOME
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/#features"
              onClick={handleNavClick("#features")}
              className="mx-2"
            >
              FEATURES
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/#pricing"
              onClick={handleNavClick("#pricing")}
              className="mx-2"
            >
              PRICING
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/#faq"
              onClick={handleNavClick("#faq")}
              className="mx-2"
            >
              FAQ
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/login"
              onClick={() => setExpanded(false)}
              className="custom-button rounded-pill px-3 mx-2"
            >
              LOGIN
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/signup"
              onClick={() => setExpanded(false)}
              className="custom-button rounded-pill px-3 mx-2"
            >
              SIGNUP
            </Nav.Link>
            <Nav.Link id="theme-toggle" onClick={toggleTheme}>
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
