import React from "react";
import { useQuery } from "@apollo/client";
import { ASK_LEARNING_EXPERT } from "../../utils/queries";
import { Typography, Card, CardContent } from "@mui/material";
import auth from "../../utils/auth";

export const ChatBot = () => {
  const { loading, error, data } = useQuery(ASK_LEARNING_EXPERT, {
    variables: { question: "What can I help you today?" },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const response = data.askLearningExpert;
  if (auth.loggedIn()) {
    console.log("logged in");
    return (
      <>
        
        <div>Ask Learning Expert</div>
        <div>{response}</div>
      </>
    );
  }
  
};
