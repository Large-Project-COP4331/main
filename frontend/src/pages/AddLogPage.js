import React, { useState } from 'react';
import {  Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import NavBarLoggedIn from '../components/NavBarLoggedIn';
import AddLogUI from '../components/AddLogUI';

import shark from '../components/images/006-shark-1.png';
const plus = <FontAwesomeIcon icon={faPlus} />;
const search = <FontAwesomeIcon icon={faMagnifyingGlass} />

const AddLogPage = () =>
{
    return(
        <div className="addLogContent">
            <NavBarLoggedIn/>
            <div className="addLogTop">
                <div className='addLogTopLeft'>
                    <div>
                        {/**empty */}
                    </div>
                </div>

                {/**main content essentially */}
                <div className='addLogTopMid'>
                    <div className="addLogBoxTop">
                        <div className="addLogBoxTopContent">
                                <div className="addLogTitle"> 
                                    Add New Log
                                </div>

                        </div>
                    </div>
                </div>

                <div className='addLogTopRight'>
                    {/**empty */}
                </div>
            </div>

            <div className="addLogBottom">
                <div className='addLogBottomLeft'>
                </div>

                <div className='addLogBottomMid'>
                    <div className="addLogBoxBottom">
                        <AddLogUI/>
                    </div>
                </div>

                <div className='addLogBottomRight'>
                    
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

export default AddLogPage;
