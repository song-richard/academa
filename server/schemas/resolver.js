const { CardSet, Card, Profile } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    cardSets: async (parent, { email, amount }) => {
      const params = email ? { email } : {};
      const profile = Profile.findOne({ params }).populate("cardSets");
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
  },
  Mutation: {
    addProfile: async (parent, { name, email }) => {
      const profile = await Profile.create({ name, email});
      // const token = signToken(profile);
      return profile;
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });
      if (!profile) {
        throw AuthenticationError;
      }
      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }
      // const token = signToken(profile);
      return profile;
    },

    addCardSet: async (parent, { title, cardSet }) => {
      console.log("first log")
      const newCardSet = await CardSet.create({ title });
      for (let i = 0; i < cardSet.length; i++) {
        const { term, description } = cardSet[i];
        const newCard = await Card.create({ term, description});
        
        console.log("second log")
        await CardSet.findOneAndUpdate(
          { _id: newCardSet._id },
          { $push: { cards: newCard._id } },
          { new: true }
        );
      }
      const addedCardSet = await CardSet.findById({ _id: newCardSet._id }).populate('cards');

      const addToProfile = await Profile.findOneAndUpdate({})

      return addedCardSet;
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