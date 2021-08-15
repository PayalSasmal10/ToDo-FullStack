import { useState } from 'react';

const Login = ({ loginSwitch, setLoginSwitch }) => {
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState('');

  const emailValid = email.trim() !== '';
  const emailInputIsValid = !emailValid && emailTouched;

  // Input Handler
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const emailBlurHandler = () => {
    setEmailTouched(true);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  // Submission Handler
  const loginHandler = (event) => {
    event.preventDefault();
    console.log(email);

    setEmailTouched(true);

    if (!emailValid) {
      return;
    }
  };

  return (
    <>
      <h2>Login</h2>

      <form onSubmit={loginHandler}>
        <label htmlFor="email">Email*</label>
        <br />
        <input
          type="text"
          name="email"
          placeholder="mail@website.com"
          value={email}
          onChange={emailHandler}
          className="form-email"
        />
        <br />
        <label htmlFor="password">Password*</label>
        <br />
        <input
          type="password"
          name="password"
          placeholder="Min. 8 character"
          value={password}
          onChange={(e) => passwordHandler(e)}
          className="form-pwd"
        />
        <br />
        <input type="checkbox" name="remember" />
        <label htmlFor="remember">Remember me</label>
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
  );
};

export default Login;
