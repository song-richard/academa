import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
    mutation addProfile($username: String, $email: String, $password: String) {
        addProfile(username: $username, email: $email, password: $password) {
            _id
            username
        }
    }
`;