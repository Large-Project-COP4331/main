import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from "jwt-decode";

const eye = <FontAwesomeIcon icon={faEye}/>;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash}/>;

function AddLogUI()
{
    let title;
    let location;
    let date;
    let diveTime;
    let maxDepth;
    let temperature;
    let visibility;
    let startAirPressure;
    let endAirPressure;
    let diveComputer;
    let notes;

    const route = (process.env.NODE_ENV === 'production' ?
    "https://oceanlogger-046c28329f84.herokuapp.com/api/addlog" : "http://localhost:5000/api/addlog");

    const [message,setMessage] = useState('');

    const doAdd = async event => 
    {
        event.preventDefault();

        let accessToken = localStorage.getItem("accessToken");

        if (accessToken == null)
        {
            setMessage("Invalid access token. Please sign in again.");
            return;
        }

        let ud = jwtDecode(accessToken);

        let jsonObject = JSON.stringify
        ({
            accessToken:accessToken,
            userid:ud.id,
            title:title.value,
            location:location.value,
            date:date.value,
            diveTime:diveTime.value,
            maxDepth:maxDepth.value,
            temperature:temperature.value,
            visibility:visibility.value,
            startAirPressure:startAirPressure.value,
            endAirPressure:endAirPressure.value,
            diveComputer:diveComputer.value,
            notes:notes.value
        });

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
            window.location.href = '/homepage';
        }
        catch(e)
        {
            console.log(e);
        }
    };

    const doCancel = async event => 
    {
        event.preventDefault();

        alert("doCancel()")
    };

    return(
        <div id="addLogUIDiv">
            <form className="addForm" onSubmit={doAdd}>
                <div className="addInputs">


                    <div className="notes">
                        <div className="notesDiv">
                            <label htmlFor="addNote">
                                *Name
                            </label>
                            <input type="text" 
                                className="addField" 
                                id="addNote" 
                                placeholder="Dive Site Name" 
                                ref={(c) => title = c} 
                            />
                        </div>
                    </div>

                    <div className="locationAndDate">
                        <div className="locationDiv">
                            <label htmlFor="addLocation">
                                *Location
                            </label>
                            <input type="text" 
                                className="addField" 
                                id="addLocation" 
                                placeholder="Country, City"
                                ref={(c) => location = c}
                            />
                        </div>
                        <div className="dateDiv">
                            <label htmlFor="addDate">
                                *Date
                            </label>
                            <input type="text" 
                                className="addField" 
                                id="addDate" 
                                placeholder="08/08/0808"
                                ref={(c) => date = c}
                            />
                        </div>
                    </div>
                    

                    <div className="locationAndDate">
                        <div className="locationDiv">
                            <label htmlFor="addLocation">
                                Dive Time
                            </label>
                            <input type="text" 
                                className="addField" 
                                id="addLocation" 
                                placeholder="Min."
                                ref={(c) => diveTime = c}
                            />
                        </div>
                        <div className="dateDiv">
                            <label htmlFor="addDate">
                                Maximum Depth
                            </label>
                            <input type="text" 
                                className="addField" 
                                id="addDate" 
                                placeholder="Meters"
                                ref={(c) => maxDepth = c}
                            />
                        </div>
                    </div>


                    <div className="locationAndDate">
                        <div className="locationDiv">
                            <label htmlFor="addLocation">
                                Temperature
                            </label>
                            <input type="text" 
                                className="addField" 
                                id="addLocation" 
                                placeholder="Fahrenheit"
                                ref={(c) => temperature = c}
                            />
                        </div>
                        <div className="dateDiv">
                            <label htmlFor="addDate">
                                Visibility
                            </label>
                            <input type="text" 
                                className="addField" 
                                id="addDate" 
                                placeholder="Meters"
                                ref={(c) => visibility = c}
                            />
                        </div>
                    </div>


                    <div className="locationAndDate">
                        <div className="locationDiv">
                            <label htmlFor="addLocation">
                                Starting Air Pressure
                            </label>
                            <input type="text" 
                                className="addField" 
                                id="addLocation" 
                                placeholder="Bars"
                                ref={(c) => startAirPressure = c}
                            />
                        </div>
                        <div className="dateDiv">
                            <label htmlFor="addDate">
                                Ending Air Pressure
                            </label>
                            <input type="text" 
                                className="addField" 
                                id="addDate" 
                                placeholder="Bars"
                                ref={(c) => endAirPressure = c}
                            />
                        </div>
                    </div>


                    <div className="locationAndDate">
                        <div className="locationDiv">
                            <label htmlFor="addLocation">
                                Dive Computer
                            </label>
                            <input type="text" 
                                className="addField" 
                                id="addLocation" 
                                placeholder="Name"
                                ref={(c) => diveComputer = c}
                            />
                        </div>
                        <div className="dateDiv">
                        </div>
                    </div>


                    <div className="notes">
                        <div className="notesDiv">
                            <label htmlFor="addNote">
                                Notes
                            </label>
                            <textarea type="text" 
                                className="addField" 
                                id="addNote" 
                                placeholder="Add notes..." 
                                ref={(c) => notes = c} 
                            />
                        </div>
                        
                    </div>
                    
                </div>
                

                <div className="addLogDivBottom">
                    <Link to="/homepage" className="addCancelButton">Cancel</Link>
                    <input type="submit" id="addLogButton" class="buttons" value = "Add"
                        onClick={doAdd} /><br />
                </div>
                
                <span id="addLogResult">{message}</span>
            </form>
        </div>
    );
};

export default AddLogUI;
