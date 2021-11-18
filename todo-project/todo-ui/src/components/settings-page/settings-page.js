import React, { useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../store/auth-context';
import { toast, ToastContainer } from 'react-toastify';
import './settings-page.scss';

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [oldPasswordTouched, setOldPasswordTouched] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordTouched, setNewPasswordTouched] = useState(false);
  const [newPasswordAgain, setNewPasswordAgain] = useState('');
  const [newPasswordAgainTouched, setNewPasswordAgainTouched] = useState(false);

  const authCtx = useContext(AuthContext);

  // Password Validation
  const oldPasswordValid = oldPassword.trim() !== '' && oldPassword.length >= 8;
  const oldPasswordIsInvalid = !oldPasswordValid && oldPasswordTouched;
  const newPasswordValid = newPassword.trim() !== '' && newPassword.length >= 8;
  const newPasswordIsInvalid = !newPasswordValid && newPasswordTouched;
  const newPasswordAgainValid =
    newPasswordAgain.trim() !== '' && newPasswordAgain.length >= 8;
  const newPasswordAgainIsInvalid =
    !newPasswordAgainValid && newPasswordAgainTouched;
  const newPasswordEqual = newPasswordAgain === newPassword;

  let isFormValid = false;

  if (newPasswordValid && newPasswordAgainValid) {
    newPassword === newPasswordAgain
      ? (isFormValid = true)
      : (isFormValid = false);
  }

  const oldPasswordHandler = (e) => {
    setOldPassword(e.target.value);
  };

  const newPasswordHandler = (e) => {
    setNewPassword(e.target.value);
  };

  const newPasswordAgainHandler = (e) => {
    setNewPasswordAgain(e.target.value);
  };

  // Blur Handler
  const oldPasswordBlurHandler = () => {
    setOldPasswordTouched(true);
  };

  const newPasswordBlurHandler = () => {
    setNewPasswordTouched(true);
  };

  const newPasswordAgainBlurHandler = () => {
    setNewPasswordAgainTouched(true);
  };

  const oldPasswordInputClass = oldPasswordIsInvalid
    ? 'form-pwd invalid'
    : 'form-pwd';
  const passwordInputClass = newPasswordIsInvalid
    ? 'form-pwd invalid'
    : 'form-pwd';
  const passwordInputClass2 = newPasswordAgainIsInvalid
    ? 'form-pwd invalid'
    : 'form-pwd';

  const formSumbitHandler = (event) => {
    setLoading(true);
    event.preventDefault();

    axios
      .put(
        '/change-password',
        {
          old_password: oldPassword,
          new_password: newPasswordAgain,
        },
        {
          headers: { Authorization: `JWT ${authCtx.token}` },
        }
      )
      .then((res) => {
        setLoading(false);
        toast.success('Your password has been changed succesfully', {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error('Old password is not correct', {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  return (
    <>
      <h3 className="change-password">Change Password</h3>
      <div className="settings">
        <form onSubmit={formSumbitHandler}>
          <label htmlFor="oldPassword">Old Password*</label>
          <br />
          <input
            type="password"
            name="password"
            placeholder="Enter your old password"
            value={oldPassword}
            onChange={oldPasswordHandler}
            onBlur={oldPasswordBlurHandler}
            className={oldPasswordInputClass}
          />
          <br />
          <label htmlFor="newPassword">New Password*</label>
          <br />
          <input
            type="password"
            name="password"
            placeholder="Min. 8 character"
            value={newPassword}
            onChange={newPasswordHandler}
            onBlur={newPasswordBlurHandler}
            className={passwordInputClass}
          />
          <br />
          <label htmlFor="newPassword">New Password*</label>
          <br />
          <input
            type="password"
            name="password"
            placeholder="Min. 8 character"
            value={newPasswordAgain}
            onChange={newPasswordAgainHandler}
            onBlur={newPasswordAgainBlurHandler}
            className={passwordInputClass2}
          />
          <br />
          {!newPasswordEqual && (
            <span className="warning-msg">New Passwords are not matching</span>
          )}
          <button type="submit" className="submitBtn" disabled={!isFormValid}>
            {!loading ? 'Update Password' : 'Loading...'}
          </button>
        </form>
        <ToastContainer autoClose={2000} />
      </div>
    </>
  );
};

export default Settings;
