import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import task from '../images/task-tracker.png';
import './login-page.scss';

const LoginPage = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const userNameHandler = (e) => {
    setUserName(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = () => {};

  return (
    <div className="loginPage">
      <div className="login-section">
        <h2>Login</h2>

        <form onSubmit={submitHandler}>
          <label>Email*</label>
          <br />
          <input
            type="text"
            placeholder="mail@website.com"
            value={userName}
            onChange={(e) => userNameHandler(e)}
            className="form-input"
          />
          <br />
          <label>Password*</label>
          <br />
          <input
            type="password"
            placeholder="Min. 8 character"
            value={password}
            onChange={(e) => passwordHandler(e)}
            className="form-input"
          />
          <br />
          <input type="checkbox" name="remember" />
          <label for="remember">Remember me</label>
          <br />
          <button type="submit" className="submitBtn">
            Login
          </button>
        </form>
        <p>Not registered yet?</p>
        <Link to="/signup">Create an account</Link>
      </div>
      <div className="brand-section">
        <img src={task} alt="Task Tracker" />
      </div>
    </div>
  );
};

export default LoginPage;
