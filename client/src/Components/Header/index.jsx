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
        <Toolbar className="flex justify-between items-center">
          <Typography variant="h6" onClick={() => redirect('/')} className="cursor-pointer">
            Academa
          </Typography>
          <div className="flex space-x-4">
            {Auth.loggedIn() ? (
              <>
                <Button color="inherit" onClick={() => redirect('./createCardSet')} className="hidden md:inline-block">Create Cards</Button>
                <Button color="inherit" onClick={() => redirect('./generateAiCards')} className="hidden md:inline-block">Create AI Cards</Button>
                <Button color="inherit" onClick={Auth.logout}>Logout</Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => redirect('/login')}>Login</Button>
                <Button color="inherit" onClick={() => redirect('/signup')}>Signup</Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
