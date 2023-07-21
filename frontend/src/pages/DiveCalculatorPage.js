import React, { useState } from 'react';
import {  Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import DiveCalcUI from '../components/DiveCalcUI';
import NavBarLoggedIn from '../components/NavBarLoggedIn';

import shark from '../components/images/006-shark-1.png';

const DiveCalcPage = () =>
{
    return(
        <div className="diveCalcContent">
            <NavBarLoggedIn/>
            <div className="diveCalcTop">
                <div className='diveCalcTopLeft'>
                    <div>
                        {/**empty */}
                    </div>
                </div>

                {/**main content essentially */}
                <div className='diveCalcTopMid'>
                    <div className="diveCalcBoxTop">
                        <div className="diveCalcBoxTopContent">
                            <div className="diveCalcBoxTopLeft">
                                <div className="diveCalcTitle"> 
                                    Dive Table Calculator 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='diveCalcTopRight'>
                    {/**empty */}
                </div>
            </div>

            <div className="diveCalcDivBottom">
                <div className='diveCalcBottomLeft'>
                </div>

                <div className='diveCalcBottomMid'>
                    <div className="diveCalcBoxBottom">
                        <DiveCalcUI/>
                    </div>
                </div>

                <div className='diveCalcBottomRight'>
                    
                </div>
            </div>

            <div style={{height: 100}} />

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

export default DiveCalcPage;
