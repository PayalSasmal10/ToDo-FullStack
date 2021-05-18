import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './header.scss';

const Header = (props) => {
  return (
    <div className="header">
      <div className="search">
        <FontAwesomeIcon icon="search" className="i-search" />
        <input placeholder="search"></input>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <FontAwesomeIcon icon="question-circle" />
          </li>
          <li>
            <FontAwesomeIcon icon="bell" />
          </li>
          <li>
            <FontAwesomeIcon icon="chevron-down" />
          </li>
          <li>DP</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
