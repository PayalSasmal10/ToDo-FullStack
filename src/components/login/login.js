import axios from 'axios';
import { useState, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ loginSwitch, setLoginSwitch }) => {
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  console.log(isLoggedIn);

  const history = useHistory();

  // Email validation
  const emailValid = email.trim() !== '' && email.includes('@');
  const emailInputIsInvalid = !emailValid && emailTouched;
  // Password validation
  const passwordValid = password.trim() !== '' && password.length >= 8;
  const passwordIsInvalid = !passwordValid && passwordTouched;

  let formIsValid = false;

  if (emailValid && passwordValid) {
    formIsValid = true;
  }

  // Input Handler
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  // Blur Handler
  const emailBlurHandler = () => {
    setEmailTouched(true);
  };

  const passwordBlurHandler = () => {
    setPasswordTouched(true);
  };

  // Submission Handler
  const loginHandler = (event) => {
    event.preventDefault();
    setLoading(true);

    axios
      .post('app/signin', {
        email: email,
        password: password,
      })
      .then((res) => {
        setLoading(false);
        const token = res.data.tokens['access'];
        authCtx.login(token);
        authCtx.firstNameSetter(res.data.first_name);
        history.replace('app/task');
      })
      .catch((err) => {
        setLoading(false);
        // alert('Invalid Credentials. Try Again!');
        toast.error('Invalid Credentials. Try Again!', {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log(err);
      });
    // setEmailTouched(true);

    // if (!emailValid) {
    //   return;
    // }
    // console.log(email);
    // setEmail('');
    // setEmailTouched(false);
  };

  // Conditionally setting classname for making the form interactive via styling
  const emailInputClass = emailInputIsInvalid
    ? 'form-email invalid'
    : 'form-email';

  const passwordInputClass = passwordIsInvalid
    ? 'form-pwd invalid'
    : 'form-pwd';

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
          onChange={passwordHandler}
          onBlur={passwordBlurHandler}
          className={passwordInputClass}
        />
        <br />
        {/* <input type="checkbox" name="remember" />
        <label htmlFor="remember">Remember me</label>
        <br /> */}
        <button type="submit" className="submitBtn" disabled={!formIsValid}>
          {!loading ? 'Login' : 'Loading...'}
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
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default Login;
