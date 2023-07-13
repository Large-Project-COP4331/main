import React, { useState } from 'react';

function Forgot()
{
    let forgotEmail;

    const [message,setMessage] = useState('');


    const doForgot = async event => 
    {
        event.preventDefault();

        setMessage('Hello There General KENOBI!');
        alert('doForgot()');
    };

    return(
        <div id="forgotDiv">
            <form className="forgotForm" onSubmit={doForgot}>
                <span id="inner-title">Please enter your email for password recovery</span>
                <div className="forgotInputs">
                    <input 
                        type="text" 
                        id="forgotEmail" 
                        className="forgotField" 
                        placeholder="Please enter email" 
                        ref={(c) => forgotEmail = c} 
                    />
                </div>
                
                <div className="loginDivBottom">
                    <input type="submit" id="forgotButton" class="buttons" value = "Reset Password"
                        onClick={doForgot} /><br />
                </div>
                
                <span id="forgotResult">{message}</span>
            </form>
        </div>
    );
};

export default Forgot;
