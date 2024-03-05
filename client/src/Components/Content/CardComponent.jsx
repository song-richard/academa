import React from 'react';

//MUI Imports
import { Typography, Card, CardContent } from '@mui/material';

//Apollo Imports
import { useQuery } from '@apollo/client';

export default function CardComponent({ title }) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
        </CardContent>
      </Card>
    );
  };