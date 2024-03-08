import React from 'react'
import CardComponent from './CardComponent'

//MUI Imports
import { Typography, Grid } from '@mui/material';

//Query Imports
import { GET_CARDSETS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../../utils/mutations';

//Auth Imports
import { useAuth0 } from '@auth0/auth0-react';

export const Content = () => {
  const { user, isAuthenticated } = useAuth0();
  
  if (isAuthenticated) {
    const [addProfile, { data }] = useMutation(ADD_PROFILE);
    addProfile({ variables: { name: user.name, email: user.email } });
  }

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
          <p>No card sets found</p>
        )}
      </Grid>
    </>
  );
};