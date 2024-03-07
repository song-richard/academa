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
    query profile($profileId: ID!) {
        profile(profileId: $profileId) {
            _id
            username
        }
    }
`;

export const GET_CARDSETS = gql`
    query cardSets($email: String!) {
        cardSets(email: $email) {
            cardSets {
                _id
                title
                cards {
                    _id
                    term
                    description
                }
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