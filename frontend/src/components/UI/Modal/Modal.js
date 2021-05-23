import { React, useState } from 'react';
import './Modal.scss';

const Modal = ({ open, setOpen }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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
          ></input>
          <hr />
          <textarea
            placeholder="Take note..."
            className="textAreaElement"
          ></textarea>
        </div>
        <hr />
        <div className="close-save">
          <button className="cancel" onClick={() => setOpen(!open)}>
            Cancel
          </button>
          <button
            type="submit"
            className="save"
            onClick={() => console.log('clicked')}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
