import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupPage = () => {
    //State of form
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });

    //Mutation for adding profile
    const [addProfile, {data}] = useMutation(ADD_PROFILE);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

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
    }
    return (
        <div>
            <h1>Signup Page</h1>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={formState.username} required onChange={handleInputChange}></input>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formState.email} required onChange={handleInputChange}></input>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formState.password} required onChange={handleInputChange}></input>

                <button type="submit" >Signup</button>
            </form>
        </div>
    )
}

export default SignupPage;