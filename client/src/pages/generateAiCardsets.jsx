import { useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { ADD_CARDSET } from '../utils/mutations';
import { GET_AI_CARDSET } from '../utils/queries';
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
    } catch (e) {
      console.error(e);
    }
  }

  if (Auth.loggedIn()) {
    return (
      <div>
        <h1>Create a Card Set</h1>
        <form onSubmit={handleAIFormSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" id="title" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="topic">Topic:</label>
            <input type="text" name="topic" id="topic" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="amount">Amount:</label>
            <input type="number" name="amount" id="amount" onChange={handleChange} />
          </div>
          <button type="submit">Generate Ai Cards</button>
        </form>
        <div>
          <h2>Generated Cards</h2>
          {loading ? <div>Loading...</div> : (

            <ul>
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
        <button onClick={handleAddCardSet}>Create Deck</button>
      </div>

    );
  } return (
    <Navigate replace to="/login" />)
};

export default GenerateAiCardsets;