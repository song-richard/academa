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
      <div className="p-6 bg-white rounded-lg shadow-md">
        <Typography variant="h5" className="text-2xl font-bold mb-4">
          Ask Learning Expert
        </Typography>
        <div className="flex flex-col items-start">
          <Card className="mb-4">
            <CardContent>
              <Typography variant="body1">{response}</Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
};
