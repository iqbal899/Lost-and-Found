const express = require("express");
const router = express.Router();

const {
    submitResponse,
    acceptResponse,
    getContactDetails,
    getMyResponses,
    getResponsesForMyItems
} = require("../controllers/responseController");

const { requireSignin } = require("../middleware/authMiddleware");

// Submit response
router.post(
    "/responses",
    requireSignin,
    submitResponse
);

// Accept response
router.put(
    "/responses/:id/accept",
    requireSignin,
    acceptResponse
);

// Get contact details
router.get(
    "/responses/:id/contact",
    requireSignin,
    getContactDetails
);

router.get(
  "/my-responses",
  requireSignin,
  getMyResponses
);

router.get(
  "/received-responses",
  requireSignin,
  getResponsesForMyItems
);



module.exports = router;