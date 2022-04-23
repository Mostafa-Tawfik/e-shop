const mongoose = require("mongoose");

const complaintSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  complaintMessage: {
    type: String,
    required: true,
  },
  resolved: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
