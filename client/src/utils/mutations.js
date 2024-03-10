import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
    mutation addProfile($username: String!, $email: String!, $password: String!) {
        addProfile(username: $username, email: $email, password: $password) {
            token
            profile {
                _id
                username
            }
           
        }
    }
`;

export const ADD_CARDSET = gql`
    mutation addCardSet($title: String!, $cardSet: [CardInput!]) {
        addCardSet(title: $title, cardSet: $cardSet) {
            _id
            cardSets {
                _id
                title
            }
        }
    }
`;

export const UPDATE_CARDSET = gql`
    mutation updateCardSet($id: ID, $cardSet: [CardInput!], $isCompleted: Boolean) {
        updateCardSet(id: $id, cardSet: $cardSet, isCompleted: $isCompleted) {
            _id
            title
        }
    }
`;

export const DELETE_CARDSET = gql`
    mutation deleteCardSet($id: ID!) {
        deleteCardSet(id: $id) {
            _id
            cardSets {
                _id
                title
            }
        }
    }
`;

export const LOGIN = gql`
    mutation login($user: String!, $password: String!) {
        login(user: $user, password: $password) {
            token
            profile {
                _id
                username
            }
        }
    }
`;