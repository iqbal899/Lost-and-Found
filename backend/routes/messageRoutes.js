const express = require("express");
const router = express.Router();

const {
  submitAnswer,
  getAnswersByItem,
  confirmResponse,
} = require("../controllers/messageController");

const { requireSignin } = require("../middleware/authMiddleware");

router.post("/answer", requireSignin, submitAnswer);
router.get("/answers/:itemId", getAnswersByItem);
router.post("/confirm/:id", requireSignin, confirmResponse);

module.exports = router;