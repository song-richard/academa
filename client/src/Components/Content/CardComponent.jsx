import React from 'react';

// MUI Imports
import { Typography, Card, CardContent } from '@mui/material';

import DeleteCardSet from '../../pages/DeleteCardSet';

export default function CardComponent({ cardSet }) {
  const { title, isCompleted, _id, cards } = cardSet;

  return (
    <div className="flex justify-center items-center w-full h-full">
      <Card className="bg-white rounded-lg shadow-md p-4">
        <CardContent>
          <Typography variant="h6" className="text-xl font-bold mb-4">{title}</Typography>
          <ul>
            <li key={_id} className="mb-2">
              <Typography className="text-sm">Amount of Cards: {cards.length}</Typography>
              <Typography className="text-sm">Is Completed: {isCompleted ? 'Yes' : 'No'}</Typography>
              <button className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 focus:outline-none" onClick={() => window.location.assign(`/studyCardSet/${_id}`)}>
                Study Set
              </button>
              <DeleteCardSet id={_id} />
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}