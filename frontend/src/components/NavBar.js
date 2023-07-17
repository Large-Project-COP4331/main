import React from 'react';
import {  Link } from "react-router-dom";
import shark from './images/006-shark-1.png';

const navbar= () =>{
  return (
    <div>
        <div class="left">
            <div className="logo">
                <span id="blackText" style={{fontSize: 25}}>
                     Scuba
                </span>
                <span id="blueText" style={{fontSize: 25}}>
                    Logger
                </span>
                <img src={shark}/>
            </div>
        </div>
         
        <div class="right">
            <ul className="navBar">
                <Link to="/loginpage" className="navLinks">Login</Link>
                <Link to="/registerpage" className="navLinks">Register</Link>
            </ul>
        </div>
    </div>
  );
}
export default navbar;
