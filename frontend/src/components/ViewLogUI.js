import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from 'jwt-decode';
import DisplayLog from './DisplayLog';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const eye = <FontAwesomeIcon icon={faEye}/>;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash}/>;
const plus = <FontAwesomeIcon icon={faPlus} />;
const deleteIcon = <FontAwesomeIcon icon={faTrashCan}/>;
const search = <FontAwesomeIcon icon={faMagnifyingGlass} />

function ViewLogUI()
{
    const [data, setData] = useState(null);
    const [active, setActive] = useState(0);
    const [message,setMessage] = useState('');
    const route = (process.env.NODE_ENV === 'production' ?
    "https://oceanlogger-046c28329f84.herokuapp.com/api/searchlog" : "http://localhost:5000/api/searchlog");
    const [show, setShow] = useState(false);
    // add something to pass to do delete?
    const handleClose = () =>
    {
        setShow(false);
        //on clicking the delete button will do delete
        //doDelete();
    } 
    const handleShow = () => setShow(true);

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
            <tbody key={index} onClick={() => setActive(index)} className={`${active === index ? "activeCell" : ""}`}
            style={{
            borderWidth:"2px",
            borderColor:"black",
            borderStyle:"solid",
            borderRadius:"10px",
            borderColor:"#0089ED",
            height:"65px"
            }}>
            <tr>
                <td style={{fontSize: "12.5px", fontWeight: 'bold', padding: '10px'}}>{log.title}</td>
                <td style={{fontSize: "10px", textAlign: 'center'}}>{log.date}</td>
            </tr>
            <tr>
                <td style={{padding:"9px", textAlign:"center"}}>
                    <td style={{
                    backgroundColor: '#0089ED',
                    color: 'white',
                    borderRadius: '10px',
                    textAlign: 'center',
                    width:"60px",
                    height:"18.5px",
                    fontSize:"11px",
                    }}>
                    {log.location}
                    </td>
                </td>
                <td style={{fontSize: "15px", textAlign: 'center'}}>
                    <i id="deleteButton" onClick={handleShow}>{deleteIcon}</i>
                </td>
                <td></td>
            </tr>
            </tbody>
        );

        return <table style={{width:"100%"}}>{listItems}</table>;
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

    // goes to add log page
    const doAdd = async event => 
    {
        event.preventDefault();

        window.location.href="/addlogpage";
    };

    // deletes a log
    const doDelete = async event =>
    {
        event.preventDefault();

        alert("doDelete()");
    }

    const doSearch = async event =>
    {
        event.preventDefault();

        alert("doSearch()");
    }

    return(
        <div id="viewLogUIDiv">
            <div className="viewLogTop">
                <div className="viewLogSearchLog">
                        <input
                            id="searchLogs"
                            type="text"
                            placeholder="Search Logs"
                        />
                        <i id="searchIcon" onClick={doSearch}>{search}</i>
                </div>
                <div className="viewLogAddLog">
                    <button id="goAddButton" 
                    onClick={doAdd}><i>{plus}</i></button>
                </div>
            </div>
        
            <div className="logUIContent">
                <div className="listOfLogs" style={{overflow:""}}>
                    {showLogs()}
                    <>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to delete this log?</Modal.Body>
                            <Modal.Footer>
                            <Button variant="dark" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleClose}>
                                Delete
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                </div>
                
                <div className="selectedLog" style={{overflow:"auto"}}>
                    {displayMainLog()}
                </div>
            </div>
        </div>
    );
};

export default ViewLogUI;
