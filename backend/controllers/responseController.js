const Response = require("../models/Response");
const Item = require("../models/Item");

exports.submitResponse = async (req, res) => {

    try {

        const { itemId, answer } = req.body;

        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({
                message: "Item not found",
            });
        }

        if (item.createdBy.toString() === req.user.id) {
            return res.status(400).json({
                message: "You cannot respond to your own item",
            });
        }

        const alreadyResponded = await Response.findOne({
            itemId,
            responder: req.user.id,
        });

        if (alreadyResponded) {
            return res.status(400).json({
                message: "You already responded to this item",
            });
        }

        const response = await Response.create({
            itemId,
            responder: req.user.id,
            owner: item.createdBy,
            answer,
        });

        res.status(201).json(response);

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

exports.acceptResponse = async (req, res) => {

    try {

        const response = await Response.findById(req.params.id);

        if (!response) {
            return res.status(404).json({
                message: "Response not found",
            });
        }

        const item = await Item.findById(response.itemId);

        // Only owner can accept
        if (item.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        response.status = "accepted";
        await response.save();

        await Response.updateMany(
            {
                itemId: response.itemId,
                _id: { $ne: response._id }
            },
            {
                status: "rejected"
            }
        );

        item.status = "resolved";
        await item.save();

        res.json({
            message: "Response accepted successfully",
        });

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

exports.getContactDetails = async (req, res) => {

    try {

        const response = await Response.findById(req.params.id);

        // Must exist AND be accepted
        if (!response || response.status !== "accepted") {
            return res.status(403).json({
                message: "Access denied",
            });
        }

        // Only owner or responder can access
        if (
            response.responder.toString() !== req.user.id &&
            response.owner.toString() !== req.user.id
        ) {
            return res.status(403).json({
                message: "Unauthorized access",
            });
        }

        const owner = await Item.findById(response.itemId)
            .populate("createdBy", "firstname lastname number email");

        res.json(owner.createdBy);

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

exports.getMyResponses = async (req, res) => {

    try {

        const responses = await Response.find({
            responder: req.user.id,
        })
            .populate("itemId")
            .populate("owner", "firstname lastname");

        res.json(responses);

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

exports.getResponsesForMyItems = async (req, res) => {

    try {

        const responses = await Response.find({
            owner: req.user.id,
        })
            .populate("itemId")
            .populate("responder", "firstname lastname email");

        res.json(responses);

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};


