import { useState } from 'react';
//MUI IMPORTS
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
//auth0 hook
import { useAuth0 } from '@auth0/auth0-react';
import Auth from '../../utils/auth';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;

};

const redirect = (route) => {
 window.location.assign(route);
}

export const Header = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }} onClick={()=> redirect('/')}>
            Academa
          </Typography>
          {Auth.loggedIn() ? (
            <div>
              <Button color="inherit" onClick={()=> redirect('./pages/createCardSet')}>Create Cards</Button>
              <Button color="inherit" onClick={()=> redirect('./pages/generateAiCardsets')}>Create AI Cards</Button>
              <Button color="inherit" onClick={Auth.logout}>Logout</Button>
            </div>
          ): (
            <div>
              <Button color="inherit" onClick={()=> redirect('/login')}>Login</Button>
              <Button color="inherit" onClick={()=> redirect('/signup')}>Signup</Button>
            </div>
          )}
        </Toolbar>
    </AppBar >
    </>
  )
}
