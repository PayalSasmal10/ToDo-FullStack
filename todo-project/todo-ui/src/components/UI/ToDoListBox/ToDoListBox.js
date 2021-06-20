import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './ToDoListBox.scss';

const ToDoListBox = ({ todoTitle, todoNote, status, id, open, setOpen }) => {
  return (
    <section className="todo-listbox" key={id}>
      <main className="task-title">
        <span className="dot"></span>
        <p className="note-title">{todoTitle}</p>
      </main>
      <p className="note-paragraph">{todoNote}</p>
      <div className="edit-icons">
        <FontAwesomeIcon
          icon="edit"
          className="i-edit"
          onClick={() => setOpen(!open)}
        />
        <FontAwesomeIcon icon="trash-alt" className="i-trash" />
      </div>
    </section>
  );
};

export default ToDoListBox;
