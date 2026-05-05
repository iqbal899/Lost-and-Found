const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  belongsTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  givenBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  question: String,
  answer: String,

  response: {
    type: String,
    default: "pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);