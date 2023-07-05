import React, { useState } from 'react';

function Register()
{
    var registerFirstName;
    var registerLastName;
    var registerUsername;
    var registerPassword;
    var registerEmail;

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

                <input type="text" className="registerField" id="registerFirstName" placeholder="First Name" 
                    ref={(c) => registerFirstName = c} /><br />

                <input type="text" className="registerField" id="registerLastName" placeholder="Last Name" 
                    ref={(c) => registerLastName = c} /><br />

                <input type="text" className="registerField" id="registerUsername" placeholder="Username" 
                    ref={(c) => registerUsername = c} /><br />

                <input type="password" className="registerField" id="registerPassword" placeholder="Password" 
                    ref={(c) => registerPassword = c} /><br />

                <input type="text" className="registerField" id="registerEmail" placeholder="Email" 
                    ref={(c) => registerEmail = c} /><br />

                <input type="submit" id="registerButton" class="buttons" value = "JUST DO IT!"
                onClick={doRegister} /><br />

                <span id="registerResult">{message}</span>
            </form>
        </div>
    );
};

export default Register;
