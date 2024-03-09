
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//Import Pages
import Home from './pages/Home';
import StudyCardSet from './pages/StudyCardSet';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

import CreateCardSet from './pages/createCardSet';
import UpdateCardSet from './pages/updateCardSet';
import DeleteCardSet from './pages/DeleteCardSet';
import GenerateAiCards from './pages/generateAiCardsets';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'studyCardSet/:cardSetId',
        element: <StudyCardSet />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'createCardSet',
        element: <CreateCardSet />,
      },
      {
        path: 'updateCardSet',
        element: <UpdateCardSet />,
      },
      {
        path: 'deleteCardSet',
        element: <DeleteCardSet />,
      },
      {
        path: 'generateAiCards',
        element: <GenerateAiCards />,
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
