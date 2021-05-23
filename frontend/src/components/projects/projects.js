import React, { useState } from 'react';
import Modal from '../UI/Modal/Modal';
import './projects.scss';

const Projects = (props) => {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const projectTitleHandler = () => {
    setProjectTitle('My First Task');
    setProjectDescription('Complete this task by EOD');
  };
  return (
    <div className="projects">
      <div className="project-header">
        <h3>Projects</h3>
        <h5>This Week</h5>
      </div>
      <div className="cards">
        <div className="todo-card">
          <p>To do</p>
          <button className="add-task" onClick={() => setIsOpen(true)}>
            +
          </button>
        </div>
        <div className="inprogress-card">
          <p>In progress</p>
          <button className="add-task" onClick={() => setIsOpen(true)}>
            +
          </button>
        </div>
        <div className="completed-card">
          <p>Completed</p>
          <button className="add-task" onClick={() => setIsOpen(true)}>
            +
          </button>
        </div>
      </div>
      <Modal open={isOpen} setOpen={setIsOpen} />
    </div>
  );
};

export default Projects;
