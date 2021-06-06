import React, { useEffect, useState } from 'react';
import Modal from '../UI/Modal/Modal';
import ToDoListBox from '../UI/ToDoListBox/ToDoListBox';
import axios from 'axios';
import './project-todo.scss';

const ProjectToDo = (props) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoNote, setTodoNote] = useState('');
  const [status, setStatus] = useState('todo');
  const [isOpen, setIsOpen] = useState(false);
  const [todoValues, setTodoValues] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (!todoValues || loading) {
      axios.get('http://localhost:8000/app/task').then((response) => {
        setTodoValues(response.data);
        console.log(response.data);
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

  // Todo submission handler
  const todoSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8000/app/task', {
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

  const onClickHandler = (param) => {
    setStatus(param);
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
      <div className="cards">
        <div className="card">
          <p className="cards-head">TO DO</p>
          <button className="add-task" onClick={() => onClickHandler('todo')}>
            +
          </button>
          {todoValues ? (
            todoValues.map((todo) => {
              if (todo.status === 'todo') {
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
            <p className="guide-label">Start adding your task</p>
          )}
        </div>
        <div className="card">
          <p className="cards-head">IN PROGRESS</p>
          <button
            className="add-task"
            onClick={() => onClickHandler('progress')}
          >
            +
          </button>
          {todoValues ? (
            todoValues.map((todo) => {
              if (todo.status === 'progress') {
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
            <p className="guide-label">No task is in progress</p>
          )}
        </div>
        <div className="card">
          <p className="cards-head">COMPLETED</p>
          <button
            className="add-task"
            onClick={() => onClickHandler('completed')}
          >
            +
          </button>
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
        todoSubmitHandler={todoSubmitHandler}
      />
    </div>
  );
};

export default ProjectToDo;
