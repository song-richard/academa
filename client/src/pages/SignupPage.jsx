import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupPage = () => {
    //State of form
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });

    //Mutation for adding profile
    const [addProfile, { data }] = useMutation(ADD_PROFILE);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await addProfile({
                variables: { ...formState }
            });
            const { token, profile } = data.addProfile;
            console.log(token, profile);
            Auth.login(token);
            setFormState({
                username: '',
                email: '',
                password: ''
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Signup Page</h1>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block mb-1">Username:</label>
                        <input type="text" id="username" name="username" value={formState.username} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1">Email:</label>
                        <input type="email" id="email" name="email" value={formState.email} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1">Password:</label>
                        <input type="password" id="password" name="password" value={formState.password} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Signup</button>
                </form>
            </div>
        </div>
    )
};

export default SignupPage;