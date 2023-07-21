import React from 'react';
import {  Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import shark from './images/007-shark-2.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';

const logout = <FontAwesomeIcon icon={faArrowRightFromBracket} />
const home = <FontAwesomeIcon icon={faHouse} />
const calc = <FontAwesomeIcon icon={faCalculator} />

const navbarloggedin= () =>{


    const doLogout = event => 
    {
	    event.preventDefault();

        localStorage.removeItem("accessToken");
        window.location.href = '/';

    };

    return (
        <Navbar expand="lg" className="overflow-visible" style={{backgroundColor: "#0089ED"}}>
            <Container>
                <Navbar.Brand href="#home">
                    <span id="blackText" style={{fontSize: 25}}>
                        Scuba
                    </span>
                    <span id="whiteText" style={{fontSize: 25}}>
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
                    <Nav className="me-auto">
                    
                        <Nav.Link href="/homepage" className="nav-link-loggedin">
                            <i>{home}</i>
                        </Nav.Link>
                        <Nav.Link href="/divecalc" className="nav-link-loggedin">
                            <i>{calc}</i>
                        </Nav.Link>
         
                    </Nav>
                    <Nav>
                        <Navbar.Text style={{color: 'white', marginRight: '10px'}}>
                            Name
                        </Navbar.Text>
                        <Nav.Link href="/welome" 
                                  className="nav-link-loggedin" 
                                  onClick={doLogout}
                        >
                            <i>{logout}</i>
                            Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default navbarloggedin;
