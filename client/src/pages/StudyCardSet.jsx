import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CARD, GET_CARDSET } from '../utils/queries';
import { useState } from 'react';
import { useEffect } from 'react';
import 
const StudyCardSet = () => {
    // get the card set id from the url
    const { cardSetId } = useParams();
    const { loading, data: getCardSets } = useQuery(GET_CARDSET, {
        variables: { cardSetId },
    });
    }
    // get the cards from the card set
    const cardSet = data?.cardSets.cards || [];

    console.log(cardSet);

    const [cardId, setCardId] = useState(0);

    console.log(cardId);

    const [cardValue, setCardValue] = useState(cardSet[cardId].term);
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        if (cardSet && cardSet.cards.length > 0) {
            setCardValue(cardSet.cards[0].term);
        }
    }, [cardSet]);

    const handleNext = () => {
        if (cardId < cardSet.length - 1) {
            setCardId(cardId++);
            setCardValue(cardSet[cardId].term);
        }
    };
    const handlePrevious = () => {
        if (cardId > 0) {
            setCardId(cardId - 1);
            setCardValue(cardSet[cardId].term);
        }
    };
    const handleFlip = () => {
        setFlipped(!flipped);
        if (flipped) {
            setCardValue(cardSet[cardId].term);
        } else {
            setCardValue(cardSet[cardId].description);
        }
    };


    return (
        <div>
            <h1>Study Cards ({cardSet.title})</h1>
            <div>
                {cardSet && cardSet.cards.length > 0 && (
                    <div>{cardSet.cards[0].term}</div>
                )}
            </div>
            <div>
                <button onClick={handlePrevious}>Previous</button>
                <button onClick={handleFlip}>Flip</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
}

export default StudyCardSet;