import React from 'react';
import './ToDoListBox.scss';

const ToDoListBox = ({ todoTitle, todoNote, status, id }) => {
  let boxStyle = status;

  return (
    <section className={boxStyle} key={id}>
      <h4>{todoTitle}</h4>
      <span className="note-paragraph">{todoNote}</span>
    </section>
  );
};

export default ToDoListBox;
