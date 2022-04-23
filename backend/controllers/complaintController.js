const e = require("express");
const asyncHandler = require("express-async-handler");
const Complaint = require("../models/complaint");

// @desc Create new complaint
// @route POST /api/complaints
// @access Private
const createComplaint = asyncHandler(async (req, res) => {
  const { complaintMessage } = req.body;
  const complaint = new Complaint({
    user: req.user._id,
    complaintMessage,
  });
  const createdComplaint = await complaint.save();
  res.status(201).json(createdComplaint);
});

// @desc Get all complaints
// @route GET /api/complaints
// @access Private/Admin
const getComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({}).populate("user", "id name");
  res.json(complaints);
});

// @desc Get Complaint by id
// @route GET /api/complaints/:id
// @access Private/Admin
const getComplaintById = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (complaint) {
    res.json(complaint);
  } else {
    throw new Error("Ticket not found");
  }
});

// @desc Update ticket to resolved
// @route PUT /api/complaints/:id
// @access Private/Admin
const resolveComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);
  if (complaint) {
    complaint.resolved = true;
    const updatedComplaint = await complaint.save();
    res.json(updatedComplaint);
  } else {
    throw new Error("Ticket not found");
  }
});

// @desc Get signed in user complaints
// @route GET /api/complaints/me
// @access Private
const getMyComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({ user: req.user._id });
  res.json(complaints);
});

// @desc Delete signed in user complaint by id
// @route DELETE /api/complaints/me/:id
// @access Private
const deleteMyComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);
  if (complaint) {
    await complaint.remove();
    res.json({ message: "Complaint removed" });
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
});

module.exports = {
  createComplaint,
  getComplaints,
  getComplaintById,
  resolveComplaint,
  getMyComplaints,
  deleteMyComplaint,
};
