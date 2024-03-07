import decode from 'jwt-decode';
import { useAuth0 } from '@auth0/auth0-react';

class AuthService {
  login = (idToken) => {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  };
}

export default new AuthService();