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

  // Todo values mapping
  // const todoListBox = () => {
  //   if (todoValues) {
  //     todoValues.map((todo) => (
  //       <ToDoListBox
  //         todoTitle={todo.title}
  //         todoNote={todo.description}
  //         key={todo.id}
  //         status={todo.status}
  //       />
  //     ));
  //   }
  // };

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
        <div className="todo-card">
          <p>To do</p>
          <button className="add-task" onClick={() => onClickHandler('todo')}>
            +
          </button>
          {todoValues ? (
            todoValues.map((todo) => (
              <ToDoListBox
                todoTitle={todo.title}
                todoNote={todo.description}
                key={todo.id}
                status={todo.status}
              />
            ))
          ) : (
            <p>No</p>
          )}
        </div>
        <div className="inprogress-card">
          <p>In progress</p>
          <button
            className="add-task"
            onClick={() => onClickHandler('progress')}
          >
            +
          </button>
        </div>
        <div className="completed-card">
          <p>Completed</p>
          <button
            className="add-task"
            onClick={() => onClickHandler('completed')}
          >
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
