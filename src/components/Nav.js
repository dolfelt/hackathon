import React, {PropTypes} from 'react';
import {Navbar, NavbarBrand, NavItem, NavLink, Nav} from 'reactstrap';
import Link from 'react-router/Link';

const Logout = ({onClick, ...props}) => {
  return (
    <NavItem>
      <NavLink href="#" onClick={onClick}>Logout</NavLink>
    </NavItem>
  )
}

const Navigation = ({loggedIn, logout}) => (
  <Navbar
    color="faded"
    light
    full
  >
    <NavbarBrand href="/">Hackathon 2017</NavbarBrand>
    <Nav navbar>
      <NavItem>
        <Link to="/" activeOnlyWhenExact>{
          ({href, onClick, isActive}) =>
            <NavLink href={href} active={isActive} onClick={onClick}>
              Ideas
            </NavLink>
        }</Link>
      </NavItem>
    </Nav>
    <Nav className="float-xs-right" navbar>
      {loggedIn ? <Logout onClick={logout} /> : null}
      <NavItem>
        <NavLink href="https://github.com/dolfelt/hackathon">Github</NavLink>
      </NavItem>
    </Nav>
  </Navbar>
);
Navigation.propTypes = {
  loggedIn: PropTypes.bool,
  logout: PropTypes.func,
}
export default Navigation;
