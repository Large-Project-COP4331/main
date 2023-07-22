import React, { useState } from 'react';

import logo from './images/OceanLoggerLogo.png';
import shark from './images/006-shark-1.png';
import log from './images/003-time.png';
import eye from './images/004-biometric-recognition.png';
import shield from './images/005-shield.png';
import oceanfloor from './images/ocean_floor.png';

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

            <div style={{height: 150}} />

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
                    <div className="circle1">
                        <div className="logIconCircle">
                            <img id="logIcon" src={log}/>
                        </div>
                        <div className="logIconText" style={{fontWeight: 'bold'}}>Logs</div>
                    </div>
                    
                    <div className="circle2">
                        <div className="eyeIconCircle">
                            <img id="eyeIcon" src={eye}/>
                        </div>
                        <div className="eyeIconText" style={{fontWeight: 'bold'}}>Capture</div>
                    </div>
                    
                    <div className="circle3">
                        <div className="shieldIconCircle">
                            <img id="shieldIcon" src={shield}/>
                        </div>
                        <div className="shieldIconText" style={{fontWeight: 'bold'}}>Safety</div>
                    </div>
                </div>
            </div>

            <div style={{height: 150}} />

            <div className="loggedOutBottom">
                <div className="loggedOutBottomRegister">
                    <div className="loggedOutBottomRegisterText">
                        <span style={{fontSize: 40, 
                            fontWeight: '700', 
                            wordWrap: 'break-word'}}
                        >
                            Want to Log<br/>
                        </span>
                        
                        <span style={{fontSize: 40, 
                            fontWeight: '700', 
                            wordWrap: 'break-word'}}
                        >
                            Your Dive?<br/>
                        </span>
                        <span style={{fontSize: 12,  
                            wordWrap: 'break-word'}}
                        >
                            Start logging your underwater experiences now!<br/>
                        </span>
                    </div>
                    <div className="loggedOutBottomRegisterButton">
                        {/**onClick={doRegister} or go to a link?*/}
                        <input type="submit" id="registerButton" class="buttons" value = "Sign Up Now"/>
                    </div>
                </div>
            </div>

            <div className="footer">
                <div className="footerContent">
                    <div className="footerLogo">
                        <span id="blackText" style={{fontSize: 25}}>
                            Scuba
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
                    © 2023 ScubaLogger. All rights reserved.
               </div>
            </div> 
        </div>
    );
}

export default LoggedOutUI;
