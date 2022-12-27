const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  updateUserProfile,
  getUsers,
  getUserById,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", loginUser);
router.route("/me").get(protect, getUser).put(protect, updateUserProfile);
router.route("/:id").get(protect, admin, getUserById);
module.exports = router;
