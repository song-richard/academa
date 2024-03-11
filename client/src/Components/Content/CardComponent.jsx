import React from 'react';

//MUI Imports
import { Typography, Card, CardContent } from '@mui/material';
import {useMutation} from '@apollo/client';
import {DELETE_CARDSET} from '../../utils/mutations';


export default function CardComponent({cardSet}) {
  const {title, isCompleted, _id, cards} = cardSet;
  const [deleteCardSet, { error }] = useMutation(DELETE_CARDSET);
  const handleDelete = async () => {
    
    try {
      const confirmDelete = window.confirm('Deleting this card is permanent. Are you sure you want to delete it?');
      if (confirmDelete) {
          const { data } = await deleteCardSet({
              variables: {
                  id: _id
              },
            });    
            window.location.reload()

          console.log('Flashcard set deleted:', data.deleteCardSet);
      };
    } catch (error) {
      console.error('Error deleting flashcard set:', error);
    }
  };

  
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Card className="bg-white rounded-lg shadow-md p-4">
        <CardContent>
          <Typography variant="h6" className="text-xl font-bold mb-4">{title}</Typography>
          <ul>
            <li key={_id} className="mb-2">
              <Typography className="text-sm">Amount of Cards: {cards.length}</Typography>
              <Typography className="text-sm">Is Completed: {isCompleted ? 'Yes' : 'No'}</Typography>
              <button onClick={()=> window.location.assign(`/studyCardSet/${_id}`)}>Study Set</button>
              <button onClick={handleDelete}>Delete Card Set</button>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}