const { CardSet, Card, Profile } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const { model, formatInstructions, parser } = require("../chatbot/config/openaiWrapper");
const { PromptTemplate } = require("@langchain/core/prompts");
const aiGenerateCards = require("../utils/aiGenerateCards");

const promptFunc = async (input) => {
  try {     

    // Instantiation of a new object called "prompt" using the "PromptTemplate" class
    const prompt = new PromptTemplate({
      template:
        "You are a leaning expert and will answer the user’s questions thoroughly as possible.\n{question}",
      inputVariables: ["question"],
      partialVariables: { format_instructions: formatInstructions },
    });

    // Format the prompt with the user input
    const promptInput = await prompt.format({
      question: input,
    });

    // Call the model with the formatted prompt
    const res = await model.call(promptInput);
    // console.log(await parser.parse(res));
    console.log({res});
    // return await parser.parse(res)
    return res.trim();
  } catch (err) {
    console.error(err);
    throw new Error("Error in the chatbot");
  }
};

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find().populate({
        path: 'cardSets',
        populate: {
          path: 'cards'
        }
      })
    },

    profile: async (parent, args, { user }) => {
      return Profile.findOne({ _id: user._id });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, { user }) => {
      if (user) {
        return Profile.findOne({ _id: user._id });
      }
      throw AuthenticationError;
    },
    cardSets: async (parent, args, { user }) => {
      const profile = Profile.findOne({ _id: user._id }).populate("cardSets");
      //Populate the cards for each card set TODO for later
      // const cardSets = await CardSet.find(params).populate("cards");
      // if (amount) {
      //   return cardSets.slice(0, amount);
      // }
      return profile;

    },
    card: async (parent, { id }) => {
      const params = id ? { _id: id } : {};
      return Card.findOne(params);
    },
    askLearningExpert: async (parent, { question }) => {
      try {
        const response = await promptFunc(question);
        return response;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to get a response from the chatbot");
      }     

    },
    getAICardSet: async (parent, { topic, amount }) => {
      try {
        const response = await aiGenerateCards(amount, topic);
        return response;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to get a response from the chatbot");
      }
    },
    cardSet: async (parent, { cardSetId }) => {
      return CardSet.findOne({_id: cardSetId}).populate("cards");
    }
  },
  
  Mutation: {
    addProfile: async (parent, { username, email, password }) => {
      const profile = await Profile.create({ username, email, password});
      const token = signToken(profile);
      return { token, profile };
    },
    login: async (parent, { user, password }) => {
      const profile = await Profile.findOne({ $or: [{ username: user }, { email: user }]});
      if (!profile) {
        throw AuthenticationError;
      }
      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(profile);
      return { token, profile};
    },

    addCardSet: async (parent, { title, cardSet}, { user }) => {
      const newCardSet = await CardSet.create({ title });
      for (let i = 0; i < cardSet.length; i++) {
        const { term, description } = cardSet[i];
        const newCard = await Card.create({ term, description});
        
        await CardSet.findOneAndUpdate(
          { _id: newCardSet._id },
          { $push: { cards: newCard._id } },
          { new: true }
        );
      }
      const addedCardSet = await CardSet.findById({ _id: newCardSet._id });

      const addToProfile = await Profile.findOneAndUpdate({_id: user._id},{ $push: { cardSets: addedCardSet._id }},{new: true}).populate('cardSets');

      return addToProfile;
    },
    updateCardSet: async (parent, { id, cardSet }) => {
      let newCards = [];
      for (let i = 0; i < cardSet.length; i++) {
        const { term, description } = cardSet[i];
        const newCard = await Card.create({ term, description});

        newCards.push(newCard._id);
      }

      const updatedCardSet = await CardSet.findOneAndUpdate(
        { _id: id },
        { cards: newCards},
        { new: true }
      ).populate('cards');

      return updatedCardSet;
    },
    deleteCardSet: async (parent, { id }) => {
      const deletedCardSet = await CardSet.findOneAndDelete({ _id: id });
      return deletedCardSet;
    },
  },
  
};

module.exports = resolvers;