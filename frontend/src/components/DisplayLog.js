import React from "react";

function DisplayLog({data})
{
    // Can add 2 functions in here, one for deleting the log and one for updating it?

    return (
        <div>
            <p>DATA DUMP</p>
            <p>Title: {data.title}</p>
            <p>Location: {data.location}</p>
            <p>Date: {data.date}</p>
            <p>Dive Time: {data.diveTime}</p>
            <p>Max Depth: {data.maxDepth}</p>
            <p>Temperature: {data.temperature}</p>
            <p>Visibility: {data.visibility}</p>
            <p>Starting Air Pressure: {data.startAirPressure}</p>
            <p>Ending Air pressure: {data.endAirPressure}</p>
            <p>Dive Computer: {data.diveComputer}</p>
            <p>Notes: {data.notes}</p>
        </div>
    );
}

export default DisplayLog;