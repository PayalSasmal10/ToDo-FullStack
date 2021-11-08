import React from 'react';
import { Link } from 'react-router-dom';
import svg from '../../images/task-svg.svg';
import './homepage.scss';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="heading">
        <h1>TASK TRACKER</h1>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
      <div className="content">
        <img src={svg} alt="task logo" />
        <h2>
          Now managing tasks are so easy using the <strong>Task Tracker</strong>{' '}
          App.
        </h2>
      </div>
    </div>
  );
};

export default HomePage;
