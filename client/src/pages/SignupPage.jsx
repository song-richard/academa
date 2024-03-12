import { useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { ADD_PROFILE } from '../utils/mutations';
import { GET_PROFILE } from '../utils/queries';
import Auth from '../utils/auth';

const SignupPage = () => {
    //State of form
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [getProfile, { data: profileData }] = useLazyQuery(GET_PROFILE);
    const [validated] = useState(false);

    //Mutation for adding profile
    const [addProfile, { data }] = useMutation(ADD_PROFILE);

    const handleInputChange = (event) => {
        const { name, value, nextSibling } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });

        if (value){
            nextSibling.textContent = ''
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        try {
            if (!form.checkValidity()) {
                console.log('form not valid');
                const usernameValidation = document.getElementById('username-validation-text');
                const username = document.getElementById('username');
                const emailValidation = document.getElementById('email-validation-text');
                const email = document.getElementById('email');
                const passwordValidation = document.getElementById('password-validation-text');
                const password = document.getElementById('password');
                console.log(usernameValidation.textContent)
                if (!usernameValidation.textContent && !username.value){
                    usernameValidation.textContent = '* Field required';
                }
                if (!emailValidation.textContent && !email.value){
                    emailValidation.textContent = '* Field required';
                }
                if (!passwordValidation.textContent && !password.value){
                    passwordValidation.textContent = '* Field required';
                }
                
            }
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

    const handleEmailValidtation = (event) => {
        const { value, nextSibling } = event.target;
        const regex = /^([a-z0-9A-Z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        if (!value.match(regex) && value.length >= 5) {
            nextSibling.textContent = '* Please use valid email';
        }
        else {
            nextSibling.textContent = ''
        } 
    }

    const handlePasswordValidation = (event) => {
        const { value, nextSibling } = event.target;
        if (value.length < 5) {
            nextSibling.textContent = '* Password must be at least 5 characters long';
        }
    }

    const handleBlankInput = (event) => {
        const { value, nextSibling } = event.target
        if (!value) {
            nextSibling.textContent = '* Field required'
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Signup Page</h1>
                <form onSubmit={handleFormSubmit} className="space-y-4" noValidate validated={validated}>
                    <div>
                        <label htmlFor="username" className="block mb-1">Username:</label>
                        <input type="text" id="username" name="username" value={formState.username} onChange={handleInputChange} onBlur={handleBlankInput} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 validation-text" required />
                        <p className='text-red-500' id="username-validation-text"></p>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1">Email:</label>
                        <input type="email" id="email" name="email" value={formState.email} onChange={(event) => { handleInputChange(event); handleEmailValidtation(event); }} onBlur={handleBlankInput} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" required />
                        <p className='text-red-500' id='email-validation-text'></p>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1">Password:</label>
                        <input type="password" id="password" name="password" value={formState.password} onChange={() => {handleInputChange(event); handlePasswordValidation(event)}} onBlur={handleBlankInput}className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" required />
                        <p className='text-red-500' id="password-validation-text"></p>
                    </div>
                    <button type="submit"  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Signup</button>
                </form>
            </div>
        </div>
    )
};

export default SignupPage;