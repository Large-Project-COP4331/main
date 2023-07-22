import React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function ResetPage()
{
    let newPassword;
    let confirmPassword;
    
    let [searchParams] = useSearchParams();
    let [message, setMessage] = useState("");

    let token = searchParams.get("token");

    if (token == null)
    {
        window.location.href = (process.env.NODE_ENV === 'production' ?
        "https://oceanlogger-046c28329f84.herokuapp.com" : "http://localhost:3000");
    }

    // Function to reset the password.
    const resetPassword = async event =>
    {
        event.preventDefault();

        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
        if (regex.test(newPassword.value) === false)
        {
            setMessage(<center>Invalid Password.<br/>Password should contain 1 upper/lower/digit/special character and have 8 characters minimum.</center>);
            return;
        }

        if (newPassword.value !== confirmPassword.value)
        {
            setMessage("Passwords do not match!");
            return;
        }
        setMessage("");

        // Create a JSON object and path.
        let jsonObject = JSON.stringify({token:token, password:confirmPassword.value});
        let path = (process.env.NODE_ENV === 'production' ?
        "https://oceanlogger-046c28329f84.herokuapp.com/api/updatepassword" : "http://localhost:5000/api/updatepassword");

        // Fetch the API and update the password.
        try
        {
            const response = await fetch(path,{method:'POST',body:jsonObject,headers:{'Content-Type': 'application/json'}});
            let res = JSON.parse(await response.text());
            
            if (res.error !== "")
            {
                setMessage(res.error);
                return;
            }
            setMessage("Password has been updated!");
            return;
        }
        catch (e)
        {
            console.log(e.toString());
            return;
        }
    }

    return (
        <div>
            <center>
                <h1>OceanLogger</h1>
                <h2>Reset Password Form</h2>
            <form onSubmit={resetPassword}>
                <input type="text" className="loginField" placeholder="New Password" 
                    ref={(c) => newPassword = c} /><br />
                <input type="text" className="loginField" placeholder="Confirm Password" 
                    ref={(c) => confirmPassword = c} /><br />
                <input type="submit" className="buttons" value = "Reset"
                        onClick={resetPassword} /><br />
            </form>
            <span>{message}</span>
            </center>
        </div>
    );
}

export default ResetPage;
