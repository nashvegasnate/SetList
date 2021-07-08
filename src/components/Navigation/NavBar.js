import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavbarBrand,
  Button,
} from 'reactstrap';
import { signInUser, signOutUser } from '../../helpers/auth';
import clef from '../../assets/clef.png';

const NavBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const authenticated = () => (
    <>
      <NavItem>
        <Link className="nav-link" to="/lists">LISTS</Link>
      </NavItem>
      <NavItem>
        <Link className="nav-link" to="/songs">SONGS</Link>
      </NavItem>
    </>
  );

  return (
    <div className="navBar">
      <Navbar color="light" light expand="md" className='justify-content-between'>
        <NavbarBrand href="/">
          <img src={clef} width="30" height="50" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          {user && authenticated()}
            {user !== null && (
              <NavItem className='align-self-center ml-1'>
                {user ? (
                  <Button size='md' color="danger" onClick={signOutUser}>
                    <i className="fas fa-sign-out-alt"></i>
                  </Button>
                ) : (
                  <Button size='md' color="info" onClick={signInUser}>
                    <i className="fas fa-sign-in-alt"></i>
                  </Button>
                )}
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

NavBar.propTypes = {
  user: PropTypes.any,
};

export default NavBar;
