import React from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from './features/kanban/kanbanSlice';
import Markdown from './Markdown';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#111927',
    borderColor: '#111927',
    width: '70%',
    height: '60%',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
};

Modal.setAppElement('#root');

function AppModal() {
  const modalIsOpen = useSelector((state) => state.kanban.modalOpen);
  const modalType = useSelector((state) => state.kanban.modalType);
  const dispatch = useDispatch();
  function afterOpenModal() {}

  function closeModal() {
    dispatch(setModal(false));
  }

  const content = [
    modalType === 'task' && (
      <div key="task">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-semibold text-xl">Add Task</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => {
              dispatch(setModal(false));
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div>
          <div className="flex py-4 row-span-1">
            <span className="text-sm border rounded-l px-4 py-2 whitespace-no-wrap bg-gray-800 text-white">
              Task:
            </span>
            <input
              name="field_name"
              className="border rounded-r px-4 py-2 w-full bg-gray-700 text-white outline-none"
              type="text"
              placeholder="Jot down your task here..."
            />
          </div>
          <div>
            <Markdown />
          </div>
        </div>
      </div>
    ),
  ];

  return (
    modalIsOpen && (
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="App Modal"
      >
        {content}
      </Modal>
    )
  );
}

export default AppModal;