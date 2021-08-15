import { useState } from 'react';

const SignUp = ({ loginSwitch, setLoginSwitch }) => {
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [name, setName] = useState('');
  const [nameTouched, setNameTouched] = useState(false);

  // Email validation
  const emailValid = email.trim() !== '' && email.includes('@');
  const emailInputIsInvalid = !emailValid && emailTouched;
  // Password validation
  const passwordValid = password.trim() !== '' && password.length >= 8;
  const passwordIsInvalid = !passwordValid && passwordTouched;
  // Name validation
  const nameValid = name.trim() !== '';
  const nameIsInvalid = !nameValid && nameTouched;

  // Complete form validation
  let formIsValid = false;
  if (nameValid && emailValid && passwordValid) {
    formIsValid = true;
  }

  // Input Handler
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  // Blur handler
  const emailBlurHandler = () => {
    setEmailTouched(true);
  };

  const passwordBlurHandler = () => {
    setPasswordTouched(true);
  };

  const nameBlurHandler = () => {
    setNameTouched(true);
  };

  // Submission handler
  const signupHandler = (event) => {
    event.preventDefault();
  };

  // Conditionally setting classname for making the form interactive via styling
  const emailInputClass = emailInputIsInvalid
    ? 'form-email invalid'
    : 'form-email';

  const passwordInputClass = passwordIsInvalid
    ? 'form-pwd invalid'
    : 'form-pwd';

  const nameInputClass = nameIsInvalid ? 'form-name invalid' : 'form-name';

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
          onBlur={nameBlurHandler}
          className={nameInputClass}
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
          onBlur={emailBlurHandler}
          className={emailInputClass}
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
          onBlur={passwordBlurHandler}
          className={passwordInputClass}
        />
        <br />
        <button type="submit" className="submitBtn" disabled={!formIsValid}>
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
