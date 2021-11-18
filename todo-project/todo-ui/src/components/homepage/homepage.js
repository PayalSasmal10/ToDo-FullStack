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
          Keeping track of your tasks is much easier now using{' '}
          <strong>Task Tracker</strong>.
        </h2>
      </div>
      <span className="copyright">
        &copy; {new Date().getFullYear()} &#183; Task Tracker
      </span>
    </div>
  );
};

export default HomePage;
