import { useState } from 'react';

const SignUp = ({ loginSwitch, setLoginSwitch }) => {
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

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

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const signupHandler = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <h2>Sign Up</h2>

      <form onSubmit={signupHandler}>
        <label htmlFor="name">Name*</label>
        <br />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => nameHandler(e)}
          className="form-name"
        />
        <br />
        <label htmlFor="email">Email*</label>
        <br />
        <input
          type="text"
          name="email"
          placeholder="mail@website.com"
          value={email}
          onChange={(e) => emailHandler(e)}
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
        <button type="submit" className="submitBtn">
          Sign Up
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
  );
};

export default SignUp;
