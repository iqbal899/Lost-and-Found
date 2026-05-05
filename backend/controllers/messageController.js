const Message = require("../models/Message");

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
  const { id } = req.params;

  await Message.findByIdAndUpdate(id, {
    response: "accepted",
  });

  res.json({ message: "Response confirmed" });
};
