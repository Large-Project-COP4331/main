import React from 'react';
import {  Link } from "react-router-dom";

const navbarloggedin= () =>{


    const doLogout = event => 
    {
	    event.preventDefault();

        localStorage.removeItem("accessToken");
        window.location.href = '/';

    };

    return (
        <div>
            
            <div class="left">
                <div className="Subbalogger" style={{width: 225, height: 49}}>
                        <span style={{color: 'black', 
                            fontSize: 32, 
                            fontFamily: 'Inter', 
                            fontWeight: '700', 
                            wordWrap: 'break-word'}}
                        >
                            Subba
                        </span>
                        <span style={{color: '#4589DF', 
                            fontSize: 32, 
                            fontFamily: 'Inter', 
                            fontWeight: '700', 
                            wordWrap: 'break-word'}}
                        >
                            Logger 
                        </span>
                </div>
            </div>
            

            <div className="mid">
                <ul className="navBar">
                    <Link to="/homepage" className="navLinks">Home Page</Link>
                </ul>
            </div>
            
            <div class="right">
                <ul className="navBar">
                    <Link to="/" className="navLinks" onClick={doLogout}>Log Out</Link>
                </ul>
            </div>
        </div>
    );
}
export default navbarloggedin;
