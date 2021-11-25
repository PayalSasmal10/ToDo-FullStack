import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import AuthContext from '../../../store/auth-context';
import './ToDoListBox.scss';

const ToDoListBox = ({
  todoTitle,
  setTodoTitle,
  todoNote,
  setTodoNote,
  status,
  setStatus,
  id,
  setTodoId,
  open,
  setOpen,
  getTodoLists,
  drag,
}) => {
  const authCtx = useContext(AuthContext);

  // Delete handler
  const todoDeleteHandler = () => {
    axios
      .delete(`app/task/${id}`, {
        headers: {
          Authorization: `JWT ${authCtx.token}`,
        },
      })
      .then((response) => {
        getTodoLists();
      });
  };

  // List update handler
  const listUpdateHandler = () => {
    setOpen(!open);
    setTodoTitle(todoTitle);
    setTodoNote(todoNote);
    setTodoId(id);
    setStatus(status);
  };

  return (
    <section
      className="todo-listbox"
      key={id}
      draggable="true"
      onDragStart={drag}
      id={id}
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
