import { useMutation } from '@apollo/client';
import { DELETE_CARDSET } from '../utils/mutations';
import Auth from '../utils/auth';

const DeleteCardSet = ({ id, deleteCardSet: deleteFunction }) => {
  const [deleteCardSet, { error }] = useMutation(DELETE_CARDSET);

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm('Deleting this card is permanent. Are you sure you want to delete it?');
      if (confirmDelete) {
        const { data } = await deleteCardSet({
          variables: {
            id: id
          }
        });
        
        deleteFunction(id);

        console.log('Flashcard set deleted:', data.deleteCardSet);
      }
    } catch (error) {
      console.error('Error deleting flashcard set:', error);
    }
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
