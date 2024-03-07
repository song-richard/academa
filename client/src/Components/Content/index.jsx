import React from 'react'
import CardComponent from './CardComponent'

//MUI Imports
import { Typography, Grid } from '@mui/material';

//Query Imports
import { GET_CARDSETS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

export const Content = () => {
  const { loading, data } = useQuery(GET_CARDSETS, {
    variables: { email: user.email },
  });

  const cardSets = data?.cardSets || [];
  console.log(cardSets);


  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Current Decks
      </Typography>
      <Grid container spacing={2}>
        {cardSets.length !== 0 ? (
          cardSets.map(cardSet => (
            <Grid item xs={4} key={cardSet._id}>
              <CardComponent title={cardSet.title} id={cardSet._id} />
            </Grid>
          ))
        ) : (
          <button>Create Flashcards</button>
        )}
      </Grid>
    </>
  );
};