import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class NavBar extends Component {
  render() {
    return (
      <Navbar className="bg-light navbar-light" fluid inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <i className="fa fa-calendar mr-2 brand-logo d-inline-block align-top" />
              Urlaubsplanner
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}

export default NavBar;
