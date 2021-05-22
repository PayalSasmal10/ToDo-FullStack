import React, { useState } from 'react';

const AddProject = () => {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const projectTitleHandler = () => {
    setProjectTitle('My First Task');
    setProjectDescription('Complete this task by EOD');
  };

  return (
    <>
      <h5>{projectTitle}</h5>
      <div>
        <p>{projectDescription}</p>
      </div>
    </>
  );
};

export default AddProject;
