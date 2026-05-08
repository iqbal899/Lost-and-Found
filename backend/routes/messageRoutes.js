const express = require("express");
const router = express.Router();

const {
  submitAnswer,
  getAnswersByItem,
  confirmResponse,
  getContactDetails,
  getMyResponses,
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
router.get(
  "/my-responses",
  requireSignin,
  getMyResponses
);

module.exports = router;