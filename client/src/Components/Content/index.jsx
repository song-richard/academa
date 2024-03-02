import React from 'react'

//MUI Imports
import { Typography, Card, CardContent, Grid } from '@mui/material';

export const Content = () => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Current Decks
      </Typography>

      <Grid container spacing={2}>

        {/* CARD 1 */}
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Deck 1</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* CARD 2 */}
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Deck 2</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* CARD 3 */}
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Deck 3</Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </>
  );
};
