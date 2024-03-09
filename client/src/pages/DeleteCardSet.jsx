import { useMutation } from '@apollo/client';
import { DELETE_CARDSET } from '../utils/mutations';

// delete will be a button on the card set page
// export the button to the card set page
// we will not use this as a whole page
const DeleteCardSet = ({ id }) => {
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

        };
        console.log('Flashcard set deleted:', data.deleteCardSet);
      } catch (error) {
        console.error('Error deleting flashcard set:', error);
      }
    };

    return (
      <button onClick={handleDelete}>Delete Card Set</button>
    );
  };

  export default DeleteCardSet;