import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from '../../store/auth-context';
import { Link, useHistory } from 'react-router-dom';
import './side-nav.scss';

const SideNav = () => {
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const logoutHandler = () => {
    authCtx.logout();
    history.replace('/');
  };

  const settingPageHandler = (e) => {
    authCtx.settingSetter(true);
  };

  const homePageHandler = () => {
    authCtx.settingSetter(false);
  };

  return (
    <div className="sidenav">
      <h2>
        <Link to="/">Task Tracker</Link>
      </h2>
      <div className="sidemenu">
        <div className="section1">
          <div className="sidenav-section" onClick={homePageHandler}>
            <FontAwesomeIcon icon="home" />
            <span>Home</span>
          </div>
          <div className="sidenav-section" onClick={settingPageHandler}>
            <FontAwesomeIcon icon="cog" />
            <span>Settings</span>
          </div>
        </div>
        <div className="s2-1">
          <FontAwesomeIcon icon="sign-out-alt" />
          <span onClick={logoutHandler}>Logout</span>
        </div>
        <div className="copyright1">
          &copy; {new Date().getFullYear()} &#183; Task Tracker | Made with
          &#10084; by{' '}
          <a
            href="https://twitter.com/payalsasmal"
            target="_blank"
            rel="noreferrer"
          >
            Payal
          </a>{' '}
          and{' '}
          <a
            href="https://twitter.com/TheKrPrince"
            target="_blank"
            rel="noreferrer"
          >
            Prince
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
