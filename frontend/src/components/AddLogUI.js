import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const eye = <FontAwesomeIcon icon={faEye}/>;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash}/>;

function AddLogUI()
{
    let diveData1;
    let diveData2;
    let diveData3;
    let diveData4;
    let addLocation;
    let addDate;
    let addNote;

    const [message,setMessage] = useState('');

    const doAdd = async event => 
    {
        event.preventDefault();

        alert("doAdd()");
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
                    <div className="diveDepths">
                        <div className="data1">
                            <label htmlfor="diveData1">
                                diveData1
                            </label>
                            <input type="text" 
                                className="addField" 
                                id="divedata1" 
                                placeholder="depth" 
                                ref={(c) => diveData1 = c} 
                            />
                        </div>
                        <div className="data2">
                            <label htmlfor="diveData2">
                                diveData2
                            </label>
                            <input type="text" 
                                className="addField" 
                                id="divedata2" 
                                placeholder="depth" 
                                ref={(c) => diveData2 = c} 
                            />
                        </div>
                        <div className="data3">
                            <label htmlfor="diveData3">
                                diveData3
                            </label>
                            <input type="text" 
                                className="addField" 
                                id="divedata3" 
                                placeholder="depth" 
                                ref={(c) => diveData3 = c} 
                            />
                        </div>

                        <div className="data4">
                            <label htmlfor="diveData4">
                                diveData4
                            </label>
                            <input type="text" 
                                className="addField" 
                                id="divedata4" 
                                placeholder="depth" 
                                ref={(c) => diveData4 = c} 
                            />
                        </div>
                    </div>

                    <div className="locationAndDate">
                        <div className="locationDiv">
                            <label htmlFor="addLocation">
                                Location
                            </label>
                            <input type="text" 
                                className="addField" 
                                id="addLocation" 
                                placeholder="where did you dive"
                                ref={(c) => addLocation = c}
                            />
                        </div>
                        <div className="dateDiv">
                            <label htmlFor="addDate">
                                Date
                            </label>
                            <input type="text" 
                                className="addField" 
                                id="addDate" 
                                placeholder="when did you dive"
                                ref={(c) => addDate = c}
                            />
                        </div>

                        
                    </div>
                    

                    <div className="notes">
                        <div className="notesDiv">
                            <label htmlFor="addNote">
                                Notes
                            </label>
                            <input type="text" 
                                className="addField" 
                                id="addNote" 
                                placeholder="Add notes..." 
                                ref={(c) => addNote = c} 
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
