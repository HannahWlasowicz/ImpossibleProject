import React, { Component } from "react";
import { Container } from "react-bootstrap";
import "../css/styles.css";
import "../css/logos.css";
import omidyar from "../images/ONLogo.png";
import mozilla from "../images/moz-logo.png";
import schmidt from "../images/schmidtLogo.png";
import cnp from "../images/CNPLogo.png";

class Funding extends Component {
  render() {
    return (
      <section className="funding">
          <h1 className="funding-text">Our Sponsors</h1>
        <Container className="logo-container">
          <img src={mozilla} alt="mozilla logo" className="mozilla" />
          <img src={omidyar} alt="omidyar logo" className="omidyar" />
          <img src={schmidt} alt="schmidt logo" className="schmidt" />
          <img src={cnp} alt="cnp logo" className="cnp"/>
        </Container>
      </section>
    );
  }
}

export default Funding;
