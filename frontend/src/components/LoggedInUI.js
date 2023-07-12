import React, { useState } from 'react';

import LoggedInName from '../components/LoggedInName';
import image from './images/OceanLoggerLogo.png';

function LoggedInUI()
{

    return(
        <div className="loggedOutContainer">
            {/*
                <div className="Component1" style={{width: 'auto', height: 52, position: 'relative', backgroundColor: 'white'}}>
                    <div className="Subbalogger" style={{width: 225, height: 49, left: 0, top: 0, position: 'absolute'}}>
                        <span style={{color: 'black', fontSize: 32, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>
                            Subba
                        </span>
                        <span style={{color: '#4589DF', fontSize: 32, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>
                            Logger 
                        </span>
                    </div>
                    <div className="Rectangle6"  style={{width: 154, height: 46, left: 1180, top: 6, position: 'absolute', background: '#4589DF', borderRadius: 15}}/>
                    <div className="Register" style={{width: 112, height: 28, left: 1215, top: 15, position: 'absolute', color: 'white', fontSize: 24, fontFamily: 'Roboto', fontWeight: '500', wordWrap: 'break-word'}}>Register</div>
                    <div className="Login" style={{width: 60, height: 25, left: 1086, top: 17, position: 'absolute', color: '#4589DF', fontSize: 24, fontFamily: 'Roboto', fontWeight: '500', wordWrap: 'break-word'}}>Login</div>
                </div>
            */}

            <LoggedInName/>
            
            <div className="loggedInContent" style={{display: 'flex', flexDirection: 'row'}}>
                <div className="leftContent" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>

                    <div className="ExploreTheOceanWithScubaLogger" 
                        style={{width: '75%'}}
                    >
                        <span 
                            style={{color: 'black', fontSize: 74, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}
                        >
                            Explore the Ocean with 
                        </span>
                        <span 
                            style={{color: '#4589DF', fontSize: 74, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}
                        >
                            Scuba Logger!
                        </span>
                    </div>

                    <div className="scubbaDescription" 
                        style={{width: '75%', height: 153, color: 'rgba(0, 0, 0, 0.51)', fontSize: 24, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}
                    >
                        Log and document underwater experiences, track dive profiles, and share captivating stories and photographs from the deep blue sea.
                    </div>

                </div>

                <div className="rightContent" style={{display: 'flex', flexDirection: 'center', alignItems: 'center'}}>
                    <img className="Image2" style={{width: '90%', height: 441}} src={image} />
                </div>

            </div>

            <div style={{height: 100}}>
                {/**adding blank space */}
            </div>

            <div className="myTools" style={{width: '100%', height: 500, background: 'rgba(217, 217, 217, 0.50)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div className="bigText" 
                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: 560, marginTop: '20px', marginBlock: '20px'}}>
                    <span style={{color: 'black', fontSize: 74, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>
                        Tools 
                    </span>
                    <span style={{color: '#4589DF', fontSize: 74, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>
                        Provided<br/>
                    </span>
                </div>
                <div className="scubbaTools" style={{display: 'flex', flexDirection: 'row'}}>
                    <div className="Ellipse5" style={{display: 'flex', width: 150, height: 150, background: 'white', borderRadius: 9999, backgroundColor: 'blue', marginTop: '40px', marginBlock: '40px', marginLeft: '40px', marginRight: '40px'}}>
                        {/*content goes here */}
                    </div>
                    <div className="Ellipse6" style={{display: 'flex',width: 150, height: 150, background: 'white', borderRadius: 9999, backgroundColor: 'blue', marginTop: '40px', marginBlock: '40px', marginLeft: '40px', marginRight: '40px'}}>
                        {/*content goes here */}
                    </div>
                    <div className="Ellipse7" style={{display: 'flex',width: 150, height: 150, background: 'white', borderRadius: 9999, backgroundColor: 'blue', marginTop: '40px', marginBlock: '40px', marginLeft: '40px', marginRight: '40px'}}>
                        {/*content goes here */}
                    </div>
                    <div className="Ellipse8" style={{display: 'flex',width: 150, height: 150, background: 'white', borderRadius: 9999, backgroundColor: 'blue', marginTop: '40px', marginBlock: '40px', marginLeft: '40px', marginRight: '40px'}}>
                        {/*content goes here */}
                    </div>

                </div>
                
                <div className="loggedInBottom" style={{display: 'flex', justifyContent: 'center', alignContent: 'center', width: 562, height: 46.67, background: '#4589DF', borderRadius: 15}}>
                    <div className="RegisterNow" style={{ width: 212, height: 26.13, color: 'white', fontSize: 24, fontFamily: 'Roboto', fontWeight: '500', wordWrap: 'break-word'}}>Register Now</div>
                </div>
            </div>

            <div className="footer" style={{height: 100, backgroundColor: '#D9d9d9'}}>
                <p>
                    Heres the footer
                </p>

                <p>
                    Contact Information
                </p>
                
            </div>
        </div>
       

        
      
    );
}

export default LoggedInUI;
