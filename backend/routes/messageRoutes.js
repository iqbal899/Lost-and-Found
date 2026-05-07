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
router.get(
  "/contact/:id",
  requireSignin,
  getContactDetails
);

module.exports = router;