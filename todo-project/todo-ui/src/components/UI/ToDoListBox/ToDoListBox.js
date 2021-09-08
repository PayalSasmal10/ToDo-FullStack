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
  getTodoLists,
  status,
  drag,
}) => {
  // Delete handler
  const todoDeleteHandler = () => {
    axios.delete('/task-delete/' + id).then((response) => {
      getTodoLists();
    });
  };

  // List update handler
  const listUpdateHandler = (id) => {
    setOpen(!open);
  };

  const idCheck = () => {
    alert(`${status}`);
  };

  return (
    <section
      className="todo-listbox"
      key={id}
      draggable="true"
      onClick={idCheck}
      onDragStart={drag}
      id={`drag${id}`}
    >
      <main className="task-title">
        <span className="dot"></span>
        <p className="note-title">{todoTitle}</p>
      </main>
      <p className="note-paragraph">{todoNote}</p>
      <div className="edit-icons">
        <FontAwesomeIcon
          icon="edit"
          className="i-edit"
          onClick={() => listUpdateHandler(id)}
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
