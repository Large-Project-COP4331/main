import React, { useState } from 'react';

function Forgot()
{
    let forgotEmail;
    const route = (process.env.NODE_ENV === 'production' ?
    "https://oceanlogger-046c28329f84.herokuapp.com/api/sendreset" : "http://localhost:5000/api/sendreset");

    const [message,setMessage] = useState('');


    const doForgot = async event => 
    {
        event.preventDefault();

        let jsonObject = JSON.stringify({email:forgotEmail.value});

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
                setMessage("A password reset email has been sent. Check your email!");
                return;
            }
        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }
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
