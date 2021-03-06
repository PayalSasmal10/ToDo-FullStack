import { React } from 'react';
import './Modal.scss';

const Modal = ({
  open,
  setOpen,
  title,
  note,
  todoTitleHandler,
  todoNoteHandler,
  todoSubmitHandler,
  todoStatusHandler,
  status,
  todoStatus,
}) => {
  if (!open) {
    return null;
  }
  return (
    <>
      <div className="overlay" />
      <div className="modal">
        <div className="task-desc">
          <input
            type="text"
            placeholder="Title..."
            className="inputElement"
            value={title}
            onChange={todoTitleHandler}
          ></input>
          <hr />
          <textarea
            placeholder="Take note..."
            className="textAreaElement"
            value={note}
            onChange={todoNoteHandler}
          ></textarea>
          <hr />
        </div>
        <div className="close-save">
          <select onChange={todoStatusHandler}>
            {todoStatus.map((statuses) => {
              return (
                <option
                  value={statuses.value}
                  key={statuses.value}
                  selected={status === statuses.value ? true : false}
                >
                  {statuses.displayValue}
                </option>
              );
            })}
          </select>
          <div>
            <button className="cancel" onClick={() => setOpen(!open)}>
              Cancel
            </button>
            <button type="submit" className="save" onClick={todoSubmitHandler}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
