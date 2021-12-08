import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal/Modal';
import ToDoListBox from '../UI/ToDoListBox/ToDoListBox';
import axios from 'axios';
import AuthContext from '../../store/auth-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './project-todo.scss';

const ProjectToDo = ({
  todoValues,
  setTodoValues,
  getTodoLists,
  setLoading,
}) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoNote, setTodoNote] = useState('');
  const [status, setStatus] = useState('todo');
  const [isOpen, setIsOpen] = useState(false);
  const [dragCardId, setDragCardId] = useState();
  const [todoId, setTodoId] = useState('');
  const [todoStatus] = useState([
    { value: 'todo', displayValue: 'Todo' },
    { value: 'inprogress', displayValue: 'In Progress' },
    { value: 'completed', displayValue: 'Completed' },
  ]);

  const authCtx = useContext(AuthContext);

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

    if (!todoId) {
      axios
        .post(
          'app/task',
          {
            title: todoTitle,
            description: todoNote,
            status: status,
          },
          {
            headers: {
              Authorization: `JWT ${authCtx.token}`,
            },
          }
        )
        .then((response) => {
          getTodoLists();
        });
      setLoading(true);
      setTodoTitle('');
      setTodoNote('');
      setIsOpen(!isOpen);
      setStatus('todo');
    } else {
      axios
        .put(
          `app/task/${todoId}`,
          {
            // id: todoId,
            title: todoTitle,
            description: todoNote,
            status: status,
          },
          {
            headers: {
              Authorization: `JWT ${authCtx.token}`,
            },
          }
        )
        .then((response) => {
          setIsOpen(!isOpen);
          getTodoLists();
        });
    }
  };

  // Modal Handler
  const onClickHandler = () => {
    setIsOpen(!isOpen);
    setTodoTitle('');
    setTodoNote('');
    setTodoId('');
    setStatus('todo');
  };

  // Drag and Drop Handler
  const drag = (e) => {
    console.log(`targetID: ${e.target.id}`);
    e.dataTransfer.setData('text/plain', e.target.id);
    setDragCardId(e.target.id);
  };

  const drop = (e) => {
    e.preventDefault();
    let data = e.dataTransfer.getData('text');
    e.target.appendChild(document.getElementById(data));
    let cardNum = e.target.id;

    // Getting the task value using id and then updating the status of that task after element is dropped to another section
    axios
      .get(`app/task/${dragCardId}`, {
        headers: {
          Authorization: `JWT ${authCtx.token}`,
        },
      })
      .then((response) => {
        axios
          .put(
            `app/task/${dragCardId}`,
            {
              title: response.data.title,
              description: response.data.description,
              status:
                cardNum === 'card1'
                  ? 'todo'
                  : cardNum === 'card2'
                  ? 'inprogress'
                  : 'completed',
            },
            {
              headers: {
                Authorization: `JWT ${authCtx.token}`,
              },
            }
          )
          .then((response) => {
            console.log('Data Updated');
            return axios.get('app/task', {
              headers: {
                Authorization: `JWT ${authCtx.token}`,
              },
            });
          })
          // .then((res) => setTodoValues(res.data)) // This line is causing error
          .catch((err) => console.log(err));
      });
  };

  const dragOver = (e) => {
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
        <div className="card" id="card1" onDrop={drop} onDragOver={dragOver}>
          <p className="cards-head">TO DO</p>
          {todoValues && todoValues.length > 0 ? (
            todoValues.map((todo) => {
              if (todo.status === 'todo') {
                return (
                  <ToDoListBox
                    todoTitle={todo.title}
                    setTodoTitle={setTodoTitle}
                    todoNote={todo.description}
                    setTodoNote={setTodoNote}
                    status={todo.status}
                    setStatus={setStatus}
                    id={todo.pk}
                    key={todo.pk}
                    setTodoId={setTodoId}
                    open={isOpen}
                    setOpen={setIsOpen}
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
        <div className="card" id="card2" onDrop={drop} onDragOver={dragOver}>
          <p className="cards-head">IN PROGRESS</p>
          {todoValues && todoValues.length > 0 ? (
            todoValues?.map((todo) => {
              if (todo.status === 'inprogress') {
                return (
                  <ToDoListBox
                    todoTitle={todo.title}
                    setTodoTitle={setTodoTitle}
                    todoNote={todo.description}
                    setTodoNote={setTodoNote}
                    status={todo.status}
                    setStatus={setStatus}
                    key={todo.pk}
                    id={todo.pk}
                    setTodoId={setTodoId}
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
        <div className="card" id="card3" onDrop={drop} onDragOver={dragOver}>
          <p className="cards-head">COMPLETED</p>
          {todoValues && todoValues.length > 0 ? (
            todoValues.map((todo) => {
              if (todo.status === 'completed') {
                return (
                  <ToDoListBox
                    todoTitle={todo.title}
                    setTodoTitle={setTodoTitle}
                    todoNote={todo.description}
                    setTodoNote={setTodoNote}
                    status={todo.status}
                    setStatus={setStatus}
                    key={todo.pk}
                    id={todo.pk}
                    setTodoId={setTodoId}
                    open={isOpen}
                    setOpen={setIsOpen}
                    getTodoLists={getTodoLists}
                    drag={drag}
                  />
                );
              }
            })
          ) : (
            <p className="guide-label">No completed tasks</p>
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
        todoStatus={todoStatus}
        status={status}
      />
    </div>
  );
};

export default ProjectToDo;
