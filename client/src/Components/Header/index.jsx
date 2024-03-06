import  { useState } from 'react';
//MUI IMPORTS
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
//auth0 hook
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;

};

export const Header = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Academa
          </Typography>
          <LoginButton />
          {/* <Button color="inherit" onClick={LoginButton}>Login</Button> */}
          <Button color="inherit">Signup</Button>
        </Toolbar>
      </AppBar>
    </>
  )
}
