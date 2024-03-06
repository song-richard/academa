const { PromptTemplate } = require("langchain/prompts");
const { model, formatInstructions } = require("./config/openaiWrapper");
const inquirer = require("inquirer");

// Uses the instantiated OpenAI wrapper, model, and makes a call based on input from inquirer
const promptFunc = async (input) => {
  try {
    // console.log(res);

    // Instantiation of a new object called "prompt" using the "PromptTemplate" class
    const prompt = new PromptTemplate({
      template:
        "You are a leaning expert and will answer the user’s  questions thoroughly as possible.\n{question}",
      inputVariables: ["question"],
      partialVariables: { format_instructions: formatInstructions },
    });

    // Format the prompt with the user input
    const promptInput = await prompt.format({
      question: input,
    });

    // Call the model with the formatted prompt
    const res = await model.call(promptInput);
    console.log(await parser.parse(res));
  } catch (err) {
    console.error(err);
  }
};

// Initialization function that uses inquirer to prompt the user and returns a promise. It takes the user input and passes it through the call method
const init = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Ask learning expert:",
      },
    ])
    .then((inquirerResponse) => {
      promptFunc(inquirerResponse.name);
    });
};

// Calls the initialization function and starts the script
init();
