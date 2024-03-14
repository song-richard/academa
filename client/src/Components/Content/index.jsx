import React from 'react'
import CardComponent from './CardComponent'
import { Typography, Grid } from '@mui/material';
import { GET_CARDSETS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';

export const Content = () => {
  const profile = (Auth.getProfile()).data;

  const { loading, data, error } = useQuery(GET_CARDSETS);
  const { cardSets } = data?.cardSets || [];


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  //Ensure the cardSets is an Array
  if (!Array.isArray(cardSets)) {
    console.error('Data received is not in the expected format:', cardSets);
    return <p>Unexpected data format</p>; // Display error message if data format is unexpected
  }

  return (
    <div className="flex justify-center" style={{ marginTop: '30px' }}>
      <div>
        <Typography variant="h5" gutterBottom className="text-2xl font-bold mb-4 text-center">
          Current Decks
        </Typography>
        <Grid container spacing={2}>
          {cardSets.length !== 0 ? (
            cardSets.map((cardSet) => (
              <Grid item xs={12} sm={6} md={4} key={cardSet._id}>
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