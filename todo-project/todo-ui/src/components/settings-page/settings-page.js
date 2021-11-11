import React, { useState } from 'react';
import './settings-page.scss';

const Settings = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordTouched, setNewPasswordTouched] = useState(false);
  const [newPasswordAgain, setNewPasswordAgain] = useState('');
  const [newPasswordAgainTouched, setNewPasswordAgainTouched] = useState(false);

  // Password Validation
  const newPasswordValid = newPassword.trim() !== '' && newPassword.length >= 8;
  const newPasswordIsInvalid = !newPasswordValid && newPasswordTouched;
  const newPasswordAgainValid =
    newPasswordAgain.trim() !== '' && newPasswordAgain.length >= 8;
  const newPasswordAgainIsInvalid =
    !newPasswordAgainValid && newPasswordAgainTouched;

  let isFormValid = false;

  if (newPasswordValid && newPasswordAgainValid) {
    isFormValid = true;
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
  const newPasswordBlurHandler = () => {
    setNewPasswordTouched(true);
  };

  const newPasswordAgainBlurHandler = () => {
    setNewPasswordAgainTouched(true);
  };

  const passwordInputClass = newPasswordIsInvalid
    ? 'form-pwd invalid'
    : 'form-pwd';
  const passwordInputClass2 = newPasswordAgainIsInvalid
    ? 'form-pwd invalid'
    : 'form-pwd';

  return (
    <>
      <h3 className="change-password">Change Password</h3>
      <div className="settings">
        <form>
          <label htmlFor="oldPassword">Old Password*</label>
          <br />
          <input
            type="password"
            name="password"
            placeholder="Enter your old password"
            value={oldPassword}
            onChange={oldPasswordHandler}
            className="form-pwd"
          />
          <br />
          <label htmlFor="newPassword">New Password*</label>
          <br />
          <input
            type="password"
            name="password"
            placeholder="Enter the new password"
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
            placeholder="Re-Enter the new password"
            value={newPasswordAgain}
            onChange={newPasswordAgainHandler}
            onBlur={newPasswordAgainBlurHandler}
            className={passwordInputClass2}
          />
          <br />
          <button type="submit" className="submitBtn" disabled={!isFormValid}>
            Update Password
          </button>
        </form>
      </div>
    </>
  );
};

export default Settings;
