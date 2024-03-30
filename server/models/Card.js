const { Schema, model } = require("mongoose");
const commentSchema = require('./Comment')

const cardSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    voterArray: [String],
    commentArray: [commentSchema],
    labelArray: [{
      type: Schema.Types.ObjectId,
      ref: 'Label',
    }],
  },
  {_id: true},
  { timestamps: true },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

cardSchema.virtual("voteCount").get(function () {
  return this.voterArray.length;
});

const Card = model("Card", cardSchema)

module.exports = Card;
