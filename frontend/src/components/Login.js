import React, { useState } from 'react';
import md5 from './md5';

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
        <form onSubmit={doLogin}>
            <span id="inner-title">LOG IN pls</span><br />
            <input type="text" id="loginName" className="loginField" placeholder="Username" 
                ref={(c) => loginName = c} /><br />
            <input type="password" id="loginPassword" className="loginField" placeholder="Password" 
                ref={(c) => loginPassword = c} /><br />
            <div className="loginDivBottom">
                    <input type="submit" id="loginButton" class="buttons" value = "Login"
                        onClick={doLogin} /><br />
            </div>
        </form>
        <span id="loginResult">{message}</span>
     </div>
    );
};

export default Login;
