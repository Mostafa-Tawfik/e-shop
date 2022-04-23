const express = require("express");
const router = express.Router();
const { protect, admin, ticket } = require("../middleware/authMiddleware");
const {
  createComplaint,
  getComplaints,
  getComplaintById,
  resolveComplaint,
  getMyComplaints,
  deleteMyComplaint,
} = require("../controllers/complaintController");

router.route("/me").get(protect, getMyComplaints);
router.route("/me/:id").delete(protect, ticket, deleteMyComplaint);
router
  .route("/")
  .post(protect, createComplaint)
  .get(protect, admin, getComplaints);
router
  .route("/:id")
  .get(protect, admin, getComplaintById)
  .put(protect, admin, resolveComplaint);

module.exports = router;
