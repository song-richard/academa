import React from 'react';

//MUI Imports
import { Typography, Card, CardContent } from '@mui/material';

//Apollo Imports
import { useQuery } from '@apollo/client';

//Query Imports
import { GET_CARDSETS } from '../../utils/queries';

//Auth Imports
import { useAuth0 } from '@auth0/auth0-react';

export default function CardComponent({ title, id }) {
 const { user } = useAuth0();
  const { loading, error, data } = useQuery(GET_CARDSETS, {
    variables: { email: user.email },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <ul>
          {data.cardSets.map(cardSet => (
            <li key={cardSet._id}>
              <Typography>{cardSet.title}</Typography>
              <Typography>Is Completed: {cardSet.isCompleted ? 'Yes' : 'No'}</Typography>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}