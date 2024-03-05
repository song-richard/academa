import { gql } from '@apollo/client';

export const GET_Profiles = gql`
    query profiles {
        profiles {
            _id
            username
        }
    }
`;