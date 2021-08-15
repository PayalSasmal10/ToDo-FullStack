import React, { useState } from 'react';
import Login from '../components/login/login';
import SignUp from '../components/sign-up/sign-up';
import './login-page.scss';

const LoginPage = () => {
  const [loginSwitch, setLoginSwitch] = useState(false);

  return (
    <div className="loginPage">
      <div className="login-section">
        {!loginSwitch && (
          <Login loginSwitch={loginSwitch} setLoginSwitch={setLoginSwitch} />
        )}
        {loginSwitch && (
          <SignUp loginSwitch={loginSwitch} setLoginSwitch={setLoginSwitch} />
        )}
      </div>
      <div className="brand-section">
        {/* <img src={task} alt="Task Tracker" /> */}
        <h2 className="multicolortext">TASK</h2>
        <h2 className="multicolortext">TRACKER</h2>
        #stars #stars2 #stars3
      </div>
    </div>
  );
};

export default LoginPage;
