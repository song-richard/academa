const { Schema, model } = require("mongoose");
const Card = require("./Card");

const cardSetSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      minLength: 3,
      maxLength: 500,
    },
    completed: {
      type: Boolean,
    },

    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: "card",
      },
    ],
  },
  { toJSON: { virtuals: true }, id: false }
);

const CardSet = model("cardSet", cardSetSchema);

module.exports = CardSet;
