import React, { useState } from 'react';
import {  Link } from "react-router-dom";

import logo from '../components/images/001-shark.png';
import Forgot from '../components/Forgot';

function ForgotPage()
{
    return(
      <div className="forgotContent">
            <div className="forgotTop">
                <div className='forgotTopLeft'>
                    <div>
                        <div className="forgotGoHome">
                            <Link to="/" style={{color: 'white'}}>HOME</Link>
                        </div>
                    </div>
                    <span id="forgotTopMessage" style={{color: 'white', marginLeft: '10px'}}>
                        Looks like you forgot your password<br/>
                        No worries, enter your email so we can <br/>
                        send you a password reset email<br/>
                    </span>
                </div>

                <div className='forgotTopMid'>
                    <div className="forgotBoxTop">
                        <div className="forgotBoxTopContent">
                            <div className="forgotBoxTopLeft">
                                <div className="forgotWelcome">
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
                                        <div className="SignIn" style={{color: 'black', 
                                            fontSize: 40, 
                                            fontWeight: '500', 
                                            wordWrap: 'break-word', 
                                            marginRight: '10px'}}
                                        >
                                            Reset Me
                                        </div>
                                        <img className="Image" style={{width: '25%'}} src={logo} />
                                    </div>
                                    
                                </div>
                                
                            </div>

                            <div className="forgotBoxTopRight">
                                <div className="noAccountSignUp">
                                    <span style={{color: '#8D8D8D', 
                                        fontSize: 10, 
                                        fontWeight: '400', 
                                        wordWrap: 'break-word'}}
                                    >
                                        Remember your password?<br/>
                                    </span>
                                    <span style={{color: '#0089ED', 
                                        fontSize: 10, 
                                        fontWeight: '400', 
                                        wordWrap: 'break-word'}}
                                    >
                                        <Link to="/loginpage">Sign In</Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='forgotTopRight'>

                </div>
            </div>

            <div className="forgotBottom">
                <div className='forgotBottomLeft'>
                </div>

                <div className='forgotBottomMid'>
                    <div className="forgotBoxBottom">
                        
                        <Forgot/>
                    </div>
                </div>

                <div className='forgotBottomRight'>
                    
                </div>
            </div>
      </div>
    );
};

export default ForgotPage;
