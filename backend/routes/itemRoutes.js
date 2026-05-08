const express = require("express");
const router = express.Router();

const { createItem, getItems, getItemById,getMyItems } = require("../controllers/itemController");
const { requireSignin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.post("/items", requireSignin, upload.array("itemPictures"), createItem);
router.get("/items", getItems);
router.get("/items/:id", getItemById);
router.get("/my-items", requireSignin, getMyItems);

module.exports = router;