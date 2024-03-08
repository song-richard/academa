import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_CARDSET } from '../utils/queries';

import React from 'react'

const DeleteCardSet = ({ id }) => {
    const [deleteCardSet, { error }] = useMutation(DELETE_CARDSET);
  
    const handleDelete = async () => {
      try {
        const { data } = await deleteCardSet({
          variables: {
            id: id
          }
        });
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