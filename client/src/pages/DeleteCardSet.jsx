import { from, useMutation } from '@apollo/client';
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

  const handleDelete = async () => {
    try {
      openModal();
      if (confirmDelete) {
        const { data } = await deleteCardSet({
          variables: {
            id: id
          }
        });
        window.location.reload();
        console.log('Flashcard set deleted:', data.deleteCardSet);
      }
    } catch (error) {
      console.error('Error deleting flashcard set:', error);
    }


    const handleModal = () => {

      const openModal = () => {
        setIsOpen(true);
      }
      const closeModal = () => {
        setIsOpen(false);
      }

    };
  };

  if (Auth.loggedIn()) {
    return (
      <button className="bg-red-500 hover:bg-red-600 focus:bg-red-600 text-white py-2 px-4 rounded-md focus:outline-none mt-1" onClick={handleDelete}>
        Delete Card Set
      </button>
    );
  }
  return null;
};

export default DeleteCardSet;
