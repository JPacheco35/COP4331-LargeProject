import logo from './Images/logo.png';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import AboutModal from './/aboutmodal';
import {Nav,NavBtn,NavBtnLink} from './NavbarElements'

function HomeBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container className = 'text-align-center'>

        <img src={logo} width = "132px" height = "75px" className="HeaderLogo" alt="logo" />
        
        <Navbar.Brand className = "ms-5 ps-5" href="/home"><h2> Movie Knight</h2></Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Nav>

          {/* Homepage Link
          <Navbar.Brand href="/home">Home</Navbar.Brand>

          {/* About Modal 
          <Navbar.Brand> <AboutModal/> </Navbar.Brand> */}

          <NavBtn>
            <NavBtnLink className = "m-0" to = '/login'>Login</NavBtnLink>
          </NavBtn>

          <NavBtn>
            <NavBtnLink><AboutModal></AboutModal></NavBtnLink>
          </NavBtn>

        </Nav>

      </Container>
    </Navbar>
  );
}

export default HomeBar;