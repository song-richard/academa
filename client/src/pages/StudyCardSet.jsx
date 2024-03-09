import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CARDSET } from '../utils/queries';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_CARDSET, UPDATE_CARDSET } from '../utils/mutations';



const StudyCardSet = () => {

    // get the card set id from the url
    const { cardSetId } = useParams();
    const { loading, data } = useQuery(GET_CARDSET, {
        variables: { id: cardSetId }
    });

    // get the cards from the card set
    const cards = data?.cardSet.cards || [];
    const [deleteCardSet, { error }] = useMutation(DELETE_CARDSET);
    const [cardId, setCardId] = useState(0);
    const [cardvalue, setCardValue] = useState(cards[cardId].term);

    const handleDelete = async () => {
        try {
            // delete the card set from the database
            // let user confirm that they want to delete the card set
            // if the user confirms, delete the card set
            // if the user cancels, do nothing
            const { data } = await deleteCardSet({
                variables: {
                    id: cardSetId
                }
            });
            console.log('Flashcard set deleted:', data.deleteCardSet);
        } catch (error) {
            console.error('Error deleting flashcard set:', error);
        }
    };
    const handleUpdate = async () => {
        try {
            const { data } = await updateCardSet({
                variables: {
                    id: cardSetId
                }
            });
            console.log('Flashcard set updated:', data.updateCardSet);
        } catch (error) {
            console.error('Error updating flashcard set:', error);
        }
    }


    return (
        <div>
            <h1>Study Cards (title of set will go here)</h1>
            
            {/* create container component */}
            {/* get all the cards from the current set from the backend using a usequery */}
            {/* show only the first card in the set. just show the term */}
            {/* have 3 button under the card. previous, flip, next */}
            {/* if the user clicks next, show the next card in the set. if the user clicks previous, show the previous card in the set */}
            {/* if the user clicks flip, show the definition of the term */}
            {/* if the user clicks flip again, show the term again */}
            {/* if the user clicks next on the last card, show a message that says "you have reached the end of the set" */}
            {/* if the user clicks previous on the first card, show a message that says "you are at the beginning of the set" */}
            {/* when user reaches end of set update the database to show that the user has completed the set */}

            <div>
                <div id={cardId}>{cardvalue}</div>
                <button>Previous</button>
                <button>Flip</button>
                <button>Next</button>
            </div>
        </div>
    );
}

export default StudyCardSet;