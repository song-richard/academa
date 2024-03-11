//MUI IMPORTS
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Auth from '../../utils/auth';

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
          <div className="flex space-x-4">
            {Auth.loggedIn() ? (
              <>
            <>
              <ListItem button onClick={() => redirect('./createCardSet')}>
                <ListItemText primary="Create Cards" />
              </ListItem>
              <ListItem button onClick={() => redirect('./generateAiCards')}>
                <ListItemText primary="Create AI Cards" />
              </ListItem>
              <ListItem button onClick={Auth.logout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
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
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
