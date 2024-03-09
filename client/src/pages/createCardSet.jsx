import auth from '../utils/auth';
import { useState } from 'react';
import {ADD_CARDSET} from '../utils/mutations';
import { useMutation } from '@apollo/client';

const CreateCardSet = () => {
    const { _id } = (auth.getProfile()).data;
    const [formState, setFormState] = useState({title: '', cardSet: '', name: ''});
    const [addCardSet, {error}] = useMutation(ADD_CARDSET);

  //form submission for adding a new card set
  // we have to create routes for this
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data} = await addCardSet({
                variables: {...formState, userId: _id}
            });
            console.log(data);
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
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-gray-800">Create a Card Set</h1>
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
};

export default CreateCardSet;