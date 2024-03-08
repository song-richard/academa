
const StudyCardSet = () => {
    
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