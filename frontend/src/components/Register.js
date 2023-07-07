import React, { useState } from 'react';

function Register()
{
    // Builds a path to the APIs on heroku or a local machine.
    const app_name = 'oceanlogger-046c28329f84'
    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production') 
        {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {        
            return 'http://localhost:5000/' + route;
        }
    }
    
    let registerFirstName;
    let registerLastName;
    let registerUsername;
    let registerPassword;
    let registerEmail;

    const [message,setMessage] = useState('');

    // Function to call the register API.
    const doRegister = async event => 
    {
        event.preventDefault();

        // Create a JSON object from the HTML form values.
        let obj =
        {
            firstName:registerFirstName.value,
            lastName:registerLastName.value,
            login:registerUsername.value,
            password:registerPassword.value,
            email:registerEmail.value
        };

        let jsonObject = JSON.stringify(obj);

        let tmp = buildPath('api/register');

        // Send the JSON object to the API.
        const response = await fetch(tmp,{method:'POST',body:jsonObject,headers:{'Content-Type': 'application/json'}});

        // Store the returned JSON object.
        let res = JSON.parse(await response.text());

        // Check if an error is returned.
        if (res.error !== "")
        {
            setMessage("Username is taken.");
        }
        else
        {
            let user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
            localStorage.setItem('user_data', JSON.stringify(user));

            setMessage('');
            window.location.href = '/oceanlogger';
        }
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

                <div className="registeDivBottom">
                    <input type="submit" id="registerButton" class="buttons" value = "Register"
                    onClick={doRegister} /><br />
                </div>

                <span id="registerResult">{message}</span>
            </form>
        </div>
    );
};

export default Register;
