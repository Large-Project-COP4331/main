import React from 'react';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import Register from '../components/Register';
import ToggleSwitch from '../components/ToggleSwitch';

function LoginPage()
{
    const [showLogin, setShowLogin] = useState(true);

    const wantLogin = () => {
      setShowLogin(true);
      
    };

    const wantRegister = () => {
      setShowLogin(false);
      
    };

    return(
      <div className="loginRegisterBox">
            <div className="logo">
              <PageTitle />
            </div>
  
            <div className="loginRegisterToggle">
              <ToggleSwitch
                  isOn={showLogin}
                  onColor="#339DFF"
                  handleToggle={() => setShowLogin(!showLogin)}
              />

            </div>

            <div className="loginRegisterView">
              {showLogin ? (
                <Login wantLogin={wantLogin} />
              ) : (
                <Register wantRegister={wantRegister} />
              )}
            </div>
      </div>
    );
};

export default LoginPage;

