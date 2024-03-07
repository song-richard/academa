import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useMutation} from '@apollo/client';
import { ADD_PROFILE } from '../../utils/mutations';
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isAuthenticated) {
    const [addProfile, { data }] = useMutation(ADD_PROFILE);
    addProfile({ variables: { name: user.name, email: user.email } });
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;