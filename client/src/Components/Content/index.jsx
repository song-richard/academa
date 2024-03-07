import React from 'react';
import CardComponent from './CardComponent';
import { Typography, Grid } from '@mui/material';
import { GET_CARDSETS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';

export const Content = () => {
  const { user } = useAuth0();

  // Always call `useQuery` at the top level.
  // You can pass an `skip` option to conditionally skip executing the query.
  const { loading, error, data } = useQuery(GET_CARDSETS, {
    variables: { email: user?.email },
    skip: !user, // Skip query execution if `user` is not available
  });

  if (!user) return <p>User not logged in</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Current Decks
      </Typography>
      <Grid container spacing={2}>
        {data && data.cardSets.map(cardSet => (
          <Grid item xs={4} key={cardSet._id}>
            <CardComponent title={cardSet.title} id={cardSet._id} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
