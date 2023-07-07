import React, { useState } from 'react';
import { usePasswordValidation } from '../hooks/usePasswordValidation';
import { useUsernameValidation } from '../hooks/useUsernameValidation';
import { useEmailValidation } from '../hooks/useEmailValidation';
import md5 from './md5';

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

    const [password, setPassword] = useState({
        registerPassword: "",
    });

    const [username, setUsername] = useState({
        registerUsername: "",
    });

    const [email, setEmail] = useState({
        registerEmail: "",
    });

    const [showPasswordErr, setShowPasswordErr] = useState(true);
    const [showUsernameErr, setShowUsernameErr] = useState(true);
    const [showEmailErr, setShowEmailErr] = useState(true);

    const [
        userValidLength,
        userHasNumber,
        userUpperCase,
        userlowerCase,
    ] = useUsernameValidation({
        registerUsername: username.registerUsername
    });

    const [
        validLength,
        hasNumber,
        upperCase,
        lowerCase,
        specialChar
    ] = usePasswordValidation({
        registerPassword: password.registerPassword
    });

    const [
        validEmail
    ] = useEmailValidation({
        registerEmail: email.registerEmail
    });

    const setRegisterUsername = (event) => 
    {
        setUsername({...username, registerUsername: event.target.value})
    }


    const setRegisterPassword = (event) => 
    {
        setPassword({...password, registerPassword: event.target.value})
    }

    const setRegisterEmail = (event) => 
    {
        setEmail({...email, registerEmail: event.target.value})
    }

    // Function to call the register API.
    const doRegister = async event => 
    {
        event.preventDefault();

        // Check for valid form inputs.
        let str = RegisterCheck
        (registerFirstName.value, registerLastName.value, registerUsername.value, registerPassword.value, registerEmail.value);

        if (str !== "")
        {
            setMessage(str);
            return;
        }

        setMessage(str);

        // Create a JSON object from the HTML form values.
        let obj =
        {
            firstName:registerFirstName.value,
            lastName:registerLastName.value,
            login:registerUsername.value,
            password:md5(registerPassword.value),
            email:registerEmail.value
        };

        let jsonObject = JSON.stringify(obj);

        try
        {
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
        }
        catch(e)
        {
            console.log(e);
            return;
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

                <input type="text" 
                    className="registerField" 
                    id="registerUsername" 
                    placeholder="Username" 
                    ref={(c) => registerUsername = c} 
                    onChange={setRegisterUsername} 
                    onFocus={()=>setShowUsernameErr(false)} 
                    onBlur={()=>setShowUsernameErr(true)}
                /><br />

                <input type="password" 
                    className="registerField" 
                    id="registerPassword" 
                    placeholder="Password" 
                    ref={(c) => registerPassword = c} 
                    onChange={setRegisterPassword} 
                    onFocus={()=>setShowPasswordErr(false)} 
                    onBlur={()=>setShowPasswordErr(true)}
                /><br />

                <input type="text" 
                    className="registerField" 
                    id="registerEmail" 
                    placeholder="Email" 
                    ref={(c) => registerEmail = c} 
                    onChange={setRegisterEmail} 
                    onFocus={()=>setShowEmailErr(false)} 
                    onBlur={()=>setShowEmailErr(true)}
                /><br />

                <div className="registeDivBottom">
                    <input type="submit" id="registerButton" class="buttons" value = "Register"
                    onClick={doRegister} /><br />
                </div>

                <span id="registerResult">{message}</span>

                <div className={showUsernameErr? "usernameErrMsg" : "show"}  >
                        <ul>
                            <p id="usernameLength" className={userValidLength ? "valid" : "invalid"}>
                                Username should be at least <b>8 characters</b>
                            </p>
                            <p id="usernameNumber" className={userHasNumber? "valid":"invalid"}>
                                Username should have at least one <b>number</b>
                            </p>
                            <p id="usernameCapital" className={userUpperCase? "valid":"invalid"}>
                                Username should have at least one <b>Uppercase letter</b>
                            </p>
                            <p id="usernameLowercase" className={userlowerCase? "valid":"invalid"}>
                                Username should have at least one <b>Lowercase letter</b>
                            </p>
                        </ul>
                </div>

                <div className={showPasswordErr? "passwordErrorMsg" : "show"}  >
                        <ul>
                            <p id="passwordLength" className={validLength ? "valid" : "invalid"}>
                                Password should be at least <b>8 characters</b>
                            </p>
                            <p id="passwordNumber" className={hasNumber? "valid":"invalid"}>
                                Password should be at least <b>one number</b>
                            </p>
                            <p id="passwordCapital" className={upperCase? "valid":"invalid"}>
                                Password should have at least one <b>Uppercase letter</b>
                            </p>
                            <p id="passwordLowercase" className={lowerCase? "valid":"invalid"}>
                                Password should have at least one <b>Lowercase letter</b>
                            </p>
                            <p id="passwordSpecial" className={specialChar? "valid":"invalid"}>
                                Password should have at least one <b>Special Character</b>
                            </p>
                        </ul>
                </div>

                <div className={showEmailErr? "emailErrMsg" : "show"}  >
                        <ul>
                            <p id="emailValid" className={validEmail ? "valid" : "invalid"}>
                                Email should be: <b>name@mail.com</b>
                            </p>
                        </ul>
                </div>
            </form>
        </div>
    );
};

export default Register;

// Checks for valid form inputs.
function RegisterCheck(first, last, username, password, email)
{
    // First/Last can't be blank.
    if (first === "")
    {
        return "First name cannot be blank.";
    }
    else if (last === "")
    {
        return "Last name cannot be blank.";
    }

    // Check the username.
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])[a-zA-Z\d]{8,16}$/;
    if (regex.test(username) === false)
    {
        return "Username is invalid.";
    }
    
    // Check the password.
    regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    if (regex.test(password) === false)
    {
        return "Password is invalid.";
    }

    // Check the email.
    regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (regex.test(email) === false)
    {
        return "Email is invalid.";
    }

    return "";
}
