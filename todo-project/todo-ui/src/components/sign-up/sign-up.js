import axios from 'axios';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = ({ loginSwitch, setLoginSwitch }) => {
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Email validation
  const emailValid = email.trim() !== '' && email.includes('@');
  const emailInputIsInvalid = !emailValid && emailTouched;
  // Password validation
  const passwordValid = password.trim() !== '' && password.length >= 8;
  const passwordIsInvalid = !passwordValid && passwordTouched;
  // Name validation
  const firstNameValid = firstName.trim() !== '';
  const firstNameIsInvalid = !firstNameValid && firstNameTouched;
  const lastNameValid = lastName.trim() !== '';
  const lastNameIsInvalid = !lastNameValid && lastNameTouched;

  // Complete form validation
  let formIsValid = false;
  if (firstNameValid && lastNameValid && emailValid && passwordValid) {
    formIsValid = true;
  }

  // Input Handler
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const firstNameHandler = (e) => {
    setFirstName(e.target.value);
  };

  const lastNameHandler = (e) => {
    setLastName(e.target.value);
  };

  // Blur handler
  const emailBlurHandler = () => {
    setEmailTouched(true);
  };

  const passwordBlurHandler = () => {
    setPasswordTouched(true);
  };

  const firstNameBlurHandler = () => {
    setFirstNameTouched(true);
  };

  const lastNameBlurHandler = () => {
    setLastNameTouched(true);
  };

  // Submission handler
  const signupHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);

    axios
      .post('/signup', {
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
      })
      .then((response) => {
        console.log(response);
        console.log(response.statusText);
        setIsLoading(false);
        toast.success('You have successfully Signed Up!', {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error('Please try with different Email', {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  // Conditionally setting classname for making the form interactive via styling
  const emailInputClass = emailInputIsInvalid
    ? 'form-email invalid'
    : 'form-email';

  const passwordInputClass = passwordIsInvalid
    ? 'form-pwd invalid'
    : 'form-pwd';

  const firstNameInputClass = firstNameIsInvalid
    ? 'form-first-name invalid'
    : 'form-first-name';
  const lastNameInputClass = lastNameIsInvalid
    ? 'form-last-name invalid'
    : 'form-last-name';

  return (
    <>
      <h2>Sign Up</h2>

      <form onSubmit={signupHandler}>
        <label htmlFor="firstName">First Name*</label>
        <br />
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => firstNameHandler(e)}
          onBlur={firstNameBlurHandler}
          className={firstNameInputClass}
        />
        <br />
        <label htmlFor="name">Last Name*</label>
        <br />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => lastNameHandler(e)}
          onBlur={lastNameBlurHandler}
          className={lastNameInputClass}
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
          {!isLoading ? 'Sign Up' : 'Loading...'}
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
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default SignUp;
