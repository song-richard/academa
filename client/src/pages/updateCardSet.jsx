import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_CARDSET } from '../utils/mutations';
import Auth from '../utils/auth';

const UpdateCardSet = () => {
    const { _id } = (Auth.getProfile()).data;
    const [formState, setFormState] = useState({ title: '', cardSet: '', name: '' });
    const [updateCardSet, { error: updateError }] = useMutation(UPDATE_CARDSET);

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await updateCardSet({
                variables: { ...formState, userId: _id }
            });
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };


    if (Auth.loggedIn()) {
        return (
            <div>
                <h1>Update a Card Set</h1>
                <form onSubmit={handleUpdateSubmit}>
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
                    <button type="submit">Update Card Set</button>
                </form>
            </div>
        );
    };
};

export default UpdateCardSet;