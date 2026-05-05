const express = require("express");
const router = express.Router();

const { createItem, getItems } = require("../controllers/itemController");
const { requireSignin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.post("/items", requireSignin, upload.array("itemPictures"), createItem);
router.get("/items", getItems);

module.exports = router;