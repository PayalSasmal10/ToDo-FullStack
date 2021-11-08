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

  const initialName = localStorage.getItem('name');
  const [firstName, setFirstName] = useState(initialName);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
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
