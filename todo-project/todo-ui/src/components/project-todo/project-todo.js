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

  useEffect(() => {
    if (!todoValues || loading) {
      axios.get('/task').then((response) => {
        setTodoValues(response.data);
      });
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
        console.log(response);
      });
    setTodoValues([
      ...todoValues,
      { title: todoTitle, description: todoNote, status: status },
    ]);
    setLoading(true);
    setTodoTitle('');
    setTodoNote('');
    setIsOpen(!isOpen);
  };

  const onClickHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="projects">
      <div className="project-header">
        <h3>Projects</h3>
        <select className="filter-time">
          <option value="today">Today</option>
          <option value="thisweek">This Week</option>
          <option value="thismonth">This Month</option>
        </select>
      </div>
      <div className="add-task-div">
        <button className="add-task" onClick={() => onClickHandler()}>
          <FontAwesomeIcon icon="plus-square" />
          &nbsp;Add Task
        </button>
      </div>
      <div className="cards">
        <div className="card">
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
                  />
                );
              }
            })
          ) : (
            <p className="guide-label">Start adding your task</p>
          )}
        </div>
        <div className="card">
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
                  />
                );
              }
            })
          ) : (
            <p className="guide-label">No task is in progress</p>
          )}
          {todoValues &&
            todoValues.length > 0 &&
            todoValues?.map((todo) => {
              if (todo.status === 'progress') {
                return (
                  <ToDoListBox
                    todoTitle={todo.title}
                    todoNote={todo.description}
                    status={todo.status}
                    key={todo.id}
                    id={todo.id}
                    open={isOpen}
                    setOpen={setIsOpen}
                  />
                );
              }
            })}
        </div>
        <div className="card">
          <p className="cards-head">COMPLETED</p>
          {todoValues ? (
            todoValues.map((todo) => {
              if (todo.status === 'completed') {
                return (
                  <ToDoListBox
                    todoTitle={todo.title}
                    todoNote={todo.description}
                    status={todo.status}
                    id={todo.id}
                    open={isOpen}
                    setOpen={setIsOpen}
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
