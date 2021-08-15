import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import task from '../images/task-tracker.png';
import './login-page.scss';

const LoginPage = () => {
  const [loginSwitch, setLoginSwitch] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const submitHandler = () => {};

  return (
    <div className="loginPage">
      <div className="login-section">
        {!loginSwitch && (
          <>
            <h2>Login</h2>

            <form onSubmit={submitHandler}>
              <label>Email*</label>
              <br />
              <input
                type="text"
                placeholder="mail@website.com"
                value={email}
                onChange={(e) => emailHandler(e)}
                className="form-email"
              />
              <br />
              <label>Password*</label>
              <br />
              <input
                type="password"
                placeholder="Min. 8 character"
                value={password}
                onChange={(e) => passwordHandler(e)}
                className="form-pwd"
              />
              <br />
              <input type="checkbox" name="remember" />
              <label for="remember">Remember me</label>
              <br />
              <button type="submit" className="submitBtn">
                Login
              </button>
            </form>
            <p>
              Not registered yet?&nbsp;
              <span
                onClick={() => setLoginSwitch(!loginSwitch)}
                className="span-switch"
              >
                Create an account
              </span>
            </p>
          </>
        )}
        {loginSwitch && (
          <>
            <h2>Sign Up</h2>

            <form onSubmit={submitHandler}>
              <label>Name*</label>
              <br />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => nameHandler(e)}
                className="form-email"
              />
              <br />
              <label>Email*</label>
              <br />
              <input
                type="text"
                placeholder="mail@website.com"
                value={email}
                onChange={(e) => emailHandler(e)}
                className="form-email"
              />
              <br />
              <label>Password*</label>
              <br />
              <input
                type="password"
                placeholder="Min. 8 character"
                value={password}
                onChange={(e) => passwordHandler(e)}
                className="form-pwd"
              />
              <br />
              <button type="submit" className="submitBtn">
                Login
              </button>
            </form>
            <p>
              Already have an account?&nbsp;
              <span
                onClick={() => setLoginSwitch(!loginSwitch)}
                className="span-switch"
              >
                Sign In
              </span>
            </p>
          </>
        )}
      </div>
      <div className="brand-section">
        <img src={task} alt="Task Tracker" />
      </div>
    </div>
  );
};

export default LoginPage;
