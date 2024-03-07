import decode from 'jwt-decode';
import { useAuth0 } from '@auth0/auth0-react';

class AuthService {
    login = (idToken) => {
        // Saves user token to localStorage and reloads the application for logged in status to take effect
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    };
    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        // this will reload the page and reset the state of the application
        window.location.reload();
    }

    // get user data from JSON web token by decoding it
    getProfile() {
        return decode(this.getToken());
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
      }
}

export default new AuthService();