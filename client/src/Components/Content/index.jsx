import React from 'react'
import CardComponent from './CardComponent'

//MUI Imports
import { Typography, Grid } from '@mui/material';

export const Content = () => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Current Decks
      </Typography>

      <Grid container spacing={2}>

        {/* CARD 1 */}
        <Grid item xs={4}>
          <CardComponent title="Deck 1" />
        </Grid>

        {/* CARD 2 */}
        <Grid item xs={4}>
          <CardComponent title="Deck 2" />
        </Grid>

        {/* CARD 3 */}
        <Grid item xs={4}>
          <CardComponent title="Deck 3" />
        </Grid>

      </Grid>
    </>
  );
};
