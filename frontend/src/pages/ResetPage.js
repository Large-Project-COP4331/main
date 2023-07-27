import React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {  Link } from "react-router-dom";
import shark from '../components/images/006-shark-1.png';

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
        <div className="resetContent">
                <div className="resetTop">
                    <div className='resetTopLeft'>
                        <div>
                            <div className="loginGoHome">
                                <Link to="/" style={{color: 'white',
                                    textDecoration: 'none',
                                    fontWeight: 'bold'}}
                                >
                                    HOME
                                </Link>
                            </div>
                        </div>
    
                        
                            <span id="resetTopMessage" style={{color: 'white', marginLeft: '10px'}}>
                                <b>Reset Password</b><br/>
                                Looks like you forgot your password.<br/>
                                No worries, enter the email you signed up with<br/>
                                So we can send you a password reset link<br/>
                                That way you can contiue logging your underwater experiences!<br/>
                            </span>
                        
                        
    
                    </div>
    
                    <div className='resetTopMid'>
                        <div className="resetBoxTop">
                            <div className="resetBoxTopContent">
                                <div className="resetBoxTopLeft">
                                    <div className="resetWelcome">
                                        <span style={{color: 'black', 
                                            fontSize: 18, 
                                            fontWeight: '400', 
                                            wordWrap: 'break-word'}}
                                        >
                                            Welcome to {""} 
                                        </span>
                                        <span style={{color: 'black', 
                                            fontSize: 18, 
                                            fontWeight: '700', 
                                            wordWrap: 'break-word'}}
                                        >
                                            Scuba
                                        </span>
                                        <span style={{color: '#0089ED', 
                                            fontSize: 18, 
                                            fontWeight: '700', 
                                            wordWrap: 'break-word'}}
                                        >
                                            Logger
                                        </span>
                                        <div className="messageLogo">
                                            <div className="ResetPass">
                                                Reset Password
                                            </div>
                                            <img className="Image" style={{width: '50%'}} src={shark} />
                                        </div>
                                        
                                    </div>
                                    
                                </div>
    
                                <div className="resetBoxTopRight">
                                    <div className="noAccountSignUp">
                                        {/**empty space */}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div className='resetTopRight'>
    
                    </div>
                </div>
    
                <div className="resetBottom">
                    <div className='resetBottomLeft'>
                        {/**empty space */}
                    </div>
    
                    <div className='resetBottomMid'>
                        <div className="resetBoxBottom">
                            <div id="resetDiv">
                                <form className="resetForm" onSubmit={resetPassword}>
                                    <div className="resetInputs">
                                    <input type="text" 
                                        className="resetField" 
                                        placeholder="New Password" 
                                        ref={(c) => newPassword = c} 
                                    /><br />
                                    <input type="password" 
                                        className="resetField" 
                                        placeholder="Confirm Password" 
                                        ref={(c) => confirmPassword = c} 
                                    /><br />
                                    </div>
    
                                    <div className="forgotPassword">
                                        {/**emptyspace */}
                                    </div>
                                    
                                    <div className="resetDivBottom">
                                        <input type="submit" 
                                            id="resetButton" 
                                            class="buttons" 
                                            value = "Reset"
                                            onClick={resetPassword} 
                                        /><br />
                                    </div>
                                    
                                    <span>{message}</span>
                                </form>
                            </div>
                        </div>
                    </div>
    
                    <div className='resetBottomRight'>
                        {/**empty space */}
                    </div>
                </div>
        </div>
    );
}

export default ResetPage;
