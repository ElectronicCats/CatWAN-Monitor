import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse
} from "mdbreact";

class NavbarPage extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark mb-3">
        <a className="navbar-brand" href="#">
          <h4>
            <span className="badge badge-secondary">
              Electronic Cats
            </span>
          </h4>
        </a>
      </nav>
    );
  }
}

export default NavbarPage;
