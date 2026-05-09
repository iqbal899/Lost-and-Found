const Item = require("../models/Item");

exports.createItem = async (req, res) => {
  try {

    let itemPictures = [];

    if (req.files?.length > 0) {
      itemPictures = req.files.map((file) => ({
        img: file.filename,
      }));
    }

    const item = await Item.create({
      ...req.body,
      itemPictures,
      createdBy: req.user.id,
    });

    res.status(201).json(item);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getAllItems = async (req, res) => {

  try {

    const items = await Item.find({
      status: "open",
    })
      .populate("createdBy", "firstname lastname")
      .sort({ createdAt: -1 });

    res.json(items);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getSingleItem = async (req, res) => {

  try {

    const item = await Item.findById(req.params.id)
      .populate("createdBy", "firstname lastname email number");

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    item.views += 1;
    await item.save();

    res.json(item);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
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