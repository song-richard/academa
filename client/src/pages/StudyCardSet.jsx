import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CARDSETS } from '../utils/queries';
import { useState } from 'react';
import { useEffect } from 'react';



const StudyCardSet = () => {
    // get the card set id from the url
    const { cardSetId } = useParams();
    const { loading, data } = useQuery(GET_CARDSETS, {
        variables: { id: cardSetId }
    });
    // get the cards from the card set
    const cardSet = data?.cardSets.cards || [];
    const [cardId, setCardId] = useState(0);
    const [cardValue, setCardValue] = useState(cardSet[cardId].term);
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        if (cardSet && cardSet.cards.length > 0) {
            setCardValue(cardSet.cards[0].term);
        }
    }, [cardSet]);

    const handleNext = () => {
        if (cardId < cards.length - 1) {
            setCardId(cardId++);
            setCardValue(cards[cardId].term);
        }
    }
    const handlePrevious = () => {
        if (cardId > 0) {
            setCardId(cardId - 1);
            setCardValue(cards[cardId].term);
        }
    }
    const handleFlip = () => {
        setFlipped(!flipped);
        if (flipped) {
            setCardValue(cards[cardId].term);
        } else {
            setCardValue(cards[cardId].description);
        }
    }
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error! {error.message}</div>;
    }

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