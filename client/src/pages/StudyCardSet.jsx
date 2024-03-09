import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CARD, GET_CARDSET } from '../utils/queries';
import { useState } from 'react';
import { useEffect } from 'react';
import Auth from '../utils/auth';

const StudyCardSet = () => {
    // get the card set id from the url
    const { cardSetId } = useParams();

    const { loading, data: getCardSet } = useQuery(GET_CARDSET, {
        variables: { cardSetId },
    });
    
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

    //Buttons to handle the next, previous, and flip actions
    const handleNext = () => {
        if (cardIndex < cardSet.length - 1) {
            setCardIndex(cardIndex + 1);
            setCardValue(cardSet[cardIndex].term);
        }
        console.log("end of set")
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

    if (Auth.loggedIn()) {
    return (
        <div>
            <h1>Study Cards ({cardSet.title})</h1>
            <div>
                {cardSet && cardSet.length > 0 && (
                    <div>{cardValue}</div>
                )}
            </div>
            <div>
                <button onClick={handlePrevious}>Previous</button>
                <button onClick={handleFlip}>Flip</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};
};

export default StudyCardSet;