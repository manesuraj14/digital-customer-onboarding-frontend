import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import useAuth from "../services/useAuth";

function HomeNavbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: "blue", fontWeight: "bold" }}>
          Digital Customer Onboarding
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">
            {location.pathname !== "/" && (
              <>
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
              </>
            )}
          </Nav>

          <Nav>
            {isAuthenticated ? (
              <NavDropdown
                title="Profile"
                id="profile-dropdown"
                align="end"
              >
                <NavDropdown.Item>
                  <strong>{user?.name || "User Name"}</strong>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  {user?.email || "user@email.com"}
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : null}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HomeNavbar;
