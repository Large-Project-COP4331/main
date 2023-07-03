import React, { useState } from 'react';

function Register()
{
    var registerName;
    var registerPassword;

    const [message,setMessage] = useState('');


    const doRegister = async event => 
    {
        event.preventDefault();

        setMessage('doRegister()');
        alert('doRegister()');


    };

    return(
        <div id="registerDiv">
            <form onSubmit={doRegister}>
                <span id="inner-title">REGISTER</span><br />
                <input type="text" id="registerName" placeholder="Username" 
                    ref={(c) => registerName = c} /><br />

                <input type="password" id="registerPassword" placeholder="Password" 
                    ref={(c) => registerPassword = c} /><br />

                <input type="submit" id="registerButton" class="buttons" value = "JUST DO IT!"
                onClick={doRegister} /><br />

                <span id="registerResult">{message}</span>
            </form>
        </div>
    );
};

export default Register;
