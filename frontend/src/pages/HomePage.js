import React from 'react';

import LoggedInUI from '../components/LoggedInUI';
import NavBarLoggedIn from '../components/NavBarLoggedIn';

const HomePage = () =>
{
    return(
        <div>
            <NavBarLoggedIn />
            <LoggedInUI />
        </div>
    );
}

export default HomePage;
