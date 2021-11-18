import React, { useState, useEffect } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  firstName: '',
  login: (token) => {},
  logout: () => {},
  firstNameSetter: (firstName) => {},
  settingOpen: false,
  settingSetter: (settingOpen) => {},
});

// Calculate remaining time
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return { token: storedToken, remainingTime };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);

  const initialName = localStorage.getItem('name');
  const [firstName, setFirstName] = useState(initialName);

  const [isSettingOpen, setIsSettingOpen] = useState('');

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);

    const expirationTime = new Date(new Date().getTime() + 3600000);
    localStorage.setItem('expirationTime', expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('expirationTime');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };

  useEffect(() => {
    if (tokenData) {
      console.log('rt', tokenData.remainingTime);
      logoutTimer = setTimeout(logoutHandler, tokenData.remainingTime);
    }
  }, [tokenData]);

  const firstNameHandler = (firstName) => {
    setFirstName(firstName);
    localStorage.setItem('name', firstName);
  };

  const settingHandler = (settingVal) => {
    setIsSettingOpen(settingVal);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    firstName: firstName,
    settingOpen: isSettingOpen,
    login: loginHandler,
    logout: logoutHandler,
    firstNameSetter: firstNameHandler,
    settingSetter: settingHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
