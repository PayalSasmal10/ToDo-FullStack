import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  firstName: '',
  login: (token) => {},
  logout: () => {},
  firstNameSetter: (firstName) => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  const [firstName, setFirstName] = useState('');

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const firstNameHandler = (firstName) => {
    setFirstName(firstName);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    firstName: firstName,
    login: loginHandler,
    logout: logoutHandler,
    firstNameSetter: firstNameHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
