import React from 'react';
import './ToDoListBox.scss';

const ToDoListBox = ({ todoTitle, todoNote, status, key }) => {
  return (
    <section className="todoListBox" key={key}>
      <h4>{todoTitle}</h4>
      <span className="note-paragraph">{todoNote}</span>
    </section>
  );
};

export default ToDoListBox;
