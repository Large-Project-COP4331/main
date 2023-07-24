import React, { useState } from 'react';
import {  Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import NavBarLoggedIn from '../components/NavBarLoggedIn';
import EditLogUI from '../components/EditLogUI';

import shark from '../components/images/006-shark-1.png';
const plus = <FontAwesomeIcon icon={faPlus} />;
const search = <FontAwesomeIcon icon={faMagnifyingGlass} />

const EditLogPage = () =>
{
    return(
        <div className="editLogContent">
            <NavBarLoggedIn/>
            <div className="editLogTop">
                <div className='editLogTopLeft'>
                    <div>
                        {/**empty */}
                    </div>
                </div>

                {/**main content essentially */}
                <div className='editLogTopMid'>
                    <div className="editLogBoxTop">
                        <div className="editLogBoxTopContent">
                                <div className="editLogTitle"> 
                                    Edit Your Log
                                </div>

                        </div>
                    </div>
                </div>

                <div className='editLogTopRight'>
                    {/**empty */}
                </div>
            </div>

            <div className="editLogBottom">
                <div className='editLogBottomLeft'>
                </div>

                <div className='editLogBottomMid'>
                    <div className="editLogBoxBottom">
                        <EditLogUI/>
                    </div>
                </div>

                <div className='editLogBottomRight'>
                    
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

export default EditLogPage;
