import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { DELETE_CARDSET } from '../utils/mutations';
import Auth from '../utils/auth';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const DeleteCardSet = ({ id }) => {
  const [deleteCardSet, { error }] = useMutation(DELETE_CARDSET);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const confirmDeletion = async () => {
    try {
      const { data } = await deleteCardSet({
        variables: { id },
      });
      window.location.reload();
      console.log('Flashcard set deleted:', data.deleteCardSet);
    } catch (error) {
      console.error('Error deleting flashcard set:', error);
    }
  };

  const handleDelete = () => {
    openModal();
  };

  if (Auth.loggedIn()) {
    return (
      <>
        <button
          className="bg-red-500 hover:bg-red-600 focus:bg-red-600 text-white py-2 px-4 rounded-md focus:outline-none mt-1"
          onClick={handleDelete}
        >
          Delete Card Set
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Confirm Deletion"

        >
          <h2 className="font-bold text-xl mb-2">CONFIRM DELETION</h2>
          <div className="text-gray-700 text-base">Deleting will be permanent, are you sure you want to delete this card set?</div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={closeModal}>Cancel</button>
          <button className="bg-red-500 hover:bg-red-600 focus:bg-red-600 text-white py-2 px-4 rounded-md focus:outline-none mt-1"
            onClick={confirmDeletion}>Delete</button>
        </Modal>
      </>
    );
  }

  return null;
};

export default DeleteCardSet;