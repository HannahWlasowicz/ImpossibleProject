import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../images/Logo.jpg";

class Navigation extends React.Component {
  render() {
    return (
      <div>
        <Navbar bg="white" variant="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt="Logo"
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Impossible Project
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">About Us</Nav.Link>
              <Nav.Link href="data">Data</Nav.Link>
              <Nav.Link href="#pricing">Funding</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
