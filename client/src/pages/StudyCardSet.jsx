import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CARDSET } from '../utils/queries';
import { UPDATE_CARDSET } from '../utils/mutations';
import { useState, useEffect } from 'react';
import Auth from '../utils/auth';

const StudyCardSet = () => {
    const { cardSetId } = useParams();
    const { loading, data: getCardSet } = useQuery(GET_CARDSET, {
        variables: { cardSetId },
    });
    const [updateCardSet] = useMutation(UPDATE_CARDSET);

    const cardSet = getCardSet?.cardSet.cards || [];
    const [cardIndex, setCardIndex] = useState(0);
    const [cardValue, setCardValue] = useState('');
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        if (cardSet && cardSet.length > 0 && cardIndex < cardSet.length) {
            setCardValue(flipped ? cardSet[cardIndex].description : cardSet[cardIndex].term);
        }
    }, [cardIndex, cardSet, flipped]);

    const handleNext = () => {
        if (cardIndex < cardSet.length - 1) {
            setCardIndex(cardIndex + 1);
            setFlipped(false);
        } else {
            setCardIndex(cardIndex + 1);
            setCardValue('Congratulations! You have studied all cards in the deck')
        }
    };

    const handlePrevious = () => {
        if (cardIndex > 0) {
            setCardIndex(cardIndex - 1);
            setFlipped(false);
        }
    };

    const handleFlip = () => {
        setFlipped(!flipped);
        setCardValue(flipped ? cardSet[cardIndex].term : cardSet[cardIndex].description);
    };

    const handleSetCompletion = async () => {
        const cleanedCardSet = cardSet.map((card) => ({
            term: card.term,
            description: card.description,
        }));
        await updateCardSet({
            variables: { id: cardSetId, isCompleted: true, cardSet: cleanedCardSet },
        });
        window.location.replace('/');
    };

    if (Auth.loggedIn()) {
        return (
            <div className="text-center font-bold">
                <h1 className="text-2xl font-bold mb-4">Study Cards ({getCardSet?.cardSet.title})</h1>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <div className={`bg-white p-6 mb-4 border border-gray-300 h-32 rounded-md max-w-md mx-auto ${flipped ? 'transform rotate-y-180' : ''}`}>
                            <p className="text-lg">{cardValue}</p>
                        </div>
                        <div className="flex justify-center space-x-3">
                            <button onClick={handlePrevious} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none">Previous</button>
                            {cardIndex >= cardSet.length ? (
                                <>
                                    <button onClick={() => setCardIndex(0)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none">Study Again</button>
                                    <button onClick={handleSetCompletion} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none">Return to Dashboard</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={handleFlip} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none">Flip</button>
                                    <button onClick={handleNext} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none">Next</button>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        );
    }
};

export default StudyCardSet;