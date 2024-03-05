import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// require('dotenv').config();

import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = '';
const clientId = '';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

ReactDOM.render(
<Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);