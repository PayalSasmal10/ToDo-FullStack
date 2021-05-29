import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './side-nav.scss';

const SideNav = () => {
  const sideNavHandler = () => {
    alert('SideNav clicked');
  };

  return (
    <div className="sidenav">
      <h2>Task Tracker</h2>
      <div className="section1">
        <div className="sidenav-section" onClick={sideNavHandler}>
          <FontAwesomeIcon icon="home" />
          <span>Home</span>
        </div>
        <div className="sidenav-section" onClick={sideNavHandler}>
          <FontAwesomeIcon icon="tasks" />
          <span>Project</span>
        </div>
        <div className="sidenav-section" onClick={sideNavHandler}>
          <FontAwesomeIcon icon="calendar" />
          <span>Calendar</span>
        </div>
      </div>
      <div className="section2">
        <div className="s2-1" onClick={sideNavHandler}>
          <FontAwesomeIcon icon="cog" />
          <span>Settings</span>
        </div>
        <div className="s2-1" onClick={sideNavHandler}>
          <FontAwesomeIcon icon="sign-out-alt" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
