import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import Auth from '../../utils/auth';
import { ChatBot } from '../ChatBot'; // Import the ChatBot component

const redirect = (route) => {
  window.location.assign(route);
}

export const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position='static'>
        <Toolbar className="flex justify-between items-center">
          <Typography variant="h6" onClick={() => redirect('/')} className="cursor-pointer">
            Academa
          </Typography>
          <div className="hidden md:flex space-x-4">
            {Auth.loggedIn() ? (
              <>
                <Button color="inherit" onClick={() => redirect('/')}>Home</Button>
                <Button color="inherit" onClick={() => redirect('./createCardSet')}>Create Cards</Button>
                <Button color="inherit" onClick={() => redirect('./generateAiCards')}>Create AI Cards</Button>
                <Button color="inherit" onClick={Auth.logout}>Logout</Button>
                <ChatBot />
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => redirect('/login')}>Login</Button>
                <Button color="inherit" onClick={() => redirect('/signup')}>Signup</Button>
              </>
            )}
          </div>
          <div className="md:hidden">
            <Button color="inherit" onClick={toggleDrawer}>Menu</Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          {Auth.loggedIn() ? (
            <>
              <ListItem button onClick={() => redirect('/')}>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button onClick={() => redirect('./createCardSet')}>
                <ListItemText primary="Create Cards" />
              </ListItem>
              <ListItem button onClick={() => redirect('./generateAiCards')}>
                <ListItemText primary="Create AI Cards" />
              </ListItem>
              <ListItem button>
                <ChatBot />
              </ListItem>
              <ListItem button onClick={Auth.logout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button onClick={() => redirect('/login')}>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button onClick={() => redirect('/signup')}>
                <ListItemText primary="Signup" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
}
