import decode from 'jwt-decode';

class AuthService {
    login = (idToken) => {

        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    };
    logout() {
        localStorage.removeItem('id_token');

        window.location.reload();
    }

    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    getProfile() {
        return decode(this.getToken());
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

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