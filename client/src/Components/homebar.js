import logo from './logo.png';
import React from 'react';
import {Nav, NavBtn, NavBtnLink} from './NavbarElements';
import 'bootstrap/dist/css/bootstrap.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import AboutModal from './/aboutmodal';

function HomeBar() {
  return (
    <Navbar bg="dark" expand="lg">

      <Container className="text-align-center">

        <img src={logo} width = "123px" height = "75px" className="HeaderLogo me-5 pe-5 justify-content-left" alt="logo" />
        
        <Navbar.Brand  className="ms-5 ps-5 text-white" href="/home"><h2> Movie Knight</h2></Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>

        <Nav>

          {/* Homepage Link */}
          <NavBtn>
            <NavBtnLink className="m-0" to='/login'>Login</NavBtnLink>
          </NavBtn>

          {/* About Modal */}
          <NavBtn>
            <NavBtnLink><AboutModal/> </NavBtnLink>
          </NavBtn>

        </Nav>

      </Container>

    </Navbar>
  );
}

export default HomeBar;