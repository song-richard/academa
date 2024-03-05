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
    query cardSets($id: Int!) {
        cardSets(id: $id) {
            _id
            title
            isCompleted
        }
    }
`;