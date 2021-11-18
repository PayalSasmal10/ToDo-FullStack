import React, { useState } from 'react';

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

// Calculate Time function
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);

  const initialName = localStorage.getItem('name');
  const [firstName, setFirstName] = useState(initialName);

  const [isSettingOpen, setIsSettingOpen] = useState('');

  const userIsLoggedIn = !!token;

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem('token', token);

    const remainingTime = calculateRemainingTime(expirationTime);

    setTimeout(logoutHandler, remainingTime);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  };

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
