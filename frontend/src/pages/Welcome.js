import React from 'react';

import LoggedOutUI from '../components/LoggedOutUI';
import NavBar from '../components/NavBar';

const Welcome = () =>
{
    return(
        <div>
            <NavBar />
            <LoggedOutUI />
        </div>
    );
}

export default Welcome;
