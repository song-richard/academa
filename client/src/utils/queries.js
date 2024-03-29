import { gql } from '@apollo/client';

export const GET_PROFILES = gql`
    query profiles {
        profiles {
            _id
            username
        }
    }
`;

export const GET_PROFILE = gql`
    query profile {
        profile {
            _id
            username
        }
    }
`;

export const GET_CARDSETS = gql`
    query cardSets {
        cardSets {
            cardSets {
                _id
                title
                isCompleted
                cards {
                    _id
                    term
                    description
                }
            }
        }
    }
`;

export const GET_CARDSET = gql`
    query cardSet($cardSetId: ID!) {
        cardSet(cardSetId: $cardSetId) {
            _id
            title
            isCompleted
            cards {
                _id
                term
                description
            }
        }
    }
`;

export const GET_CARD = gql`
    query card($id: Int!) {
        card(id: $id) {
            _id
            term
            description
        }
    }
`;

export const ASK_LEARNING_EXPERT = gql`
    query askLearningExpert($question: String!) {
        askLearningExpert(question: $question)
    }
`;

export const GET_AI_CARDSET = gql`
    query getAICardSet($topic: String!, $amount: Int!) {
        getAICardSet(topic: $topic, amount: $amount) {
            term
            description
        }
    }
`;