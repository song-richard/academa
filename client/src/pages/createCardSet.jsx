import auth from '../utils/auth';
import { useState } from 'react';
import {ADD_CARD_SET, UPDATE_CARDSET} from '../utils/mutations';

import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

const CreateCardSet = () => {
    const { _id } = auth.getProfile();
    const [formState, setFormState] = useState({title: '', cardSet: '', name: ''});
    const [addCardSet, {error}] = useMutation(ADD_CARD_SET);
    const [updateCardSet, {error: updateError}] = useMutation(UPDATE_CARDSET);
    const history = useHistory();


  //form submission for adding a new card set
  // we have to create routes for this
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data} = await addCardSet({
                variables: {...formState, userId: _id}
            });
            console.log(data);
            // redirect to dashboard
            history.push('/dashboard');
        } catch (e) {
            console.error(e);
        }
    };

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data} = await updateCardSet({
                variables: {...formState, userId: _id}
            });
            console.log(data);
            history.push('/dashboard');
        } catch (e) {
            console.error(e);
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return (
        <div>
            <h1>Create a Card Set</h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" id="title" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="cardSet">Card Set:</label>
                    <textarea name="cardSet" id="cardSet" onChange={handleChange}></textarea>
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" onChange={handleChange} />
                </div>
                <button type="submit">Create Card Set</button>
            </form>
        </div>
    );
}