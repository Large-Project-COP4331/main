import React, { useState } from 'react';

import logo from './images/OceanLoggerLogo.png';
import shark from './images/001-shark.png';

function LoggedOutUI()
{

    return(
        <div className="loggedOutContainer">
            <div className="loggedOutContent">
                <div className="leftShark">

                    <div className="ExploreTheOceanWithScubaLogger">
                        <span id="blackText">
                            Explore the Ocean with {""}
                        </span>
                        <span id="blueText">
                            Scuba Logger!
                        </span>
                    </div>

                    <div className="scubbaDescription">
                        Log and document underwater experiences, track dive profiles, and share 
                        captivating stories and photographs from the deep blue sea.
                    </div>

                </div>

                <div className="rightShark">
                    <img className="Image2" src={logo} />
                </div>
            </div>

            <div style={{height: 250}} />

            <div className="toolsProvided">
                <div className="bigText">
                    <span id="blackText">
                        Tools 
                    </span>
                    <span id="blueText">
                        Provided<br/>
                    </span>
                </div>
                <div className="scubbaTools" style={{display: 'flex', flexDirection: 'row'}}>
                    <div className="tool1" />
                    <div className="tool2" />
                    <div className="tool3" />
                </div>
                
                <div className="loggedOutBottom">
                     {/**onClick={doRegister} */}
                    <input type="submit" id="registerButton" class="buttons" value = "Sign Up Now"/>
                </div>
            </div>

            <div style={{height: 250}} />

            <div className="footer">
                <div className="footerContent">
                    <div className="footerLogo">
                        <span id="blackText" style={{fontSize: 25}}>
                            Scubba
                        </span>
                        <span id="blueText" style={{fontSize: 25}}>
                            Logger
                        </span>
                        <img src={shark}/>
                    </div>

                    <div>
                        About Us<br/>
                        Meet the team<br/>
                    </div>
                </div>
               
               <div style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>
                    © 2023 ScubbaLogger. All rights reserved.
               </div>
            </div> 
        </div>
    );
}

export default LoggedOutUI;
