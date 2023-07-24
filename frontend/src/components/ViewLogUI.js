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

// Number of logs to show on a page.
const displayNum = 7;

function ViewLogUI()
{
    var searchString = "";
    const [mainData, setMainData] = useState(null);
    const [data, setData] = useState(null);
    const [active, setActive] = useState(0);
    const [message,setMessage] = useState('');
    const route = (process.env.NODE_ENV === 'production' ?
    "https://oceanlogger-046c28329f84.herokuapp.com/api/searchlog" : "http://localhost:5000/api/searchlog");
    const [show, setShow] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    const [lower, setLower] = useState(0);
    const [upper, setUpper] = useState(displayNum);
    const [pageNumber, setPageNumber] = useState(1);

    // add something to pass to do delete?
    const handleClose = () =>
    {
        setShow(false);
        //on clicking the delete button will do delete
        doDelete();
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
            setMainData(res.result);
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
        const listItems = data.slice(lower, upper).map((log, index) =>
            <tbody key={index} onClick={() => setActive(index)} className={`${active === index ? "activeCell" : ""}`}
            style={{
            borderWidth:"2px",
            borderColor:"black",
            borderStyle:"solid",
            borderRadius:"10px",
            borderColor:"#0089ED",
            height:"65px",
            wordWrap:"break-word"
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
                    <i id="deleteButton" onClick={() => {handleShow(); setDeleteIndex(index);}}>{deleteIcon}</i>
                </td>
            </tr>
            </tbody>
        );

        return <table style={{tableLayout:"fixed", width:"100%"}}>{listItems}</table>;
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
    const doDelete = async () =>
    {
        let logid = data[deleteIndex]._id;

        let deleteRoute = (process.env.NODE_ENV === 'production' ?
        `https://oceanlogger-046c28329f84.herokuapp.com/api/deletelog/${logid}` : `http://localhost:5000/api/deletelog/${logid}`);

        try
        {
            const response = await fetch(deleteRoute, {method:'DELETE'});
        }
        catch(e)
        {
            console.log(e);
        }

        getData();
        setActive(0);
        if (data.length % displayNum == 1)
        {
            doPrev();
        }
    }

    const doSearch = (str) =>
    {
        let items = mainData.filter(log =>
            log.title.toLowerCase().includes(str.toLowerCase()) ||
            log.location.toLowerCase().includes(str.toLowerCase()) ||
            log.date.toLowerCase().includes(str.toLowerCase())
        );

        setData(items);
        setLower(0);
        setUpper(displayNum);
        setPageNumber(1);
    }

    // For pagination.
    const doPrev = () =>
    {
        if (lower - displayNum < 0)
        {
            return;
        }

        setLower(lower - displayNum);
        setUpper(upper - displayNum);
        setPageNumber(pageNumber - 1);
    }

    const doNext = () =>
    {
        if (upper + displayNum >= data.length + displayNum)
        {
            return;
        }

        setLower(lower + displayNum);
        setUpper(upper + displayNum);
        setPageNumber(pageNumber + 1);
    }

    return(
        <div id="viewLogUIDiv">
            <div className="viewLogTop">
        
                <div className="viewLogPagination">
                    <div className="viewLogPgButtons">
                        <button id="paginationBtns" 
                                onClick={() => doPrev()}
                                style={{marginLeft: 0}}
                        >
                            Prev
                        </button>
                        <div className="viewLogPgNum">
                            Page <br /> 
                            {(data !== null && data.length !== 0 ? pageNumber:0)} of  {" "}
                            {(data !== null ? Math.ceil(data.length / displayNum):"")}
                        </div>
                        <button id="paginationBtns"
                                onClick={() => doNext()}
                                style={{marginRight: 30}}
                        >
                            Next
                        </button>
                    </div>
                </div>

                <div className="viewLogSearchLog">
                        <input
                            id="searchLogs"
                            type="text"
                            placeholder="Search Logs"
                            ref={(c) => searchString = c}
                            onKeyUp={() => doSearch(searchString.value)}
                        />
                        <i id="searchIcon">{search}</i>
                </div>
                <div className="viewLogAddLog">
                    <button id="goAddButton" 
                    onClick={doAdd}><i>{plus}</i></button>
                </div>
            </div>
        
            <div className="logUIContent">
                <div className="listOfLogs">
                    {showLogs()}
                    <>
                        <Modal show={show} onHide={() => setShow(false)}>
                            <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to delete this log?</Modal.Body>
                            <Modal.Footer>
                            <Button variant="dark" onClick={() => setShow(false)}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleClose}>
                                Delete
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                </div>
                
                <div className="selectedLog">
                    {displayMainLog()}
                </div>
            </div>
        </div>
    );
};

export default ViewLogUI;
