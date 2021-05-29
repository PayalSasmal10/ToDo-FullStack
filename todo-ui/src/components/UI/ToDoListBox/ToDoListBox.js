import React from 'react';
import './ToDoListBox.scss';

const ToDoListBox = ({ todoTitle, todoNote, status }) => {
  return (
    <section className="todoListBox">
      <h4>{todoTitle}</h4>
      <span className="note-paragraph">{todoNote}</span>
    </section>
  );
};

export default ToDoListBox;
