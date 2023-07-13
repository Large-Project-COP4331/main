import React from 'react';
import {  Link } from "react-router-dom";

const navbar= () =>{
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
                        Scubba
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
