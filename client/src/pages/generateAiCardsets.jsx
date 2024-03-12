import React from 'react';
import { useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { ADD_CARDSET } from '../utils/mutations';
import { GET_AI_CARDSET } from '../utils/queries';
import Auth from '../utils/auth';
import { Navigate } from "react-router-dom";

const GenerateAiCardsets = () => {
  const [formState, setFormState] = useState({ title: '', amount: '', topic: '' });
  const [addCardSet, { error }] = useMutation(ADD_CARDSET);
  const [cardSetState, setCardSetState] = useState([]);
  const [getAiCardSet, { data, loading }] = useLazyQuery(GET_AI_CARDSET);

  const handleAIFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await getAiCardSet({
        variables: { topic: formState.topic, amount: Number(formState.amount) },
      });

      if (!loading && data) {
        setCardSetState(data.getAICardSet);
      }

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

  const handleAddCardSet = async (event) => {
    event.preventDefault();
    try {
      const cleanedCardSet = cardSetState.map((card) => {
        return { term: card.term, description: card.description };
      });
      const { data } = await addCardSet({
        variables: { title: formState.title, cardSet: cleanedCardSet },
      });
      window.location.assign('/');
    } catch (e) {
      console.error(e);
    }
  }

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
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
          >
            Generate AI Cards
          </button>
        </form>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Generated Cards</h2>
          {loading ? <div>Loading...</div> : (
            <ul className="list-disc ml-4">
              {cardSetState.map((card, index) => (
                <li key={index}>
                  <div>
                    <p>{card.term}: {card.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={handleAddCardSet}
          className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none mt-4"
        >
          Create Deck
        </button>
      </div>
    );
  } else {
    return <Navigate replace to="/login" />;
  }
};

export default GenerateAiCardsets;
