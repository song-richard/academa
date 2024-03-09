import Auth from '../utils/auth';
import { useState } from 'react';
import { ADD_CARDSET } from '../utils/mutations';
import { useMutation } from '@apollo/client';

const CreateCardSet = () => {
    const { _id } = (Auth.getProfile()).data;
    const [cardSetState, setCardSetState] = useState([]);
    const [addCardSet, { error }] = useMutation(ADD_CARDSET);
    const [currentCardState, setCurrentCardState] = useState({ term: "", description: "" });
    const [title, setTitle] = useState("");
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addCardSet({
                variables: { title, cards: cardSetState }
            });
        } catch (e) {
            console.error(e);
        }
    };
    const handleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleCurrentCardChange = (event) => {
        const { name, value } = event.target;
        setCurrentCardState({
            ...currentCardState,
            [name]: value
        });
    };
    const handleAddCard = (event) => {
        event.preventDefault();
        setCardSetState([...cardSetState, currentCardState]);
        setCurrentCardState({ term: "", description: "" });
    };
    
    if (Auth.loggedIn()) {
        return (
            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Create a Card Set</h1>
                <form onSubmit={handleFormSubmit} className="mb-4">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                        <input type="text" name="title" id="title" value={title} onChange={handleChange}
                            className="mt-1 px-3 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
                    </div>
                    <button type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Create Card Set
                    </button>
                </form>
                <div className="mt-8">
                    <div id="createdCards">
                        {cardSetState.map((card, index) => (
                            <div key={index} className="bg-gray-100 p-3 rounded-md mb-2">{card.term} : {card.description}</div>
                        ))}
                    </div>
                    <div id="tbdCards">
                        <form id="addCardForm" onSubmit={handleAddCard}>
                            <input type="text" id="term" name="term" placeholder="Add Card Term" value={currentCardState.term} onChange={handleCurrentCardChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 mb-2" />
                            <input type="text" id="description" name="description" placeholder="Add Card Description" value={currentCardState.description} onChange={handleCurrentCardChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 mb-2" />
                            <button type="submit" id="addCard" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add Card</button>
                        </form>
                    </div>
                </div>
            </div>
        );
};
};
export default CreateCardSet;
