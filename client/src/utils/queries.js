import { gql } from '@apollo/client';

export const GET_Profiles = gql`
    query profiles {
        profiles {
            _id
            username
        }
    }
`;

export const GET_Profile = gql`
    query profile($profileId: ID!) {
        profile(profileId: $profileId) {
            _id
            username
        }
    }
`;

export const GET_cardSets = gql`
    query cardSets($id: Int!) {
        cardSets(id: $id) {
            _id
            title
            isCompleted
        }
    }
`;