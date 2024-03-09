import React from "react";
import { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ASK_LEARNING_EXPERT } from "../../utils/queries";
import { Typography, Card, CardContent } from "@mui/material";
import auth from "../../utils/auth";

export const ChatBot = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const [askLearningExpert, { loading, error, data }] = useLazyQuery(ASK_LEARNING_EXPERT);

  
  // const { loading, error, data } = useQuery(ASK_LEARNING_EXPERT, {
  //   variables: { question: input },
  // });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  
  const handleInput = async (event) => {
    // const { data } = await askLearningExpert({ variables: { question: input } });
   event.preventDefault();
    askLearningExpert({ variables: { question: input } });
    setResponse(data.askLearningExpert);
  }
  console.log(data);

  if (auth.loggedIn()) {
    console.log("logged in");
    return (
      <Card>
        <CardContent>
          <Typography variant="h6">Ask Academa</Typography>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleInput}>Send</button>
          <div>{response}</div>
        </CardContent>
      </Card>
    );
  }
};
