import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from 'jwt-decode';

const eye = <FontAwesomeIcon icon={faEye}/>;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash}/>;

function ViewLogUI()
{
    const [data, setData] = useState(null);
    const [message,setMessage] = useState('');
    const route = (process.env.NODE_ENV === 'production' ?
    "https://oceanlogger-046c28329f84.herokuapp.com/api/searchlog" : "http://localhost:5000/api/searchlog");

    // Don't question this, idk how it actually works.
    useEffect(() =>
    {
        if (localStorage.getItem("accessToken") == null)
        {
            window.location.href = '/';
        }
        getData();
    }, []);

    // Function to fetch data.
    const getData = async () => 
    {
        let accessToken = localStorage.getItem("accessToken");
        let ud = jwtDecode(accessToken);
        let jsonObject = JSON.stringify({accessToken:accessToken, userid:ud.id, title:"", location:"", startDate:"", endDate:""});

        try
        {
            const response = await fetch(route,{method:'POST',body:jsonObject,headers:{'Content-Type': 'application/json'}});
            let res = JSON.parse(await response.text());

            if (res.error !== "")
            {
                setMessage("API Error: " + res.error);
                return;
            }

            localStorage.setItem('accessToken', res.accessToken);
            setData(res.result);
        }
        catch(e)
        {
            console.log(e);
        }
    };

    // Loads a bunch of logs.
    const showLogs = () =>
    {
        // console.log(data);
        if (data == null)
        {
            return;
        }

        // Right now this only loads the log titles, i'll keep working on this.
        const listItems = data.map(log =>
        <li>
            {log.title}
        </li>
        );

        return <ul>{listItems}</ul>;
    }

    return(
        <div id="viewLogUIDiv">
            <div className="logUIContent">
                <div className="listOfLogs">
                    {showLogs()}
                </div>
                
                <div className="selectedLog">
                    {/**another component that displays selected log */}
                </div>
            </div>
        </div>
    );
};

export default ViewLogUI;
