import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const eye = <FontAwesomeIcon icon={faEye}/>;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash}/>

function Login()
{
    var loginName;
    var loginPassword;
    const route = (process.env.NODE_ENV === 'production' ?
    "https://oceanlogger-046c28329f84.herokuapp.com/api/login" : "http://localhost:5000/api/login");

    const [message,setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility =() =>
    {
        setShowPassword(showPassword ? false : true);
    }

    const doLogin = async event => 
    {
        event.preventDefault();

        let jsonObject = JSON.stringify({login:loginName.value,password:loginPassword.value});

        try
        {    
            const response = await fetch(route,{method:'POST',body:jsonObject,headers:{'Content-Type': 'application/json'}});
            let res = JSON.parse(await response.text());

            if (res.error !== "")
            {
                setMessage(res.error);
                return;
            }
            else
            {
                var user = {id:res.id,login:res.login,email:res.email}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                window.location.href = '/homepage';
            }
        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }    
    };

    return(
        <div id="loginDiv">
            <form className="loginForm" onSubmit={doLogin}>
                <div className="loginInputs">
                    <label htmlFor="loginName" style={{marginLeft: '10px'}}>
                        Enter your username:
                    </label>
                    <input type="text" id="loginName" className="loginField" placeholder="Username" 
                        ref={(c) => loginName = c} />

                    <label htmlFor="loginPassword" style={{marginLeft: '10px'}}>
                        Enter your password:
                    </label>
                    <div className="passwordInput">
                        <input type={showPassword ? "text":"password"} 
                            id="loginPassword" 
                            className="loginField" 
                            placeholder="Password" 
                            ref={(c) => loginPassword = c} />
                        <i className="loginPassVisibility" onClick={togglePasswordVisibility}>
                            {showPassword ? eyeSlash : eye}
                        </i> 
                    </div>
                </div>

                <div className="forgotPassword">
                    <Link to="/forgotpage">Forgot Password</Link>
                </div>
                
                <div className="loginDivBottom">
                    <input type="submit" id="loginButton" class="buttons" value = "Login"
                        onClick={doLogin} /><br />
                </div>
                
                <span id="loginResult">{message}</span>
            </form>
        </div>
    );
};

export default Login;
