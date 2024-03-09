const { Schema, model } = require("mongoose");
// const { type } = require('os');

const cardSchema = new Schema(
  {
    term: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    viewed: {
      type: Boolean,
    },
  },
  { toJSON: { virtuals: true }, id: false }
);

const Card = model("card", cardSchema);

module.exports = Card;
