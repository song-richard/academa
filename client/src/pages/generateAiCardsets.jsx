import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CARDSET } from '../utils/mutations';
import Auth from '../utils/auth';

const GenerateAiCardsets = () => {

  const { _id } = (Auth.getProfile()).data;
  const [formState, setFormState] = useState({ amount: '', topic: '' });
  const [addCardSet, { error }] = useMutation(ADD_CARDSET);

  //form submission for adding a new card set
  const handleAIFormSubmit = async (event) => {
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

  return (
    <div>
      <h1>Create a Card Set</h1>
      <form onSubmit={handleAIFormSubmit}>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input type="number" name="amount" id="amount" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="topic">Topic:</label>
          <input type="text" name="topic" id="topic" onChange={handleChange} />
        </div>
        <button type="submit">Create Card Set</button>
      </form>
    </div>
  );
};


export default GenerateAiCardsets;