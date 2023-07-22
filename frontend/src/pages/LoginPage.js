import React, { useState } from 'react';
import {  Link } from "react-router-dom";

import Login from '../components/Login';
import shark from '../components/images/006-shark-1.png';

function LoginPage()
{
    return(
      <div className="loginContent">
            <div className="loginTop">
                <div className='loginTopLeft'>
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

                    
                        <span id="loginTopMessage" style={{color: 'white', marginLeft: '10px'}}>
                            <b>Sign in to</b><br/>
                            To log and document your underwater experiences!<br/>
                            Create and track your various dive profiles!<br/>
                            Share your captivating stories and photographs<br/>
                            from the deep blue sea!<br/>
                        </span>
                    
                    

                </div>

                <div className='loginTopMid'>
                    <div className="loginBoxTop">
                        <div className="loginBoxTopContent">
                            <div className="loginBoxTopLeft">
                                <div className="loginWelcome">
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
                                            Sign in
                                        </div>
                                        <img className="Image" style={{width: '25%'}} src={shark} />
                                    </div>
                                    
                                </div>
                                
                            </div>

                            <div className="loginBoxTopRight">
                                <div className="noAccountSignUp">
                                    <span style={{color: '#8D8D8D', fontSize: 10, 
                                        fontWeight: '400', 
                                        wordWrap: 'break-word'}}
                                    >
                                        No Account?<br/>
                                    </span>
                                    <span style={{color: '#0089ED', 
                                        fontSize: 10, 
                                        fontWeight: '400', 
                                        wordWrap: 'break-word'}}
                                    >
                                        <Link to="/registerpage">Sign Up</Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='loginTopRight'>

                </div>
            </div>

            <div className="loginBottom">
                <div className='loginBottomLeft'>
                </div>

                <div className='loginBottomMid'>
                    <div className="loginBoxBottom">
                        <Login/>
                    </div>
                </div>

                <div className='loginBottomRight'>
                    
                </div>
            </div>
      </div>
    );
};

export default LoginPage;
