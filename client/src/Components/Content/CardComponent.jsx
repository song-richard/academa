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
          {data.cardSets.map((cardSet) => (
            <li key={cardSet._id} className="mb-2">
              <Typography className="text-lg">{cardSet.title}</Typography>
              <Typography className="text-sm">Is Completed: {cardSet.isCompleted ? 'Yes' : 'No'}</Typography>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}