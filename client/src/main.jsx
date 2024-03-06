import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));
const domain = import.meta.env.REACT_APP_AUTH0_DOMAIN;
const clientId = import.meta.env.REACT_APP_AUTH0_CLIENT_ID;

root.render(
<Auth0Provider
    domain = {domain}
    clientId = {clientId}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
);
