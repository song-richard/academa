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
