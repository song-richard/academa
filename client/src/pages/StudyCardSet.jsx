import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CARD, GET_CARDSET } from '../utils/queries';
import { UPDATE_CARDSET } from '../utils/mutations';
import { useState } from 'react';
import { useEffect } from 'react';
import Auth from '../utils/auth';

const StudyCardSet = () => {
    // get the card set id from the url
    const { cardSetId } = useParams();

    const { loading, data: getCardSet } = useQuery(GET_CARDSET, {
        variables: { cardSetId },
    });
    const [updateCardSet] = useMutation(UPDATE_CARDSET);

    // get the cards from the card set
    const cardSet = getCardSet?.cardSet.cards || [];

    //Set initial states
    const [cardIndex, setCardIndex] = useState(0);
    const [cardValue, setCardValue] = useState('');
    const [flipped, setFlipped] = useState(false);

    //When cardset changes, set the card value to the first card in the set
    useEffect(() => {
        if (cardSet && cardSet.length > 0) {
            setCardValue(cardSet[0].term);
        }
    }, [cardSet]);

    //When index changes update card value display
    useEffect(() => {
        if (cardSet && cardSet[cardIndex]) {
            setCardValue(cardSet[cardIndex].term);
        }
    }, [cardIndex, cardSet]);

    //Buttons to handle the next, previous, and flip actions
    const handleNext = () => {
        if (cardIndex < cardSet.length) {
            setCardIndex(cardIndex + 1);
            setCardValue(cardSet[cardIndex].term);
        }

    };
    const handlePrevious = () => {
        if (cardIndex > 0) {
            setCardIndex(cardIndex - 1);
            setCardValue(cardSet[cardIndex].term);
        }
    };
    const handleFlip = () => {
        setFlipped(!flipped);
        if (flipped) {
            setCardValue(cardSet[cardIndex].term);
        } else {
            setCardValue(cardSet[cardIndex].description);
        }
    };

    const handleSetCompletion = async () => {
        const cleanedCardSet = cardSet.map((card) => {
            return { term: card.term, description: card.description };
        });
        await updateCardSet({
            variables: { id: cardSetId, isCompleted: true, cardSet: cleanedCardSet },
        });
        window.location.replace('/');
    }

    if (Auth.loggedIn()) {
        return (
            <div>
                <h1>Study Cards ({getCardSet?.cardSet.title})</h1>
                <div>
                    {cardSet && cardSet.length > 0 && cardIndex < cardSet.length ? (
                        <div>{cardValue}</div>
                    ) :(
                        <div>Congratulations! You have studied all cards in the deck</div>
                    )}
                </div>
                <div>
                    <button onClick={handlePrevious}>Previous</button>
                    {cardIndex >= cardSet.length ? (
                        <>
                        <button onClick={()=>setCardIndex(0)}>Study Again</button>
                        <button onClick={handleSetCompletion}>Return to Dashboard</button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleFlip}>Flip</button>
                            <button onClick={handleNext}>Next</button>
                        </>
                    )}
                </div>
            </div>
        );
    };
};

export default StudyCardSet;