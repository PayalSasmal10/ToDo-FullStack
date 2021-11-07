import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Task Tracker</h1>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default HomePage;
