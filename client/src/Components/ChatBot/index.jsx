import React from "react";
import { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ASK_LEARNING_EXPERT } from "../../utils/queries";
import { Typography, Card, CardContent, Modal, Button } from "@mui/material";
import auth from "../../utils/auth";

export const ChatBot = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(""); 

  //Open Modal Variable
  const [open, setOpen] = useState(false);

  const [askLearningExpert, { loading, error, data }] = useLazyQuery(ASK_LEARNING_EXPERT);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  const handleInput = async (event) => {
    event.preventDefault();

    const { data } = await askLearningExpert({
      variables: { question: input },
    });

    setResponse(data.askLearningExpert);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  if (auth.loggedIn()) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Button variant="contained" onClick={handleOpen}>
          Ask Academa
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="chat-bot-modal"
          aria-describedby="chat-bot-modal-description"
        >
          <div className="p-6 bg-white rounded-lg shadow-md">
            <Typography variant="h5" className="text-2xl font-bold mb-4">
              Ask Academa
            </Typography>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="mt-1 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleInput}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
            {response && (
              <div className="mt-4">
                <Card>
                  <CardContent>
                    <Typography variant="body1">{response}</Typography>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </Modal>
      </div>
    );
  }
};
