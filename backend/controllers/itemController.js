const Item = require("../models/Item");

exports.createItem = async (req, res) => {
  try {
    let itemPictures = [];

    if (req.files) {
      itemPictures = req.files.map(file => ({
        img: file.filename
      }));
    }

    const item = await Item.create({
      ...req.body,
      itemPictures,
      createdBy: req.user.id,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getItems = async (req, res) => {
  try {

    const items = await Item.find({
      status: "open",
    }).populate("createdBy", "firstname");

    res.json(items);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getItemById = async (req, res) => {
  const { id } = req.params;

  const item = await Item.findById(id).populate(
    "createdBy",
    "firstname email number"
  );

  res.json(item);
};

exports.getMyItems = async (req, res) => {
  try {

    const items = await Item.find({
      createdBy: req.user.id,
    });

    res.json(items);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};