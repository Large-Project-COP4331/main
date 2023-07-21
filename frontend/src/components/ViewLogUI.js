import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from 'jwt-decode';
import DisplayLog from './DisplayLog';

const eye = <FontAwesomeIcon icon={faEye}/>;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash}/>;

function ViewLogUI()
{
    const [data, setData] = useState(null);
    const [active, setActive] = useState(0);
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

    // Function to fetch data. Currently obtains all the logs a user has and stores into data.
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

    // Loads a bunch of logs in the side bar.
    const showLogs = () =>
    {
        // console.log(data);
        if (data == null)
        {
            return;
        }

        // Can make this load a specific amount of items, rn it does all.
        const listItems = data.map((log, index) =>
            <tbody key={index} onClick={() => setActive(index)}>
            <tr>
                <td>{log.title}</td>
                <td>{log.date}</td>
            </tr>
            <tr>
                <td>{log.location}</td>
                <td></td>
            </tr>
            </tbody>
        );

        return <table>{listItems}</table>;
    }

    // Loads a component for each log.
    const displayMainLog = () =>
    {
        // console.log(data);
        if (data == null)
        {
            return;
        }

        const listItems = data.map((log, index) =>
            (active === index && <DisplayLog data={data[index]} key={index}/>)
        );

        return listItems;
    }

    return(
        <div id="viewLogUIDiv">
            <div className="logUIContent">
                <div className="listOfLogs">
                    {showLogs()}
                </div>
                
                <div className="selectedLog" style={{overflow:"auto"}}>
                    {displayMainLog()}
                </div>
            </div>
        </div>
    );
};

export default ViewLogUI;
