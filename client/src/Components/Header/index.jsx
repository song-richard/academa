import React from 'react'

//MUI IMPORTS
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export const Header = () => {
  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Academa
          </Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Signup</Button>
        </Toolbar>
      </AppBar>
    </>
  )
}
