import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { DELETE_CARDSET } from '../utils/mutations';
import Auth from '../utils/auth';
import Modal from 'react-modal';

// Custom styles for the modal
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

// Set app element for accessibility
Modal.setAppElement('#root');

const DeleteCardSet = ({ id }) => {
  const [deleteCardSet, { error }] = useMutation(DELETE_CARDSET);
  const [modalIsOpen, setIsOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Function to handle deletion after confirmation
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

  // Function to open the modal instead of deleting directly
  const handleDelete = () => {
    openModal();
  };

  // Conditional rendering based on login status
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
          <h2>Confirm Deletion</h2>
          <button onClick={closeModal}>Close</button>
          <div>Are you sure you want to delete this card set?</div>
          <button onClick={confirmDeletion}>Confirm Delete</button>
        </Modal>
      </>
    );
  }

  return null;
};

export default DeleteCardSet;