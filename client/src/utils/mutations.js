import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
    mutation addProfile($username: String, $email: String, $password: String) {
        addProfile(username: $username, email: $email, password: $password) {
            _id
            username
        }
    }
`;

export const ADD_CARDSET = gql`
    mutation addCardSet($title: String, $cardSet: CardInput) {
        addCardSet(title: $title, cardSet: $cardSet) {
            _id
            title
        }
    }
`;

export const UPDATE_CARDSET = gql`
    mutation updateCardSet($id: String, $cardSet: CardInput) {
        updateCardSet(id: $id, cardSet: $cardSet) {
            _id
            title
        }
    }
`;

export const DELETE_CARDSET = gql`
    mutation deleteCardSet($id: String) {
        deleteCardSet(id: $id) {
            _id
            cardSets {
                _id
                title
            }
        }
    }
`;