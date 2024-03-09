import auth from '../utils/auth';
import { useState } from 'react';
import { ADD_CARDSET } from '../utils/mutations';
import { useMutation } from '@apollo/client';

const CreateCardSet = () => {
    const { _id } = (auth.getProfile()).data;
    const [cardSetState, setcardSetState] = useState([]);
    const [addCardSet, { error }] = useMutation(ADD_CARDSET);
    const [currentCardState, setCurrentCardState] = useState({term: "", description: ""});
    let title = "";

    //form submission for adding a new card set
    // we have to create routes for this
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addCardSet({
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

    const handleCurrentCardChange = (event) => {
        const { name, value } = event.target;
        setCurrentCardState({
            ...currentCardState,
            [name]: value
        });
        console.log(currentCardState);
    }


    

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-gray-800">Create a Card Set</h1>
            <form onSubmit={handleFormSubmit} className="mt-4">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                    <input type="text" name="title" id="title" onChange={handleChange}
                        className="mt-1 px-3 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
                </div>

                <button type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Create Card Set
                </button>
            </form>
            <div>
                <div id="createdCards">

                </div>
                <div id="tbdCards">
                    <form id = "">
                        <input type="text" id="term" name="term" placeholder="Add Card Term" value={currentCardState.term} onChange={handleCurrentCardChange}/>
                        <input type="text" id="description" name="description" placeholder="Add Card Description" value={currentCardState.description} onChange={handleCurrentCardChange}/>
                        <button type="submit" id="addCard">Add Card</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCardSet;