const express = require("express");
const {
  getCoupons,
  createCoupon,
  getCouponById,
  deleteCoupon,
  updateCoupon,
} = require("../controllers/couponController");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, admin, getCoupons)
  .post(protect, admin, createCoupon);
router
  .route("/:id")
  .get(protect, admin, getCouponById)
  .delete(protect, admin, deleteCoupon)
  .put(protect, admin, updateCoupon);

module.exports = router;
