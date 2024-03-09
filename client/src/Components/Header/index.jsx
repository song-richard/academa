//MUI IMPORTS
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Auth from '../../utils/auth';

const redirect = (route) => {
  window.location.assign(route);
}

export const Header = () => {

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }} onClick={() => redirect('/')}>
            Academa
          </Typography>
          {Auth.loggedIn() ? (
            <div>
              <Button color="inherit" onClick={() => redirect('./pages/createCardSet')}>Create Cards</Button>
              <Button color="inherit" onClick={() => redirect('./pages/generateAiCardsets')}>Create AI Cards</Button>
              <Button color="inherit" onClick={Auth.logout}>Logout</Button>
            </div>
          ) : (
            <div>
              <Button color="inherit" onClick={() => redirect('/login')}>Login</Button>
              <Button color="inherit" onClick={() => redirect('/signup')}>Signup</Button>
            </div>
          )}
        </Toolbar>
      </AppBar >
    </>
  )
}
