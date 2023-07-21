import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTotalTimeValidation } from '../hooks/useTotalTimeValidation';

function DiveCalcUI()
{
    let firstDive;
    let firstTotalTime;
    let lenSurfaceIntervalHours;
    let lenSurfaceIntervalMins;
    let secondDive;

    const [message,setMessage] = useState('');

    const [totalTime, setTotalTime] = useState({
        firstTotalTime: "",
    });

    const [showTotalTimeErr, setShowTotalTimeErr] = useState(true);

    const [
        validTotalTime
    ] = useTotalTimeValidation({
        firstTotalTime: totalTime.firstTotalTime
    });

    const setFirstTotalTime = (event) => 
    {
        setTotalTime({...totalTime, firstTotalTime: event.target.value})
    }

    const doReset = async event => 
    {
        event.preventDefault();

        alert("doReset()");
    };

    const doCalc = async event => 
    {
        event.preventDefault();

        alert("doCalc()");
    };

    return(
        <div id="diveCalcUIDiv">
            <form className="diveCalcForm" onSubmit={doCalc}>
                <div className="diveCalcInputs">
                    <div className="firstDive">
                        <div className="firstDiveDiv">
                            <label htmlFor="calcFirstDive">
                                Depth of First Dive
                            </label>
                            <input type="text" 
                                className="diveCalcField" 
                                id="calcFirstDive" 
                                placeholder="ft" 
                                ref={(c) => firstDive = c} 
                            />
                        </div>
                    </div>

                    <div className="firstTotalTime">
                        <div className="firstTotalTimeDiv">
                            <label htmlFor="calcFirstTotalTimeDive">
                                Total Time of First Dive
                            </label>
                            <input type="text" 
                                className="diveCalcField" 
                                id="calcFirstTotalTime" 
                                placeholder="Min" 
                                ref={(c) => firstTotalTime = c}
                                onChange={setFirstTotalTime} 
                                onFocus={()=>setShowTotalTimeErr(false)} 
                                onBlur={()=>setShowTotalTimeErr(true)} 
                            />
                        </div>
                    </div>

                    <div className="lenSufaceInterval">
                        <div className="surfaceIntervalHourDiv">
                            <label htmlFor="surfaceIntervalHours">
                                Length of Surface Interval Hours
                            </label>
                            <input type="text" 
                                className="diveCalcField" 
                                id="surfaceIntervalHours" 
                                placeholder="Hrs"
                                ref={(c) => lenSurfaceIntervalHours = c}
                            />
                        </div>
                        <div className="surfaceIntervalMinsDiv">
                            <label htmlFor="surfaceIntervalMins">
                                Length of Surface Interval Minutes
                            </label>
                            <input type="text" 
                                className="diveCalcField" 
                                id="surfaceIntervalMins" 
                                placeholder="Mins"
                                ref={(c) => lenSurfaceIntervalMins = c}
                            />
                        </div>
                    </div> 

                    <div className="secondDive">
                        <div className="secondDiveDiv">
                            <label htmlFor="calcSecondDive">
                                Depth of Second Dive
                            </label>
                            <input type="text" 
                                className="diveCalcField" 
                                id="calcSecondDive" 
                                placeholder="ft" 
                                ref={(c) => secondDive = c} 
                            />
                        </div>
                    </div>  
                </div>

                <div className="errMessages">
                    <div className={showTotalTimeErr? "totalTimeErrMsg" : "show"}  >
                            <ul>
                                <p id="totalTimeValid" className={validTotalTime ? "valid" : "invalid"}>
                                    You must enter total time of your first dive: ##:##
                                </p>
                            </ul>
                    </div>
                </div>
                

                <div className="diveCalcDivBottom">
                    <input type="submit" className="calcCancelButton" value = "Reset"
                        onClick={doReset} /><br />
                    <input type="submit" id="calcButton" class="buttons" value = "Calculate"
                        onClick={doCalc} /><br />
                </div>
                
                <span id="doCalcResult">{message}</span>
            </form>
        </div>
    );
};

export default DiveCalcUI;
