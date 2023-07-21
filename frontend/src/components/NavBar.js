import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import shark from './images/006-shark-1.png';

const navbar= () =>{
  return (
      <Navbar expand="lg" className="bg-body-tertiary overflow-visible">
        <Container>
          <Navbar.Brand href="#welcome">
              <span id="blackText" style={{fontSize: 25}}>
                  Scuba
              </span>
              <span id="blueText" style={{fontSize: 25}}>
                  Logger
              </span>
              <img
                  alt="ScubbaLogger Logo"
                  src={shark}
                  width="30"
                  height="30"
              />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                  
              </Nav>
              <Nav>
                  <Nav.Link href="/loginpage" >Login</Nav.Link>
                  <Nav.Link href="/registerpage" >Register</Nav.Link>
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}
export default navbar;
