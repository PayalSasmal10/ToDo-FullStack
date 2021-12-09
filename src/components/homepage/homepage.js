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
          Keeping track of your tasks are much easier now using{' '}
          <strong>Task Tracker</strong>.
        </h2>
      </div>
      <span className="copyright">
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
      </span>
    </div>
  );
};

export default HomePage;
