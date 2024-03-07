import React from 'react'
import CardComponent from './CardComponent'

//MUI Imports
import { Typography, Grid } from '@mui/material';

//Query Imports
import { GET_CARDSETS } from '../../utils/queries';
import { useQuery } from '@apollo/client';

//Auth Imports
import { useAuth0 } from '@auth0/auth0-react';

export const Content = () => {
  const { user } = useAuth0();
  const { loading, error, data } = useQuery(GET_CARDSETS, {
    variables: { email: user.email },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Current Decks
      </Typography>
      <Grid container spacing={2}>
        {data.cardSets.map(cardSet => (
          <Grid item xs={4} key={cardSet._id}>
            <CardComponent title={cardSet.title} id={cardSet._id} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};