import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const edit = <FontAwesomeIcon icon={faPenToSquare} />;

function DisplayLog({data})
{
    // Can add 2 functions in here, one for deleting the log and one for updating it?
    const doEdit = async event => 
    {
        event.preventDefault();

        alert("doEdit()");
    };

    return (
        <div id="displayLogContent">
            <div className="displayFirst">
                <div className="displayTitleLocation">
                    <div className="displayTitle">
                        <p>{data.title}</p>
                    </div>
                    <div className="displayLocation">
                        <p>{data.location}</p>
                    </div>
                </div>
                <div className="displayEdit">
                    <i id="editButton" onClick={doEdit}>{edit}</i>
                </div>
            </div>

            <div className="displaysecond">
                <p>{data.date}</p>
            </div>

            <div className="displayThird">
                <div className="displayDive">
                    <p style={{color: "#0089ED", fontWeight: 'bold'}}>{data.diveTime} Min</p>
                    <p style={{fontWeight: 'bold'}}>Dive Time</p>
                    
                </div>
                <div className="displayDepth">
                    <p style={{color: "#0089ED", fontWeight: 'bold'}}>{data.maxDepth} M</p>
                    <p style={{fontWeight: 'bold'}}>Max Depth</p>
                </div>
                <div className="displayTemp">
                    <p style={{color: "#0089ED", fontWeight: 'bold'}}>{data.temperature} F</p>
                    <p style={{fontWeight: 'bold'}}>Temperature</p>
                </div>
                <div className="displayVisibility">
                    <p style={{color: "#0089ED", fontWeight: 'bold'}}>{data.visibility} M</p>
                    <p style={{fontWeight: 'bold'}}>Visibility</p>
                </div>
            </div>

            <div className="displayFourth">
                <div className="displayStartAirPressure">
                    
                    <p style={{fontWeight: 'bold', fontSize: '14px'}}>Starting Air Pressure</p>
                    <p style={{color: "#0089ED", fontWeight: 'bold'}}>{data.startAirPressure} Bars</p>
                </div>
                <div className="displayEndAirPressure">
                    
                    <p style={{fontWeight: 'bold', fontSize: '14px'}}>Ending Air pressure</p>
                    <p style={{color: "#0089ED", fontWeight: 'bold'}}>{data.endAirPressure} Bars</p>
                </div>
                <div className="displayDiveComp">
                    
                    <p style={{fontWeight: 'bold', fontSize: '14px'}}>Dive Computer</p>
                    <p style={{color: "#0089ED", fontWeight: 'bold'}}>{data.diveComputer}</p>
                </div>
            </div>

            <div className="displayFive">
                <div className="displayNotes">
                    <p style={{fontWeight: 'bold'}}>Notes:</p>
                    {data.notes}
                </div>
            </div>
        </div>
    );
}

export default DisplayLog;
