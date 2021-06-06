import React from 'react';
import './ToDoListBox.scss';

const ToDoListBox = ({ todoTitle, todoNote, status, id, open, setOpen }) => {
  return (
    <section className="todo-listbox" key={id} onClick={() => setOpen(!open)}>
      <main className="task-title">
        <span className="dot"></span>
        <p className="note-title">{todoTitle}</p>
      </main>
      <p className="note-paragraph">{todoNote}</p>
    </section>
  );
};

export default ToDoListBox;
