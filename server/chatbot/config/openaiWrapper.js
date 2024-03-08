const { OpenAI } = require("@langchain/openai");
require("dotenv").config();

const { StructuredOutputParser } = require("langchain/output_parsers");

//// Creates and stores a wrapper for the OpenAI package along with basic configuration
const model = new OpenAI({
  openAIApikey: process.env.OPENAI_API_KEY,
  temperature: 0,
  model: "gpt-3.5-turbo",
});

console.log("model", model);

// With a `StructuredOutputParser` we can define a schema for the output.
const parser = StructuredOutputParser.fromNamesAndDescriptions({
  code: "Learning expert that answers the user's question",
  explanation:
    "detailed explanation of the question asked by the user with examples",
});

// Get the format instructions from the parser
const formatInstructions = parser.getFormatInstructions();

module.exports = { model, formatInstructions, parser };
