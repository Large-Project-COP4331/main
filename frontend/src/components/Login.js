import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import md5 from './md5';

const eye = <FontAwesomeIcon icon={faEye}/>;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash}/>

function Login()
{
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

    var loginName;
    var loginPassword;

    const [message,setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility =() =>
    {
        setShowPassword(showPassword ? false : true);
    }

    const doLogin = async event => 
    {
        event.preventDefault();

        var obj = {login:loginName.value,password:md5(loginPassword.value)};
        var js = JSON.stringify(obj);

        try
        {    
            var tmp = buildPath('api/login');
            console.log(tmp);
            const response = await fetch(buildPath('api/login'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else if (res.verification === false)
            {
                setMessage("Email is not verified.");
            }
            else
            {
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                window.location.href = '/oceanlogger';
            }
        }
        catch(e)
        {
            alert(e.toString());
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
