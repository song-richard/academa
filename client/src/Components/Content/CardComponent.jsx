import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';

export default function CardComponent({ title }) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
        </CardContent>
      </Card>
    );
  };