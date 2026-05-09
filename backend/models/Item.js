const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["LOST", "FOUND"],
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    itemPictures: [
      {
        img: String,
      },
    ],

    status: {
      type: String,
      enum: ["open", "resolved"],
      default: "open",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);