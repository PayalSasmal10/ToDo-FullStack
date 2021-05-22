import React from 'react';
import './projects.scss';

const Projects = (props) => {
  return (
    <div className="projects">
      <div className="project-header">
        <h3>Projects</h3>
        <h5>This Week</h5>
      </div>
      <div className="cards">
        <div className="todo-card">
          <p>To do</p>
          <button className="add-task">+</button>
        </div>
        <div className="inprogress-card">
          <p>In progress</p>
          <button className="add-task">+</button>
        </div>
        <div className="completed-card">
          <p>Completed</p>
          <button className="add-task">+</button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
