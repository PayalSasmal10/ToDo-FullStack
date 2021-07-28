import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './header.scss';

const Header = (props) => {
  const [user, setUser] = useState('Prince');

  return (
    <div className="header">
      <div className="search">
        <FontAwesomeIcon icon="search" className="i-search" />
        <input placeholder="Search" className="search-input"></input>
      </div>
      <div className="nav-section">
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
            <li>Hi, {user}</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
