import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import './ToDoListBox.scss';

const ToDoListBox = ({
  todoTitle,
  todoNote,
  id,
  open,
  setOpen,
  setTodoValues,
  todoValues,
}) => {
  const todoDeleteHandler = () => {
    axios.delete('/task-delete/' + id).then((response) => {
      console.log(response);
    });
  };

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
        <FontAwesomeIcon
          icon="trash-alt"
          className="i-trash"
          onClick={todoDeleteHandler}
        />
      </div>
    </section>
  );
};

export default ToDoListBox;
