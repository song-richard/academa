import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginPage = () => {
    //State of form
    const [formState, setFormState] = useState({ user: '', password: '' });
    //Query for getting profile
    const [login, { loading, data }] = useMutation(LOGIN);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const handleFormSubmit = async (event) => {
        console.log(formState);
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await login({
                variables: { ...formState }
            });
            const { token } = await data.login;
            Auth.login(token);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="user">Username or Email:</label>
                <input type="user" id="user" name="user" value={formState.user} onChange={handleInputChange} required></input>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formState.password} onChange={handleInputChange} required></input>

                <button type="submit" >Login</button>
            </form>
        </div>
    );
}

export default LoginPage;