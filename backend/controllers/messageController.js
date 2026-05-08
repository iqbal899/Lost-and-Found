const Message = require("../models/Message");
const Item = require("../models/Item");

exports.submitAnswer = async (req, res) => {
  try {
    const { itemId, question, answer } = req.body;

    const message = await Message.create({
      itemId,
      question,
      answer,
      givenBy: req.user.id,
      belongsTo: req.body.belongsTo,
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAnswersByItem = async (req, res) => {
  const { itemId } = req.params;

  const answers = await Message.find({ itemId })
    .populate("givenBy", "firstname email");

  res.json(answers);
};

exports.confirmResponse = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    // Find item
    const item = await Item.findById(message.itemId);

    // Only owner can confirm
    if (item.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    // Update message
    message.response = "accepted";
    await message.save();

    // Mark item resolved
    item.status = "resolved";
    await item.save();

    res.json({
      message: "Response confirmed successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getContactDetails = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    // Only accepted responses
    if (message.response !== "accepted") {
      return res.status(403).json({
        message: "Response not accepted yet",
      });
    }

    const item = await Item.findById(message.itemId)
      .populate("createdBy", "firstname number email");

    res.json({
      owner: item.createdBy,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getMyResponses = async (req, res) => {

  const responses = await Message.find({
    givenBy: req.user.id,
  }).populate("itemId");

  res.json(responses);
};
