import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from '../../store/auth-context';
import { Link, useHistory } from 'react-router-dom';
import './side-nav.scss';

const SideNav = () => {
  const sideNavHandler = () => {
    alert('SideNav clicked');
  };

  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const logoutHandler = () => {
    authCtx.logout();
    history.replace('/');
  };

  return (
    <div className="sidenav">
      <h2>
        <Link to="/">Task Tracker</Link>
      </h2>

      <div className="section1">
        <div className="sidenav-section" onClick={sideNavHandler}>
          <FontAwesomeIcon icon="home" />
          <span>Home</span>
        </div>
        {/* <div className="sidenav-section" onClick={sideNavHandler}>
          <FontAwesomeIcon icon="tasks" />
          <span>Project</span>
        </div>
        <div className="sidenav-section" onClick={sideNavHandler}>
          <FontAwesomeIcon icon="calendar" />
          <span>Calendar</span>
        </div> */}
      </div>
      <div className="section2">
        <div className="s2-1" onClick={sideNavHandler}>
          <FontAwesomeIcon icon="cog" />
          <span>Settings</span>
        </div>
        <div className="s2-1">
          <FontAwesomeIcon icon="sign-out-alt" />
          <span onClick={logoutHandler}>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
