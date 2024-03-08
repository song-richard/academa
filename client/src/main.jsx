import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import StudyCardSet from './pages/StudyCardSet';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'studyCardSet',
        element: <StudyCardSet />,
      }
    ],
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
// const domain = import.meta.env.AUTH0_DOMAIN;
// const clientId = import.meta.env.AUTH0_CLIENT_ID;
// const audience = import.meta.env.AUTH0_AUDIENCE;

root.render(
  <Auth0Provider
    domain="dev-bh6v4jvlxjk663r7.us.auth0.com"
    clientId="yiM1pcbX4WoD4iFTBSRtfOlvMdt32HeQ"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <RouterProvider router={router} />
  </Auth0Provider>,
);
