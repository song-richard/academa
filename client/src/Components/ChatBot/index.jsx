import React from "react";
import { useQuery } from "@apollo/client";
import { ASK_LEARNING_EXPERT } from "../../utils/queries";
import { Typography, Card, CardContent } from "@mui/material";

export const ChatBot = () => {
  const { loading, error, data } = useQuery(ASK_LEARNING_EXPERT, {
    variables: { question: "What is the capital of France?" },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const response = data.askLearningExpert;

  return (
    <>
      <div>Ask Learning Expert</div>
      <div>{response}</div>
    </>
  );
};
