import React, { useState } from 'react';
import {  Link } from "react-router-dom";

import Register from '../components/Register';
import shark from '../components/images/006-shark-1.png';

function RegisterPage()
{
    return(
      <div className="registerContent">
            <div className="registerTop">
                <div className='registerTopLeft'>
                    <div>
                        <div className="registerGoHome">
                            <Link to="/" style={{color: 'white',
                                  textDecoration: 'none',
                                  fontWeight: 'bold'}}
                            >
                                HOME
                            </Link>
                        </div>
                    </div>

                    
                        <span id="registerTopMessage" style={{color: 'white', marginLeft: '10px'}}>
                            <b>Sign up to</b><br/>
                            To log and document your underwater experiences!<br/>
                            Create and track your various dive profiles!<br/>
                            Share your captivating stories and photographs<br/>
                            from the deep blue sea!<br/>
                        </span>
                </div>

                <div className='registerTopMid'>
                    <div className="registerBoxTop">
                        <div className="registerBoxTopContent">
                            <div className="registerBoxTopLeft">
                                <div className="registerWelcome">
                                    <span style={{
                                        color: 'black', 
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
                                        <div className="SignUp" style={{color: 'black', 
                                            fontSize: 40, 
                                            fontWeight: '500', 
                                            wordWrap: 'break-word', 
                                            marginRight: '10px'}}
                                        >
                                            Sign up
                                        </div>
                                        <img className="Image" style={{width: '25%'}} src={shark} />
                                    </div>
                                    
                                </div>
                                
                            </div>

                            <div className="registerBoxTopRight">
                                <div className="HaveAnAccountSignIn">
                                    <span style={{color: '#8D8D8D', 
                                        fontSize: 10, 
                                        fontWeight: '400', 
                                        wordWrap: 'break-word'}}
                                    >
                                        Have an Account?<br/>
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

                <div className='registerTopRight'>

                </div>
            </div>

            <div className="registerBottom">
                <div className='registerBottomLeft'>
                        
                </div>

                <div className='registerBottomMid'>
                    <div className="registerBoxBottom">
                        <Register />
                    </div>
                </div>

                <div className='registerBottomRight'>
                    
                </div>
            </div>
      </div>
    );
};

export default RegisterPage;
