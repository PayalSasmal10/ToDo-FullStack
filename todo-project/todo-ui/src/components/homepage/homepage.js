import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.scss';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="heading">
        <h1>Task Tracker</h1>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
      <div className="content">
        <h4>
          Now managing tasks is so easy and effective using the{' '}
          <strong>Task Tracker</strong> App.
        </h4>
      </div>
    </div>
  );
};

export default HomePage;
