import React from "react";
import { Link, withRouter } from "react-router-dom";
import SwipeWrapper from "./SwipeWrapper";
import {
  Navbar,
  Nav,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  NavItem
} from "reactstrap";

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  goHome = e => {
    e.preventDefault();
    this.props.history.push("/");
  };

  render() {
    return (
      <SwipeWrapper {...this.props}>
        <Navbar className="bg-light-blue" color="dark" dark expand="md">
          <NavbarBrand href="/" onClick={this.goHome}>
            <i className="fas fa-bus mr-2" />
            Trolli
          </NavbarBrand>

          <NavbarToggler className="border-0" onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} className="mb-4" navbar>
            <Nav className="ml-auto text-center" navbar>
              <NavItem>
                <Link to="/myroute" className="nav-link">
                  <strong style={{ color: "white" }}>My Route</strong>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/mydings" className="nav-link">
                  <strong style={{ color: "white" }}>My Dings</strong>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/ding/new" className="nav-link">
                  <strong style={{ color: "white" }}>New Ding</strong>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/logout" className="nav-link">
                  <strong style={{ color: "white" }}>Logout</strong>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </SwipeWrapper>
    );
  }
}

export default withRouter(NavBar);
