import decode from 'jwt-decode';

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

    // Check if user is logged in
    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    // get user data from JSON web token by decoding it
    getProfile() {
        return decode(this.getToken());
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    }

    // check if token is expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }
}

export default new AuthService();