import React, { useEffect, useState } from 'react';
import Modal from '../UI/Modal/Modal';
import ToDoListBox from '../UI/ToDoListBox/ToDoListBox';
import './project-todo.scss';

const ProjectToDo = (props) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoNote, setTodoNote] = useState('');
  const [status, setStatus] = useState('todo');
  const [isOpen, setIsOpen] = useState(false);
  const [todoValues, setTodoValues] = useState([]);

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
    setTodoValues([
      ...todoValues,
      {
        title: todoTitle,
        note: todoNote,
        status: status,
        id: Math.random() * 1000,
      },
    ]);
    setTodoTitle('');
    setTodoNote('');
    setIsOpen(!isOpen);
  };

  // Todo values mapping
  const todoListBox = todoValues.map((todo) => (
    <ToDoListBox
      todoTitle={todo.title}
      todoNote={todo.note}
      key={todo.id}
      status={todo.status}
    />
  ));

  const onClickHandler = (param) => {
    setStatus(param);
    setIsOpen(!isOpen);
  }

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
        <div className="todo-card">
          <p>To do</p>
          <button className="add-task" onClick={() => onClickHandler('todo')}>
            +
          </button>
          {todoListBox}
        </div>
        <div className="inprogress-card">
          <p>In progress</p>
          <button className="add-task" onClick={() => onClickHandler('progress')}>
            +
          </button>
        </div>
        <div className="completed-card">
          <p>Completed</p>
          <button className="add-task" onClick={() => onClickHandler('completed')}>
            +
          </button>
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
