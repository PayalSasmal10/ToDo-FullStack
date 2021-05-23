import React from 'react';

const AddProject = ({ projectTitle, projectDescription }) => {
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
