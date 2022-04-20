const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  updateOrdertoPaid,
  updateOrdertoDelivered,
  getMyOrders,
  getOrders,
} = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrdertoPaid);
router.route("/:id/deliver").put(protect, admin, updateOrdertoDelivered);

module.exports = router;
