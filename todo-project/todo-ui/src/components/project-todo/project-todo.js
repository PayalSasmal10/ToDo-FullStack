import React, { useEffect, useState } from 'react';
import Modal from '../UI/Modal/Modal';
import ToDoListBox from '../UI/ToDoListBox/ToDoListBox';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './project-todo.scss';

const ProjectToDo = (props) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoNote, setTodoNote] = useState('');
  const [status, setStatus] = useState('todo');
  const [isOpen, setIsOpen] = useState(false);
  const [todoValues, setTodoValues] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get request
  const getTodoLists = () => {
    axios.get('/task').then((response) => {
      setTodoValues(response.data);
    });
  };

  useEffect(() => {
    if (!todoValues || loading) {
      getTodoLists();
    }
  }, []);

  // Todo title
  const todoTitleHandler = (e) => {
    setTodoTitle(e.target.value);
  };

  // Todo note
  const todoNoteHandler = (e) => {
    setTodoNote(e.target.value);
  };

  // Todo status
  const todoStatusHandler = (e) => {
    setStatus(e.target.value);
  };

  // Todo submission handler
  const todoSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .post('/task', {
        title: todoTitle,
        description: todoNote,
        status: status,
      })
      .then((response) => {
        getTodoLists();
      });
    setLoading(true);
    setTodoTitle('');
    setTodoNote('');
    setIsOpen(!isOpen);
    setStatus('todo');
  };

  // Modal Handler
  const onClickHandler = () => {
    setIsOpen(!isOpen);
  };

  // Drag and Drop Handler
  const drag = (e) => {
    e.dataTransfer.setData('text', e.target.id);
  };

  const drop = (e) => {
    e.preventDefault();
    let data = e.dataTransfer.getData('text');
    console.log(data);
    e.target.appendChild(document.getElementById(data));
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div className="projects">
      <div className="add-task-div">
        <button className="add-task" onClick={() => onClickHandler()}>
          <FontAwesomeIcon icon="plus-square" />
          &nbsp;Add Task
        </button>
      </div>
      <div className="cards">
        <div className="card" id="card1" onDrop={drop} onDragOver={allowDrop}>
          <p className="cards-head">TO DO</p>
          {todoValues ? (
            todoValues.map((todo) => {
              if (todo.status === 'todo') {
                return (
                  <ToDoListBox
                    todoTitle={todo.title}
                    todoNote={todo.description}
                    status={todo.status}
                    id={todo.id}
                    key={todo.id}
                    open={isOpen}
                    setOpen={setIsOpen}
                    todoValues={todoValues}
                    setTodoValues={setTodoValues}
                    getTodoLists={getTodoLists}
                    drag={drag}
                  />
                );
              }
            })
          ) : (
            <p className="guide-label">Start adding your task</p>
          )}
        </div>
        <div className="card" id="card2" onDrop={drop} onDragOver={allowDrop}>
          <p className="cards-head">IN PROGRESS</p>
          {todoValues ? (
            todoValues?.map((todo) => {
              if (todo.status === 'inprogress') {
                return (
                  <ToDoListBox
                    todoTitle={todo.title}
                    todoNote={todo.description}
                    status={todo.status}
                    key={todo.id}
                    id={todo.id}
                    open={isOpen}
                    setOpen={setIsOpen}
                    getTodoLists={getTodoLists}
                    drag={drag}
                  />
                );
              }
            })
          ) : (
            <p className="guide-label">No task is in progress</p>
          )}
        </div>
        <div className="card" id="card3" onDrop={drop} onDragOver={allowDrop}>
          <p className="cards-head">COMPLETED</p>
          {todoValues ? (
            todoValues.map((todo) => {
              if (todo.status === 'completed') {
                return (
                  <ToDoListBox
                    todoTitle={todo.title}
                    todoNote={todo.description}
                    status={todo.status}
                    key={todo.id}
                    id={todo.id}
                    open={isOpen}
                    setOpen={setIsOpen}
                    getTodoLists={getTodoLists}
                    drag={drag}
                  />
                );
              }
            })
          ) : (
            <p>No completed tasks</p>
          )}
        </div>
      </div>
      <Modal
        open={isOpen}
        setOpen={setIsOpen}
        title={todoTitle}
        note={todoNote}
        todoTitleHandler={todoTitleHandler}
        todoNoteHandler={todoNoteHandler}
        todoStatusHandler={todoStatusHandler}
        todoSubmitHandler={todoSubmitHandler}
      />
    </div>
  );
};

export default ProjectToDo;
