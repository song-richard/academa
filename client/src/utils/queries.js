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