import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CARDSET } from '../utils/mutations';
import Auth from '../utils/auth';
import { Navigate } from "react-router-dom";


// create 3 inputs on the form for title, topic, amount.... =)
// ...
// on submit, takes value from amount and title and puts that into the aiGenerateCard function
// setCard state or result is going to be the result of the aiGenerateCard function
// then when we add card we push the state and title
// unless you want to show a preview of the cards

const GenerateAiCardsets = () => {

  const [formState, setFormState] = useState({ title: '', amount: '', topic: '' });
  const [addCardSet, { error }] = useMutation(ADD_CARDSET);
  const [cardSetState, setCardSetState] = useState([]);

  // title amount and topic into form submission funct

  //form submission for adding a new card set
  const handleAIFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addCardSet({
        variables: { title: formState.title, cardSet: [{ term: "term ex", description: "desc ex" }] }
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
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Create a Card Set</h1>
        <form onSubmit={handleAIFormSubmit} className="mb-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
            <input type="text" name="title" id="title" onChange={handleChange} value={formState.title} className="mt-1 px-3 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic:</label>
            <input type="text" name="topic" id="topic" onChange={handleChange} value={formState.topic} className="mt-1 px-3 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount:</label>
            <input type="number" name="amount" id="amount" onChange={handleChange} value={formState.amount} className="mt-1 px-3 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Create Card Set</button>
        </form>
      </div>
    );
    
  } return (
    <Navigate replace to="/login" />)
};

export default GenerateAiCardsets;