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
  const items = await Item.find().populate("createdBy", "firstname email");
  res.json(items);
};