import React, { useState } from 'react';
import { usePasswordValidation } from '../hooks/usePasswordValidation';
import { useUsernameValidation } from '../hooks/useUsernameValidation';
import { useEmailValidation } from '../hooks/useEmailValidation';
import { useNumberValidation} from '../hooks/useNumberValidation';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const eye = <FontAwesomeIcon icon={faEye}/>;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash}/>

function Register()
{
    let registerFirstName;
    let registerLastName;
    let registerUsername;
    let registerPassword;
    let registerEmail;
    let registerNumber;

    const [message,setMessage] = useState('');

    const [password, setPassword] = useState({
        registerPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const [username, setUsername] = useState({
        registerUsername: "",
    });

    const [email, setEmail] = useState({
        registerEmail: "",
    });

    const [number, setNumber] = useState({
        registerNumber: "",
    });

    

    const [showPasswordErr, setShowPasswordErr] = useState(true);
    const [showUsernameErr, setShowUsernameErr] = useState(true);
    const [showEmailErr, setShowEmailErr] = useState(true);
    const [showNumberErr, setShowNumberErr] = useState(true);


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

    const [
        validNumber
    ] = useNumberValidation({
        registerNumber: number.registerNumber
    });

    const setRegisterUsername = (event) => 
    {
        setUsername({...username, registerUsername: event.target.value})
    }


    const setRegisterPassword = (event) => 
    {
        setPassword({...password, registerPassword: event.target.value})
    }

    const togglePasswordVisibility =() =>
    {
        setShowPassword(showPassword ? false : true);
    }

    const setRegisterEmail = (event) => 
    {
        setEmail({...email, registerEmail: event.target.value})
    }

    const setRegisterNumber = (event) => 
    {
        setNumber({...number, registerNumber: event.target.value})
    }

    const doRegister = async event => 
    {
        event.preventDefault();

        setMessage('Hello There General KENOBI!');
        alert('doRegister()');


    };

    return(
        <div id="registerDiv">
            <form className="registerForm" onSubmit={doRegister}>
                {/** 
                <span id="inner-title"><b>Create an account!</b></span>
                */}
                <div className="registerInputs">
                    <label htmlFor="registerEmail" style={{marginLeft: '10px'}}>
                        Email:
                    </label>
                    <input type="text" 
                        className="registerField" 
                        id="registerEmail" 
                        placeholder="email address" 
                        ref={(c) => registerEmail = c} 
                        onChange={setRegisterEmail} 
                        onFocus={()=>setShowEmailErr(false)} 
                        onBlur={()=>setShowEmailErr(true)}
                    />

                    <label htmlFor="registerNumber" style={{marginLeft: '10px'}}>
                        Contact Number:
                    </label>
                    <input type="text" 
                        className="registerField" 
                        id="registerNumber" 
                        placeholder="contact number"
                        ref={(c) => registerNumber = c} 
                        onChange={setRegisterNumber} 
                        onFocus={()=>setShowNumberErr(false)} 
                        onBlur={()=>setShowNumberErr(true)}
                    /> 

                    <label htmlFor="registerUsername" style={{marginLeft: '10px'}}>
                        Username:
                    </label>
                    <input type="text" 
                        className="registerField" 
                        id="registerUsername" 
                        placeholder="Username" 
                        ref={(c) => registerUsername = c} 
                        onChange={setRegisterUsername} 
                        onFocus={()=>setShowUsernameErr(false)} 
                        onBlur={()=>setShowUsernameErr(true)}
                    />

                    <label htmlFor="registerPassword" style={{marginLeft: '10px'}}>
                        Password:
                        </label>
                    <div className="passwordInput">
                        {/** want eye icon in absolute relation to this so it will always be on 
                         * password input doesnt expand to full width? */}
                        
                        <input type={showPassword ? "text":"password"} 
                            className="registerField" 
                            id="registerPassword" 
                            placeholder="Password" 
                            ref={(c) => registerPassword = c} 
                            onChange={setRegisterPassword} 
                            onFocus={()=>setShowPasswordErr(false)} 
                            onBlur={()=>setShowPasswordErr(true)}
                        />
                        <i className="registerPassVisibility" onClick={togglePasswordVisibility}>
                            {showPassword ? eyeSlash : eye}
                        </i>
                        
                    </div>
                </div>
                

                <div className="registeDivBottom">
                    <input type="submit" id="registerButton" class="buttons" value = "Register"
                    onClick={doRegister} /><br />
                </div>
                
                <span id="registerResult">{message}</span>

                   
                <div className="errMessages">
                    <div className={showUsernameErr? "usernameErrMsg" : "show"}  >
                            <ul>
                                <p id="usernameLength" className={userValidLength ? "valid" : "invalid"}>
                                    Needs to be at least <b>8 characters</b>
                                </p>
                                <p id="usernameNumber" className={userHasNumber? "valid":"invalid"}>
                                    Needs to have at least one <b>number</b>
                                </p>
                                <p id="usernameCapital" className={userUpperCase? "valid":"invalid"}>
                                    Needs to have at least one <b>Uppercase letter</b>
                                </p>
                                <p id="usernameLowercase" className={userlowerCase? "valid":"invalid"}>
                                    Needs to have at least one <b>Lowercase letter</b>
                                </p>
                            </ul>
                    </div>

                    <div className={showPasswordErr? "passwordErrorMsg" : "show"}  >
                            <ul>
                                <p id="passwordLength" className={validLength ? "valid" : "invalid"}>
                                    Needs to have at least <b>8 characters</b>
                                </p>
                                <p id="passwordNumber" className={hasNumber? "valid":"invalid"}>
                                    Needs to have at least <b>one number</b>
                                </p>
                                <p id="passwordCapital" className={upperCase? "valid":"invalid"}>
                                    Needs to have at least one <b>Uppercase letter</b>
                                </p>
                                <p id="passwordLowercase" className={lowerCase? "valid":"invalid"}>
                                    Needs to have at least one <b>Lowercase letter</b>
                                </p>
                                <p id="passwordSpecial" className={specialChar? "valid":"invalid"}>
                                    Needs to have at least one <b>Special Character</b>
                                </p>
                            </ul>
                    </div>

                    <div className={showEmailErr? "emailErrMsg" : "show"}  >
                            <ul>
                                <p id="emailValid" className={validEmail ? "valid" : "invalid"}>
                                    Needs to be: <b>name@mail.com</b>
                                </p>
                            </ul>
                    </div>

                    <div className={showNumberErr? "numberErrMsg" : "show"}  >
                            <ul>
                                <p id="numbervalid" className={validNumber ? "valid" : "invalid"}>
                                    Needs to be: <b>###-###-####</b>
                                </p>
                            </ul>
                    </div>
                </div>
                
                
            </form>
        </div>
    );
};

export default Register;
