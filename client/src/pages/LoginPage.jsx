import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import { Link } from 'react-router-dom'
import Auth from '../utils/auth';

const LoginPage = () => {
    const [formState, setFormState] = useState({ user: '', password: '' });
    const [validated] = useState(false);
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
        // if (form.checkValidity() === false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // } else if (form.checkValidity() === true) {
        //     document.querySelector('.validate-text').textContent = 'Invalid username or password. Please try again.';
        // }

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
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form noValidate validated={validated} onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="user" className="block mb-1">Username or Email:</label>
                        <input type="user" id="user" name="user" value={formState.user} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1">Password:</label>
                        <input type="password" id="password" name="password" value={formState.password} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Login</button>
                    <p className='text-red-500 validate-text'></p>
                    <Link to='/signup' className='text-purple-500'>Dont have an account? Sign up here.</Link>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;