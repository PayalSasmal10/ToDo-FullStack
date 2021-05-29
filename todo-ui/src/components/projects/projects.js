import React, { useEffect, useState } from 'react';
import Modal from '../UI/Modal/Modal';
import ToDoListBox from '../UI/ToDoListBox/ToDoListBox';
import './projects.scss';

const Projects = (props) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoNote, setTodoNote] = useState('');
  const [status, setStatus] = useState('todo');
  const [isOpen, setIsOpen] = useState(false);
  const [todoValues, setTodoValues] = useState([]);

  // useEffect(() => {
  //   getLocalStorageHandler();
  // }, []);

  useEffect(() => {
    localStorageHandler();
    todoListBox();
  }, [todoValues]);

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
  };

  // Todo values mapping
  const todoListBox = () => {
    <div>
      {todoValues.map((todo) => (
        <ToDoListBox
          todoTitle={todo.title}
          todoNote={todo.note}
          key={todo.id}
          status={todo.status}
        />
      ))}
    </div>;
  };

  // Save to Local
  const localStorageHandler = () => {
    localStorage.setItem('todoValues', JSON.stringify(todoValues));
  };

  // Get from Local
  // const getLocalStorageHandler = () => {
  //   if (localStorage.getItem('todoValues') === null) {
  //     localStorage.setItem('todoValues', JSON.stringify([]));
  //   } else {
  //     let todoLocal = localStorage.getItem(
  //       'todoValues',
  //       JSON.stringify(todoValues)
  //     );
  //     setTodoValues(todoLocal);
  //   }
  // };

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
          <button className="add-task" onClick={() => setIsOpen(true)}>
            +
          </button>
          {todoListBox}
        </div>
        <div className="inprogress-card">
          <p>In progress</p>
          <button className="add-task" onClick={() => setIsOpen(true)}>
            +
          </button>
        </div>
        <div className="completed-card">
          <p>Completed</p>
          <button className="add-task" onClick={() => setIsOpen(true)}>
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

export default Projects;
