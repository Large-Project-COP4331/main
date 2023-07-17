import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const eye = <FontAwesomeIcon icon={faEye}/>;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash}/>;

function ViewLogUI()
{
    const [message,setMessage] = useState('');

    return(
        <div id="viewLogUIDiv">
            <div className="logUIContent">
                <div className="listOfLogs">
                    {/**another component that gets list of logs */}
                </div>
                
                <div className="selectedLog">
                    {/**another component that displays selected log */}
                </div>
            </div>
        </div>
    );
};

export default ViewLogUI;
