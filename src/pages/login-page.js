import React, { useState } from 'react';
import Login from '../components/login/login';
import SignUp from '../components/sign-up/sign-up';
import './login-page.scss';

const LoginPage = () => {
  const [loginSwitch, setLoginSwitch] = useState(false);

  return (
    <>
      <div className="loginPage">
        <div className="login-section">
          {!loginSwitch && (
            <Login loginSwitch={loginSwitch} setLoginSwitch={setLoginSwitch} />
          )}
          {loginSwitch && (
            <SignUp loginSwitch={loginSwitch} setLoginSwitch={setLoginSwitch} />
          )}
        </div>
      </div>
      <span className="copyright3">
        &copy; {new Date().getFullYear()} &#183; Task Tracker | Made with
        &#10084; by{' '}
        <a
          href="https://twitter.com/payalsasmal"
          target="_blank"
          rel="noreferrer"
        >
          Payal
        </a>{' '}
        and{' '}
        <a
          href="https://twitter.com/TheKrPrince"
          target="_blank"
          rel="noreferrer"
        >
          Prince
        </a>
      </span>
    </>
  );
};

export default LoginPage;
