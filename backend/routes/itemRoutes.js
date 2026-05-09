const express = require("express");
const router = express.Router();

const {
  createItem,
  getAllItems,
  getSingleItem,
  getMyItems,
} = require("../controllers/itemController");

const { requireSignin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.post("/items", requireSignin, upload.array("itemPictures"), createItem);
router.get("/items", getAllItems);
router.get("/my-items", requireSignin, getMyItems);
router.get("/items/:id", getSingleItem);

module.exports = router;