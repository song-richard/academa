import React from 'react'
import CardComponent from './CardComponent'

//MUI Imports
import { Typography, Grid } from '@mui/material';

//Query Imports
import { GET_CARDSETS } from '../../utils/queries';
import { useQuery } from '@apollo/client';

//Auth Imports
import Auth from '../../utils/auth';

export const Content = () => {
  const profile = (Auth.getProfile()).data;

  const { loading, data } = useQuery(GET_CARDSETS);
  const cardSets = data?.cardSets || []; // Ensure cardSets is initialized as an empty array


  if (loading) return <p>Loading...</p>;
  // // if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex justify-center" style={{ marginTop: '70px' }}>
      <div>
        <Typography variant="h5" gutterBottom className="text-2xl font-bold mb-4">
          Current Decks
        </Typography>
        <Grid container spacing={2}>
          {cardSets.length !== 0 ? (
            cardSets.map((cardSet) => (
              <Grid item xs={12} md={4} key={cardSet._id}>
                <CardComponent cardSet={cardSet} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <button
                onClick={() => window.location.assign('/createCardSet')}
                className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
              >
                Create Flashcards
              </button>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
};