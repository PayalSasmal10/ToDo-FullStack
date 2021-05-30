import { React } from 'react';
import './Modal.scss';

const Modal = ({ open, setOpen, title, note, todoTitleHandler, todoNoteHandler, todoSubmitHandler }) => {
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
        </div>
        <hr />
        <div className="close-save">
          <button className="cancel" onClick={() => setOpen(!open)}>
            Cancel
          </button>
          <button type="submit" className="save" onClick={todoSubmitHandler}>
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
