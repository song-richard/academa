import React from 'react';

//MUI Imports
import { Typography, Card, CardContent } from '@mui/material';

export default function CardComponent({cardSet}) {
  const {title, isCompleted, _id, cards} = cardSet;
  
  return (
    <Card className="bg-white rounded-lg shadow-md p-4">
      <CardContent>
        <Typography variant="h6" className="text-xl font-bold mb-4">{title}</Typography>
        <ul>
            <li key={_id} className="mb-2">
              <Typography className="text-sm">Amount of Cards: {cards.length}</Typography>
              <Typography className="text-sm">Is Completed: {isCompleted ? 'Yes' : 'No'}</Typography>
              <button onClick={()=> window.location.assign(`/studyCardSet/${_id}`)}>Study Set</button>
              <button >Update Set</button>
              <button >Delete Set</button>
            </li>
        </ul>
      </CardContent>
    </Card>
  );
}