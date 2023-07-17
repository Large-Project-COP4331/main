import React, { useState } from 'react';
import {  Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import ViewLogUI from '../components/ViewLogUI';
import NavBarLoggedIn from '../components/NavBarLoggedIn';

import shark from '../components/images/006-shark-1.png';
const plus = <FontAwesomeIcon icon={faPlus} />;
const search = <FontAwesomeIcon icon={faMagnifyingGlass} />

const HomePage = () =>
{
    const [openAdd, setOpenAdd] = useState(false);

    const doSearch = async event => 
    {
        event.preventDefault();

        alert("doSearch()");
    };

    const doAdd = async event => 
    {
        event.preventDefault();

        window.location.href="/addlogpage";
    };

    return(
        <div className="homepageContent">
            <NavBarLoggedIn/>
            <div className="homepageTop">
                <div className='homepageTopLeft'>
                    <div>
                        {/**empty */}
                    </div>
                </div>

                {/**main content essentially */}
                <div className='homepageTopMid'>
                    <div className="homepageBoxTop">
                        <div className="homepageBoxTopContent">
                            <div className="homepageBoxTopLeft">
                                <div className="homepageLogs"> 
                                    Logs
                                </div>
                            </div>

                            <div className="homepageBoxTopMid">
                                <div className="homepageSearchLog">
                                    <input
                                        id="searchLogs"
                                        type="text"
                                        placeholder="Search Logs"
                                    />
                                    <i id="searchIcon" onClick={doSearch}>{search}</i>
                                </div>
                            </div>

                            <div className="homepageBoxTopRight">
                                <div className="homepageAddLog">
                                    <button id="goAddButton" 
                                        onClick={doAdd}><i>{plus}</i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='homepageTopRight'>
                    {/**empty */}
                </div>
            </div>

            <div className="homepageBottom">
                <div className='homepageBottomLeft'>
                </div>

                <div className='homepageBottomMid'>
                    <div className="homepageBoxBottom">
                        <ViewLogUI/>
                    </div>
                </div>

                <div className='homepageBottomRight'>
                    
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

export default HomePage;
